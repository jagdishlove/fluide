const mongoose = require("mongoose");

const generationUsageSchema = mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    count: { type: Number, default: 0 },
    lastGeneratedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GenerationUsage", generationUsageSchema);
