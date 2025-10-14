const { Schema, models, model, default: mongoose } = require("mongoose");

const UserSchema = new Schema(
    {
        first_name : {type : String , default : ""},
        last_name : {type : String , default : ""},
        mobile : {type : String , default : ""},
        roles : {type : [String] , default : ["USER"]},
        favorits : {type : [mongoose.Types.ObjectId] , default : []}
    },
    {
        timestamps: true,
    }
);

const User =
    (await models.User) || model("User", UserSchema);
export default User;
