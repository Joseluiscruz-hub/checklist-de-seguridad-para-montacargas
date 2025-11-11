import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  /**
   * Valida que el odómetro sea un número válido
   */
  validateOdometer(value: string): { valid: boolean; error?: string } {
    if (!value || value.trim() === '') {
      return { valid: false, error: 'El odómetro es requerido' };
    }

    const num = parseInt(value.trim(), 10);

    if (isNaN(num)) {
      return { valid: false, error: 'El odómetro debe ser un número' };
    }

    if (num < 0) {
      return { valid: false, error: 'El odómetro no puede ser negativo' };
    }

    if (num > 999999) {
      return { valid: false, error: 'El odómetro no puede exceder 999,999' };
    }

    return { valid: true };
  }

  /**
   * Valida que un campo de texto no esté vacío
   */
  validateRequired(value: string, fieldName: string): { valid: boolean; error?: string } {
    if (!value || value.trim() === '') {
      return { valid: false, error: `${fieldName} es requerido` };
    }
    return { valid: true };
  }

  /**
   * Valida que una firma esté presente
   */
  validateSignature(signature: string | null | undefined): { valid: boolean; error?: string } {
    if (!signature || signature.trim() === '') {
      return { valid: false, error: 'La firma es requerida' };
    }
    return { valid: true };
  }

  /**
   * Valida que al menos un campo del checklist tenga un valor distinto de 'pending'
   */
  validateChecklistCompleted(checklist: { status: string }[]): { valid: boolean; error?: string } {
    const hasCompleted = checklist.some(item => item.status !== 'pending');
    if (!hasCompleted) {
      return { valid: false, error: 'Debe completar al menos un ítem del checklist' };
    }
    return { valid: true };
  }

  /**
   * Valida longitud mínima y máxima de texto
   */
  validateTextLength(
    value: string,
    minLength: number = 0,
    maxLength: number = 500
  ): { valid: boolean; error?: string } {
    const length = value.trim().length;

    if (length < minLength) {
      return { valid: false, error: `Debe tener al menos ${minLength} caracteres` };
    }

    if (length > maxLength) {
      return { valid: false, error: `No puede exceder ${maxLength} caracteres` };
    }

    return { valid: true };
  }
}
