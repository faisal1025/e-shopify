import { registerUser } from '../services/user/registerSlice'
import { updateAuth } from '../services/user/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material'
import React from 'react'
import { useNavigate } from  'react-router-dom'

const PasswordComponent = ({login, errorObj}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const state = useSelector(store => store.register)

    const {loginFrom, setLoginForm} = login
    const {error, setError} = errorObj
    
    const handleFirstNameInput = (e) => {
        setLoginForm({
            ...loginFrom,
            first_name: e.target.value
        })
    
    }
    const handleLastNameInput = (e) => {
        setLoginForm({
            ...loginFrom,
            last_name: e.target.value
        })
    
    }
    const handlePasswordInput = (e) => {
        setLoginForm({
            ...loginFrom,
            password: e.target.value
        })
    
    }
    const handleConfirmPasswordInput = (e) => {
        setLoginForm({
            ...loginFrom,
            confirmPassword: e.target.value
        })
    }

    const validatePassword = () => {
        var password = loginFrom.password
        var confirmPassword = loginFrom.confirmPassword
        var firstName = loginFrom.first_name
        var lastName = loginFrom.last_name
        var hasError = true

        if(firstName.length < 3){
            setError({
                emailError: '',
                first_nameError: 'First Name must be atlest 3 characters'
            })
            hasError = true
        }else if(lastName.length < 3){
            setError({
                emailError: '',
                first_nameError: '',
                last_nameError: 'Last Name must be atlest 3 characters'
            })
            hasError = true
        }else if(password.length === 0){
            setError({
                emailError: '',
                first_nameError: '',
                last_nameError: '',
                passwordError: 'Password must required',
            })
            hasError = true
        }else if(password.length > 0 && password.length < 8){
            setError({
                emailError: '',
                first_nameError: '',
                last_nameError: '',
                passwordError: 'Password length must be atleast 8 characters'
            })
            hasError = true
        }else if(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(password) === false){
            setError({
                emailError: '',
                first_nameError: '',
                last_nameError: '',
                passwordError: ("Your password must contain:<br />1. At least 1 small letter a-z.<br />2. At least 1 capital letter A-Z.<br />3. At least 1 numerical digit 0-9.<br />4. At least 1 symbol !@#$%^&*.")
            })
            hasError = true
        }else if(password !== confirmPassword){
            setError({
                emailError: '',
                first_nameError: '',
                last_nameError: '',
                passwordError: '',
                confirmPasswordError: 'Password doesn\'t matched' 
            })
            hasError = true
        }else{
            setError({
                emailError: '',
                first_nameError: '',
                last_nameError: '',
                passwordError: '',
                confirmPassword: ''
            })
            hasError = false
        }
        return hasError;
    }

    const OnSubmit = (e) => {
        e.preventDefault()
        
        const hasError = validatePassword();
        
        if(!hasError){
            console.log("Call for making Account", loginFrom.first_name, loginFrom.last_name, loginFrom.email, loginFrom.password, loginFrom.confirmPassword);
            dispatch(registerUser(loginFrom)).then(()=>{
                dispatch(updateAuth())
                navigate("/");
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
    return (
        <>
            <Box component={'form'} onSubmit={(e)=>{OnSubmit(e)}} method='post' className='flex flex-wrap flex-col space-y-4 items-center justify-center'>
                
                <div className="flex space-x-1">
                    <FormControl className='w-2/4'>
                        <InputLabel htmlFor='first-name'>First Name</InputLabel>
                        <OutlinedInput id='first-name' type='text' label='first_name' value={loginFrom.first_name} onChange={(e)=>handleFirstNameInput(e)}/>
                        <FormHelperText error focused id='firstNameHelper'>{error.first_nameError}</FormHelperText>
                    </FormControl>

                    <FormControl className='w-2/4'>
                        <InputLabel htmlFor='last-name'>Last Name</InputLabel>
                        <OutlinedInput id='last-name' type='text' label='last_name' value={loginFrom.last_name} onChange={(e)=>handleLastNameInput(e)}/>
                        <FormHelperText error focused id='lasttNameHelper'>{error.last_nameError}</FormHelperText>
                    </FormControl>
                </div>

                <FormControl className='w-full'>
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <OutlinedInput id='password' type='password' label='Password' value={loginFrom.password} onChange={(e)=>handlePasswordInput(e)}/>
                    <FormHelperText error focused id='passwordHelper'>
                        <div dangerouslySetInnerHTML={{ __html: error.passwordError }} />
                    </FormHelperText>
                </FormControl>

                <FormControl className='w-full' >
                    <InputLabel htmlFor='confirm_password'> Confirm Password</InputLabel>
                    <OutlinedInput id='confirm_password' type='password' label='Password' value={loginFrom.confirmPassword} onChange={(e)=>handleConfirmPasswordInput(e)}/>
                    <FormHelperText error focused id='confirmPasswordHelper'>{error.confirmPasswordError}</FormHelperText>
                </FormControl>

                <Box component={'div'} className='space-x-4'>
                    <Button type='submit' aria-label='Register' variant='outlined' color='primary'>Register</Button>
                    <Button type='reset' aria-label='Cancle' variant='outlined' color='error'>Cancle</Button>
                </Box>
            </Box>
        </>
    )
}

export default PasswordComponent
