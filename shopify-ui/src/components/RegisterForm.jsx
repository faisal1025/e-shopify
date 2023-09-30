import { Box, Card, CardContent, CardHeader } from '@mui/material'
import React, { useState } from 'react'
import PasswordComponent from '../utils/PasswordComponent'
import EmailVerificationComponent from '../utils/EmailVerificationComponent'

const RegisterForm = () => {
    const [isVerified, setIsVerified] = useState(false)
   

    const [loginFrom, setLoginForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        otp: ''
    })

    const [error, setError] = useState({
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
        first_nameError: '',
        last_nameError: ''
    })
    
    const login = {loginFrom, setLoginForm}
    const errorObj = {error, setError}
    const verified = {isVerified, setIsVerified}
    
    return (
        <> 
        <Card className='w-full' variant="outlined">
            <CardHeader title="Register" />
            <CardContent>
                <Box component={'div'} >
                    {
                        isVerified ? 
                            <PasswordComponent login={login} errorObj={errorObj}/> :
                            <EmailVerificationComponent login={login} errorObj={errorObj} verified={verified}/>
                    }
                </Box>
            </CardContent>
        </Card> 
        </>
    )
}

export default RegisterForm
