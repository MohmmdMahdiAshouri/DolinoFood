import Restaurant from "@/models/Restaurants";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        //connect database - step1
        await connectDB();

        //get Restaurant - step2
        const restaurant = await Restaurant.find({
            status: "success",
        });

        return NextResponse.json(
            {
                success: true,
                data: {
                    restaurant,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error.message);

        return NextResponse.json(
            {
                message: "درخواست با خطا مواجه شد",
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}
