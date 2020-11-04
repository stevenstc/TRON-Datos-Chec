import React, { Component } from "react";
import Utils from "../../utils";
import contractAddress from "../Contract";

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
    const { totalInvestors, totalInvested, totalRefRewards } = this.state;

    return (
      <div className="section cl">
        <div className="container">
          <div className="row text-left stat-wrap">
            <div className="col-md-4 col-sm-4 col-xs-12">
              <span data-scroll className="global-radius icon_wrap effect-1 alignleft"><i className="flaticon-hosting"></i></span>
              <p className="stat_count">12000</p>
              <h3>KW Producidos</h3>
            </div>

            <div className="col-md-4 col-sm-4 col-xs-12">
              <span data-scroll className="global-radius icon_wrap effect-1 alignleft"><i className="flaticon-domain-registration"></i></span>
              <p className="stat_count">24000</p>
              <h3>Contadores Activados</h3>
            </div>

            <div className="col-md-4 col-sm-4 col-xs-12">
              <span data-scroll className="global-radius icon_wrap effect-1 alignleft"><i className="flaticon-mail"></i></span>
              <p className="stat_count">5000</p>
              <h3>Registros</h3>
            </div>
          </div>
        </div>
      </div>



    );
  }
}
