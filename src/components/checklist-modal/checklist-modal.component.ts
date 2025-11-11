import { Component, ChangeDetectionStrategy, input, output, signal, WritableSignal, computed, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Inspection, ChecklistItem } from '../../models/checklist.model';
import { ImageService } from '../../services/image.service';
import { ValidationService } from '../../services/validation.service';

declare var SignaturePad: any;

@Component({
  selector: 'app-checklist-modal',
  imports: [FormsModule],
  templateUrl: './checklist-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistModalComponent implements AfterViewInit {
  private imageService = inject(ImageService);
  private validationService = inject(ValidationService);

  inspection = input.required<Inspection>();
  save = output<Inspection>();
  close = output<void>();

  localInspection: WritableSignal<Inspection | null> = signal(null);
  validationErrors = signal<{ [key: string]: string }>({});
  isCompressingImage = signal(false);

  @ViewChild('signatureCanvas') signatureCanvas!: ElementRef<HTMLCanvasElement>;
  private signaturePad: any;

  groupedChecklist = computed(() => {
    const inspection = this.localInspection();
    if (!inspection) return [];

    const groups = inspection.checklist.reduce((acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {} as { [key: string]: ChecklistItem[] });

    return Object.entries(groups).map(([category, items]) => ({ category, items }));
  });

  ngOnInit() {
    const inspectionCopy = JSON.parse(JSON.stringify(this.inspection()));
    if (!inspectionCopy.inspectionDate) {
      inspectionCopy.inspectionDate = new Date().toISOString().split('T')[0];
    }
    if (typeof inspectionCopy.odometer === 'undefined') {
      inspectionCopy.odometer = '';
    }
    if (!inspectionCopy.signature) {
        inspectionCopy.signature = null;
    }
    this.localInspection.set(inspectionCopy);
  }

  ngAfterViewInit() {
    if (this.signatureCanvas) {
      const canvas = this.signatureCanvas.nativeElement;
      this.signaturePad = new SignaturePad(canvas);
      
      const existingSignature = this.localInspection()?.signature;
      if (existingSignature) {
        this.signaturePad.fromDataURL(existingSignature);
      }
    }
  }

  getButtonLabels(category: string): { ok: string, issue: string } {
    if (category === 'Dispositivos de Seguridad' || category === 'Inventario de Vidrio y Plástico Rígido') {
      return { ok: 'Sí', issue: 'No' };
    }
    return { ok: 'Cumple', issue: 'No Cumple' };
  }

  updateStatus(item: ChecklistItem, status: 'ok' | 'issue') {
    this.localInspection.update(insp => {
      if (insp) {
        const targetItem = insp.checklist.find(i => i.id === item.id);
        if (targetItem) {
          targetItem.status = status;
        }
      }
      return insp;
    });
  }

  async handlePhotoUpload(event: Event, item: ChecklistItem) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // Validar tamaño máximo (5MB sin comprimir)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen es demasiado grande. El tamaño máximo es 5MB.');
        return;
      }

      this.isCompressingImage.set(true);
      
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const originalBase64 = reader.result as string;
          const originalSizeKB = this.imageService.getImageSizeInKB(originalBase64);

          // Comprimir imagen
          const compressedBase64 = await this.imageService.compressImage(originalBase64);
          const compressedSizeKB = this.imageService.getImageSizeInKB(compressedBase64);

          console.log(`Imagen comprimida: ${originalSizeKB.toFixed(2)}KB → ${compressedSizeKB.toFixed(2)}KB (${((1 - compressedSizeKB / originalSizeKB) * 100).toFixed(1)}% reducción)`);

          this.localInspection.update(insp => {
            if (insp) {
              const targetItem = insp.checklist.find(i => i.id === item.id);
              if (targetItem) {
                targetItem.photo = compressedBase64;
              }
            }
            return insp;
          });
        } catch (error) {
          console.error('Error al comprimir imagen:', error);
          alert('Error al procesar la imagen. Por favor, intente con otra imagen.');
        } finally {
          this.isCompressingImage.set(false);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  triggerPhotoUpload(itemId: string) {
    document.getElementById(`photo-upload-${itemId}`)?.click();
  }

  clearSignature() {
    if (this.signaturePad) {
      this.signaturePad.clear();
    }
  }

  onSave() {
    if (!this.localInspection()) return;

    const inspection = this.localInspection()!;
    const errors: { [key: string]: string } = {};

    // Validar odómetro
    const odometerValidation = this.validationService.validateOdometer(inspection.odometer);
    if (!odometerValidation.valid) {
      errors['odometer'] = odometerValidation.error!;
    }

    // Validar inspector
    const inspectorValidation = this.validationService.validateRequired(inspection.inspector, 'Inspector');
    if (!inspectorValidation.valid) {
      errors['inspector'] = inspectorValidation.error!;
    }

    // Validar ubicación
    const locationValidation = this.validationService.validateRequired(inspection.location, 'Ubicación');
    if (!locationValidation.valid) {
      errors['location'] = locationValidation.error!;
    }

    // Validar checklist completado
    const checklistValidation = this.validationService.validateChecklistCompleted(inspection.checklist);
    if (!checklistValidation.valid) {
      errors['checklist'] = checklistValidation.error!;
    }

    // Capturar firma
    if (this.signaturePad && !this.signaturePad.isEmpty()) {
      inspection.signature = this.signaturePad.toDataURL('image/png');
    } else if (this.signaturePad && this.signaturePad.isEmpty()) {
      inspection.signature = null;
    }

    // Validar firma
    const signatureValidation = this.validationService.validateSignature(inspection.signature);
    if (!signatureValidation.valid) {
      errors['signature'] = signatureValidation.error!;
    }

    // Si hay errores, mostrarlos y no guardar
    if (Object.keys(errors).length > 0) {
      this.validationErrors.set(errors);
      const errorMessages = Object.values(errors).join('\n');
      alert(`Por favor corrija los siguientes errores:\n\n${errorMessages}`);
      return;
    }

    // Limpiar errores y guardar
    this.validationErrors.set({});
    this.save.emit(inspection);
  }

  onClose() {
    this.close.emit();
  }
}