const mongoose = require("mongoose")

const schema = mongoose.Schema({
	title: String,
	content: String,
  address:String,
  first_name:String
})

module.exports = mongoose.model("blog", schema)