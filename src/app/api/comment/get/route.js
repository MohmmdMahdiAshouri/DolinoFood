import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { checkAccess} from "@/utils/ServerFunctions";
import mongoose from "mongoose";
import Comment from "@/models/Comment";

export async function GET(req) {
    try {
        //get init user's data such as Id - step1
        const session = await getServerSession(authOptions);
        if (!session) throw new Error("لطفا وارد شوید");

        //check access - step2
        const isAccess = checkAccess(["MERCHANT"], session.user.roles);
        if (!isAccess) throw new Error("فقط ادمین ها دسترسی دارند");

        //connect database - step3
        await connectDB();

        //get order - step4
        const comments = await Comment.aggregate([
            {
                $match: {
                    restaurantId: new mongoose.Types.ObjectId(session.user.id),
                },
            },
            {
                $lookup: {
                    from: "restaurants",
                    localField: "restaurantId",
                    foreignField: "_id",
                    as: "restaurant",
                },
            },

            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                },
            },
        ]);

        return NextResponse.json(
            {
                success: true,
                data: comments,
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
