"use client"
import PopularCard from "./PopularCard";
import styles from "./Populars.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

function Populars() {
    return (
        <div className={styles.popular}>
            <h3>محبوب ترین ها</h3>
            <Swiper
                slidesPerView={5.5}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                className="mySwiper"
            >
                <SwiperSlide>
                    <PopularCard />
                </SwiperSlide>

                <SwiperSlide>
                    <PopularCard />
                </SwiperSlide>

                <SwiperSlide>
                    <PopularCard />
                </SwiperSlide>
                <SwiperSlide>
                    <PopularCard />
                </SwiperSlide>
                <SwiperSlide>
                    <PopularCard />
                </SwiperSlide>
                <SwiperSlide>
                    <PopularCard />
                </SwiperSlide>
                <SwiperSlide>
                    <PopularCard />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Populars;
