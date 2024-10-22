const mongoose = require('mongoose');
const slug = require('slug');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'У категори должно быть имя'],
      trim: true,
    },
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema.pre('save', function (next) {
  this.slug = slug(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Category', categorySchema);
