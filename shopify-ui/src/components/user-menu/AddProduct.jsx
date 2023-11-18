
import { Avatar, Box, Button, Card, CardContent, CardHeader, FormControl, FormHelperText, IconButton, InputLabel, OutlinedInput, Typography } from '@mui/material'
import ProductDefault from '../../assets/product/default.png'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import React, { useRef } from 'react'


const AddProduct = () => {
    const imageFeild = useRef(null)
    const openFiles = () => {
        imageFeild.current.click();
    }
    return (
        <>
             <Card className='w-full' variant="outlined">
                <CardHeader title="Add Products" />
                <CardContent>
                    <Box component={'form'} method='post'>
                        <div className='flex items-center justify-center mb-4'>
                            <div className="flex flex-col space-y-4 items-center justify-center w-1/2">
                                <FormControl className='w-full'>
                                    <InputLabel htmlFor='email'>Product Name</InputLabel>
                                    <OutlinedInput id='password' type='password' label='Password' />
                                    <FormHelperText error focused id='passwordHelper'></FormHelperText>
                                </FormControl>
                                <FormControl className='w-full'>
                                    <InputLabel htmlFor='email'>Quantity</InputLabel>
                                    <OutlinedInput id='password' type='password' label='Password' />
                                    <FormHelperText error focused id='passwordHelper'></FormHelperText>
                                </FormControl>
                                <FormControl className='w-full'>
                                    <InputLabel htmlFor='password'>Brands Name</InputLabel>
                                    <OutlinedInput id='password' type='password' label='Password' />
                                    <FormHelperText error focused id='passwordHelper'></FormHelperText>
                                </FormControl>
                                <FormControl className='w-full'>
                                    <InputLabel htmlFor='password'>Price</InputLabel>
                                    <OutlinedInput id='password' type='password' label='Password' />
                                    <FormHelperText error focused id='passwordHelper'></FormHelperText>
                                </FormControl>
                                <FormControl className='w-full'>
                                    <InputLabel htmlFor='password'>Category</InputLabel>
                                    <OutlinedInput id='password' type='password' label='Password' />
                                    <FormHelperText error focused id='passwordHelper'></FormHelperText>
                                </FormControl>
                                <FormControl className='w-full'>
                                    <InputLabel htmlFor='password'>Sub Category</InputLabel>
                                    <OutlinedInput id='password' type='password' label='Password' />
                                    <FormHelperText error focused id='passwordHelper'></FormHelperText>
                                </FormControl>
                            </div>
                            <div className="flex flex-col items-center justify-center w-1/2">
                                <div className="flex justify-center items-center">
                                    <IconButton><ArrowBackIosNewIcon /></IconButton>
                                    <img style={{width: 300, height: 200, marginBottom: '2rem'}} src={ProductDefault} alt='Image Preview'/>
                                    <IconButton><ArrowForwardIosIcon /></IconButton>
                                </div>
                                <div className="flex justify-center items-center">
                                    <Avatar onClick={()=>{openFiles()}} sx={{ width: 90, height: 90, border: '2px dotted black', cursor: 'pointer', bgcolor: 'white' }} variant="square">
                                            <IconButton>
                                                <AddIcon />
                                                <input id='images' type='file' accept="image/*" ref={imageFeild} multiple hidden/>
                                            </IconButton>
                                    </Avatar>
                                  
                                </div>
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

export default AddProduct
