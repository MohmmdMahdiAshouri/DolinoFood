import Details from './Details'
import Items from './Items'
import Map from './Map'
import OrderStatus from './OrderStatus'
import styles from './Tracking.module.css'

function Tracking() {
    return (
        <div className={`container ${styles.tracking}`}>
            <OrderStatus />
            <Details />
            <Map />
            <Items />
        </div>
    )
}

export default Tracking
