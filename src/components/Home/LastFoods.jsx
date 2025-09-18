"use client"
import { SlArrowLeft } from 'react-icons/sl'
import styles from './LastFoods.module.css'
import Link from 'next/link'
import { Swiper, SwiperSlide } from "swiper/react";
import LastFoodCard from './LastFoodCard'

function LastFoods() {
    return (
        <div className={styles.merchantSlider}>
            <div className={styles.headers}>
                <h3>جدیدترین ها</h3>
                <div className={styles.left}>
                    <Link href={"/browse"}>مشاهده همه</Link>
                    <SlArrowLeft />
                </div>
            </div>

            <div className={styles.slider}>
                <Swiper
                spaceBetween={30}
                slidesPerView={4}
                pagination={{
                    clickable: true,
                }}
                className="mySwiper"
                >
                    <SwiperSlide>
                        <LastFoodCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <LastFoodCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <LastFoodCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <LastFoodCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <LastFoodCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <LastFoodCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <LastFoodCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <LastFoodCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <LastFoodCard />
                    </SwiperSlide>
                </Swiper>
            </div>


        </div>
    )
}

export default LastFoods
