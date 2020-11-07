import React, { Component } from "react";
import Utils from "../../utils";

import contractAddress from "../Contract";

export default class DatosBlockchain extends Component {
  constructor(props) {
    super(props);

    this.deposit = this.deposit.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
  };


  async deposit() {

    var loc = document.location.href;
    if(loc.indexOf('?')>0){
        var getString = loc.split('?')[1];
        var GET = getString.split('&');
        var get = {};
        for(var i = 0, l = GET.length; i < l; i++){
            var tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
        if (get['capital']) {
          document.getElementById('tarifa').value = 1;
          document.getElementById('sponsor').value = 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb';
        }else{
          if (get['ref'].length === 34) {
            document.getElementById('tarifa').value = 0;
            document.getElementById('sponsor').value = get['ref'];            
          }else{
            document.getElementById('tarifa').value = 0;
             document.getElementById('sponsor').value = 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb';
          }
        }
        
    }else{
        document.getElementById('tarifa').value = 0;
        document.getElementById('sponsor').value = 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb'; 
    }

    let amount = document.getElementById("amount").value;
    let sponsor = document.getElementById("sponsor").value;
    let tarifa = document.getElementById("tarifa").value;

    document.getElementById("amount").value = "";
  
    return Utils.contract.deposit(tarifa, sponsor).send({
      shouldPollResponse: true,
      callValue: amount * 1000000 // converted to SUN
    });
    
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
                                <input type="text" className="form-control" id="domainnamehere" placeholder="123456789"></input>
                                <button type="submit" className="btn btn-primary grd1"><i className="fa fa-search"></i></button>
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
