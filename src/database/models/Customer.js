const { default: mongoose } = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    salt: String,
    phone: String,
    address: [
      { type: mongoose.Schema.Types.ObjectId, ref: "address", require: true },
    ],
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          require: true,
        },
        unit: {
          type: Number,
          require: true,
        },
      },
    ],
    whishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    ],
    orders: [
      { type: mongoose.Schema.Types.ObjectId, ref: "order", require: true },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
