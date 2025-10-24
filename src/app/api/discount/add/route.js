import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { checkAccess } from "@/utils/ServerFunctions";
import { discountValidation } from "@/validations/validation";
import Discount from "@/models/Discount";

export async function POST(req) {
    try {
        //get init user's data such as Id - step1
        const session = await getServerSession(authOptions);
        if (!session) throw new Error("لطفا وارد شوید");

        //check access - step2
        const isAccess = checkAccess(["MERCHANT"], session.user.roles);
        if (!isAccess) throw new Error("شما دسترسی ندارید");

        //connect database - step3
        await connectDB();

        //get datas - step4
        const data = await req.json();

        //validation data - step5
        const isValid = discountValidation(data);
        if (isValid) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        isValid.active ||
                        isValid.code ||
                        isValid.value ||
                        isValid.minOrder ||
                        isValid.usageLimit ||
                        isValid.expire ||
                        isValid.start,
                    data: isValid,
                },
                { status: 403 }
            );
        }

        //add or update - step6
        if (data._id) {
            await Discount.updateOne(
                { _id: data._id },
                {
                    $set: {
                        code: data.code,
                        value: data.value,
                        start: data.start,
                        expire: data.expire,
                        usageLimit: data.usageLimit,
                        discountType: data.discountType,
                        active: data.active,
                        minOrder: data.minOrder,
                    },
                }
            );
        } else {
            await Discount.create({
                restaurantId : session.user.id,
                code: data.code,
                value: data.value,
                start: data.start,
                expire: data.expire,
                usageLimit: data.usageLimit,
                discountType: data.discountType,
                active: data.active,
                minOrder: data.minOrder,
            });
        }

        return NextResponse.json(
            {
                success: true,
                message: "عملیات با موفقیت انجام شد",
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
