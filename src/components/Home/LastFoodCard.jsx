import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GrFavorite } from 'react-icons/gr'
import { IoLocationOutline } from 'react-icons/io5'
import styles from './LastFoodCard.module.css'
import Stars from './Stars'

function LastFoodCard() {
    return (
        <Link className={styles.card} href={""}>
            <div className={styles.header}>
                <div className={styles.image}>
                    <Image
                    alt=''
                    fill
                    placeholder='blur'
                    blurDataURL='/Images/vector.webp'
                    src='/Images/testpop.webp' />
                </div>

                <div className={styles.favorits}>
                    <GrFavorite />
                </div>

                <div 
                style={{background: `url("/Images/logotest.png")` }}
                className={styles.logo}>
                </div>

                <div className={styles.deliveryTime}>
                    <span>60 تا 70</span>
                    <span>دقیقه</span>
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.title}>
                    <h3>آماتا</h3>
                    <span>(خاوران)</span>
                </div>

                <div className={styles.details}>
                    <div className={styles.right}>
                        <IoLocationOutline />
                        <span>خاوران</span>
                    </div>
                    <div className={styles.left}>
                        <span className={styles.comments}>{`(420 نظر)`}</span>
                        <div>
                            <Stars />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default LastFoodCard
