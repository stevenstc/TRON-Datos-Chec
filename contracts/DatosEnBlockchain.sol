pragma solidity ^0.5.15;

import "./SafeMath.sol";

contract DatosEnBlockchain  {
  using SafeMath for uint;

  struct Lectura {
    uint medida;
    uint tiempoRegistro;
    string hashOriginal;
    string hashDeCambio;
    string comentario;
  }

  struct Cuenta {
    bool registered;
    uint blockeCreacion;
    address autoridad;
    uint ultimaLectura;
    Lectura[] lecturas;
  }

  struct Autoridad {
    bool registered;
    uint blockeCreacion;
    string nombre;
  }

  uint public cuentasActivas;
  uint public certificados;
  uint public kilowatt;
  address public owner;

  mapping (uint => Cuenta) public cuentas;
  mapping (address => Autoridad) public autoridades;

  constructor(string memory _nombre) public {
    owner = msg.sender;
    autoridades[msg.sender].registered = true;
    autoridades[msg.sender].blockeCreacion = block.number;
    autoridades[msg.sender].nombre = _nombre;

  }

  function registarConsumo(uint _cuenta, uint _kWH) public returns(bool) {

    Cuenta storage cuenta = cuentas[_cuenta];
    Autoridad storage autoridad = autoridades[msg.sender];

    require (autoridad.registered);
    require (cuenta.registered);

    cuenta.ultimaLectura = _kWH;
    cuenta.lecturas.push(Lectura(_kWH, block.timestamp, "", "", ""));

    kilowatt += _kWH;
    return (true);

  }

  function setstate() public view returns(uint, uint, uint, address) {

    return (cuentasActivas, certificados, kilowatt, owner);

  }

  function cuentaActiva(uint cuenta) public view returns(bool res, uint nLecturas){

    require (cuentas[cuenta].registered);

    return (true, cuentas[cuenta].lecturas.length);
  }


  function registarCuenta(uint _cuenta) public returns(bool) {

    Cuenta storage cuenta = cuentas[_cuenta];
    Autoridad storage autoridad = autoridades[msg.sender];

    require (autoridad.registered);
    require (!cuenta.registered);

    cuenta.registered = true;
    cuenta.blockeCreacion = block.number;
    cuenta.autoridad = msg.sender;

    cuentasActivas++;

    return true;

  }


  function registrarHashOriginal(string memory _hash, uint _cuenta) public returns(bool) {
    Cuenta storage cuenta = cuentas[_cuenta];
    Autoridad storage autoridad = autoridades[msg.sender];

    require (autoridad.registered);
    require (cuenta.registered);

    cuenta.lecturas[cuenta.lecturas.length-1].hashOriginal = _hash;
    return true;

  }

  function registrarHashCambioMedida(string memory _hash, uint _cuenta) public returns(bool res) {
    Cuenta storage cuenta = cuentas[_cuenta];
    Autoridad storage autoridad = autoridades[msg.sender];

    require (autoridad.registered);
    require (cuenta.registered);

    cuenta.lecturas[cuenta.lecturas.length-1].hashDeCambio = _hash;
    return true;

  }

  function registrarCambioMedida(uint _cuenta, uint _medida) public returns(bool res) {
    Cuenta storage cuenta = cuentas[_cuenta];
    Autoridad storage autoridad = autoridades[msg.sender];

    require (autoridad.registered);
    require (cuenta.registered);

    cuenta.lecturas[cuenta.lecturas.length-1].medida = _medida;
    return true;

  }


  function verConsumo (uint cuenta, uint x) public view returns(uint, uint, uint) {

    require(x <= cuentas[cuenta].lecturas.length);
    require(x > 0);

    x = x-1;
    uint nlecturas = cuentas[cuenta].lecturas.length;
    uint medida =  cuentas[cuenta].lecturas[x].medida;
    uint timestampa =  cuentas[cuenta].lecturas[x].tiempoRegistro;


    return (nlecturas, medida, timestampa);

  }

  function registarAdmin(address direccion, string memory nombre) public returns(bool, address, string memory) {

    require (msg.sender == owner);

    autoridades[direccion].registered = true;
    autoridades[direccion].blockeCreacion = block.number;
    autoridades[direccion].nombre = nombre;

    return (true, direccion, nombre);

  }

  function quitarAdmin(address direccion) public returns(bool, address, uint) {

    require (msg.sender == owner);

    autoridades[direccion].registered = false;
    autoridades[direccion].blockeCreacion = block.number;

    return (true, direccion, block.number);

  }

}
