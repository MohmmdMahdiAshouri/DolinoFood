import Cart from "@/models/Cart"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
export const hashPassword = async (password) => {
    const hash = await bcrypt.hash(password , 10)
    return hash
}

export const unHashPassword = async (password , hashPassword) => {
    const unHash = await bcrypt.compareSync(password , hashPassword)
    return unHash
}

export const checkAccess = (access, userAccess) => {
    const hasPermission = access.some(
        (permission) => userAccess.includes(permission)
        // {
        //     if (userAccess === permission) {
        //         return true;
        //     }
        // }
    );
    return hasPermission;
};

export const getCartByUser = async (userId) => {
    try {
        const cart = await Cart.aggregate([
            {
            $match : {userId : new mongoose.Types.ObjectId(userId)}
            },
            {
                $lookup : {
                    from : "restaurants",
                    localField : "restaurantId",
                    foreignField : "_id",
                    as : "restaurant"
                }
            }
        ])
        const finallCart = cart[0]
        return finallCart
    } catch (error) {
        return false
    }
}