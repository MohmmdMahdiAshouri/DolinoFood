import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import Order from "@/models/Order";

export async function POST(req) {
    try {
        //connect database - step1
        await connectDB();

        //get data - step2
        const {orderId} = await req.json()

        //get order - step3
        const order = await Order.aggregate([
            {
                $match : {orderId}
            },
            {
                $lookup:{
                    from : "restaurants",
                    localField : "restaurantId",
                    foreignField : "_id",
                    as : "restaurant"
                }
            },
            {
                $lookup:{
                    from : "addresses",
                    localField : "addressId",
                    foreignField : "_id",
                    as : "address"
                }
            },
            {
                $lookup:{
                    from : "users",
                    localField : "userId",
                    foreignField : "_id",
                    as : "user"
                }
            }
        ])

        if(!order || order.length < 1) throw new Error("سفارش پیدا نشد")

        delete order[0].restaurant[0].userName
        delete order[0].restaurant[0].password
        delete order[0].restaurant[0].roles

        delete order[0].user[0].roles
        
        return NextResponse.json(
            {
                success: true,
                // message: "موفق",
                data: order[0],
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
