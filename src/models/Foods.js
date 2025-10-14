const { Schema, models, model, default: mongoose } = require("mongoose");

const FoodsSchema = new Schema(
    {
        name : {type : String , default : ""},
        price : {type : Number , default : 0},
        catId : {type : mongoose.Types.ObjectId , default : null},
        catName : {type : String , default : ""},
        image : {type : String , default : ""},
        restaurantId : {type : mongoose.Types.ObjectId , default : null},
    },
    {
        timestamps: true,
    }
);

const Foods =
    (await models.Foods) || model("Foods", FoodsSchema);
export default Foods;
