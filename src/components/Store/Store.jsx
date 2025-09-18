import Cart from '../Global/Cart/Cart'
import Background from './Background'
import Details from './Details'
import styles from './Store.module.css'
import Tabs from './Tabs'

function Store() {
    return (
        <div className='container'>
            <div className={styles.store}>
                <div className={styles.right}>
                    <Background />
                    <Details />
                    <Tabs />
                </div>

                <div className={styles.left}>
                    <Cart />
                </div>
            </div>
        </div>
    )
}

export default Store
