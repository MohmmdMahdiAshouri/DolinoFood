import { MdOutlineFavoriteBorder } from 'react-icons/md'
import styles from './Favorits.module.css'

function Favorits() {
    return (
        <div className={styles.favorits}>
            <MdOutlineFavoriteBorder/>
            <span>علاقه مندی</span>
        </div>
    )
}

export default Favorits
