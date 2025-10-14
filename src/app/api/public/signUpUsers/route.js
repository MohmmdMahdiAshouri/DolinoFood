import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { validationPhoneNumber } from "@/validations/validation";

export async function POST(req) {
    try {
        //connect database - step1
        await connectDB();

        //get datas - step2
        const data = await req.json();

        const validat = validationPhoneNumber(data.mobile);
        if (validat) {
            return NextResponse.json(
                { success: false, message: validat.mobile },
                { status: 403 }
            );
        }

        //check exist userName - step4
        const isUser = await User.findOne({
            mobile: data.mobile,
        });
        if (isUser) {
            return NextResponse.json(
                { success: false, message: "این شماره از قبل وجود دارد" },
                { status: 400 }
            );
        } else if (!data.first_name) {
            return NextResponse.json(
                { success: false, message: "لطفا نام خود را وارد کنید" },
                { status: 400 }
            );
        } else if (!data.last_name) {
            return NextResponse.json(
                {
                    success: false,
                    message: "لطفا نام خانوادگی خود را وارد کنید",
                },
                { status: 400 }
            );
        }

        //create Restaurant - step6
        await User.create({
            first_name: data.first_name,
            last_name: data.last_name,
            mobile: data.mobile,
        });

        return NextResponse.json(
            { success: true, message: "ثبت نام با موفقیت انجام شد" },
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
