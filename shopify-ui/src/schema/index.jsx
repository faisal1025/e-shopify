
import * as Yup from 'yup'

export const addProductSchema = Yup.object({
    name: Yup.string().min(5, "Name should be atlest 5 character").max(30).required("Please enter product name"),
    quantity: Yup.number().required("Please enter quantity of products in stock"),
    brand: Yup.string().min(2, "Brand name should be atleast 2 character long").max(25).required("Please enter the brand of the product"),
    price: Yup.number().required("PLease enter the price"),
    category: Yup.string().min(2, "Please enter atlest 2 character").max(25).required("Please enter the category"),
    subCategory: Yup.string().min(2, "Please enter atleast 2 chaacter").max(30),
    thumbnail: Yup.mixed().required("Thumbnail is required"),
    images: Yup.mixed().required("Images is required")
})

export const updateProductSchema = Yup.object({
    name: Yup.string().min(5, "Name should be atlest 5 character").max(30).required("Please enter product name"),
    quantity: Yup.number().required("Please enter quantity of products in stock"),
    brand: Yup.string().min(2, "Brand name should be atleast 2 character long").max(25).required("Please enter the brand of the product"),
    price: Yup.number().required("PLease enter the price"),
    category: Yup.string().min(2, "Please enter atlest 2 character").max(25).required("Please enter the category"),
    subCategory: Yup.string().min(2, "Please enter atleast 2 chaacter").max(30),
    thumbnail: Yup.mixed().notRequired(),
    images: Yup.mixed().notRequired()
})

export const addCategorySchema = Yup.object({
    name: Yup.string().min(2).max(30).required("Please enter the category name"),
    thumbnail: Yup.mixed().required("Thumbnail can not be empty")
})

export const updateCategorySchema = Yup.object({
    name: Yup.string().min(2).max(30).required("Please enter the category name"),
    thumbnail: Yup.mixed().notRequired()
})