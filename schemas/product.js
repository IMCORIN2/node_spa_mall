const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    goodsId: {
        type: Number,
        required: true,
        unique: true,
    },
    productName: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
      type : String,
      required : true,
    },
    author: {
      type : String,
      required : true,
    },
    password : {
      type : String,
      required : true,
    },
    status: {
        type: String,
        require: true,
    },
    date : {
      type : Date,
      require : true,
    }
});

module.exports = mongoose.model("products",productsSchema);