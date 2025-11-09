import { Component, ChangeDetectionStrategy, output } from '@angular/core';

@Component({
  selector: 'app-manuals-modal',
  templateUrl: './manuals-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManualsModalComponent {
  close = output<void>();

  manuals = [
    { name: 'Manual de Operación de Montacargas', url: '#' },
    { name: 'Procedimiento de Seguridad en Almacén', url: '#' },
    { name: 'Guía de Mantenimiento Preventivo', url: '#' },
    { name: 'Protocolo de Respuesta a Emergencias', url: '#' },
  ];

  onClose() {
    this.close.emit();
  }
}
