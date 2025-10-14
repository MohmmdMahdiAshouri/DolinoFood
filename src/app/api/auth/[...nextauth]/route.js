import Restaurant from "@/models/Restaurants";
import connectDB from "@/utils/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { unHashPassword } from "../../../../utils/ServerFunctions";
import User from "@/models/User";

export const authOptions = {
    session: { strategy: "jwt" },

    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        CredentialsProvider({
            id: "restaurant-login",
            name: "Restaurant",
            async authorize(credentials) {
                try {
                    //get datas - step1
                    const { userName, password } = credentials;

                    //connect to db - step2
                    await connectDB();

                    //get Restaurant - step3
                    const restaurant = await Restaurant.findOne({ userName });
                    if (!restaurant)
                        throw new Error("نام کاربری یا رمز عبور اشتباه است");

                    //check password - step4
                    const pass = await unHashPassword(
                        password,
                        restaurant.password
                    );
                    if (!pass)
                        throw new Error("نام کاربری یا رمز عبور اشتباه است");

                    return {
                        name: restaurant.name || "نامشخص",
                        userName: restaurant.userName,
                        id: String(restaurant._id),
                        roles: restaurant.roles,
                    };
                } catch (error) {
                    throw new Error(error.message);
                }
            },
        }),

        CredentialsProvider({
            id: "user-login",
            name: "User",
            async authorize(credentials) {
                try {
                    const { mobile } = credentials;

                    await connectDB();

                    const user = await User.findOne({ mobile });
                    if (!user) throw new Error("شماره وارد شده اشتباه است");

                    return {
                        id: String(user._id),
                        mobile: user.mobile,
                        roles: user.roles || ["USER"],
                        favorits : user.favorits,
                        first_name : user.first_name,
                        last_name : user.last_name,
                    };
                } catch (error) {
                    throw new Error(error.message);
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.roles = user.roles;
                token.userName = user.userName;
                token.mobile = user.mobile;
                token.favorits = user.favorits;
                token.first_name = user.first_name
                token.last_name = user.last_name
            }
            return token;
        },

        async session({ session, token }) {
            session.user.id = token.id;
            session.user.roles = token.roles;
            session.user.name = token.name;
            session.user.userName = token.userName;
            
            session.user.mobile = token.mobile;
            session.user.favorits = token.favorits;
            session.user.first_name = token.first_name;
            session.user.last_name = token.last_name;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
