function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    pattern = /^\d*\.?\d*/
    result = input.match(pattern)[0]
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    if (input.endsWith('mi')) {
      result = 'mi'
    } else if (input.endsWith('km')) {
      result = 'km'
    } else if (input.endsWith('lb')) {
      result = 'lb'
    } else if (input.endsWith('kg')) {
      result = 'kg'
    } else if (input.endsWith('gal')) {
      result = 'gal'
    } else if (input.endsWith('l')) {
      result = 'l'
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    if (initUnit === 'mi') {
      result = 'km'
    } else if (initUnit === 'km') {
      result = 'mi'
    } else if (initUnit === 'lb') {
      result = 'kg'
    } else if (initUnit === 'kg') {
      result = 'lb'
    } else if (initUnit === 'gal') {
      result = 'l'
    } else if (initUnit === 'l') {
      result = 'gal'
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    if (unit === 'mi') {
      result = 'miles'
    } else if (unit === 'km') {
      result = 'kilometers'
    } else if (unit === 'lb') {
      result = 'pounds'
    } else if (unit === 'kg') {
      result = 'kilograms'
    } else if (unit === 'gal') {
      result = 'gallons'
    } else if (unit === 'l') {
      result = 'liters'
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    if (initUnit === 'mi') {
      result = initNum * miToKm
    } else if (initUnit === 'km') {
      result = initNum / miToKm
    } else if (initUnit === 'lb') {
      result = initNum * lbsToKg
    } else if (initUnit === 'kg') {
      result = initNum / lbsToKg
    } else if (initUnit === 'gal') {
      result = initNum * galToL
    } else if (initUnit === 'l') {
      result = initNum / galToL
    }
    return result.toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    const fullInitUnit = this.spellOutUnit(initUnit)
    const fullReturnUnit = this.spellOutUnit(returnUnit)
    result = `${initNum} ${fullInitUnit} converts to ${returnNum} ${fullReturnUnit}`
    return result;
  };
}

module.exports = ConvertHandler;
