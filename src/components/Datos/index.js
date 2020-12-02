import React, { Component } from "react";
import Utils from "../../utils";
import contractAddress from "../Contract";

export default class DatosBlockchain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kwproducidos: 0,
      contadoresactivos: 0,
      certificados: 0
    };

    this.estado = this.estado.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
    setInterval(() => this.estado(),1000);
  };

  async estado() {

    let esto = await Utils.contract.setstate().call();
    //console.log(esto);
    
    this.setState({
      kwproducidos: parseInt(esto[2]._hex),
      contadoresactivos: parseInt(esto[0]._hex),
      certificados: parseInt(esto[1]._hex)

    });

  };

  render() {
    const { kwproducidos, contadoresactivos, certificados } = this.state;

    return (
      <div className="section cl">
        <div className="container">
          <div className="row text-left stat-wrap">
            <div className="col-md-4 col-sm-4 col-xs-12">
              <span data-scroll className="global-radius icon_wrap effect-1 alignleft"><i className="flaticon-hosting"></i></span>
              <p className="stat_count">{kwproducidos}</p>
              <h3>KW Producidos</h3>
            </div>

            <div className="col-md-4 col-sm-4 col-xs-12">
              <span data-scroll className="global-radius icon_wrap effect-1 alignleft"><i className="flaticon-domain-registration"></i></span>
              <p className="stat_count">{contadoresactivos}</p>
              <h3>Contadores Activos</h3>
            </div>

            <div className="col-md-4 col-sm-4 col-xs-12">
              <span data-scroll className="global-radius icon_wrap effect-1 alignleft"><i className="flaticon-mail"></i></span>
              <p className="stat_count">{certificados}</p>
              <h3>Certificados emitidos</h3>
            </div>
          </div>
        </div>
      </div>



    );
  }
}
