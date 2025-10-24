import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { checkAccess } from "@/utils/ServerFunctions";
import Foods from "@/models/Foods";
import Cart from "@/models/Cart";

export async function POST(req) {
    try {
        //get init user's data such as Id - step1
        const session = await getServerSession(authOptions);
        if (!session) throw new Error("لطفا وارد شوید");

        //check access - step2
        const isAccess = checkAccess(["USER"], session.user.roles);
        if (!isAccess) throw new Error("فقط کاربران میتوانند سفارش دهند");

        //get datas - step4
        const data = await req.json();

        //connect database - step3
        await connectDB();

        //get foods - step5
        const food = await Foods.findOne({ _id: data.id });
        if (!food) throw new Error("غذا نامعتبر");

        //clear cart -step6
        await Cart.updateOne({userId : session.user.id} , {$set : {
            restaurantId : food.restaurantId,
            items : [{
                name : food.name,
                catName : food.catName,
                price : food.price,
                _id : food._id,
                image : food.image,
                count : 1
            }]
        }})

        return NextResponse.json(
            {
                success: true,
                message: "سبد خرید قبلی حذف و آیتم مورد نظر اضافه شد",
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
