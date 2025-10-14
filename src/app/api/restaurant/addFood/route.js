import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { checkAccess } from "@/utils/ServerFunctions";
import { foodValidation } from "@/validations/validation";
import Foods from "@/models/Foods";

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
        const isValid = foodValidation(data);
        if (isValid) {
            return NextResponse.json(
                {
                    success: false,
                    message:  isValid.empty || isValid.name || isValid.cat,
                    data: isValid,
                },
                { status: 403 }
            );
        }

        //add or update - step6
        if (data._id) {
            await Foods.updateOne(
                { _id: data._id },
                {
                    $set: {
                        name: data.name,
                        image: data.image,
                        catId : data.catId,
                        catName : data.catName,
                        price : data.price
                    },
                }
            );
        } else {
            await Foods.create({
                restaurantId: session.user.id,
                name: data.name,
                image: data.image,
                catId : data.catId,
                catName : data.catName,
                price : data.price
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
