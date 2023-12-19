
import { Box, Button, Card, CardContent, CardHeader, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material'
import { addInventoryCategories, updateCategoryAsync } from '../../services/Inventory/categoriesSlice'
import React, { useEffect, useRef } from 'react'
import { useFormik } from 'formik';
import { addCategorySchema, updateCategorySchema } from '../../schema';
import { useDispatch } from 'react-redux';


const AddCategory = ({categoryData, closeModal}) => {
    const thumbnailFeild = useRef(null)
    const dispatch = useDispatch()
    
    const initialValues = {
        name: categoryData ? categoryData.name : "",
        thumbnail: null
    }
    const {values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue} = useFormik({
        initialValues,
        validationSchema: categoryData ? updateCategorySchema : addCategorySchema,
        onSubmit: (values) => {
            console.log(values);
            categoryData ? 
                dispatch(updateCategoryAsync({values, id: categoryData._id}))
                    .then(res=>console.log(res))
                    .catch(err=>console.log(err)) :
                dispatch(addInventoryCategories(values))
                    .then(result=>console.log(result))
                    .catch(err=>console.log(err))
        }
    })

    return (
        <>
             <Card className='w-full' variant="outlined">
                <CardHeader title={categoryData ? "Update Category" :"Add Category"} />
                <CardContent>
                    <Box component={'form'} method='post' onSubmit={handleSubmit}>
                        <div className='flex items-center justify-start mb-4'>
                            <div className="flex flex-col space-y-4 items-center justify-center w-1/2">
                                <FormControl className='w-full'>
                                    <InputLabel htmlFor='name'>Category Name</InputLabel>
                                    <OutlinedInput id='name' type='text' label='name' name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.name && touched.name ?
                                        <FormHelperText error focused id='passwordHelper'>{errors.name}</FormHelperText>:
                                        null                                    
                                    }
                                </FormControl>
                                <FormControl className='w-full flex flex-col items-start justify-center '>
                                    <label htmlFor='thumbnail'>Thumbnail : </label>
                                    <input hidden id='thumbnail' type='file' accept="image/*" ref={thumbnailFeild} name='thumbnail' onChange={(event)=>setFieldValue("thumbnail", event.target.files[0])} onBlur={handleBlur} />
                                    <button onClick={() => {
                                        thumbnailFeild.current.click();
                                    }}>Thumbnail</button>
                                    {errors.thumbnail && touched.thumbnail ? 
                                        <FormHelperText error focused id='passwordHelper'>{errors.thumbnail}</FormHelperText> :
                                        null 
                                    }
                                </FormControl>
                            </div>
                        </div>
                        <Box component={'div'} className='space-x-4'>
                            <Button type='submit' aria-label='Update' variant='outlined' color='primary'>{categoryData? "Update" : "Create"}</Button>
                            <Button type='reset' aria-label='Cancle' variant='outlined' color='error' onClick={closeModal}>Cancle</Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card> 
        </>
    )
}

export default AddCategory
