import styles from './Logo.module.css'

function Logo({logo}) {
    return (
        <div 
            style={{background: `url(${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${logo})`}}
            className={styles.logo}>
        </div>
    )
}

export default Logo
