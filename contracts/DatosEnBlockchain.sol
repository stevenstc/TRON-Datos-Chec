pragma solidity ^0.5.14;

import "./SafeMath.sol";

contract DatosEnBlockchain  {
  using SafeMath for uint;
  
  struct Lectura {
    uint medida;
    uint block; //primero guarda el bloque 
    string hash;
    uint timestampa; // el tiempo en que se hace el registro
  }
  
  struct Cuenta {
    bool registered;
    uint contador;
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

  event Consumo(uint medida, uint blocke, uint tiempo);
  event NuevoAdmin(address medida, uint blocke, uint tiempo);
  event AdminRemovido(address medida, uint blocke, uint tiempo);
  event NuevaCuenta(uint cuenta,uint blocke,address autoridad);

  constructor(string memory _nombre) public {
    owner = msg.sender;
    autoridades[msg.sender].registered = true;
    autoridades[msg.sender].blockeCreacion = block.number;
    autoridades[msg.sender].nombre = _nombre;

  }

  function setstate() public view returns(uint, uint, uint, address) {
    
    return (cuentasActivas, certificados, kilowatt, owner);
    
  }

  function cuentaActiva(uint cuenta) public view returns(bool res, uint nLecturas){

    require (cuentas[cuenta].registered);
    
    return (true, cuentas[cuenta].lecturas.length);
  }
  

  function registarCuenta(uint cuenta, uint contador) public returns(bool) {
    
    require (autoridades[msg.sender].registered);
    require (!cuentas[cuenta].registered);
    
    cuentas[cuenta].registered = true;
    cuentas[cuenta].blockeCreacion = block.number;
    cuentas[cuenta].autoridad = msg.sender;
    cuentas[cuenta].contador = contador;

    cuentasActivas++;

    emit NuevaCuenta(cuenta, block.number, msg.sender);
    return true;
    
  }
  
  function registarConsumo(uint cuenta, uint medida) public returns(bool, uint) {
    
    require (autoridades[msg.sender].registered);
    require (cuentas[cuenta].registered);
    
    uint medidaA = cuentas[cuenta].ultimaLectura;
    cuentas[cuenta].ultimaLectura = medida;
    cuentas[cuenta].lecturas.push(Lectura(medida, block.number,"000" , block.timestamp));


    medidaA = medida - medidaA;

    kilowatt = kilowatt + medidaA;

    emit Consumo(medida, block.number, block.timestamp);
    return (true, kilowatt);
    
  }

  function registrarHash(string memory _hash, uint cuenta) public returns(bool res) {
    require (autoridades[msg.sender].registered);
    require (cuentas[cuenta].registered);
    
    uint lecturaN = cuentas[cuenta].lecturas.length;
    cuentas[cuenta].lecturas[lecturaN-1].hash = _hash;
    return true;

  }
  

  function verConsumo (uint cuenta, uint x) public view returns(uint, uint, uint, uint, string memory) {
    
    require(x <= cuentas[cuenta].lecturas.length);
    require(x > 0);
    
    x = x-1;
    uint nlecturas = cuentas[cuenta].lecturas.length;
    uint medida =  cuentas[cuenta].lecturas[x].medida;
    uint blocky =  cuentas[cuenta].lecturas[x].block;
    uint timestampa =  cuentas[cuenta].lecturas[x].timestampa;
    string memory hash = cuentas[cuenta].lecturas[x].hash;
    
    return (nlecturas, medida, blocky, timestampa, hash);
    
  }

  function registarAdmin(address direccion, string memory nombre) public returns(bool, address, string memory) {
    
    require (msg.sender == owner);

    autoridades[direccion].registered = true;
    autoridades[direccion].blockeCreacion = block.number;
    autoridades[direccion].nombre = nombre;

    emit NuevoAdmin(direccion, block.number, block.timestamp);
    
    return (true, direccion, nombre);
    
  }

  function quitarAdmin(address direccion) public returns(bool, address, uint) {
    
    require (msg.sender == owner);

    autoridades[direccion].registered = false;
    autoridades[direccion].blockeCreacion = block.number;

    emit AdminRemovido(direccion, block.number, block.timestamp);

    return (true, direccion, block.number);
    
  }

}