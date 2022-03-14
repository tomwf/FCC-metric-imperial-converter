const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('getNum returns a number', () => {
    assert.equal(convertHandler.getNum('123'), '123', 'This is a number')
    assert.equal(convertHandler.getNum('123.54mi'), '123.54', 'This is a number')
  })
  test('getUnit returns a unit ("mi", "km", "lb", "kg", "gal" or "l")', () => {
    assert.equal(convertHandler.getUnit('123mi'), 'mi', 'Unit is miles')
    assert.equal(convertHandler.getUnit('123km'), 'km', 'Unit is kilometers')
    assert.equal(convertHandler.getUnit('123lb'), 'lb', 'Unit is pounds')
    assert.equal(convertHandler.getUnit('123kg'), 'kg', 'Unit is kilograms')
    assert.equal(convertHandler.getUnit('123gal'), 'gal', 'Unit is gallons')
    assert.equal(convertHandler.getUnit('123l'), 'l', 'Unit is liters')
  })
  test('getReturnUnit returns the converted unit ("mi" <=> "km", "lb" <=> "kg")', () => {
    assert.equal(convertHandler.getReturnUnit('mi'), 'km', 'Miles to kilometers')
    assert.equal(convertHandler.getReturnUnit('km'), 'mi', 'Kilometers to miles')
    assert.equal(convertHandler.getReturnUnit('lb'), 'kg', 'Pounds to kilograms')
    assert.equal(convertHandler.getReturnUnit('kg'), 'lb', 'Kilograms to pounds')
    assert.equal(convertHandler.getReturnUnit('gal'), 'l', 'Gallons to liters')
    assert.equal(convertHandler.getReturnUnit('l'), 'gal', 'Liters to gallons')
  })
  test('spellOutUnit spells out unit', () => {
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles', '"mi" is miles')
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers', '"km" is kilometers')
    assert.equal(convertHandler.spellOutUnit('lb'), 'pounds', '"lb" is pounds')
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms', '"km" is kilograms')
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons', '"gal" is gallons')
    assert.equal(convertHandler.spellOutUnit('l'), 'liters', '"l" is liters')
  })
  test('convert returns converted unit', () => {
    assert.equal(convertHandler.convert('123', 'mi'), '197.94882', '123 miles => 197.94882 kilometers')
    assert.equal(convertHandler.convert('123', 'km'), '76.42885', '123 kilometers => 76.42885 miles')
    assert.equal(convertHandler.convert('123', 'lb'), '55.79182', '123 pounds => 55.79182 kilograms')
    assert.equal(convertHandler.convert('123', 'kg'), '271.16880', '123 kilograms => 271.16880 pounds')
    assert.equal(convertHandler.convert('123', 'gal'), '465.60543', '123 gallons => 465.60543 liters')
    assert.equal(convertHandler.convert('123', 'l'), '32.49318', '123 liters => 32.49318 gallons')
  })
  test('getString returns a json', () => {
    assert.equal(convertHandler.getString('3.1', 'mi', '4.98895', 'km'), '3.1 miles converts to 4.98895 kilometers', 'getString returns a string')
  })
});
