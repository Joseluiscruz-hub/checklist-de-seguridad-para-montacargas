import { Component, ChangeDetectionStrategy, signal, inject, OnInit, ViewChild, ElementRef, afterNextRender, Injector } from '@angular/core';
import { DbService } from '../../services/db.service';
import { InspectionSession, ChecklistItem } from '../../models/checklist.model';

declare var Chart: any;

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsComponent implements OnInit {
  private dbService = inject(DbService);
  private injector = inject(Injector);

  @ViewChild('passFailChart') passFailChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('commonIssuesChart') commonIssuesChartCanvas!: ElementRef<HTMLCanvasElement>;

  isLoading = signal(true);
  hasData = signal(false);

  private passFailChart: any;
  private commonIssuesChart: any;

  ngOnInit() {
    this.loadStats();
  }

  async loadStats() {
    this.isLoading.set(true);
    const sessions = await this.dbService.getAllSessions();
    if (sessions.length > 0) {
      this.hasData.set(true);
      
      // Use afterNextRender to guarantee the canvas elements are in the DOM before use.
      afterNextRender(() => {
        this.processData(sessions);
      }, { injector: this.injector });

    } else {
      this.hasData.set(false);
    }
    this.isLoading.set(false);
  }

  processData(sessions: InspectionSession[]) {
    let passCount = 0;
    let failCount = 0;
    const issueCounts: { [key: string]: number } = {};

    sessions.forEach(session => {
      session.inspections.forEach(inspection => {
        const hasIssue = inspection.checklist.some(item => item.status === 'issue');
        if (hasIssue) {
          failCount++;
        } else {
          passCount++;
        }
        inspection.checklist.forEach(item => {
          if (item.status === 'issue') {
            issueCounts[item.label] = (issueCounts[item.label] || 0) + 1;
          }
        });
      });
    });

    this.createPassFailChart(passCount, failCount);
    this.createCommonIssuesChart(issueCounts);
  }
  
  createPassFailChart(passCount: number, failCount: number) {
    if (this.passFailChart) this.passFailChart.destroy();
    
    if (!this.passFailChartCanvas?.nativeElement) return;

    this.passFailChart = new Chart(this.passFailChartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['OK', 'Con Incidencias'],
        datasets: [{
          data: [passCount, failCount],
          backgroundColor: ['#10B981', '#EF4444'],
          borderColor: '#ffffff',
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Estado General de Inspección'
          }
        }
      }
    });
  }

  createCommonIssuesChart(issueCounts: { [key: string]: number }) {
    if (this.commonIssuesChart) this.commonIssuesChart.destroy();

    if (!this.commonIssuesChartCanvas?.nativeElement) return;

    const sortedIssues = Object.entries(issueCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
      
    this.commonIssuesChart = new Chart(this.commonIssuesChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: sortedIssues.map(([label]) => label),
        datasets: [{
          label: 'Número de Incidencias',
          data: sortedIssues.map(([, count]) => count),
          backgroundColor: '#3B82F6',
        }]
      },
      options: {
        responsive: true,
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Top 5 Incidencias Comunes'
          }
        }
      }
    });
  }
}
