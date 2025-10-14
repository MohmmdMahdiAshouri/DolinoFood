import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import NextAuthProvider from "@/utils/NextAuthProvider";
import { AccountProvider } from "@/context/AccountContext";
import LoginModal from "@/components/Global/LoginModal/LoginModal";
import "./globals.css";
import "../reset.css";

import "swiper/css";

import "leaflet/dist/leaflet.css";
import { ConfigProvider, notification } from "antd";
import { ViewProvider } from "@/context/ViewContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

export default function RootLayout({ children }) {
    return (
        <html lang="fa-IR" dir="rtl">
            <body className="scrollbar">
                <NextAuthProvider>
                    <ConfigProvider
                        theme={{
                            token: {
                                fontFamily: "IRANYekan",
                            },
                        }}
                    >
                        <AccountProvider>
                            <ViewProvider>
                                <AuthProvider>
                                    <CartProvider>
                                        <LoginModal />
                                        <Header />
                                        {children}
                                        <Footer />
                                    </CartProvider>
                                </AuthProvider>
                            </ViewProvider>
                        </AccountProvider>
                    </ConfigProvider>
                </NextAuthProvider>
            </body>
        </html>
    );
}
