const mongoose = require('mongoose');
const slugify = require('slugify');

const shoesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Необходимо указать поле: name'],
    },
    slug: String,
    brand: {
      type: String,
      required: [true, 'Необходимо указать поле: brand'],
    },
    code: {
      type: String,
      retuired: [true, 'Введи код обуви'],
    },
    price: {
      type: Number,
      required: [true, 'Необходимо указать поле: price'],
      validate: {
        validator: (val) => {
          return val > 0;
        },
        message: 'Поле price не можеть быть > 0',
      },
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Unisex'],
      required: true,
    },
    imageMain: String,
    images: [String],
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Category',
    // },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

shoesSchema.pre('save', function (next) {
  const name = this.name.replace('/', ' ');
  this.slug = slugify(name, { lower: true });

  next();
});

module.exports = mongoose.model('Shoes', shoesSchema);
