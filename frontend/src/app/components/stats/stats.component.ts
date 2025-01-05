// test-results.component.ts
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-test-results',
  standalone: true,
  template: `
    <div class="container mx-auto p-4">
      <div class="mb-8">
        <h2 class="text-xl font-bold mb-4">Résultats des tests d'analyse</h2>
        <canvas id="singleBarChart"></canvas>
      </div>

      <div>
        <h2 class="text-xl font-bold mb-4">Comparaison des bilans d'analyses</h2>
        <canvas id="stackedBarChart"></canvas>
      </div>
    </div>
  `
})
export class TestResultsComponent implements OnInit {
  ngOnInit() {
    this.createSingleBarChart();
    this.createStackedBarChart();
  }

  createSingleBarChart() {
    const data = {
      labels: ['Cholestérol', 'Fer', 'Hypertension'],
      datasets: [{
        data: [180, 80, 130],
        backgroundColor: 'rgba(135, 206, 235, 0.8)',
        borderColor: 'rgba(135, 206, 235, 1)',
        borderWidth: 1
      }]
    };

    new Chart('singleBarChart', {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createStackedBarChart() {
    const data = {
      labels: ['Cholestérol', 'Fer', 'Hypertension'],
      datasets: [
        {
          label: 'Bilan avant traitement',
          data: [180, 80, 130],
          backgroundColor: 'rgba(135, 206, 235, 0.8)',
          borderColor: 'rgba(135, 206, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Bilan après traitement',
          data: [150, 75, 120],
          backgroundColor: 'rgba(255, 160, 160, 0.8)',
          borderColor: 'rgba(255, 160, 160, 1)',
          borderWidth: 1
        }
      ]
    };

    new Chart('stackedBarChart', {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            stacked: false
          },
          x: {
            stacked: false
          }
        }
      }
    });
  }
}
