import React, { Component } from "react";
import Utils from "../../utils";
import contractAddress from "../Contract";

export default class DatosBlockchain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      
      totalRef: 0,
      invested: 0,
      paidAt: 0,
      lecturas: [],
      url: 'https://pokeapi.co/api/v2/pokemon'


    };

    this.getLecturas = this.getLecturas.bind(this);
    this.isOwner = this.isOwner.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
    
    //setInterval(() => this.isOwner(), 1 * 1000);
  };

  async getLecturas(){
    const { lecturas } = this.state;
    await fetch(this.state.url)
    .then(res => res.json())
    .then(res => {
      
      for (var i = res.results.length - 1; i >= 0; i--) {
        let nombre = res.results[i].name;
        let item = (
            <div className="alert alert alert-success" role="alert">
              <div className="mb-2 text-muted">pokemon: {nombre}</div>
            </div>
        );
        lecturas.splice(0,0,item);
      }


      //console.log(res.results);

    });
  }

  async isOwner() {

    let ownerContrato = await Utils.contract.owner().call();
    ownerContrato = window.tronWeb.address.fromHex(ownerContrato);

    let ownerTronlink = await window.tronWeb.trx.getAccount();
    ownerTronlink = ownerTronlink.address;
    ownerTronlink = window.tronWeb.address.fromHex(ownerTronlink);

    //console.log(ownerContrato);
    //console.log(ownerTronlink);

    if (ownerContrato === ownerTronlink) {
      this.setState({
        isowner: true

      });
    }else{
      this.setState({
        isowner: false

      });
    }
  };

  render() {
    const { isowner, lecturas } = this.state;
    if (true) {
      return (
      <div className="col-lg-5 mb-5">
        <div className="card wow bounceInUp">
          <div className="card-body">
            <h5 className="card-title">Panel Owner</h5>
            
            <h6 className="card-text">
              <button type="button" className="btn btn-light" onClick={() => this.getLecturas()}>obtener api</button><hr></hr>
              
            </h6>
            <div >{lecturas}</div>
          </div>
        </div>
      </div>);
    }else{
      return (
        <>
        <div>
        </div>
        </>
        );

    }
    
  };

}
