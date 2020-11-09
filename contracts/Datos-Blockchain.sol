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
    uint timestamp;
  }
  
  struct Cuenta {
    bool registered;
    uint estrato;
    uint contador;
    bool aldia;
    uint blockeCreacion;
    address autoridad;
    Lectura[] lecturas;
    uint x;
    
  }

  struct Autoridad {
    bool registered;
    uint blockeCreacion;
    uint nivel;
  }
  
  address public owner;

  mapping (uint => Cuenta) public cuentas;
  mapping (address => Autoridad) public autoridades;
  

  event Consumo(uint medida, uint blocke, uint tiempo);
  event NuevoAdmin(address medida, uint blocke, uint tiempo);
  event AdminRemovido(address medida, uint blocke, uint tiempo);

  constructor() public {
      owner = msg.sender;
      autoridades[msg.sender].registered = true;
      autoridades[msg.sender].blockeCreacion = block.number;
      autoridades[msg.sender].nivel = 1;
  }
  
  function registarConsumo(uint cuenta, uint medida) public {
    
    require (autoridades[msg.sender].registered);
    require (cuentas[cuenta].registered);
    
    cuentas[cuenta].x = cuentas[cuenta].x++;
    cuentas[cuenta].lecturas.push(Lectura(medida, block.number, block.timestamp));

    emit Consumo(medida, block.number, block.timestamp);
    
  }

  function verConsumo (uint cuenta, uint x) public view returns(uint, uint, uint, uint) {
    
    require(x < cuentas[cuenta].x);
    uint nlecturas = cuentas[cuenta].x;
    uint medida =  cuentas[cuenta].lecturas[x].medida;
    uint blocky =  cuentas[cuenta].lecturas[x].block;
    uint timestamp =  cuentas[cuenta].lecturas[x].timestamp;
    
    return (nlecturas, medida, blocky, timestamp);
    
  }
  
  

  function registarAdmin(address direccion, uint nivel) external {
    
    require (msg.sender == owner);

    autoridades[direccion].registered = true;
    autoridades[direccion].blockeCreacion = block.number;
    autoridades[direccion].nivel = nivel;



    emit NuevoAdmin(direccion, block.number, block.timestamp);
    
  }

  function quitarAdmin(address direccion) external {
    
    require (msg.sender == owner);

    autoridades[direccion].registered = false;
    autoridades[direccion].blockeCreacion = block.number;
    autoridades[direccion].nivel = 0;



    emit AdminRemovido(direccion, block.number, block.timestamp);
    
  }

}