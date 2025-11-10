import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  /**
   * Comprime una imagen en base64
   * @param base64Image - Imagen en formato base64
   * @param maxWidth - Ancho máximo en píxeles (default: 800)
   * @param maxHeight - Alto máximo en píxeles (default: 600)
   * @param quality - Calidad de compresión 0-1 (default: 0.7)
   * @returns Promise con la imagen comprimida en base64
   */
  async compressImage(
    base64Image: string,
    maxWidth: number = 800,
    maxHeight: number = 600,
    quality: number = 0.7
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        // Calcular nuevas dimensiones manteniendo aspect ratio
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        // Crear canvas y dibujar imagen redimensionada
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject('No se pudo obtener el contexto del canvas');
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convertir a base64 comprimido
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };

      img.onerror = () => {
        reject('Error al cargar la imagen');
      };

      img.src = base64Image;
    });
  }

  /**
   * Obtiene el tamaño de una imagen base64 en KB
   */
  getImageSizeInKB(base64Image: string): number {
    const base64Length = base64Image.length - (base64Image.indexOf(',') + 1);
    const padding = base64Image.endsWith('==') ? 2 : base64Image.endsWith('=') ? 1 : 0;
    const sizeInBytes = (base64Length * 3) / 4 - padding;
    return sizeInBytes / 1024;
  }

  /**
   * Valida que una imagen no exceda el tamaño máximo
   */
  validateImageSize(base64Image: string, maxSizeKB: number = 2048): boolean {
    return this.getImageSizeInKB(base64Image) <= maxSizeKB;
  }
}
