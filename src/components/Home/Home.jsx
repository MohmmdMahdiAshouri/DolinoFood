import React from 'react'
import Populars from './Populars'
import LastRestaurants from './LastRestaurants'
import Delivery from './Delivery'

function Home({data}) {
    return (
        <div className='container'>
            <Delivery />
            <Populars />
            <LastRestaurants data={data.restaurant}/>
        </div>
    )
}

export default Home
