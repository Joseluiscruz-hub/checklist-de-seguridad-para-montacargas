import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;

  get buttonClasses(): string[] {
    const baseClasses = [
      'font-bold',
      'py-2',
      'px-4',
      'rounded-lg',
      'shadow-md',
      'transition-colors',
      'flex',
      'items-center',
      'justify-center',
      'gap-2'
    ];

    const variantClasses = {
      primary: [
        'bg-primary',
        'text-white',
        'hover:bg-primary-600'
      ],
      secondary: [
        'bg-white',
        'text-primary',
        'border-2',
        'border-primary',
        'hover:bg-red-50'
      ],
      danger: [
        'bg-red-500',
        'text-white',
        'hover:bg-red-600'
      ]
    };

    const disabledClasses = this.disabled || this.loading ? ['opacity-50', 'cursor-not-allowed'] : [];

    return [...baseClasses, ...variantClasses[this.variant], ...disabledClasses];
  }
}
