import { model, Schema } from "mongoose";

const PreferenceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  favoriteGenres: [String],
  interestedCategories: [String],
  contentType: { type: String, enum: ["Short", "Long"], default: "Short" },
});

const Preference = model("Preference", PreferenceSchema);

export default Preference;
