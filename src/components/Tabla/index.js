import React, { Component } from "react";
import { Bar } from '@reactchartjs/react-chart.js'
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
      data:{
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'Scale',
      data: [1, 2, 3, 4, 5, 6],
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
    };

    this.totalInvestors = this.totalInvestors.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
    setInterval(() => this.totalInvestors(),1000);
  };

  async totalInvestors() {

    let esto = await Utils.contract.setstate().call();
    //console.log(esto);
    this.setState({
      totalInvestors: parseInt(esto.Investors._hex),
      totalInvested: parseInt(esto.Invested._hex)/1000000,
      totalRefRewards: parseInt(esto.RefRewards._hex)/1000000

    });

  };


  render() {
    const {data, options } = this.state;
      return (
        <>
          <Bar data={data} options={options} />
        </>
      )
  }
}
