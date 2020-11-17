import React, { Component } from "react";
import Utils from "../../utils";

import contractAddress from "../Contract";

export default class DatosBlockchain extends Component {
  constructor(props) {
    super(props);

    this.consulta = this.consulta.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
  };


  async consulta() {

    

    let cuenta = document.getElementById("cuenta").value;
    let x = 1;

    let cosas = Utils.contract.verConsumo(cuenta, x).call();
  
    console.log(cosas);
    
    
  };

  render() {
    
    return (

      <>
      
      <div id="domain" className="section wb">
        <div className="container">
            <div className="row text-center">

                <div className="col-lg-12">
                    <form className="checkdomain form-inline">
                        <div className="checkdomain-wrapper">
                            <div className="form-group">
                            <h1>Escriba su número de cuenta para consultar</h1>
                                <label className="sr-only" for="domainnamehere">Número de cuenta</label>
                                <input type="text" className="form-control" id="cuenta" placeholder="123456789"></input>
                                <button type="button" className="btn btn-primary grd1" onClick={() => this.consulta()}><i className="fa fa-search"></i></button>
                            </div>
                            
                        </div>
                    </form>
                </div>

                <div className="col-lg-12">
                    <div className="customwidget text-center">
                        <p>Una base de datos centralizados puede ser atacada facilmente.</p>
                        <p>La tecnologia BlockChain consta de varias copias de la misma base de datos, distribuidas al rededor del mundo, donde solo los administradores pueden realizar cambios, todos y cada uno de los movimientos queda registrado dentro le la blochchain y disponibles para audotoria publica o privada.</p>
                        <ul className="list-inline">
                            <li><i className="fa fa-check"></i> Disponibilidad 24/7 de la información</li>
                            <li><i className="fa fa-check"></i> Alta escalabilidad para manejo de Datos</li>
                        </ul>
                    </div>
                </div>
        
                
            </div>
        </div>
    </div>


</>
        



    );
  }
}
