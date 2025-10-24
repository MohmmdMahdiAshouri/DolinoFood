const { Schema, models, model, default: mongoose } = require("mongoose");

const discountSchema = new Schema(
    {
        code: { type: String, default: "" },
        start: { type: Date, default: Date.now()},
        expire: { type: Date},
        active: { type: Boolean, default:true},
        minOrder: { type: Number, default:1},
        usageLimit: { type: Number, default:1},
        usageCount: { type: Number, default:0},
        value: { type: Number, default:0},
        discountType: { type: String, default: "percentage"}, //percentage - cash
        restaurantId: { type: mongoose.Types.ObjectId, default: null },
    },
    {
        timestamps: true,
    }
);

const Discount = (await models.Discount) || model("Discount", discountSchema);
export default Discount;
