import styles from "./Comments.module.css";
import { BiUser } from "react-icons/bi";

function Comments() {
    return (
        <div className={styles.comments}>
            <div className={styles.item}>
                <div className={styles.head}>
                    <div className={styles.right}>
                        <div className={styles.prof}>
                            <BiUser />
                        </div>

                        <div className={styles.user}>
                            <h4>09923878875</h4>
                            <span>18 آبان 1403</span>
                        </div>
                    </div>
                    <div className={styles.left}>😊 😂 😍 😊</div>
                </div>

                <div className={styles.content}>
                    <p></p>
                </div>
            </div>

            <div className={styles.item}>
                <div className={styles.head}>
                    <div className={styles.right}>
                        <div className={styles.prof}>
                            <BiUser />
                        </div>

                        <div className={styles.user}>
                            <h4>09923878875</h4>
                            <span>18 آبان 1403</span>
                        </div>
                    </div>
                    <div className={styles.left}>😊 😂 😍 😊</div>
                </div>

                <div className={styles.content}>
                    <p></p>
                </div>
            </div>
            
            <div className={styles.item}>
                <div className={styles.head}>
                    <div className={styles.right}>
                        <div className={styles.prof}>
                            <BiUser />
                        </div>

                        <div className={styles.user}>
                            <h4>09923878875</h4>
                            <span>18 آبان 1403</span>
                        </div>
                    </div>
                    <div className={styles.left}>😊 😂 😍 😊</div>
                </div>

                <div className={styles.content}>
                    <p></p>
                </div>
            </div>
        </div>
    );
}

export default Comments;
