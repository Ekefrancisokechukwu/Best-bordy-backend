import { model, Schema } from "mongoose";

const InteractionHistorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  viewedItems: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  likedItems: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  searchHistory: [String],
  timeSpentPerCategory: [{ category: String, minutes: Number }],
});

const InteractionHistory = model(
  "InteractionHistory",
  InteractionHistorySchema
);

export default InteractionHistory;
