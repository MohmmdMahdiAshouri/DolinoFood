import Tracking from '@/components/Tracking/Tracking'
import React, { use } from 'react'

function page({params}) {
    const {id} = use(params)
    return (
        <Tracking id={id}/>
    )
}

export default page
