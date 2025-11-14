import { Component, ChangeDetectionStrategy, input, output, signal, WritableSignal, computed, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Inspection, ChecklistItem } from '../../models/checklist.model';
import { ValidationService } from '../../services/validation.service';
import { PhotoService } from '../../services/photo.service';

declare var SignaturePad: any;

@Component({
  selector: 'app-checklist-modal',
  imports: [FormsModule],
  templateUrl: './checklist-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistModalComponent implements AfterViewInit {
  private validationService = inject(ValidationService);
  private photoService = inject(PhotoService);

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
      
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen es demasiado grande. El tamaño máximo es 5MB.');
        return;
      }

      this.localInspection.update(insp => {
        if (insp) {
          const targetItem = insp.checklist.find(i => i.id === item.id);
          if (targetItem) {
            targetItem.photoFile = file;
            targetItem.photo = URL.createObjectURL(file); // Show a preview
          }
        }
        return insp;
      });
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

  async onSave() {
    if (!this.localInspection()) return;

    const inspection = this.localInspection()!;
    const errors: { [key: string]: string } = {};

    // (Validations remain the same)
    const odometerValidation = this.validationService.validateOdometer(inspection.odometer);
    if (!odometerValidation.valid) errors['odometer'] = odometerValidation.error!;
    const checklistValidation = this.validationService.validateChecklistCompleted(inspection.checklist);
    if (!checklistValidation.valid) errors['checklist'] = checklistValidation.error!;
    if (this.signaturePad && !this.signaturePad.isEmpty()) {
      inspection.signature = this.signaturePad.toDataURL('image/png');
    } else {
      inspection.signature = null;
    }
    const signatureValidation = this.validationService.validateSignature(inspection.signature);
    if (!signatureValidation.valid) errors['signature'] = signatureValidation.error!;


    if (Object.keys(errors).length > 0) {
      this.validationErrors.set(errors);
      const errorMessages = Object.values(errors).join('\n');
      alert(`Por favor corrija los siguientes errores:\n\n${errorMessages}`);
      return;
    }

    this.isCompressingImage.set(true); // Re-using this signal for "uploading" state

    try {
      for (const item of inspection.checklist) {
        if (item.photoFile) {
          item.photo = await this.photoService.uploadPhoto(item.photoFile);
          delete item.photoFile;
        }
      }
      this.validationErrors.set({});
      this.save.emit(inspection);
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Hubo un error al subir una de las imágenes. Por favor, intente de nuevo.');
    } finally {
      this.isCompressingImage.set(false);
    }
  }

  onClose() {
    this.close.emit();
  }
}