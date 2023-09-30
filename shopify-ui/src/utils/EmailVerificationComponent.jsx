import { useDispatch, useSelector } from 'react-redux'
import {verifyEmail} from '../services/user/verifyEmail'
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material'
import React, {useState} from 'react'
import OtpComponent from './OtpComponent'

const EmailVerificationComponent = ({login, errorObj, verified}) => {
    const dispatch = useDispatch()
    const state = useSelector(store => store.verifyEmail)
    
    const {loginFrom, setLoginForm} = login
    const {error, setError} = errorObj
    const {isVerified} = verified
    const [showOtp, setShowOtp] = useState(false)

    const handleEmailInput = (e) => {
        setLoginForm({
            ...loginFrom,
            email: e.target.value
        })
    }

    const validateEmail = () =>{
        var email = loginFrom.email
        var hasError = false

        if(email.length === 0){
            setError({
                ...error,
                emailError: 'Please enter your email',
            })
            hasError = true
        }
        else if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) === false){
            setError({
                ...error,
                emailError: 'Please enter a valid email',
            })
            hasError = true
        }else{
            setError({
                emailError: '',
                passwordError: '',
                confirmPassword: ''
            })
            hasError = false
        }
        return hasError
    }

    const OnSubmit = (e) => {
        e.preventDefault()
        
        const hasError = validateEmail();
        
        if(!hasError){
            console.log("Call for validating Email", loginFrom.email);
            dispatch(verifyEmail(loginFrom)).then(()=>{
                if(state.msg !== ''){
                    alert(state.msg)
                }
                setShowOtp(true)
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

    const otp = {showOtp, setShowOtp}
    return (
        <>
            {
                showOtp ? 
                    <OtpComponent verified={verified} otp={otp} login={login}/> :
                    <Box component={'form'} onSubmit={(e)=>{OnSubmit(e)}} method='post' className='flex flex-col space-y-4 items-center justify-center'>
                        <FormControl className='w-full'>
                            <InputLabel htmlFor='email'>Email</InputLabel>
                            <OutlinedInput id='email' type='text' label='Email' value={loginFrom.email} onChange={(e)=>handleEmailInput(e)}/>
                            <FormHelperText error focused id='emailHelper'>{error.emailError}</FormHelperText>
                            <Button variant={isVerified? 'contained' : 'outlined'}color='success' type='submit' sx={{marginTop: 1}} disabled={isVerified}>{isVerified? 'Verified': 'Verify'}</Button>
                        </FormControl>
                    </Box>
            }
        </>
    )
}

export default EmailVerificationComponent
