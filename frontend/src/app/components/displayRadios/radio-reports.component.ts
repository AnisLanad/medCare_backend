import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RadioReportService } from '../../services/radio-report.service';

@Component({
  selector: 'app-radio-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio-reports.component.html',
  styleUrls: ['./radio-reports.component.css'],
})
export class RadioReportsComponent implements OnInit {
  reports: any[] = [];
  currentIndex: number = 0;
  loading: boolean = true;
  error: string | null = null;

  constructor(private radioReportService: RadioReportService, private http: HttpClient) {}

  ngOnInit(): void {
    this.radioReportService.getReports().subscribe(
      (data) => {
        console.log('Fetched Reports:', data);
        this.reports = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching reports:', error);
        this.error = 'Failed to load reports.';
        this.loading = false;
      }
    );
  }

  nextReport(): void {
    if (this.currentIndex < this.reports.length - 1) {
      this.currentIndex++;
    }
  }

  prevReport(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  downloadReportImage(imagePath: string) {
    if (!imagePath) return;
  
    let url = imagePath.startsWith('http') ? imagePath : `http://localhost:8000${imagePath.startsWith('/media/') ? imagePath : '/media/' + imagePath}`;
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.blob();
      })
      .then(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = imagePath.split('/').pop() || 'report.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch(error => console.error('Error downloading image:', error));
  }
}  
