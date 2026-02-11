const mongoose = require("mongoose");

const horseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: { type: String, required: true },
    sex: { type: String, required: true },
    age: { type: String, required: true },
    views: { type: Number, default: 0 },
    price: { type: String, required: true },
    // free | for_sale | adoption
    saleType: {
      type: String,
      enum: ["free", "for_sale", "adoption"],
      default: "for_sale",
    },
    certificate: { type: String, default: "" },
    description: { type: String, default: "" },
    images: [{ type: String, required: true }]
  },
  { timestamps: true }
);

horseSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, "-");
  }
  next();
});

module.exports = mongoose.model("Horse", horseSchema);

