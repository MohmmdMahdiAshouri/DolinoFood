
import { Rate } from 'antd';

function Stars (){
    return (
        <div>
            <Rate 
                allowHalf
                style={{fontSize:"15px" , color : "#ef4123" , margin:"10px 0"}}
                starColor= '#55555'
                defaultValue={2.5} />
        </div>
    )
}

export default Stars
