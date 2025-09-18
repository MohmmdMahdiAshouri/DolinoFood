import { LiaSearchSolid } from "react-icons/lia";
import styles from "./Menu.module.css";
import FoodCart from "./FoodCart";
import { useState } from "react";

function Menu({data}) {
    
    const [foods , setFoods] = useState(data)
    // برای فیلتر سازی غذا ها قسمت 55 رو ببین

    return (
        <div className={styles.menu}>
            <div className={styles.search}>
                <a className={styles.iconbox}>
                    <LiaSearchSolid className={styles.icon}/>
                </a>
                <input
                    type="text"
                    placeholder="جستجو در منو ..."
                    className={styles.input}
                />
            </div>

            <div className={styles.items}>
                <div className={styles.item}>
                    <h2 className={styles.catTitle}>پیتزا</h2>
                    <div className={styles.foods}>
                        <FoodCart />
                        <FoodCart />
                        <FoodCart />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Menu;
