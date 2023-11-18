import React from 'react'
import { useParams } from 'react-router'

const CategoryProducts = () => {
    const {category} = useParams();
    return (
        <>
            <div>
                {category}
            </div>
        </>
    )
}

export default CategoryProducts
