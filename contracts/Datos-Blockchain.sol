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
    bool aldia;
    uint blockeCreacion;
    address autoridad;
    uint estrato;
    Lectura[] lecturas;
    
  }

  struct Autoridad {
    bool registered;
    uint blockeCreacion;
    address autoridad;
    string nombre;
  }
  
  address public owner;

  mapping (uint => Cuenta) public cuentas;
  mapping (address => Autoridad) public autoridades;

  event Consumo(uint medida, uint blocke, uint tiempo);

  constructor() public {
      owner = msg.sender;
      autoridades[msg.sender].registered = true;
      autoridades[msg.sender].blockeCreacion = block.number;
      autoridades[msg.sender].autoridad = msg.sender;
      autoridades[msg.sender].nombre = "dueño";
  }
  
  function registarConsumo(uint cuenta, uint medida) external {
    
    require (autoridades[msg.sender].registered);
    require (cuentas[cuenta].registered);

    cuentas[cuenta].lecturas.push(Lectura(medida, block.number, block.timestamp));

    emit Consumo(medida, block.number, block.timestamp);
    
  }

}