const mongoose = require("mongoose");

const adSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please fill name of item!"],
    trime: true,
  },

  description: {
    type: String,
    trime: true,
  },
  company: {
    type: String,
  },
  model: {
    type: String,
  },
  fuel: {
    type: String,
  },
  price: {
    type: Number,
  },

  image: [
    {
      url: {
        type: String,
        require: [true, "Please upload your item's image!"],
      },
      public_id: {
        type: String,
        require: [true, "Please upload your item's image!"],
      },
    },
  ],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  address: {
    city: {
      type: String,
      trime: true,
    },
    state: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Ad", adSchema);
