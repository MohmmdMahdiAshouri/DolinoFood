const { Schema, models, model, default: mongoose } = require("mongoose");

const OrderSchema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, default: null },
        items: { type: [], default: [] },
        restaurantId: { type: mongoose.Types.ObjectId, default: null },
        addressId: { type: mongoose.Types.ObjectId, default: null },
        totalPrice: { type: Number, default: 0 },
        finalPrice: { type: Number, default: 0 },
        deliveryPrice: { type: Number, default: 0 },
        discountPrice: { type: Number, default: 0 },
        discountDifference: { type: Number, default: 0 },
        orderId: { type: String, default: "" },
        transId: { type: String, default: "" },
        description: { type: String, default: "" },
        status: { type: String, default: "pending" },
        deliveryType: { type: String, default: "collection" },
        lat: { type: String, default: "" },
        lng: { type: String, default: "" },
        discount: { type: String, default: "" },
        terminal: { type: String, default: "" },
        paymentMethod: { type: String, default: "" }, //online-cash-pos
        paymentStatus: { type: String, default: "" },
    },
    {
        timestamps: true,
    }
);

const Order = (await models.Order) || model("Order", OrderSchema);
export default Order;
