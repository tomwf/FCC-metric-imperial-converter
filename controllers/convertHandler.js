function ConvertHandler() {

  this.getNum = function(input) {
    // Empty input returns 1
    if (input.length === 0) return 1

    // Match for number pattern
    let result;
    // const pattern = /[\d\.\/]*(?=mi|km|lbs|kg|gal|l)|.*/i
    const pattern = /[\d\.\/]*(?=mi|km|lbs|kg|gal|l)|[\d\.\/]*/i
    result = input.match(pattern)[0]
    console.log({input, result})

    // Handle fractional input
    if (result.includes('/')) {
      const [numerator, denominator, error] = result.split('/')
      console.log({numerator, denominator})

      if (
        error
        || !numerator
        || !denominator
      ) return 'invalid number'

      result = numerator / denominator
      console.log({result})
    }

    // Returns invalid number when result is not a number
    if (
      !result
      || result === '0'
      || isNaN(result)
    ) return 'invalid number'

    return result
  };

  this.getUnit = function(input) {
    let result;
    if (/^\d*[\.\/]?\d*mi$/i.test(input)) {
      result = 'mi'
    } else if (/^\d*[\.\/]?\d*km$/i.test(input)) {
      result = 'km'
    } else if (/^\d*[\.\/]?\d*lbs$/i.test(input)) {
      result = 'lbs'
    } else if (/^\d*[\.\/]?\d*kg$/i.test(input)) {
      result = 'kg'
    } else if (/^\d*[\.\/]?\d*gal$/i.test(input)) {
      result = 'gal'
    } else if (/^\d*[\.\/]?\d*l$/i.test(input)) {
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
    return result.toFixed(5)
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
