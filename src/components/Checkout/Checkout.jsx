import Cart from '../Global/Cart/Cart'
import styles from './Checkout.module.css'
import DeliveryMethod from './DeliveryMethod'
import Description from './Description'
import Discount from './Discount'
import FinalPrice from './FinalPrice'
import PaymentMethod from './PaymentMethod'
import SetAddress from './SetAddress'
import Terminals from './Terminals'

function Checkout() {
    return (
        <div className={`container ${styles.checkout}`}> 
            <div className={styles.right}>
                <Description />
                <DeliveryMethod />
                <SetAddress />
                <Discount />
                <PaymentMethod />
                <Terminals />
                <FinalPrice />
            </div>

            <div className={styles.left}>
                <Cart />
            </div>
        </div>
    )
}

export default Checkout
