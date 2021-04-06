const express = require('express');
const bodyParser = require("body-parser");
const TronWeb = require('tronweb');

const datos = require('./datos_prueba.json');
const delay = ms => new Promise(res => setTimeout(res, ms));

//console.log(datos);

const app = express();
const port = process.env.PORT || 3003;
const prykey = process.env.APP_PRYKEY || "b5268f1b0cdaf5da97425ea28ab1204225dba4c24c86e45fb8a617b4699aec19";
const red = process.env.APP_RED || "shasta.";
const SC = process.env.APP_CONTRACT || "TYULMzkrw9mfGVVPJdxbP9K7og3Na5ajPv";


const TRONGRID_API = "https://api."+red+"trongrid.io";

console.log("Network: "+TRONGRID_API);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


tronWeb = new TronWeb(
	TRONGRID_API,
	TRONGRID_API,
	TRONGRID_API,
	prykey
);

app.get('/api/ver/consumo',async(req,res) => {

    let cuenta = req.body.cuenta;
		let lectura = req.body.lectura;

    let contract = await tronWeb.contract().at(SC);//direccion del contrato

    let regconsu = await contract.registarConsumo(cuenta, lectura).send();
    await contract.registrarHash(regconsu, cuenta);

    let direccion = await tronWeb.trx.getAccount();
    direccion = direccion.address;
    direccion = tronWeb.address.fromHex(direccion);
		var response = {
			"IsOk": "1",
	    "Message": "",
	    "Data": {
				"ClienteId": cuenta,
				"CantidadKWH": lectura,
				"RegistroBC": "https://"+red+"tronscan.org/#/transaction/"+regconsu
			}
		}
    //console.log("https://shasta.tronscan.org/#/transaction/"+regconsu);
    res.send(response);
});


app.post('/api/registar/consumo',async(req,res) => {

    let cuenta = req.body.cuenta;
		let lectura = req.body.lectura;

    let contract = await tronWeb.contract().at(SC);//direccion del contrato

    let regconsu = await contract.registarConsumo(cuenta, lectura).send();
    await contract.registrarHashOriginal(regconsu, cuenta).send();

    let direccion = await tronWeb.trx.getAccount();
    direccion = direccion.address;
    direccion = tronWeb.address.fromHex(direccion);
		var response = {
			"IsOk": "1",
	    "Message": "",
	    "Data": {
				"ClienteId": cuenta,
				"CantidadKWH": lectura,
				"RegistroBC": "https://"+red+"tronscan.org/#/transaction/"+regconsu
			}
		}
    //console.log("https://shasta.tronscan.org/#/transaction/"+regconsu);
    res.send(response);
});

app.post('/api/registar/cuenta',async(req,res) => {

    let cuenta = req.body.cuenta;

		let direccion = await tronWeb.trx.getAccount();
    direccion = direccion.address;
    direccion = tronWeb.address.fromHex(direccion);

    let contract = await tronWeb.contract().at(SC);//direccion del contrato

    let regconsu = await contract.registarCuenta(cuenta).send();

		var response = {};

		await delay(3000);

		await tronWeb.trx.getTransaction(regconsu)
    .then(value=>{
      console.log(value);

      if (value.ret[0].contractRet === 'SUCCESS') {

				response = {
					"IsOk": "1",
			    "Message": "registro cuenta: "+cuenta+" | desde: "+direccion,
			    "Data": {
						"ClienteId": cuenta,
						"RegistroBC": "https://"+red+"tronscan.org/#/transaction/"+regconsu
					}
				}

        res.send(response);
      }else {
				response = {
					"IsOk": "0",
			    "Message": "No se pudo completar el registro | la cuenta ya está registrada",
			    "Data": {}
				}

        res.send(response);
      }
    })
    .catch(value=>{
      console.log(value);
			response = {
				"IsOk": "0",
				"Message": value,
				"Data": {
					"ClienteId": cuenta,
					"errorRegistroBC": "https://"+red+"tronscan.org/#/transaction/"+regconsu
				}
			}
      res.send(response);
    })

});

app.post('/api/admin/nuevo',async(req,res) => {

    let direccion2 = req.body.direccion;
    let nombre = req.body.nombre;

    let contract = await tronWeb.contract().at(SC);//direccion del contrato

    let regconsu = await contract.registarAdmin(direccion2, nombre).send();

    let direccion = await tronWeb.trx.getAccount();
    direccion = direccion.address;
    direccion = tronWeb.address.fromHex(direccion);
    console.log("https://shasta.tronscan.org/#/transaction/"+regconsu)
    res.send("[OK] = " + "se registro la medida: "+medida+" en la cuenta: "+cuenta+" | desde: "+direccion);
});

app.post('/api/admin/eliminar',async(req,res) => {

    let direccion2 = req.body.direccion;

    let contract = await tronWeb.contract().at(SC);//direccion del contrato

    let regconsu = await contract.quitarAdmin(direccion2).send();

    let direccion = await tronWeb.trx.getAccount();
    direccion = direccion.address;
    direccion = tronWeb.address.fromHex(direccion);
    console.log("https://shasta.tronscan.org/#/transaction/"+regconsu)
    res.send("[OK] = " + "se registro la medida: "+medida+" en la cuenta: "+cuenta+" | desde: "+direccion);
});

app.listen(port, ()=> console.log('Escuchando Puerto: ' + port))
