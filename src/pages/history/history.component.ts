import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { InspectionSession, Inspection, ChecklistItem } from '../../models/checklist.model';
import { COCA_COLA_FEMSA_LOGO_BASE64 } from '../../assets/logo';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent implements OnInit {
  private dbService = inject(DbService);

  sessions = signal<InspectionSession[]>([]);
  isLoading = signal(true);
  expandedSessionId = signal<number | null>(null);

  ngOnInit() {
    this.loadHistory();
  }

  async loadHistory() {
    this.isLoading.set(true);
    try {
      const allSessions = await this.dbService.getAllSessions();
      this.sessions.set(allSessions.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  toggleSession(sessionId: number) {
    this.expandedSessionId.update(currentId => currentId === sessionId ? null : sessionId);
  }

  getInspectionStatus(inspection: Inspection): 'ok' | 'issue' {
    return inspection.checklist.some(item => item.status === 'issue') ? 'issue' : 'ok';
  }

  formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleString();
  }

  generateReport(session: InspectionSession) {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const sessionDate = new Date(session.id);

      const reportHTML = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <title>Check list Montacargas - ${sessionDate.toLocaleDateString()}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              .no-print { display: none !important; }
              .page-break { page-break-before: always; }
            }
            body { font-family: sans-serif; }
            .bordered { border: 1px solid #000; }
            .report-table { border-collapse: collapse; width: 100%; font-size: 10px; }
            .report-table td, .report-table th { border: 1px solid #000; padding: 4px 8px; vertical-align: middle; }
            .check-box {
              width: 16px;
              height: 16px;
              border: 1px solid #000;
              display: inline-block;
              text-align: center;
              line-height: 14px;
              font-weight: bold;
            }
            .header-table td { padding: 2px 8px; }
          </style>
        </head>
        <body class="p-4 bg-white text-xs">
          ${session.inspections.map((inspection, index) => {
            const checklistByCat = inspection.checklist.reduce((acc, item) => {
              (acc[item.category] = acc[item.category] || []).push(item);
              return acc;
            }, {} as { [key: string]: ChecklistItem[] });

            const mainItems = checklistByCat['Revisión General'] || [];
            const securityItems = checklistByCat['Dispositivos de Seguridad'] || [];
            const inventoryItems = checklistByCat['Inventario de Vidrio y Plástico Rígido'] || [];
            const half = Math.ceil(mainItems.length / 2);
            const mainCol1 = mainItems.slice(0, half);
            const mainCol2 = mainItems.slice(half);
            
            const renderCheck = (is_checked: boolean) => {
              return is_checked ? '<div class="check-box">X</div>' : '<div class="check-box">&nbsp;</div>';
            };
            
            const renderRow = (item: ChecklistItem) => {
              return `
                <tr>
                  <td class="w-3/5">${item.label}</td>
                  <td class="text-center">${renderCheck(item.status === 'ok')}</td>
                  <td>Cumple</td>
                  <td class="text-center">${renderCheck(item.status === 'issue')}</td>
                  <td>No Cumple</td>
                </tr>
                <tr>
                  <td colspan="5"><strong>Obs:</strong> ${item.comment || ''}</td>
                </tr>
              `;
            };

            const renderSimpleRow = (item: ChecklistItem) => {
              return `
                <tr>
                  <td class="w-3/5">${item.label}</td>
                  <td class="text-center">${renderCheck(item.status === 'ok')}</td>
                  <td>Si</td>
                  <td class="text-center">${renderCheck(item.status === 'issue')}</td>
                  <td>No</td>
                </tr>
              `;
            };

            const signatureImage = inspection.signature 
              ? `<img src="${inspection.signature}" alt="Firma" style="height: 40px; display: block; margin: 0 auto;"/>`
              : '<div style="height: 40px;"></div>'; // Placeholder to maintain layout

            return `
            <div class="${index > 0 ? 'page-break' : ''}">
              <table class="w-full mb-2 report-table">
                <tr>
                  <td rowspan="3" class="w-1/5 text-center align-middle">
                    <img src="${COCA_COLA_FEMSA_LOGO_BASE64}" alt="Logo" class="h-12 mx-auto">
                  </td>
                  <td rowspan="2" class="w-3/5 text-center font-bold text-base align-middle">Check list Montacargas</td>
                  <td class="text-xs">Código: CUA-FR-FLE-010</td>
                </tr>
                <tr>
                  <td class="text-xs">Versión: 09</td>
                </tr>
                <tr>
                  <td class="text-center"><strong>Tipo de Documento:</strong> Formato</td>
                  <td class="text-xs"><strong>Fecha de Emisión:</strong> 2024-07-15</td>
                </tr>
              </table>

              <table class="w-full mb-2 report-table header-table">
                 <tr>
                    <td><strong>Fecha:</strong> ${new Date(inspection.inspectionDate).toLocaleDateString('es-MX')}</td>
                    <td><strong>Odómetro:</strong> ${inspection.odometer}</td>
                    <td><strong>Montacargas N°:</strong> ${inspection.forkliftId}</td>
                 </tr>
                 <tr>
                    <td colspan="2"><strong>Nombre completo del operador:</strong> ${inspection.inspector}</td>
                    <td><strong>Turno de Trabajo:</strong> ${inspection.shift}</td>
                 </tr>
              </table>

              <p class="text-justify p-2 bordered mb-2" style="font-size: 9px;">
                "La revisión del montacargas debe realizarse diariamente antes del inicio del turno por el operador. Durante la revisión, el operador marcará el recuadro de 'Cumple' si la parte revisada está en buen estado y funcionando correctamente, y el recuadro de 'No Cumple' si se detecta un mal funcionamiento o no cumple con los requisitos mínimos para su operación. En caso de marcar 'No Cumple', el operador registrará la falla detectada, avisará al facilitador responsable para generar el aviso de mantenimiento y llevará el montacargas al taller para su reparación."
              </p>

              <div class="flex gap-4">
                <div class="w-1/2">
                  <table class="w-full report-table">
                    ${mainCol1.map(renderRow).join('')}
                  </table>
                </div>
                <div class="w-1/2">
                  <table class="w-full report-table">
                    ${mainCol2.map(renderRow).join('')}
                  </table>
                </div>
              </div>
              
              <div class="flex gap-4 mt-2">
                <div class="w-1/2">
                  <table class="w-full report-table">
                    <thead><tr><th colspan="5" class="text-center">Dispositivos de Seguridad</th></tr></thead>
                    ${securityItems.map(renderSimpleRow).join('')}
                  </table>
                </div>
                <div class="w-1/2">
                  <table class="w-full report-table">
                    <thead><tr><th colspan="5" class="text-center">Inventario de Vidrio y Plástico Rígido</th></tr></thead>
                    ${inventoryItems.map(renderSimpleRow).join('')}
                  </table>
                </div>
              </div>
              
              <div class="mt-4">
                <strong class="block mb-1">Observaciones:</strong>
                <div class="w-full h-24 p-1 bordered">
                  ${ inspection.checklist.filter(i => i.comment).map(i => `<div><strong>${i.label}:</strong> ${i.comment}</div>`).join('')}
                </div>
              </div>

              <div class="mt-8 flex justify-between items-end" style="padding-top: 30px;">
                <div class="w-2/5">
                  ${signatureImage}
                  <hr class="border-black"/>
                  <p class="text-center">Nombre y Firma del OP</p>
                </div>
                <div class="w-2/5">
                  <div style="height: 40px;"></div>
                  <hr class="border-black"/>
                  <p class="text-center">Nombre y Firma del Coordinador en Turno</p>
                </div>
              </div>
            </div>
            `
          }).join('')}
          <footer class="mt-8 text-center no-print">
              <button onclick="window.print()" class="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition-colors">Imprimir Reporte</button>
              <button onclick="window.close()" class="ml-4 px-6 py-2 bg-gray-500 text-white font-bold rounded-lg shadow hover:bg-gray-600 transition-colors">Cerrar</button>
          </footer>
        </body>
        </html>
      `;
      printWindow.document.write(reportHTML);
      printWindow.document.close();
      printWindow.focus();
    }
  }
}