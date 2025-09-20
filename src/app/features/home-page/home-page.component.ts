import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {PdfService} from '../../core/pdf.service';

@Component({
  selector: 'app-home-page',
  imports: [
    MatButton
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  protected fileToUpload?: File;
  private pdf = inject(PdfService);

  handleFileInput(event: Event) {
    const fileToUpload = (event?.target as HTMLInputElement).files?.item(0);
    if (fileToUpload) {
      this.fileToUpload = fileToUpload;
    }
  }

  sendPdf() {
    console.log(this.fileToUpload);
    this.pdf.uploadPdf(this.fileToUpload!)
  }
}
