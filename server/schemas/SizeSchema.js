const SizeSchema = new mongoose.Schema({
  info: {
    type: String,
    validate: {
      validator: (val) => typeof val === "string",
      message: "info must be stirng",
    },
    required: [true, "info is required for size"],
  },
  price: {
    type: Number,
    validate: {
      validator: (val) => typeof val === "number",
      message: "price must be number",
    },
    required: [true, "price is required for size"],
  },
});


export default SizeSchema;