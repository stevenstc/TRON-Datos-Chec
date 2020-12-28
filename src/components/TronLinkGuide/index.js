import React from 'react';

import TronLinkLogo from './TronLinkLogo.png';


const WEBSTORE_URL = 'https://chrome.google.com/webstore/detail/ibnejdfjmmkpcnlpebklmnkoeoihofec/';

const logo = (
    <div className='logo col-xs-12 col-md-4 text-center'>
        <img src={ TronLinkLogo } className="img-fluid" alt='TronLink logo' />
    </div>
);

const openTronLink = () => {
    window.open(WEBSTORE_URL, '_blank');
};

const TronLinkGuide = props => {const {installed = false} = props;

    if(!installed) {
        return (
        <div className="container">
            <div className='row mt-4' onClick={ openTronLink }>
                <div className='col-xs-12 col-md-8'>
                    <h1>Se necesita TronLink</h1>
                    <p>
                        Para consultar su medidor debe tener instalado TronLink. TronLink es una billetera TRON para el navegador, puede usarlar <a href={ WEBSTORE_URL } target='_blank' rel='noopener noreferrer'>installed from the Chrome Webstore</a>.
                        una vez instalada, regrese y recarge la pagina.
                    </p>
                </div>
                { logo }
            </div>
        </div>
        );
    }else{

    return (
    <div className="container">
        <div className='row mt-4' onClick={ openTronLink }>
            <div className='col-xs-12 col-md-8'>
                <h1>Inicie Sesión</h1>
                <p>
                    TronLink esta instalado pero no ha iniciado sesion. Abra TronLink en la barra del navegador y configure su primer billetera o restaure una billetera ya creada.
                </p>
            </div>
            { logo }
        </div>
    </div>
    );}
};

export default TronLinkGuide;