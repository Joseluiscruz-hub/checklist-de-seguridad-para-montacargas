import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  async uploadPhoto(photo: File): Promise<string> {
    const formData = new FormData();
    formData.append('photo', photo);

    const { imageUrl } = await firstValueFrom(
      this.http.post<{ imageUrl: string }>(`${this.apiUrl}/upload-image`, formData)
    );
    return imageUrl;
  }
}
