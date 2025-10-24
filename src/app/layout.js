import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import NextAuthProvider from "@/utils/NextAuthProvider";
import LoginModal from "@/components/Global/LoginModal/LoginModal";
import { AccountProvider } from "@/context/AccountContext";
import { ViewProvider } from "@/context/ViewContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { AddressProvider } from "@/context/AddressContext";

import "./globals.css";
import "../reset.css";

import "swiper/css";

import "leaflet/dist/leaflet.css";

import { ConfigProvider } from "antd";

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
                                        <OrderProvider>
                                            <AddressProvider>
                                                <LoginModal />
                                                <Header />
                                                {children}
                                                <Footer />
                                            </AddressProvider>
                                        </OrderProvider>
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
