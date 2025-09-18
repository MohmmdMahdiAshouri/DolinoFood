const { Schema, models, model } = require("mongoose");

const RestaurantsSchema = new Schema(
    {
        name: { type: String, default: "" },
        restaurantType: { type: String, default: "" },
        logo: { type: String, default: "" },
        background: { type: String, default: "" },
        mobile: { type: String, default: "" },
        status: { type: String, default: "pending" },
        branch: { type: String, default: "" },
        deliveryTime: { type: String, default: "" },
        email: {type:String,default:"", unique:false, required:false},
        userName: { type: String, lowercase: true },
        password: { type: String, default: "" },
        service: { type: String, default: "" },
        lat: { type: String, default: "" },
        lng: { type: String, default: "" },
        roles: { type: [String], default: ["MERCHANT"] },
        popular: { type: [String], default: [] },
    },
    {
        timestamps: true,
    }
);

const Restaurant =
    (await models.Restaurant) || model("Restaurant", RestaurantsSchema);
export default Restaurant;
