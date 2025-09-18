import Image from 'next/image'
import styles from './Footer.module.css'

function Footer() {
    return (
        <div className={styles.allFooter}>
            <div className={`${styles.footer} container`}>
                <div className={styles.rigth}>
                    <p>تمامی کالاها و خدمات این سایت، دارای مجوزهای لازم از مراجع مربوطه می‌باشند و فعالیت‌های این سایت تابع قوانین و مقررات جمهوری اسلامی ایران است.</p>
                </div>
                <div className={styles.left}>
                    <Image src={"/images/samandehi.webp"} alt='samandehi' width={70} height={80}/> 
                    <Image src={"/images/enamad.webp"} alt='enamad' width={70} height={80}/> 
                </div>
            </div>
        </div>
    )
}

export default Footer
