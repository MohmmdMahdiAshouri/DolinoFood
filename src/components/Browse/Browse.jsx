import styles from "./Browse.module.css";
import Filters from "./Filters";
import Restaurants from "./Restaurants";

function Browse() {
    return (
        <div className={`container ${styles.browse}`}>
            <Filters />
            <Restaurants />
        </div>
    );
}

export default Browse;
