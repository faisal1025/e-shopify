
import { Box, Button, Card, CardContent, CardHeader, FormControl, FormHelperText, InputLabel, OutlinedInput, Typography, TextareaAutosize } from '@mui/material'
import ProductDefault from '../../assets/product/default.png'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import React, { useRef } from 'react'
import { useFormik } from 'formik'
import { addProductSchema, updateProductSchema } from '../../schema';
import { useDispatch, useSelector } from 'react-redux'
import { addInventoryProducts } from '../../services/Inventory/productsSlice';

const AddProduct = ({productData, closeModal}) => {
    const initialValues = {
        name: productData ? productData.name : "",
        subTitle: productData ? productData.subTitle : "",
        quantity: productData ? productData.qty : "",
        brand: productData ? productData.brand : "",
        price: productData ? productData.price : "",
        originalPrice: productData ? productData.originalPrice : "",
        category: productData ? productData.category.name : "",
        description: productData ? productData.description : "",
        thumbnail: null,
        images: null
    }
    const imageFeild = useRef(null)
    const thumbnailFeild = useRef(null)
    const dispatch = useDispatch()

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues,
        validationSchema: productData ? updateProductSchema : addProductSchema,
        onSubmit: (values) => {
            console.log(values);
            dispatch(addInventoryProducts(values))
                .then(result=>console.log(result))
                .catch(err=>console.log(err))
        }
    })
    return (
        <>
             <Card className='w-full' variant="outlined">
                <CardHeader title={productData ? "Update Product" : "Add Product"} />
                <CardContent>
                    <Box component={'form'} method='post' onSubmit={handleSubmit}>
                        <div className='flex items-center space-x-2 justify-center mb-4'>
                            <div className="flex flex-col space-y-4 items-center justify-center w-1/2">
                                <FormControl className='w-full'>
                                    <InputLabel htmlFor='name'>Product Name</InputLabel>
                                    <OutlinedInput id='name' type='text' label='name' name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.name && touched.name ? 
                                        <FormHelperText error focused id='passwordHelper'>{errors.name}</FormHelperText> :
                                        null 
                                    }
                                </FormControl>
                                <FormControl className='w-full'>
                                    <InputLabel htmlFor='subTitle'>Sub Title</InputLabel>
                                    <OutlinedInput id='subTitle' type='text' label='subTitle' name='subTitle' value={values.subTitle} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.subTitle && touched.subTitle ? 
                                        <FormHelperText error focused id='passwordHelper'>{errors.subTitle}</FormHelperText> :
                                        null 
                                    }
                                </FormControl>
                                <FormControl className='w-full'>
                                    <InputLabel htmlFor='quantity'>Quantity</InputLabel>
                                    <OutlinedInput id='quantity' type='number' label='Quantity' name='quantity' value={values.quantity} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.quantity && touched.quantity ? 
                                        <FormHelperText error focused id='passwordHelper'>{errors.quantity}</FormHelperText> :
                                        null 
                                    }
                                </FormControl>
                                <FormControl className='w-full'>
                                    <InputLabel htmlFor='brand'>Brands Name</InputLabel>
                                    <OutlinedInput id='brand' type='text' label='Brand Name' name='brand' value={values.brand} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.brand && touched.brand ? 
                                        <FormHelperText error focused id='passwordHelper'>{errors.brand}</FormHelperText> :
                                        null 
                                    }
                                </FormControl>
                                <FormControl className='w-full'>
                                    <InputLabel htmlFor='price'>Discounted Price</InputLabel>
                                    <OutlinedInput id='price' type='number' label='Price' name='price' value={values.price} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.price && touched.price ? 
                                        <FormHelperText error focused id='passwordHelper'>{errors.price}</FormHelperText> :
                                        null 
                                    }
                                </FormControl>
                                <FormControl className='w-full'>
                                    <InputLabel htmlFor='originalPrice'>Original Price</InputLabel>
                                    <OutlinedInput id='originalPrice' type='number' label='originalPrice' name='originalPrice' value={values.originalPrice} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.originalPrice && touched.originalPrice ? 
                                        <FormHelperText error focused id='passwordHelper'>{errors.originalPrice}</FormHelperText> :
                                        null 
                                    }
                                </FormControl>
                                <FormControl className='w-full'>
                                    <InputLabel htmlFor='category'>Category</InputLabel>
                                    <OutlinedInput id='category' type='text' label='Category' name='category' value={values.category} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.category && touched.category ? 
                                        <FormHelperText error focused id='passwordHelper'>{errors.category}</FormHelperText> :
                                        null 
                                    }
                                </FormControl>
                                <FormControl className='w-full'>
                                    <InputLabel htmlFor='description'>Description</InputLabel>
                                    <TextareaAutosize minRows={3} id='description' type='text' label='description' name='description' value={values.description} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.description && touched.description ? 
                                        <FormHelperText error focused id='passwordHelper'>{errors.description}</FormHelperText> :
                                        null 
                                    }
                                </FormControl>
                            </div>
                            <div className="flex flex-col items-center justify-center w-1/2">
                                <FormControl className='w-full flex flex-col items-start justify-center '>
                                    <label htmlFor='thumbnail'>Thumbnail : </label>
                                    <input hidden id='thumbnail' type='file' accept="image/*" ref={thumbnailFeild} onChange={(event)=>setFieldValue("thumbnail", event.target.files[0])} onBlur={handleBlur} />
                                    <button onClick={() => {
                                        thumbnailFeild.current.click();
                                    }}>Thumbnail</button>
                                    {errors.thumbnail && touched.thumbnail ? 
                                        <FormHelperText error focused id='passwordHelper'>{errors.thumbnail}</FormHelperText> :
                                        null 
                                    }
                                </FormControl>
                                <FormControl className='w-full flex flex-col items-start justify-center '>
                                    <label htmlFor='images'>Product Images</label>
                                    <input hidden id='images' type='file' accept="image/*"  ref={imageFeild} multiple name='images' onChange={(event) => setFieldValue("images", event.target.files)} onBlur={handleBlur} />
                                    <button onClick={() => {
                                        imageFeild.current.click();
                                    }}>Images</button>
                                    {errors.images && touched.images ? 
                                        <FormHelperText error focused id='passwordHelper'>{errors.images}</FormHelperText> :
                                        null 
                                    }
                                </FormControl>
                            </div>
                        </div>
                        <Box component={'div'} className='space-x-4'>
                            <Button type='submit' aria-label='Login' variant='outlined' color='primary'>{productData ? 'Update' : 'Create'}</Button>
                            <Button type='reset' aria-label='Cancle' variant='outlined' color='error' onClick={closeModal}>Cancle</Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card> 
        </>
    )
}

export default AddProduct

{/* <div className="flex justify-center items-center">
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
    
</div> */}