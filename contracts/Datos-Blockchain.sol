pragma solidity ^0.4.25;

import "./SafeMath.sol";

contract DatosEnBlockchain  {
  using SafeMath for uint;
  
  struct Tariff {
    uint time;
    uint percent;
  }
  
  struct Lectura {
    uint medida;
    uint block;
    uint timestampa;
  }
  
  struct Cuenta {
    bool registered;
    uint estrato;
    uint contador;
    bool aldia;
    uint blockeCreacion;
    address autoridad;
    uint ultimaLectura;
    Lectura[] lecturas;
    uint x; // contador de lecturas registradas
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

  constructor(string _nombre) public {
      owner = msg.sender;
      autoridades[msg.sender].registered = true;
      autoridades[msg.sender].blockeCreacion = block.number;
      autoridades[msg.sender].nombre = _nombre;

  }

  function setstate() public view returns(uint, uint, uint, address) {
    
    return (cuentasActivas, certificados, kilowatt, owner);
    
  }

  function registarCuenta(uint cuenta, uint contador, uint estrato) public returns(bool) {
    
    require (autoridades[msg.sender].registered);
    require (!cuentas[cuenta].registered);
    
    cuentas[cuenta].registered = true;
    cuentas[cuenta].blockeCreacion = block.number;
    cuentas[cuenta].autoridad = msg.sender;
    cuentas[cuenta].contador = contador;
    cuentas[cuenta].estrato = estrato;

    cuentasActivas++;

    emit NuevaCuenta(cuenta, block.number, msg.sender);
    return true;
    
  }
  
  function registarConsumo(uint cuenta, uint medida) public returns(bool, uint) {
    
    require (autoridades[msg.sender].registered);
    require (cuentas[cuenta].registered);
    
    cuentas[cuenta].x = cuentas[cuenta].x+1;
    uint medidaA = cuentas[cuenta].ultimaLectura;
    cuentas[cuenta].ultimaLectura = medida;
    cuentas[cuenta].lecturas.push(Lectura(medida, block.number, block.timestamp));

    medidaA = medida - medidaA;

    kilowatt = kilowatt + medidaA;

    emit Consumo(medida, block.number, block.timestamp);
    return (true, kilowatt);
    
  }

  function verConsumo (uint cuenta, uint x) public view returns(uint, uint, uint, uint) {
    
    require(x < cuentas[cuenta].x);
    
    uint nlecturas = cuentas[cuenta].x;
    uint medida =  cuentas[cuenta].lecturas[x].medida;
    uint blocky =  cuentas[cuenta].lecturas[x].block;
    uint timestampa =  cuentas[cuenta].lecturas[x].timestampa;
    
    return (nlecturas-1, medida, blocky, timestampa);
    
  }

  function registarAdmin(address direccion, string nombre) external returns(bool, address, string) {
    
    require (msg.sender == owner);

    autoridades[direccion].registered = true;
    autoridades[direccion].blockeCreacion = block.number;
    autoridades[direccion].nombre = nombre;

    emit NuevoAdmin(direccion, block.number, block.timestamp);
    
    return (true, direccion, nombre);
    
  }

  function quitarAdmin(address direccion) external returns(bool, address, uint) {
    
    require (msg.sender == owner);

    autoridades[direccion].registered = false;
    autoridades[direccion].blockeCreacion = block.number;

    emit AdminRemovido(direccion, block.number, block.timestamp);

    return (true, direccion, block.number);
    
  }

}