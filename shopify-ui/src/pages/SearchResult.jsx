import React from 'react'
import { useSelector } from 'react-redux'
import notResults from '../../src/assets/home/no-results.png'

const SearchResult = () => {
    const {data, isLoading} = useSelector(store => store.search)
    return (
        <>
            <div className="flex flex-row min-h-screen">
                {
                    data?
                    <>
                        
                    </>:
                    <>
                        <div className='flex flex-col justify-center items-center min-w-full'>
                            <img src={notResults} alt="no-result" style={{width: '150px', height: '150px', marginBottom: '3rem'}} />
                            <div className='font-semibold'> Please search for the results </div>
                        </div>
                    </>
                }
                
            </div>
        </>
    )
}

export default SearchResult
