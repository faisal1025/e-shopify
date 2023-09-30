import { useDispatch, useSelector } from 'react-redux'
import { verifyOtp } from '../services/user/verifyOtp'
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material'
import React from 'react'

const OtpComponent = ({verified, otp, login}) => {
    const dispatch = useDispatch()
    const state = useSelector(store => store.verifyOtp)

    const {loginFrom, setLoginForm} = login
    const {isVerified, setIsVerified} = verified
    const {showOtp, setShowOtp} = otp

    const handleOtpInput = (e) => {
        setLoginForm({
            ...loginFrom,
            otp: e.target.value
        })
        console.log(loginFrom.otp);
    }

    const OnSubmit = (e) => {
        e.preventDefault()
        console.log("Call for validating Otp", loginFrom.otp);
        dispatch(verifyOtp(loginFrom)).then(()=>{
            console.log(state);
            if(state.msg !== ''){
                alert(state.msg)
            }
            setIsVerified(true)
        }).catch((error)=>{
            console.log(error);
        })
    }

    return (
        <>
             <Box component={'form'} onSubmit={(e)=>{OnSubmit(e)}} method='post' className='flex flex-col space-y-4 items-center justify-center'>
                <FormControl className='w-full'>
                    <InputLabel htmlFor='otp'>Enter OTP</InputLabel>
                    <OutlinedInput id='otp' type='text' label='Otp' value={loginFrom?.otp} onChange={(e)=>handleOtpInput(e)}/>
                    <FormHelperText error focused id='emailHelper'></FormHelperText>
                    <Button variant='outlined' color='success' type='submit' sx={{marginTop: 1}}>Verify OTP</Button>
                    <Button variant='outlined' color='error' onClick={()=>{setShowOtp(false)}} sx={{marginTop: 1}}>Cancle</Button>
                </FormControl>
            </Box>
        </>
    )
}

export default OtpComponent
