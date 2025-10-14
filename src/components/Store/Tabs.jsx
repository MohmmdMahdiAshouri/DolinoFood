"use client"
import { useState } from 'react'
import Comments from './Comments'
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('./Map'), { ssr: false })
import Menu from './Menu'
import styles from './Tabs.module.css'

function Tabs({data}) {

    const [active , setActive] = useState(0)

    return (
        <div>
            <div className={styles.tabs}>
                <button onClick={() => setActive(0)} className={`${active === 0 && styles.active}`}>منوی رستوران</button>
                <button onClick={() => setActive(1)} className={`${active === 1 && styles.active}`}>نظرات کاربران</button>
                <button onClick={() => setActive(2)} className={`${active === 2 && styles.active}`}>اطلاعات کلی</button>
            </div>
            <div className={styles.content}>
                {active === 0 && <Menu data={data.menu}/>}
                {active === 1 && <Comments />}
                {active === 2 && <Map position={[data.restaurant.lat , data.restaurant.lng]}/>}
            </div>
        </div>
    )
}

export default Tabs
