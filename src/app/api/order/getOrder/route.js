import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { checkAccess, getCartByUser } from "@/utils/ServerFunctions";
import Order from "@/models/Order";
import mongoose from "mongoose";

export async function GET(req) {
    try {
        //get init user's data such as Id - step1
        const session = await getServerSession(authOptions);
        if (!session) throw new Error("لطفا وارد شوید");

        //check access - step2
        const isAccess = checkAccess(["USER"], session.user.roles);
        if (!isAccess) throw new Error("فقط کاربران میتوانند سفارش دهند");

        //connect database - step3
        await connectDB();

        //get order - step4
        const order = await Order.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(session.user.id),
                    status: "pending",
                },
            },
            {
                $lookup : {
                    from : "addresses",
                    localField : "addressId",
                    foreignField : "_id",
                    as : "address"
                }
            }
        ]);

        //create order - step5
        if (!order || order.length < 1) {
            const cart = await getCartByUser(session.user.id);
            if (!cart) throw new Error("سبد خرید شما خالی است");
            
            const orderId = Date.now();
            const createOrder = await Order.create({
                userId: session.user.id,
                items: cart.items,
                restaurantId: cart.restaurantId,
                orderId,
                totalPrice: cart.totalPrice,
            });

            return NextResponse.json(
                {
                    success: true,
                    // message: "موفق",
                    data: createOrder,
                },
                { status: 201 }
            );
        }


        return NextResponse.json(
            {
                success: true,
                // message: "موفق",
                data : order[0]
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error.message);

        return NextResponse.json(
            {
                message: error.message,
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}
