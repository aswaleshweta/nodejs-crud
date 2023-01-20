const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")
const bodyParser = require("body-parser");

// Connect to MongoDB database
mongoose
	.connect("mongodb+srv://shwetaaswale:shwetaaswale@cluster0.rkqcsuv.mongodb.net/?retryWrites=true&w=majority", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
	.then(() => {
		const app = express()
    app.use(express.json())

    app.use(bodyParser.json());

		app.use("/api", routes) 

    app.get("/", function (req, res) {
      res.sendFile(__dirname + "/index.html");
    });
  
		app.listen(3000, () => {
			console.log("Server has started!");
		})
	})
  