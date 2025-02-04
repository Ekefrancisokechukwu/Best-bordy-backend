import { model, Schema } from "mongoose";

interface IFeedback extends Document {
  user: Schema.Types.ObjectId;
  comment: string;
  rating: { min: number; max: number };
  recommendationId: Schema.Types.ObjectId;
}

const FeedbackSchema = new Schema<IFeedback>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5 },
  recommendationId: {
    type: Schema.Types.ObjectId,
    ref: "Recommendation",
    required: true,
  },
  comment: String,
});

const Feedback = model<IFeedback>("Feedback", FeedbackSchema);

export default Feedback;
