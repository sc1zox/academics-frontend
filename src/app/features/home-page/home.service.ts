import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private http = inject(HttpClient);

  public uploadPdf(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    this.http.post('pdf/upload', formData).subscribe(res => console.log(res));
  }

}
