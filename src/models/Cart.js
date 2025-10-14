const { Schema, models, model, default: mongoose } = require("mongoose");

const CartSchema = new Schema(
    {
        userId : {type : mongoose.Types.ObjectId , default : null},
        items : {type : [] , default : []}, 
        restaurantId : {type : mongoose.Types.ObjectId , default : null},
    },
    {
        timestamps: true,
    }
);

const Cart =
    (await models.Cart) || model("Cart", CartSchema);
export default Cart;
