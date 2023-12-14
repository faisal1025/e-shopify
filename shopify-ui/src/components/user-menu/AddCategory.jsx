
import { Avatar, Box, Button, Card, CardContent, CardHeader, FormControl, FormHelperText, IconButton, InputLabel, OutlinedInput, Typography } from '@mui/material'
import ProductDefault from '../../assets/product/default.png'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import React, { useRef } from 'react'


const AddCategory = () => {
    const imageFeild = useRef(null)
    const openFiles = () => {
        imageFeild.current.click();
    }
    return (
        <>
             <Card className='w-full' variant="outlined">
                <CardHeader title="Add Category" />
                <CardContent>
                    <Box component={'form'} method='post'>
                        <div className='flex items-center justify-center mb-4'>
                            <div className="flex flex-col space-y-4 items-center justify-center w-1/2">
                                <FormControl className='w-full'>
                                    <InputLabel htmlFor='email'>Category Name</InputLabel>
                                    <OutlinedInput id='password' type='password' label='Password' />
                                    <FormHelperText error focused id='passwordHelper'></FormHelperText>
                                </FormControl>
                                <FormControl className='w-full'>
                                    <InputLabel htmlFor='email'>Slug</InputLabel>
                                    <OutlinedInput id='password' type='password' label='Password' />
                                    <FormHelperText error focused id='passwordHelper'></FormHelperText>
                                </FormControl>
                            </div>
                        </div>
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

export default AddCategory
