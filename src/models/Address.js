const { Schema, models, model, default: mongoose } = require("mongoose");

const AddressSchema = new Schema(
    {
        userId : {type : mongoose.Types.ObjectId , default : null},
        lat : {type : String , default : ""},
        lng : {type : String , default : ""},
        postalCode : {type : String , default : ""},
        state : {type : String , default : ""},
        city : {type : String , default : ""},
        details : {type : String , default : ""},
        mobile : {type : String , default : ""},
    },
    {
        timestamps: true,
    }
);

const Address =
    (await models.Address) || model("Address", AddressSchema);
export default Address;
