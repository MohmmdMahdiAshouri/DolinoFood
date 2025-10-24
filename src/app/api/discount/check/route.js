import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { checkDiscountCode, getCartByUser } from "@/utils/ServerFunctions";
import Discount from "@/models/Discount";
import Order from "@/models/Order";

export async function POST(req) {
    try {
        //get init user's data such as Id - step1
        const session = await getServerSession(authOptions);
        if (!session) throw new Error("لطفا وارد شوید");

        //connect database - step2
        await connectDB();

        //get datas - step3
        const data = await req.json();

        //check code - step4
        const isCode = await Discount.findOne({code: data.code})
        if(!isCode) throw new Error("این کد تخفیف وجود ندارد")

        const order = await Order.findOne({userId : session.user.id, status:"pending"})
        if(!isCode.restaurantId.equals(order.restaurantId)) throw new Error("این کد تخفیف وجود ندارد")

        //validation - step5
        const isValid = checkDiscountCode(isCode)
        if(isValid) throw new Error(isValid)
        
        //check cart and amount - step6
        const cart = await getCartByUser(session.user.id)
        if(!cart) throw new Error("سبد خرید شما خالی است")

        if(isCode.discountType === "cash" && cart.totalPrice <= isCode.minOrder) throw new Error(`حداقل خرید شما باید ${isCode.minOrder?.toLocaleString()} تومان باشد`)

        await Order.updateOne({userId : session.user.id, status : "pending"},{$set:{
            discount : JSON.stringify(isCode)
        }})
        
        return NextResponse.json(
            {
                success: true,
                message: "کد تخفیف اعمال شد",
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
