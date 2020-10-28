import React, { Component } from "react";
import { Bar } from '@reactchartjs/react-chart.js'
import Utils from "../../utils";
import contractAddress from "../Contract";

  

const rand = () => Math.round(Math.random() * 20 - 10)

const genData = () => ({
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'Scale',
      data: [rand(), rand(), rand(), rand(), rand(), rand()],
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
})

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const Dynamic = () => {
  const [data, setData] = useState(genData())

  useEffect(() => {
    const interval = setInterval(() => setData(genData()), 5000)

    return () => clearInterval(interval)
  }, [])

export default class DatosBlockchain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalInvestors: 0,
      totalInvested: 0,
      totalRefRewards: 0
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
      return (
        <>
          <div className='header'>
            <h1 className='title'>Dynamic Bar Chart</h1>
            <div className='links'>
              <a
                className='btn btn-gh'
                href='https://github.com/jerairrest/react-chartjs-2/blob/react16/example/src/charts/Dynamic.js'
              >
                Github Source
              </a>
            </div>
          </div>
          <Bar data={data} options={options} />
        </>
      )
    }
  }
}
