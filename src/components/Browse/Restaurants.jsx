import styles from './Restaurants.module.css'
import LastFoodCard from '../Home/LastFoodCard'

function Restaurants() {
    return (
        <div className={styles.restaurants}>
            <LastFoodCard />
            <LastFoodCard />
            <LastFoodCard />
            <LastFoodCard />
            <LastFoodCard />
            <LastFoodCard />
        </div>
    )
}

export default Restaurants
