const { Schema, models, model, default: mongoose } = require("mongoose");

const CommentSchema = new Schema(
    {
        name: { type: String, default: "" },
        comment: { type: String, default: "" },
        restaurantId: { type: mongoose.Types.ObjectId, default: null },
        userId: { type: mongoose.Types.ObjectId, default: null },
        orderId: { type: mongoose.Types.ObjectId, default: null },
        rate: { type: Number, default: 0 },
        status: { type: String, default: "pending" },
    },
    {
        timestamps: true,
    }
);

const Comment = (await models.Comment) || model("Comment", CommentSchema);
export default Comment;
