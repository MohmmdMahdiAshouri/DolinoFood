import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { checkAccess } from "@/utils/ServerFunctions";
import Foods from "@/models/Foods";
import Cart from "@/models/Cart";
import { message } from "antd";

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

        //get user cart - step6
        const cart = await Cart.findOne({ userId: session.user.id });

        if (cart) {
            if (String(cart.restaurantId) !== String(food.restaurantId)) {
                return NextResponse.json(
                    {
                        success: false,
                        message:
                            "آیا میخواهید از خرید رستوران قبلی انصراف دهید؟",
                    },
                    { status: 403 }
                );
            }

            const isFood = cart.items.find(
                (item) => String(item._id) === String(food._id)
            );
            if (isFood) {
                const index = cart.items.findIndex(
                    (item) => String(item._id) === String(food._id)
                );
                let items = cart.items;
                items[index].count = items[index].count + 1;
                await Cart.updateOne(
                    { userId: session.user.id },
                    {
                        $set: {
                            items,
                            restaurantId : food.restaurantId
                        },
                    }
                );
            } else {
                let items = cart.items;
                items.push({
                    name: food.name,
                    price: food.price,
                    catName: food.catName,
                    image: food.image,
                    _id: food._id,
                    count: 1,
                });
                await Cart.updateOne(
                    { userId: session.user.id },
                    {
                        $set: {
                            items,
                            restaurantId : food.restaurantId
                        },
                    }
                );
            }
        } else {
            //add to cart - step7
            await Cart.create({
                userId: session.user.id,
                items: [
                    {
                        name: food.name,
                        price: food.price,
                        catName: food.catName,
                        image: food.image,
                        _id: food._id,
                        count: 1,
                    },
                ],
                restaurantId: food.restaurantId,
            });
        }

        return NextResponse.json(
            {
                success: true,
                message: "اضافه شد",
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
