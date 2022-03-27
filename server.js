'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const expect      = require('chai').expect;
const cors        = require('cors');
require('dotenv').config();

const apiRoutes         = require('./routes/api.js');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const runner            = require('./test-runner');

let app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//Conversion api
app.route('/api/convert')
  .get((req, res) => {
    const ConvertHandler = require('./controllers/convertHandler')
    const convertHandler = new ConvertHandler()
    const { input } = req.query

    const initNum = convertHandler.getNum(input)
    const initUnit = convertHandler.getUnit(input)

    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      res.send('invalid number and unit')
    } else if (initNum === 'invalid number') {
      res.send('invalid number')
    } else if (initUnit === 'invalid unit') {
      res.send('invalid unit')
    } else {
      const returnNum = convertHandler.convert(initNum, initUnit)
      const returnUnit = convertHandler.getReturnUnit(initUnit)
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)

      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string
      })
    }
  })

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API
apiRoutes(app);

//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const port = process.env.PORT || 3000;

//Start our server and tests!
app.listen(port, function () {
  console.log("Listening on port " + port);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        console.log('Tests are not valid:');
        console.error(e);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
