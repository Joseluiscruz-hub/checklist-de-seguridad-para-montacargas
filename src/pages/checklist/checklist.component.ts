import { Component, ChangeDetectionStrategy, signal, inject, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CHECKLIST_TEMPLATE } from '../../data/mock.data';
import { Forklift, Inspection, IncidentReport } from '../../models/checklist.model';
import { DbService } from '../../services/db.service';
import { DataService } from '../../services/data.service';
import { SyncService } from '../../services/sync.service';
import { ChecklistModalComponent } from '../../components/checklist-modal/checklist-modal.component';
import { QrScannerComponent } from '../../components/qr-scanner/qr-scanner.component';
import { IncidentReportModalComponent } from '../../components/incident-report-modal/incident-report-modal.component';
import { ManualsModalComponent } from '../../components/manuals-modal/manuals-modal.component';
import { COCA_COLA_FEMSA_LOGO_BASE64 } from '../../assets/logo';
import { ButtonComponent } from '../../components/button/button.component';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-checklist',
  imports: [
    FormsModule,
    ChecklistModalComponent,
    QrScannerComponent,
    IncidentReportModalComponent,
    ManualsModalComponent,
    ButtonComponent,
    ProgressBarComponent
  ],
  templateUrl: './checklist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistComponent implements OnInit {
  private dbService = inject(DbService);
  private dataService = inject(DataService);
  private syncService = inject(SyncService);
  private router = inject(Router);

  view = signal<'home' | 'selection'>('home');
  logo = COCA_COLA_FEMSA_LOGO_BASE64;
  currentYear = new Date().getFullYear();
  userData = {
    name: 'Juan Pérez',
    id: 'EMP-0123',
    assignedForklift: 'M-05',
    shift: 'Matutino (06:00 - 14:00)'
  };

  forklifts = signal<Forklift[]>([]);
  crews = signal<{ name: string; color: string }[]>([]);
  areas = signal<string[]>([]);

  ngOnInit(): void {
    this.dataService.getForklifts().subscribe(data => this.forklifts.set(data));
    this.dataService.getCrews().subscribe(data => this.crews.set(data));
    this.dataService.getAreas().subscribe(data => this.areas.set(data));
  }
  
  currentSession = signal<Map<string, Inspection>>(new Map());
  
  sessionInspector = signal('');
  sessionShift = signal('1');
  sessionCrew = signal('');
  sessionLocation = signal('');

  selectedForklift = signal<Inspection | null>(null);
  isChecklistModalOpen = signal(false);
  isScannerOpen = signal(false);
  isProfileMenuOpen = signal(false);
  isIncidentModalOpen = signal(false);
  isManualsModalOpen = signal(false);
  
  toastMessage = signal<string | null>(null);
  toastIsError = signal<boolean>(false);

  searchTerm = signal('');

  filteredForklifts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      return this.forklifts();
    }
    return this.forklifts().filter(f => 
      f.name.toLowerCase().includes(term) ||
      f.model.toLowerCase().includes(term) ||
      f.id.toLowerCase().includes(term)
    );
  });

  sessionSummary = computed(() => {
    const inspections = this.currentSession();
    const total = this.forklifts().length;
    const completed = inspections.size;
    
    let issues = 0;
    for (const inspection of inspections.values()) {
      if (inspection.checklist.some(item => item.status === 'issue')) {
        issues++;
      }
    }

    return { total, completed, issues };
  });

  selectedCrewColor = computed(() => {
    const selected = this.crews().find(c => c.name === this.sessionCrew());
    return selected ? selected.color : 'transparent';
  });

  sessionHasChanges = computed(() => this.currentSession().size > 0);
  isSessionInfoValid = computed(() => this.sessionInspector().trim() !== '' && this.sessionLocation().trim() !== '' && this.sessionCrew().trim() !== '');

  // --- View Navigation ---
  goToSelectionView() { this.view.set('selection'); }
  goToHomeView() { this.view.set('home'); }

  // --- Quick Access Actions ---
  goToHistory() { this.router.navigate(['/history']); }
  reportIncident() { this.isIncidentModalOpen.set(true); }
  consultManuals() { this.isManualsModalOpen.set(true); }

  // --- Profile Actions ---
  logout() {
    this.isProfileMenuOpen.set(false);
    this.showToast('Sesión cerrada exitosamente.');
    // In a real app, you would have more complex logout logic
  }

  // --- Incident Report ---
  async handleSaveIncident(incident: Omit<IncidentReport, 'reporter' | 'timestamp'>) {
    try {
      await this.dbService.saveIncident({
        ...incident,
        reporter: this.userData.name,
        timestamp: Date.now(),
      });
      this.isIncidentModalOpen.set(false);
      this.showToast('Incidencia reportada con éxito.');
    } catch (error) {
      console.error('Failed to save incident:', error);
      this.showToast('Error al reportar la incidencia.', true);
    }
  }

  getForkliftStatus(forkliftId: string): 'pending' | 'ok' | 'issue' {
    const inspection = this.currentSession().get(forkliftId);
    if (!inspection) return 'pending';
    const hasIssues = inspection.checklist.some(item => item.status === 'issue');
    return hasIssues ? 'issue' : 'ok';
  }

  startChecklist(forklift: Forklift) {
    let inspection = this.currentSession().get(forklift.id);
    if (!inspection) {
      inspection = {
        forkliftId: forklift.id,
        forkliftName: forklift.name,
        checklist: JSON.parse(JSON.stringify(CHECKLIST_TEMPLATE)),
        inspector: '',
        shift: '',
        crew: '',
        location: '',
        odometer: '',
        timestamp: 0,
        inspectionDate: new Date().toISOString().split('T')[0]
      };
    }
    this.selectedForklift.set(inspection);
    this.isChecklistModalOpen.set(true);
  }

  handleChecklistSave(updatedInspection: Inspection) {
    this.currentSession.update(session => {
      session.set(updatedInspection.forkliftId, updatedInspection);
      return new Map(session);
    });
    this.isChecklistModalOpen.set(false);
    this.showToast('Checklist guardado en la sesión actual.');
  }

  handleChecklistClose() {
    this.isChecklistModalOpen.set(false);
  }

  openScanner() {
    this.isScannerOpen.set(true);
  }
  
  handleScanSuccess(forkliftId: string) {
    this.isScannerOpen.set(false);
    const forklift = this.forklifts().find(f => f.id === forkliftId);
    if (forklift) {
      this.startChecklist(forklift);
    } else {
      this.showToast('Montacargas no encontrado!', true);
    }
  }

  handleScanError(error: string) {
    this.isScannerOpen.set(false);
    this.showToast(`Error de escaneo: ${error}`, true);
  }

  async saveSession() {
    if (!this.isSessionInfoValid()) {
        this.showToast('Por favor, complete Nombre del Inspector, Tripulación y Ubicación.', true);
        return;
    }

    const sessionInspections: Inspection[] = [];
    this.currentSession().forEach(inspection => {
      const completedInspection = {
        ...inspection,
        inspector: this.sessionInspector(),
        shift: this.sessionShift(),
        crew: this.sessionCrew(),
        location: this.sessionLocation(),
        timestamp: Date.now()
      };
      sessionInspections.push(completedInspection);
    });

    if (sessionInspections.length === 0) {
      this.showToast('No hay checklists para guardar en esta sesión.', true);
      return;
    }

    try {
      await this.dbService.saveSession({
        id: Date.now(),
        inspections: sessionInspections
      });
      this.showToast('¡Sesión guardada exitosamente!');
      this.currentSession.set(new Map());
      this.sessionInspector.set('');
      this.sessionLocation.set('');
      this.sessionCrew.set('');
      this.sessionShift.set('1');
    } catch (error) {
      console.error('Failed to save session:', error);
      this.showToast('Error al guardar la sesión.', true);
    }
  }
  
  showToast(message: string, isError: boolean = false) {
    this.toastIsError.set(isError);
    this.toastMessage.set(message);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }

  async syncData() {
    this.showToast('Sincronizando datos...');
    try {
      const { syncedSessions, syncedIncidents } = await this.syncService.syncPendingData();
      this.showToast(`Sincronización completa. Sesiones: ${syncedSessions}, Incidentes: ${syncedIncidents}.`);
    } catch (error) {
      this.showToast('Error durante la sincronización.', true);
      console.error('Sync failed:', error);
    }
  }
}
