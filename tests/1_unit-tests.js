const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('convertHandler should correctly read a whole number input', () => {
    assert.equal(convertHandler.getNum('123mi'), '123', '123mi => 123')
  })
  test('convertHandler should correctly read a decimal number input', () => {
    assert.equal(convertHandler.getNum('123.54km'), '123.54', '123.54km => 123.54')
  })
  test('convertHandler should correctly read a fractional input', () => {
    assert.equal(convertHandler.getNum('2/3km'), '0.6666666666666666', '2/3km => 0.6666666666666666')
  })
  test('convertHandler should correctly read a fractional input with a decimal', () => {
    assert.equal(convertHandler.getNum('2.5/4lbs'), '0.625', '2.5/4lbs => 0.625')
  })
  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', () => {
    assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number', '3/2/3kg => invalid number')
  })
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', () => {
    assert.equal(convertHandler.getNum(''), '1', '"" => 1')
    assert.equal(convertHandler.getNum('nonumericalinput'), '1', 'nonumericalinput => 1')
  })
  test('convertHandler should correctly read each valid input unit', () => {
    assert.equal(convertHandler.getUnit('123mi'), 'mi', '123mi => mi')
    assert.equal(convertHandler.getUnit('123km'), 'km', '123km => km')
    assert.equal(convertHandler.getUnit('123lbs'), 'lbs', '123lbs => lbs')
    assert.equal(convertHandler.getUnit('123kg'), 'kg', '123kg => kg')
    assert.equal(convertHandler.getUnit('123gal'), 'gal', '123gal => gal')
    assert.equal(convertHandler.getUnit('123l'), 'L', '123l => L')
  })
  test('convertHandler should correctly return an error for an invalid input unit', () => {
    assert.equal(convertHandler.getUnit('32unit'), 'invalid unit', '32unit => invalid unit')
  })
  test('convertHandler should return the correct return unit for each valid input unit', () => {
    assert.equal(convertHandler.getReturnUnit('mi'), 'km', 'mi => km')
    assert.equal(convertHandler.getReturnUnit('km'), 'mi', 'km => mi')
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg', 'lbs => kg')
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs', 'kg => lbs')
    assert.equal(convertHandler.getReturnUnit('gal'), 'L', 'gal => L')
    assert.equal(convertHandler.getReturnUnit('L'), 'gal', 'L => gal')
  })
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', () => {
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles', 'mi => miles')
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers', 'km => kilometers')
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds', 'lbs => pounds')
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms', 'kg => kilograms')
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons', 'gal => gallons')
    assert.equal(convertHandler.spellOutUnit('L'), 'liters', 'L => liters')
  })
  test('convertHandler should correctly convert gal to L', () => {
    assert.equal(convertHandler.convert('15', 'gal'), '56.78115', '15gal => 56.78115')
  })
  test('convertHandler should correctly convert L to gal', () => {
    assert.equal(convertHandler.convert('15', 'L'), '3.96258', '15L => 3.96258')
  })
  test('convertHandler should correctly convert mi to km', () => {
    assert.equal(convertHandler.convert('15', 'mi'), '24.1401', '15mi => 24.1401')
  })
  test('convertHandler should correctly convert km to mi', () => {
    assert.equal(convertHandler.convert('15', 'km'), '9.32059', '15km => 9.32059')
  })
  test('convertHandler should correctly convert lbs to kg', () => {
    assert.equal(convertHandler.convert('15', 'lbs'), '6.80388', '15lbs => 6.80388')
  })
  test('convertHandler should correctly convert kg to lbs', () => {
    assert.equal(convertHandler.convert('15', 'kg'), '33.06937', '15kg => 33.06937')
  })
});
