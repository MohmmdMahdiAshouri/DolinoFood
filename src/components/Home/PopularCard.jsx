import styles from './PopularCard.module.css'
import Image from 'next/image'
import Link from 'next/link'

function PopularCard() {
    return (
        <Link href={""}>
            <div className={styles.card}>
                <Image fill alt='food' src='/Images/testbg.webp' />
                <span className={styles.title}>سالاد</span>
            </div>
        </Link>
    )
}

export default PopularCard
