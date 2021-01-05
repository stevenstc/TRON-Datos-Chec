const express = require('express');
const bodyParser = require("body-parser");
const TronWeb = require('tronweb');


const app = express();
const port = process.env.PORT || 3003;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const TRONGRID_API = "https://api.shasta.trongrid.io";

tronWeb = new TronWeb(
	TRONGRID_API,
	TRONGRID_API,
	TRONGRID_API,
	"b5268f1b0cdaf5da97425ea28ab1204225dba4c24c86e45fb8a617b4699aec19"//Clave privada
);


app.post('/api/registar/consumo',async(req,res) => {

    let cuenta = req.body.cuenta;
    let medida = req.body.medida;

    let contract = await tronWeb.contract().at("TYGjdahV9MAcvdJWAFPhoyJBZW63JQCJYn");//direccion del contrato

    let regconsu = await contract.registarConsumo(cuenta, medida).send();
    await contract.registrarHash(regconsu, cuenta);

    let direccion = await tronWeb.trx.getAccount();
    direccion = direccion.address;
    direccion = tronWeb.address.fromHex(direccion);
    console.log("https://shasta.tronscan.org/#/transaction/"+regconsu)
    res.send("[OK] = " + "se registro la medida: "+medida+" en la cuenta: "+cuenta+" | desde: "+direccion);
});

app.post('/api/registar/cuenta',async(req,res) => {

    let cuenta = req.body.cuenta;
    let contador = req.body.contador;

    let contract = await tronWeb.contract().at("TYGjdahV9MAcvdJWAFPhoyJBZW63JQCJYn");//direccion del contrato

    let regconsu = await contract.registarCuenta(cuenta, contador).send();

    let direccion = await tronWeb.trx.getAccount();
    direccion = direccion.address;
    direccion = tronWeb.address.fromHex(direccion);
    console.log("https://shasta.tronscan.org/#/transaction/"+regconsu)
    res.send("[OK] = " + "se registro la medida: "+medida+" en la cuenta: "+cuenta+" | desde: "+direccion);
});

app.post('/api/admin/nuevo',async(req,res) => {

    let direccion2 = req.body.direccion;
    let nombre = req.body.nombre;

    let contract = await tronWeb.contract().at("TYGjdahV9MAcvdJWAFPhoyJBZW63JQCJYn");//direccion del contrato

    let regconsu = await contract.registarAdmin(direccion2, nombre).send();

    let direccion = await tronWeb.trx.getAccount();
    direccion = direccion.address;
    direccion = tronWeb.address.fromHex(direccion);
    console.log("https://shasta.tronscan.org/#/transaction/"+regconsu)
    res.send("[OK] = " + "se registro la medida: "+medida+" en la cuenta: "+cuenta+" | desde: "+direccion);
});

app.post('/api/admin/eliminar',async(req,res) => {

    let direccion2 = req.body.direccion;

    let contract = await tronWeb.contract().at("TYGjdahV9MAcvdJWAFPhoyJBZW63JQCJYn");//direccion del contrato

    let regconsu = await contract.quitarAdmin(direccion2).send();

    let direccion = await tronWeb.trx.getAccount();
    direccion = direccion.address;
    direccion = tronWeb.address.fromHex(direccion);
    console.log("https://shasta.tronscan.org/#/transaction/"+regconsu)
    res.send("[OK] = " + "se registro la medida: "+medida+" en la cuenta: "+cuenta+" | desde: "+direccion);
});

app.listen(port, ()=> console.log('Escuchando Puerto: ' + port))