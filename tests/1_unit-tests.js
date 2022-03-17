const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('getNum() returns a number', () => {
    assert.equal(convertHandler.getNum(''), '1', 'Empty input defaults to 1')
    assert.equal(convertHandler.getNum('123gal'), '123', '123gal => 123')
    assert.equal(convertHandler.getNum('123.54mi'), '123.54', '123.54mi => 123.54')
    assert.equal(convertHandler.getNum('2/3lbs'), '0.6666666666666666', '2/3lbs => 0.6666666666666666')
    assert.equal(convertHandler.getNum('bla2/3lbs'), 'invalid number', 'bla2/3lbs => invalid number')
    assert.equal(convertHandler.getNum('0'), 'invalid number', '0 => invalid number')
    assert.equal(convertHandler.getNum('0gal'), 'invalid number', '0gal => invalid number')
    assert.equal(convertHandler.getNum('.76'), '.76', '.76 => .76')
    assert.equal(convertHandler.getNum('.76l'), '.76', '.76l => .76')
    assert.equal(convertHandler.getNum('..76l'), 'invalid number', '..76l => invalid number')
    assert.equal(convertHandler.getNum('/82'), 'invalid number', '/82 => invalid number')
    assert.equal(convertHandler.getNum('/82gal'), 'invalid number', '/82gal => invalid number')
    assert.equal(convertHandler.getNum('1/2/3kg'), 'invalid number', '1/2/3kg => invalid number')
    assert.equal(convertHandler.getNum('2.5/6km'), '0.4166666666666667', '2.5/6km => 0.4166666666666667')
    assert.equal(convertHandler.getNum('km'), '1', 'km => 1')
  })
  test('getUnit() returns a unit ("mi", "km", "lb", "kg", "gal" or "l")', () => {
    assert.equal(convertHandler.getUnit('123mi'), 'mi', 'Unit is miles')
    assert.equal(convertHandler.getUnit('123km'), 'km', 'Unit is kilometers')
    assert.equal(convertHandler.getUnit('123lbs'), 'lbs', 'Unit is pounds')
    assert.equal(convertHandler.getUnit('123kg'), 'kg', 'Unit is kilograms')
    assert.equal(convertHandler.getUnit('123gal'), 'gal', 'Unit is gallons')
    assert.equal(convertHandler.getUnit('123l'), 'L', 'Unit is liters')
    assert.equal(convertHandler.getUnit('123bla'), 'invalid unit', 'Valid number but invalid unit')
    assert.equal(convertHandler.getUnit('123blami'), 'invalid unit', 'Valid number but invalid unit')
    assert.equal(convertHandler.getUnit('123blamibla'), 'invalid unit', 'Valid number but invalid unit')
    assert.equal(convertHandler.getUnit('l'), 'L', 'l => L')
  })
  test('getReturnUnit() returns the converted unit ("mi" <=> "km", "lb" <=> "kg")', () => {
    assert.equal(convertHandler.getReturnUnit('mi'), 'km', 'Miles to kilometers')
    assert.equal(convertHandler.getReturnUnit('km'), 'mi', 'Kilometers to miles')
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg', 'Pounds to kilograms')
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs', 'Kilograms to pounds')
    assert.equal(convertHandler.getReturnUnit('gal'), 'L', 'Gallons to liters')
    assert.equal(convertHandler.getReturnUnit('L'), 'gal', 'Liters to gallons')
  })
  test('spellOutUnit() spells out unit', () => {
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles', '"mi" is miles')
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers', '"km" is kilometers')
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds', '"lbs" is pounds')
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms', '"km" is kilograms')
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons', '"gal" is gallons')
    assert.equal(convertHandler.spellOutUnit('L'), 'liters', '"L" is liters')
  })
  test('convert() returns converted unit', () => {
    assert.equal(convertHandler.convert('123', 'mi'), '197.94882', '123 miles => 197.94882 kilometers')
    assert.equal(convertHandler.convert('123', 'km'), '76.42885', '123 kilometers => 76.42885 miles')
    assert.equal(convertHandler.convert('123', 'lbs'), '55.79182', '123 pounds => 55.79182 kilograms')
    assert.equal(convertHandler.convert('123', 'kg'), '271.16880', '123 kilograms => 271.16880 pounds')
    assert.equal(convertHandler.convert('123', 'gal'), '465.60543', '123 gallons => 465.60543 liters')
    assert.equal(convertHandler.convert('123', 'L'), '32.49318', '123 liters => 32.49318 gallons')
    assert.equal(convertHandler.convert('1', 'lbs'), '0.45359', '1 pound => 0.45359 kilogram')
    assert.equal(convertHandler.convert('1', 'gal'), '3.78541', '1 gallons => 3.78541 liters')
  })
  test('getString() returns a json', () => {
    assert.equal(convertHandler.getString('3.1', 'mi', '4.98895', 'km'), '3.1 miles converts to 4.98895 kilometers', 'getString returns a string')
  })
});
