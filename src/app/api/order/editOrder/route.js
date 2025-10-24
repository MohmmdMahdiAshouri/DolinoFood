import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { checkAccess, getCartByUser } from "@/utils/ServerFunctions";
import Order from "@/models/Order";
import mongoose from "mongoose";
import { message } from "antd";

export async function POST(req) {
    try {
        //get init user's data such as Id - step1
        const session = await getServerSession(authOptions);
        if (!session) throw new Error("لطفا وارد شوید");

        //check access - step2
        const isAccess = checkAccess(["MERCHANT"], session.user.roles);
        if (!isAccess) throw new Error("فقط ادمین ها دسترسی دارند");

        //connect database - step3
        await connectDB();

        //get params - step4
        const data = await req.json()

        //update order - step4
        await Order.updateOne({_id:data._id, restaurantId : session.user.id}, {$set:{
            status : data.status
        }})

        return NextResponse.json(
            {
                success: true,
                message : "سفارش با موفقیت ویرایش شد"
                // data: order,
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
