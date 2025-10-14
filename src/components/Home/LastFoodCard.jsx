import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GrFavorite } from 'react-icons/gr'
import { IoLocationOutline } from 'react-icons/io5'
import styles from './LastFoodCard.module.css'
import Stars from './Stars'

function LastFoodCard(props) {
    const {_id ,restaurantType , logo , branch , deliveryTime , address , background} = props
    return (
        <Link className={styles.card} href={`/store/${_id}`}>
            <div className={styles.header}>
                <div className={styles.image}>
                    <Image
                    alt=''
                    fill
                    placeholder='blur'
                    blurDataURL='/Images/vector.webp'
                    src={`${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${background}`} />
                </div>

                <div className={styles.favorits}>
                    <GrFavorite />
                </div>

                <div 
                style={{background: `url(${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${logo})`}}
                className={styles.logo}>
                </div>

                <div className={styles.deliveryTime}>
                    <span>{deliveryTime}</span>
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.title}>
                    <h3>{restaurantType}</h3>
                    <span>({branch})</span>
                </div>

                <div className={styles.details}>
                    <div className={styles.right}>
                        <IoLocationOutline />
                        <span>{address}</span>
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
