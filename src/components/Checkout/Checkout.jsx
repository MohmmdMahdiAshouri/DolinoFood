"use client"
import { useContext } from 'react'
import Cart from '../Global/Cart/Cart'
import styles from './Checkout.module.css'
import DeliveryMethod from './DeliveryMethod'
import Description from './Description'
import Discount from './Discount'
import FinalPrice from './FinalPrice'
import PaymentMethod from './PaymentMethod'
import SetAddress from './SetAddress'
import Terminals from './Terminals'
import { CartContext } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

function Checkout() {
    const {cart} = useContext(CartContext)
    const router = useRouter()
    return (
        <>
            {/* { */}
                {/* // cart ? ( */}

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
            {/* //     ) : (
            //         router.back()
            //     )
            // } */}
        </>
    )
}

export default Checkout
