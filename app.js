const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")
const bodyParser = require("body-parser");
const path = require("path");

const PUBLISH_KEY = "pk_test_51MSFMaSIDUaT83RH8YJIlAhIFDSaY3YHR0ZF97d4aBQPZqQPT4zpzncpccSgdGfD3eqH968vRuQxTsFFEsXUGQcZ00jOpFwYpv";
const SECRET_KEY = "sk_test_51MSFMaSIDUaT83RH4vnhsd912OjOTu0H24F7JeBJocmKGdFZSonVLag0uxO25rPnAnICc1jNkNP2Eb9Io2U4bSHz00hQv8daDj";
const stripe = require("stripe")(SECRET_KEY);
const logger = require('./logger')
// const httpLogger = require('./httpLogger')

// app.use(httpLogger)
// Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/emp_mgt", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
	.then(() => {
		const app = express()
    app.use(express.json())

    app.use(bodyParser.urlencoded({extended:false})) 
    app.use(bodyParser.json());

		app.use("/api", routes) 
    app.set('view engine', 'ejs') 
    app.get("/", function (req, res) {
      // res.sendFile(__dirname + "/index.html");
      res.render('Home', {
        key:PUBLISH_KEY
      })
    });
  
		app.listen(3000, () => {
      logger.info('Express.js listening on port 3000.');
			console.log("Server has started!");
		})


    app.use(logErrors)
app.use(errorHandler)

function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}
function errorHandler (err, req, res, next) {
  res.status(500).send('Error!')
}

    app.post('/payment', function(req, res) {
      stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'abc xyz',
        address: {
          line1: 'TC 9/4 Old MES colony',
          postal_code: '110092',
          city: 'New Delhi',
          state: 'Delhi',
          country: 'India',
        }
      })
      .then((customer) => {
        return stripe.charges.create({
          amount: 7000, // Charing Rs 25
          description: 'Web Development Product',
          currency: 'USD',
          customer: customer.id
        });
      }).then((charge) => {
        res.send("Success") // If no error occurs
      }).catch((err) => {
        res.send(err) // If some error occurs
      });
    })
	})
  