import React from 'react'
import Populars from './Populars'
import LastFoods from './LastFoods'
import Delivery from './Delivery'

function Home() {
    return (
        <div className='container'>
            <Delivery />
            <Populars />
            <LastFoods />
        </div>
    )
}

export default Home
