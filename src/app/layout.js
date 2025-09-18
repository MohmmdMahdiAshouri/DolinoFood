import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./globals.css";
import "../reset.css";

import "swiper/css"

import 'leaflet/dist/leaflet.css'

export default function RootLayout({ children }) {
    return (
        <html lang="fa-IR" dir="rtl">
            <body className="scrollbar">
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
