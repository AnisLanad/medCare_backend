import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { LabReportService } from '../../services/lab-report.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

// Register Chart.js modules
Chart.register(...registerables);

@Component({
  selector: 'app-lab-reports',
  standalone: true,
  templateUrl: './lab-reports.component.html',
  styleUrls: ['./lab-reports.component.css'],
  imports: [CommonModule],
})
export class LabReportsComponent implements OnInit, AfterViewInit {
  reports: any[] = [];
  currentIndex: number = 0;
  loading: boolean = true;
  error: string | null = null;
  chart: Chart | null = null;

  @ViewChild('labReportChart') chartRef!: ElementRef<HTMLCanvasElement>;

  constructor(private labReportService: LabReportService, private http: HttpClient) {}

  ngOnInit(): void {
    this.labReportService.getReports().subscribe(
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

  ngAfterViewInit(): void {
    // Wait for the view to initialize before creating the chart
    setTimeout(() => {
      if (this.reports.length > 0 && this.reports[this.currentIndex]?.generate_graph) {
        this.createChart();
      }
    });
  }

  createChart(): void {
    if (!this.chartRef?.nativeElement) {
      console.warn('Chart canvas not found!');
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    const currentReport = this.reports[this.currentIndex];
    if (!currentReport?.generate_graph) return;

    const labels = ['Blood Pressure', 'Blood Sugar', 'Cholesterol', 'Na', 'Hemoglobine', 'Iron'];
    const data = [
      currentReport.blood_pressure,
      currentReport.blood_sugar,
      currentReport.cholesterol,
      currentReport.Na,
      currentReport.hemoglobine,
      currentReport.iron,
    ];

    const nonNullLabels = labels.filter((_, index) => data[index] !== null);
    const nonNullData = data.filter((value) => value !== null);

    if (nonNullData.length === 0) return;

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: nonNullLabels,
        datasets: [
          {
            label: 'Lab Report Values',
            data: nonNullData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  nextReport(): void {
    if (this.currentIndex < this.reports.length - 1) {
      this.currentIndex++;
      setTimeout(() => this.createChart(), 0);
    }
  }

  prevReport(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      setTimeout(() => this.createChart(), 0);
    }
  }

  goToReport(index: number): void {
    this.currentIndex = index;
    setTimeout(() => this.createChart(), 0);
  }

  getPaginationRange(): number[] {
    return Array.from({ length: this.reports.length }, (_, i) => i);
  }
}
