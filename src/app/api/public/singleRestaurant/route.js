import Category from "@/models/Category";
import Foods from "@/models/Foods";
import Restaurant from "@/models/Restaurants";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        //connect database - step1
        await connectDB();

        //get datas - step2
        const data = await req.json();

        //get Restaurant - step3
        const restaurant = await Restaurant.findOne({ _id: data._id });
        const foods = await Foods.find({restaurantId : restaurant._id})
        const categories = await Category.find({restaurantId : restaurant._id})

        //create menu - step4
        const menu = []
        const categoryMap = {}

        foods.forEach(food => {
            let catId = food.catId
            if(!categoryMap[catId]){
                categoryMap[catId] = []
            }
            categoryMap[catId].push(food)
        })

        categories.forEach(category => {
            let categoryFoods = categoryMap[category._id] || []

            menu.push({
                catName : category.name,
                catId : category._id,
                foods : categoryFoods
            })
        })

        return NextResponse.json(
            {
                success: true,
                data: {restaurant , menu},
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
