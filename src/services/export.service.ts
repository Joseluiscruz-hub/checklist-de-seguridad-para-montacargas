import { Injectable } from '@angular/core';
import { InspectionSession, Inspection } from '../models/checklist.model';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  /**
   * Exporta las sesiones de inspección a formato CSV
   */
  exportToCSV(sessions: InspectionSession[]): void {
    if (sessions.length === 0) {
      alert('No hay datos para exportar');
      return;
    }

    // Crear encabezados
    const headers = [
      'Fecha Sesión',
      'Montacarga',
      'Modelo',
      'Inspector',
      'Turno',
      'Cuadrilla',
      'Ubicación',
      'Odómetro',
      'Estado General',
      'Total Ítems',
      'Ítems OK',
      'Ítems con Incidencia',
      'Ítems Pendientes',
      'Problemas Encontrados',
    ];

    const rows: string[][] = [headers];

    // Procesar cada sesión
    sessions.forEach(session => {
      session.inspections.forEach(inspection => {
        const okCount = inspection.checklist.filter(item => item.status === 'ok').length;
        const issueCount = inspection.checklist.filter(item => item.status === 'issue').length;
        const pendingCount = inspection.checklist.filter(item => item.status === 'pending').length;
        const totalCount = inspection.checklist.length;

        const issues = inspection.checklist
          .filter(item => item.status === 'issue')
          .map(item => `${item.label}${item.comment ? ': ' + item.comment : ''}`)
          .join('; ');

        const status = issueCount > 0 ? 'Con Incidencias' : 'OK';

        const row = [
          new Date(session.id).toLocaleString('es-MX'),
          inspection.forkliftName,
          inspection.forkliftId,
          inspection.inspector,
          this.getShiftName(inspection.shift),
          inspection.crew,
          inspection.location,
          inspection.odometer,
          status,
          totalCount.toString(),
          okCount.toString(),
          issueCount.toString(),
          pendingCount.toString(),
          issues || 'Ninguno',
        ];

        rows.push(row);
      });
    });

    // Convertir a CSV
    const csvContent = rows
      .map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
      .join('\n');

    // Descargar archivo
    this.downloadFile(csvContent, 'inspecciones_montacargas.csv', 'text/csv;charset=utf-8;');
  }

  /**
   * Exporta un resumen de estadísticas a CSV
   */
  exportStatsToCSV(sessions: InspectionSession[]): void {
    if (sessions.length === 0) {
      alert('No hay datos para exportar');
      return;
    }

    const stats: { [key: string]: { total: number; ok: number; issues: number } } = {};

    // Agrupar por montacarga
    sessions.forEach(session => {
      session.inspections.forEach(inspection => {
        if (!stats[inspection.forkliftName]) {
          stats[inspection.forkliftName] = { total: 0, ok: 0, issues: 0 };
        }

        stats[inspection.forkliftName].total++;
        
        const hasIssues = inspection.checklist.some(item => item.status === 'issue');
        if (hasIssues) {
          stats[inspection.forkliftName].issues++;
        } else {
          stats[inspection.forkliftName].ok++;
        }
      });
    });

    // Crear CSV
    const headers = ['Montacarga', 'Total Inspecciones', 'OK', 'Con Incidencias', '% Aprobación'];
    const rows: string[][] = [headers];

    Object.entries(stats).forEach(([forklift, data]) => {
      const approvalRate = ((data.ok / data.total) * 100).toFixed(1);
      rows.push([
        forklift,
        data.total.toString(),
        data.ok.toString(),
        data.issues.toString(),
        `${approvalRate}%`,
      ]);
    });

    const csvContent = rows
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    this.downloadFile(csvContent, 'estadisticas_montacargas.csv', 'text/csv;charset=utf-8;');
  }

  /**
   * Descarga un archivo
   */
  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob(['\ufeff' + content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  /**
   * Obtiene el nombre del turno
   */
  private getShiftName(shift: string): string {
    const shifts: { [key: string]: string } = {
      '1': 'Matutino (06:00 - 14:00)',
      '2': 'Vespertino (14:00 - 22:00)',
      '3': 'Nocturno (22:00 - 06:00)',
    };
    return shifts[shift] || shift;
  }
}
