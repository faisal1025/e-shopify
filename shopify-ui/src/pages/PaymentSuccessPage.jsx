import React from 'react'
import { Typography } from '@mui/material'
import {useSearchParams} from 'react-router-dom'

const PaymentSuccessPage = () => {
    const searchParams = useSearchParams()[0]
    const referenceNumber = searchParams.get('reference');
    return (
        <>
            <div className='flex flex-row justify-center items-center h-screen'>
                <div className="flex flex-col justify-center items-center">
                    <Typography variant='h1' fontSize={'xx-large'}>Payment Successfully Done</Typography>
                    <Typography variant='body1'>reference number: {referenceNumber}</Typography>
                    <Typography variant='body2' className='py-6'>It is safe to go back or close this window</Typography>
                </div>
            </div>  
        </>
    )
}

export default PaymentSuccessPage
