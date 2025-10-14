import Restaurant from "@/models/Restaurants";
import restaurantValidation from "@/validations/validation";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import {hashPassword} from "@/utils/ServerFunctions";

export async function POST(req) {
    try {
        //connect database - step1
        await connectDB();

        //get datas - step2
        const data = await req.json();

        //validation datas - step3
        const validation = restaurantValidation(data);
        if (validation) {
            return NextResponse.json(
                {
                    success: false,
                    message: "لطفا اطلاعات خواسته شده را به درستی تکمیل کنید",
                    data: validation,
                },
                { status: 403 }
            );
        }

        //check exist userName - step4
        const isRestaurant = await Restaurant.findOne({userName : data.userName})
        if(isRestaurant){
            return NextResponse.json(
                {success : false , message : "این نام کاربری از قبل وجود دارد"},
                {status : 400}
            )
        }

        //hash password - step5
        const hash = await hashPassword(data.password)
        
        //create Restaurant - step6
        await Restaurant.create({
            name: data.name,
            userName: data.userName,
            password: hash,
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
