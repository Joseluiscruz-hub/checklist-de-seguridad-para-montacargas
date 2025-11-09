import { Component, ChangeDetectionStrategy, input, output, signal, WritableSignal, computed, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Inspection, ChecklistItem } from '../../models/checklist.model';

declare var SignaturePad: any;

@Component({
  selector: 'app-checklist-modal',
  imports: [FormsModule],
  templateUrl: './checklist-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistModalComponent implements AfterViewInit {
  inspection = input.required<Inspection>();
  save = output<Inspection>();
  close = output<void>();

  localInspection: WritableSignal<Inspection | null> = signal(null);

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

  handlePhotoUpload(event: Event, item: ChecklistItem) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.localInspection.update(insp => {
            if(insp) {
                const targetItem = insp.checklist.find(i => i.id === item.id);
                if(targetItem) {
                    targetItem.photo = reader.result as string;
                }
            }
            return insp;
        });
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
    if (this.localInspection()) {
      const inspection = this.localInspection()!;
      if (this.signaturePad && !this.signaturePad.isEmpty()) {
        inspection.signature = this.signaturePad.toDataURL('image/png');
      } else if (this.signaturePad && this.signaturePad.isEmpty()) {
        inspection.signature = null;
      }
      this.save.emit(inspection);
    }
  }

  onClose() {
    this.close.emit();
  }
}