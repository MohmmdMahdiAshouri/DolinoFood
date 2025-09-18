import Table from "@/components/Global/Table/Table";
import styles from "./Restaurant.module.css";

function Restaurant() {
    const columns = [
        {
            title: "#",
            width: "2%",
            render: (item, index) => <span>{index + 1}</span>,
        },

        {
            title: "لوگو",
            width: "5%",
            render: (item, index) => (
                <Image
                    src="/Imags/logotest.png"
                    alt="logo"
                    width={45}
                    height={45}
                    style={{ borderRadius: "15px", marginTop: "10px" }}
                />
            ),
        },

        {
            title: "رستوران",
            width: "10%",
            render: (item, index) => <span key={index}>{item.restaurant}</span>,
        },

        {
            title: "شعبه",
            width: "5%",
            render: (item, index) => <span>{item.branch}</span>,
        },

        {
            title: "وضعیت",
            width: "5%",
            render: (item, index) => (
                <span className={`status ${item.status}`}>
                    {Status(item.status)}
                </span>
            ),
        },

        {
            title: "عملیات",
            width: "10%",
            render: (item, index) => (
                <div className="tableBtns">
                    <button onClick={() => deleteItem(item)} className="btn">
                        حذف
                    </button>
                    <button onClick={() => editItem(item)} className="btn">
                        ویرایش
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Table columns={columns}/>
        </div>
    );
}

export default Restaurant;
