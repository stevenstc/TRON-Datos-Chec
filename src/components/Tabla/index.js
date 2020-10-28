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
          <Bar data={data} options={options} />
          <button type="button" className="btn btn-info" onClick={() => this.cambiarDatos()}>Actualizar datos</button>
        </>
      )
  }
}
