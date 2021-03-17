import React, { Component } from "react";
import { Bar } from 'react-chartjs-2'
import Utils from "../../utils";
import contractAddress from "../Contract";

export default class DatosBlockchain extends Component {
  constructor(props) {
    super(props);

    this.consulta = this.consulta.bind(this);
    this.nuevaConsulta = this.nuevaConsulta.bind(this);

    this.state = {
      consulta: false,
      certificado: "certificado.html",
      totalInvestors: 0,
      cuenta: 0,
      Meses:{},
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
    this.irCertificado = this.irCertificado.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress); 

  };

  async irCertificado() {

    const {cuenta } = this.state;

    //datos BC
    var direccion = await window.tronWeb.trx.getAccount();

    if (await window.tronWeb.trx.getAccount()) {
      direccion = window.tronWeb.address.fromHex(direccion.address);
      direccion = "&direccion="+direccion;

      var cargo ="";

      if (true) {
        cargo = "Admin";
        cargo = "&cargo="+cargo;
      }else{
        cargo = "";
      }

      
    }else{
      direccion = "";
      cargo = "";
    }

    var consumo = "";

    if (true) {
      consumo = 1270;
      consumo = "&consumo="+consumo;
    }else{
      consumo = "";
    }

    if (true) {

      var meses = {
        0:"Octubre"+"."+"177"+"."+"185378001",
        1:"Septiembre"+"."+"79"+"."+"185378002",
        2:"Agosto"+"."+"164"+"."+"185378003",
        3:"Julio"+"."+"167"+"."+"185378004",
        4:"Junio"+"."+"222"+"."+"185378005",
        5:"Mayo"+"."+"209"+"."+"185378006",
        6:"Abril"+"."+"201"+"."+"185378007",
        7:"Marzo"+"."+"180"+"."+"185378008",
        8:"Febrero"+"."+"234"+"."+"185378009",
        9:"Enero"+"."+"184"+"."+"185378010",
        10:"Diciembre"+"."+"269"+"."+"185378011",
        11:"Noviembre"+"."+"149"+"."+"185378012"

      };

    }else{

    }

    

    this.setState({
      Meses:  meses
    });

    var cert = "certificado.html?cuenta="+cuenta+direccion+cargo+consumo+"&mes1="+meses[0]+"&mes2="+meses[1]+"&mes3="+meses[2]+"&mes4="+meses[3]+"&mes5="+meses[4]+"&mes6="+meses[5]+"&mes7="+meses[6]+"&mes8="+meses[7]+"&mes9="+meses[8]+"&mes10="+meses[9]+"&mes11="+meses[10]+"&mes12="+meses[11];
    this.setState({
      certificado: cert
    });
  };

  async cambiarDatos() {
    // llamar blockchain aca
    await this.irCertificado();
    const {Meses} = this.state;    

    var mes = Meses;
    var mes1 = mes[0].split('.');
    var mes2 = mes[1].split('.');
    var mes3 = mes[2].split('.');
    var mes4 = mes[3].split('.');
    var mes5 = mes[4].split('.');
    var mes6 = mes[5].split('.');

    let datos = [mes6[1], mes5[1], mes4[1], mes3[1], mes2[1], mes1[1]];
    let meses = [mes6[0], mes5[0], mes4[0], mes3[0], mes2[0], mes1[0]];
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

  async consulta() {

    var cuenta = document.getElementById("cuenta").value;

    var activa = false;

    activa = await Utils.contract.cuentaActiva(cuenta).call();
    console.log(activa);
    activa = activa.res;
    
    //comprobaciones 
    if (cuenta >= 1 && activa) {
      this.setState({
        consulta: true,
        cuenta: cuenta
      });

      await this.cambiarDatos();
      await this.irCertificado();
    }
    

    //let x = 1;
    //let cosas = Utils.contract.verConsumo(cuenta, x).call();
  
    //console.log(cosas);


    
  };

  async nuevaConsulta() {
    this.setState({
      consulta: false,
      cuenta: 0
    });
  };

  render() {
    const {data, options, certificado, consulta, cuenta } = this.state;

    if(consulta) {
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
                                          <hr></hr>
                                            <a href="#pricing" onClick={() => this.cambiarDatos()} className="hover-btn-new"><span>Actualizar Datos</span></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="pricing-table pricing-table-highlighted">
                                        <div className="pricing-table-header grd1">
                                            <h2>Cuenta N°: <b>{cuenta}</b></h2>
                                            <h2>Promedio Últimos 6 meses: <b>170</b></h2>
                                        </div>
                                        <div className="pricing-table-space"></div>
                                        <div className="pricing-table-features">
                                          <Bar data={data} options={options} />
                                        </div>
                                        <div className="pricing-table-sign-up">
                                            <a href={certificado}  onClick={() => this.irCertificado()} className="hover-btn-new"><span>Ver Certificado</span></a>&nbsp;
                                            <a href="#domain" onClick={() => this.nuevaConsulta()} className="hover-btn-new"><span>Nueva Consulta</span></a>
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
    }else{
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
        



      );;
    }
  }
}
