import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { checkAccess, getCartByUser } from "@/utils/ServerFunctions";
import Cart from "@/models/Cart";

export async function GET(req) {
    try {
        //get init user's data such as Id - step1
        const session = await getServerSession(authOptions);
        if (!session) throw new Error("لطفا وارد شوید");

        //check access - step2
        const isAccess = checkAccess(["USER"], session?.user?.roles);
        if (!isAccess) throw new Error("فقط کاربران میتوانند سفارش دهند");

        //connect database - step3
        await connectDB();

        //get user cart - step6
        const cart = await getCartByUser(session?.user?.id)

        return NextResponse.json(
            {
                success: true,
                message: "موفق",
                data : cart
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
