function ConvertHandler() {
  
  this.getNum = function(input) {
    // Empty input returns 1
    if (input.length === 0) return 1

    let result;
    pattern = /.*?(?=mi|km|lbs|kg|gal|l)/i
    numString = input.match(pattern)

    // When no unit is specified
    if (numString === null) return 'invalid number'

    result = numString[0]
    
    // Handle fractional input
    if (result.includes('/')) {
      const [numerator, denominator, error] = result.split('/')
      if (error) return 'invalid number'
      result = (numerator / denominator).toFixed(5)
    }

    // Returns invalid number when result is not a number
    if (isNaN(result)) return 'invalid number'

    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    if (/mi/i.test(input)) {
      result = 'mi'
    } else if (/km/i.test(input)) {
      result = 'km'
    } else if (/lbs/i.test(input)) {
      result = 'lbs'
    } else if (/kg/i.test(input)) {
      result = 'kg'
    } else if (/gal/i.test(input)) {
      result = 'gal'
    } else if (/l/i.test(input)) {
      result = 'L'
    } else {
      result = 'invalid unit'
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    if (initUnit === 'mi') {
      result = 'km'
    } else if (initUnit === 'km') {
      result = 'mi'
    } else if (initUnit === 'lbs') {
      result = 'kg'
    } else if (initUnit === 'kg') {
      result = 'lbs'
    } else if (initUnit === 'gal') {
      result = 'L'
    } else if (initUnit === 'L') {
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
    } else if (unit === 'lbs') {
      result = 'pounds'
    } else if (unit === 'kg') {
      result = 'kilograms'
    } else if (unit === 'gal') {
      result = 'gallons'
    } else if (unit === 'L') {
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
    } else if (initUnit === 'lbs') {
      result = initNum * lbsToKg
    } else if (initUnit === 'kg') {
      result = initNum / lbsToKg
    } else if (initUnit === 'gal') {
      result = initNum * galToL
    } else if (initUnit === 'L') {
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
