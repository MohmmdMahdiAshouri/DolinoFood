"use client"
import { LiaSearchSolid } from "react-icons/lia";
import styles from "./Menu.module.css";
import FoodCart from "./FoodCart";
import { useRef, useState } from "react";

function Menu({ data }) {
    
    const menu = useRef(data)
    const [foods, setFoods] = useState(data);

    const changeHandler = (e) => {
        const result = menu.current
            .map((category) => {
                const filterFoods = category.foods.filter((food) =>
                    food.name.includes(e.target.value.trim())
                );

                if (filterFoods.length > 0){
                    return { ...category, foods: filterFoods };
                }

                return null;
            })
            .filter((category) => category !== null);

        setFoods(result);
    };

    return (
        <div className={styles.menu}>
            <div className={styles.search}>
                <a className={styles.iconbox}>
                    <LiaSearchSolid className={styles.icon} />
                </a>
                <input
                    type="text"
                    placeholder="جستجو در منو ..."
                    className={styles.input}
                    onChange={changeHandler}
                />
            </div>

            <div className={styles.items}>
                {foods.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <h2 className={styles.catTitle}>{item.catName}</h2>
                        <div className={styles.foods}>
                            {item.foods.map((foodItem, foodIndex) => (
                                <FoodCart key={foodIndex} data={foodItem} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu;
