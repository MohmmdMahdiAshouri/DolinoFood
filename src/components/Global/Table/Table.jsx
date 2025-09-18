import Image from "next/image";
import styles from "./Table.module.css";

function Table({ columns }) {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {columns.map((item , index) => (
                        <th key={index} style={{ width: item.width }}>
                            {item.title}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>1</td>
                    <td>
                        {/* <Image
                            src={"/Images/logotest.png"}
                            objectFit="cover"
                            width={60}
                            height={60}
                            alt=""
                        /> */}
                    </td>
                    <td>آماتا</td>
                    <td>هاشمیه</td>
                    <td className="success status">active</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
}

export default Table;
