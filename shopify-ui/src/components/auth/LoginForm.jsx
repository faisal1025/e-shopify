import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../services/user/loginSlice'
import { updateAuth } from '../../services/user/authSlice'
import { Box, Button, Card, CardContent, CardHeader, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginForm = () => {
    const dispatch = useDispatch()
    const state = useSelector(store => store.login)
    const navigate = useNavigate()
    
    const [loginFrom, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState({
        emailError: '',
        passwordError: '',
    })

    const validateForm = () => {
        var email = loginFrom.email
        var password = loginFrom.password
        var hasError = true

        if(email.length === 0){
            setError({
                passwordError: '',
                emailError: 'Please enter your email',
            })
            hasError = true
        }
        else if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) === false){
            setError({
                passwordError: '',
                emailError: 'Please enter a valid email',
            })
            hasError = true
        }
        else if(password.length === 0){
            setError({
                emailError: '',
                passwordError: 'Password must required',
            })
            hasError = true
        }else{
            setError({
                emailError: '',
                passwordError: '',
            })
            hasError = false
        }
        return hasError;
    }
    
    const handleEmailInput = (e) => {
        setLoginForm({
            ...loginFrom,
            email: e.target.value
        })
    }
    
    const handlePasswordInput = (e) => {
        setLoginForm({
            ...loginFrom,
            password: e.target.value
        })
    }
    
    const OnSubmit = (e) => {
        e.preventDefault()
        
        const isValid = validateForm();

        if(!isValid){
            dispatch(loginUser(loginFrom)).then((res) => {
                if(res.payload.status){
                    dispatch(updateAuth())
                    navigate('/');
                    toast.success(res.payload.msg)
                }else{
                    toast.info(res.payload.msg)
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }
    
    return (
        <> 
        <Card className='w-full' variant="outlined">
            <CardHeader title="Login" />
            <CardContent>
                <Box component={'form'} className='flex flex-col space-y-4 items-start justify-center' onSubmit={(e)=>{OnSubmit(e)}} method='post'>
                    <FormControl className='w-full'>
                        <InputLabel htmlFor='email'>Email</InputLabel>
                        <OutlinedInput id='email' type='text' label='Email' value={loginFrom.email} onChange={(e)=>handleEmailInput(e)}/>
                        <FormHelperText error focused id='emailHelper'>{error.emailError}</FormHelperText>
                    </FormControl>
                    <FormControl className='w-full'>
                        <InputLabel htmlFor='password'>Password</InputLabel>
                        <OutlinedInput id='password' type='password' label='Password' value={loginFrom.password} onChange={(e)=>handlePasswordInput(e)}/>
                        <FormHelperText error focused id='passwordHelper'>{error.passwordError}</FormHelperText>
                    </FormControl>
                    <Box component={'div'} className='space-x-4'>
                        <Button type='submit' aria-label='Login' variant='outlined' color='primary'>Login</Button>
                        <Button type='reset' aria-label='Cancle' variant='outlined' color='error'>Cancle</Button>
                    </Box>
                </Box>
            </CardContent>
        </Card> 
        </>
    )
}

export default LoginForm
