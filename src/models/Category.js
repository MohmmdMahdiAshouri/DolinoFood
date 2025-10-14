const { Schema, models, model, default: mongoose } = require("mongoose");

const CategorySchema = new Schema(
    {
        name : {type : String , default : ""},
        image : {type : String , default : ""},
        restaurantId : {type : mongoose.Types.ObjectId , default : null},
    },
    {
        timestamps: true,
    }
);

const Category =
    (await models.Category) || model("Category", CategorySchema);
export default Category;
