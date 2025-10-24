import Cart from "../Global/Cart/Cart";
import Modal from "../Global/Modal/Modal";
import Background from "./Background";
import Details from "./Details";
import styles from "./Store.module.css";
import Tabs from "./Tabs";

function Store({ data }) {
    return (
        <div className="container">
            <div className={styles.store}>
                <div className={styles.right}>
                    <Background data={data.restaurant} />
                    <Details data={data.restaurant} />
                    <Tabs data={data} />
                </div>

                <div className={styles.left}>
                    <Cart data={data}/>
                </div>
            </div>
        </div>
    );
}

export default Store;
