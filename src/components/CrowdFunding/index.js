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
                                <label className="sr-only" for="domainnamehere">Número de cuenta</label>
                                <input type="text" className="form-control" id="domainnamehere" placeholder="Ingrese su numero de cuenta aquí.."></input>
                                <button type="submit" className="btn btn-primary grd1"><i className="fa fa-search"></i></button>
                            </div>
                            
                        </div>
                    </form>
                </div>
        <div className="col-lg-12">
                    <div className="customwidget text-center">
                        <h1>Find Your Domain</h1>
                        <p>With our awesome domain name search form, you can search any domain names with tons of extensions.</p>
            <p>Pursuing high quality standards, my greatest efforts are focused on producing semantic, SEO-friendly, valid and clean code. In order to stay effective and relevant in this constantly evolving sphere I always try to be in touch with the latest news and recent approaches in programming.</p>
                        <ul className="list-inline">
                            <li><i className="fa fa-check"></i> 20k Domains Sold in 2017</li>
                            <li><i className="fa fa-check"></i> 4k Website Created</li>
                        </ul>
                        
                        <a href="#" className="hover-btn-new"><span>Hosting Packages</span></a>
                    </div>
                </div>
        
                
            </div>
        </div>
    </div>


</>
        



    );
  }
}
