import React, { Component } from "react";
import { Bar } from 'react-chartjs-2'
import Utils from "../../utils";
import contractAddress from "../Contract";

export default class DatosBlockchain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalInvestors: 0,
      totalInvested: 0,
      totalRefRewards: 0,
      options: {
        title:{
          display: true,
          text:'Mis consumos KW/h',
          fontSize: 25
        },
        legend:{
          display: false,
          position: 'rigth'
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
      data:{}
    };

    this.cambiarDatos = this.cambiarDatos.bind(this);
  }

  componentDidMount() {
    this.cambiarDatos();
  };

  async cambiarDatos() {
    // llamar blockchain aca
    let datos = [209, 222, 167, 164, 79, 177];
    let meses = ['Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre'];
    //console.log(data);
    this.setState({
      data: {
        labels: meses,
        datasets: [
          {
            label: 'Consumo actual',
            data: datos,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }
    });

  };


  render() {
    const {data, options } = this.state;
      return (
        <>
        <div id="pricing" className="section lb">
        <div className="container">

            <div className="row">
                <div className="col-md-12">
                    <div className="tab-content">
                        <div className="tab-pane active fade show" id="tab1">
                            <div className="row text-center">
                                <div className="col-md-4">
                                    <div className="pricing-table pricing-table-highlighted">
                                        <div className="pricing-table-header grd1">
                                            <h2>Consumo actual</h2>
                                            <h3>lectura | 39.857</h3>
                                        </div>
                                        <div className="pricing-table-space"></div>
                                        <div className="pricing-table-features">
                                            <p><i className="fa fa-envelope-o"></i> <strong>170 KW</strong> Este mes</p>
                                            <p><i className="fa fa-rocket"></i> <strong>5,66 KW</strong> cada día</p>
                                            <p><i className="fa fa-life-ring"></i> <strong>0,236 KW</strong> cada hora</p>
                                            <p><i className="fa fa-database"></i> <strong>$73.100</strong> Valor Total</p>
                                        </div>
                                        <div className="pricing-table-sign-up">
                                          <a href="#" className="hover-btn-new"><span>Ver consumo anterior</span></a>
                                          <hr></hr>
                                            <a href="#" className="hover-btn-new"><span>Ver consumo Siguiente</span></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="pricing-table pricing-table-highlighted">
                                        <div className="pricing-table-header grd1">
                                            <h2>Consumo Últimos 6 meses</h2>
                                            <h2>Promedio 170</h2>
                                        </div>
                                        <div className="pricing-table-space"></div>
                                        <div className="pricing-table-features">
                                          <Bar data={data} options={options} />
                                        </div>
                                        <div className="pricing-table-sign-up">
                                            <a href="#" className="hover-btn-new"><span>Actualizar Ahora</span></a>
                                            <hr></hr>
                                            <a href="certificado.html" className="hover-btn-new"><span>Imprimir Certificado</span></a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
    </div>
          
        </>
      )
  }
}
