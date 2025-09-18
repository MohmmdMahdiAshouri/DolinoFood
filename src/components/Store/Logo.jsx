import styles from './Logo.module.css'

function Logo() {
    return (
        <div 
            style={{background: "url(/Images/logotest.png)"}}
            className={styles.logo}>
        </div>
    )
}

export default Logo
