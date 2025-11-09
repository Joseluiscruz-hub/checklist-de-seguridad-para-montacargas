import { Component, ChangeDetectionStrategy, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Forklift, IncidentReport } from '../../models/checklist.model';

@Component({
  selector: 'app-incident-report-modal',
  imports: [FormsModule],
  templateUrl: './incident-report-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentReportModalComponent {
  forklifts = input.required<Forklift[]>();
  save = output<Omit<IncidentReport, 'reporter' | 'timestamp'>>();
  close = output<void>();

  report = signal({
    forkliftId: '',
    severity: 'Media' as 'Alta' | 'Media' | 'Baja',
    description: '',
    photo: null as string | null
  });
  
  isFormValid(): boolean {
    const currentReport = this.report();
    return currentReport.forkliftId !== '' && currentReport.description.trim() !== '';
  }

  updateForkliftId(id: string) {
    this.report.update(r => ({ ...r, forkliftId: id }));
  }

  updateSeverity(severity: 'Alta' | 'Media' | 'Baja') {
    this.report.update(r => ({ ...r, severity }));
  }

  updateDescription(description: string) {
    this.report.update(r => ({ ...r, description }));
  }

  handlePhotoUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.report.update(r => ({ ...r, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  }

  triggerPhotoUpload() {
    document.getElementById('incident-photo-upload')?.click();
  }

  onSave() {
    if (this.isFormValid()) {
      this.save.emit(this.report());
    }
  }

  onClose() {
    this.close.emit();
  }
}