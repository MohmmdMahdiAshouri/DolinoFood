import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { checkAccess } from "@/utils/ServerFunctions";
import {
    addressValidation,
    validationPhoneNumber,
} from "@/validations/validation";
import Address from "@/models/Address";

export async function POST(req) {
    try {
        //get init user's data such as Id - step1
        const session = await getServerSession(authOptions);
        if (!session) throw new Error("لطفا وارد شوید");

        //check access - step2
        const isAccess = checkAccess(["USER"], session.user.roles);
        if (!isAccess) throw new Error("شما دسترسی ندارید");

        //connect database - step3
        await connectDB();

        //get datas - step4
        const data = await req.json();

        //validation address - step5
        const isValid = addressValidation(data);
        if (isValid) {
            return NextResponse.json(
                {
                    success: false,
                    message: isValid.state || isValid.city || isValid.details,
                    data: isValid,
                },
                { status: 403 }
            );
        }

        //validation number - step6
        const numberValid = validationPhoneNumber(data.mobile);
        if (numberValid) {
            return NextResponse.json(
                { success: false, message: numberValid.mobile },
                { status: 400 }
            );
        }

        //add or update - step7
        if (data._id) {
            await Address.updateOne(
                { _id: data._id },
                {
                    $set: {
                        lat: data.lat,
                        lng: data.lng,
                        state: data.state,
                        city: data.city,
                        mobile: data.mobile,
                        details: data.details,
                        postalCode: data.postalCode,
                    },
                }
            );
            return NextResponse.json(
                {
                    success: true,
                    message: "آدرس ویرایش شد",
                },
                { status: 200 }
            );
        } else {
            await Address.create({
                userId: session.user.id,
                lat: data.lat,
                lng: data.lng,
                state: data.state,
                city: data.city,
                mobile: data.mobile,
                details: data.details,
                postalCode: data.postalCode,
            });
            return NextResponse.json(
                {
                    success: true,
                    message: "آدرس اضافه شد",
                },
                { status: 200 }
            );
        }

        // return NextResponse.json(
        //     {
        //         success: true,
        //         message: "آدرس اضافه شد",
        //     },
        //     { status: 200 }
        // );
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
