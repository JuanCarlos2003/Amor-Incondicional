import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-admin-char',
  templateUrl: './admin-char.component.html',
  styleUrls: ['./admin-char.component.css'],
  standalone: true,
})
export class AdminCharComponent implements OnInit {
  chart: any;
  fontFamily = '"Lato", sans-serif'; 

  constructor(private http: HttpClient) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.cargarDatosGrafico(); 
  }

  cargarDatosGrafico() {
    this.http.get<{ [key: string]: number }>('http://localhost:3000/citas/countPorDia').subscribe(data => {
      const datosConsolidados = this.consultarYOrdenarDatos(data); 
      const etiquetas = Object.keys(datosConsolidados);
      const valores = Object.values(datosConsolidados);

      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: etiquetas,
          datasets: [
            {
              label: 'Número de citas por día',
              data: valores,
              backgroundColor: this.obtenerColoresGradiente(valores.length), 
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Estadísticas de citas por día',
              font: {
                size: 22,
                weight: 'bold',
                family: this.fontFamily 
              },
              padding: 20
            },
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                font: {
                  size: 14,
                  family: this.fontFamily 
                },
                boxWidth: 12,
                padding: 20
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Fechas',
                font: {
                  size: 16,
                  weight: 'bold',
                  family: this.fontFamily 
                }
              },
              ticks: {
                font: {
                  size: 12,
                  family: this.fontFamily 
                }
              }
            },
            y: {
              beginAtZero: true, 
              title: {
                display: true,
                text: 'Número de citas',
                font: {
                  size: 16,
                  weight: 'bold',
                  family: this.fontFamily 
                }
              },
              ticks: {
                font: {
                  size: 12,
                  family: this.fontFamily 
                },
                precision: 0
              }
            }
          },
          animation: {
            duration: 1500,
            easing: 'easeOutQuart' 
          },
          layout: {
            padding: {
              top: 50,
              right: 50,
              bottom: 50,
              left: 50
            }
          },
          elements: {
            bar: {
              borderRadius: 10,
              borderSkipped: 'bottom'
            }
          }
        }
      });
    });
  }

  consultarYOrdenarDatos(data: { [key: string]: number }): { [key: string]: number } {
    const datosConsolidados: { [key: string]: number } = {};
    Object.keys(data).forEach(date => {
      const fechaFormateada = this.formatoFecha(new Date(date));
      if (datosConsolidados[fechaFormateada]) {
        datosConsolidados[fechaFormateada] += data[date];
      } else {
        datosConsolidados[fechaFormateada] = data[date];
      }
    });

    // Convertir a array para ordenar, luego devolver a objeto
    const entradasOrdenadas = Object.entries(datosConsolidados).sort((a, b) => {
      return this.formatoFechaOrdenable(a[0]) - this.formatoFechaOrdenable(b[0]);
    });

    return Object.fromEntries(entradasOrdenadas);
  }

  formatoFecha(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear().toString();
    return `${dia}/${mes}/${año}`;
  }

  formatoFechaOrdenable(fechaString: string): number {
    const [dia, mes, año] = fechaString.split('/');
    return new Date(`${año}-${mes}-${dia}`).getTime();
  }

  obtenerColoresGradiente(cantidad: number): CanvasGradient | string {
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) {
      return 'rgba(54, 162, 235, 0.8)';
    }

    const gradiente = ctx.createLinearGradient(0, 0, 0, 400);
    gradiente.addColorStop(0, 'rgba(54, 162, 235, 0.8)');
    gradiente.addColorStop(1, 'rgba(75, 192, 192, 0.8)');
    return gradiente;
  }
}

