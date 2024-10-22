const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Shoes',
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// cartSchema.virtual('totalPrice').get(function () {
//   const sum = 0;
//   return this.cartItems.reduce((sum, item) => {
//     sum += item;
//   }, sum);
// });

module.exports = mongoose.model('Cart', cartSchema);
