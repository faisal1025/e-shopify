import { Button, Card, CardContent, CardHeader, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getInventoryProducts, removeProductAsync, changePage, setRowsPerPage } from '../../services/Inventory/productsSlice';
import AddProduct from './AddProduct';
import Modal from '../Modal';

const InventoryProducts = () => {
    const [productData, setProductData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const {result, products, pageNo, itemPerPage, totalItems} = useSelector(store => store.inventoryProducts);
    const dispatch = useDispatch();

    const handleRemoveProduct = (slug) => {
        dispatch(removeProductAsync({slug}))
            .then(result => console.log(result))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        dispatch(getInventoryProducts({page: pageNo, itemPerPage}))
                .then((result) => console.log(result))
                .catch((err) => console.log('#err', err))
     }, [result, pageNo, itemPerPage])
            
    const openModal = (product) => {
        setProductData(product)
        setShowModal(true);
    }
    
    const closeModal = () => setShowModal(false);
            
    return (
        <>
            <Card className='w-full min-h-screen relative' variant="outlined">
                <div className=" flex flex-row-reverse pt-2 pr-2">
                    <Button color='primary' variant='outlined' onClick={() => openModal(null)} startIcon={
                        <AddIcon />
                    }>Add Products</Button>
                </div>
                <CardHeader title={'Products'}/>
                <CardContent>    
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Subtitle</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product, ind) => {
                                return (
                                    <TableRow key={ind} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="left">{product.name}</TableCell>
                                        <TableCell align="left">{product.subTitle}</TableCell>
                                        <TableCell align="left">{product.category.name}</TableCell>
                                        <TableCell align="left" className='space-x-2'>
                                            <button className='p-2 rounded-lg bg-black text-white font-medium hover:opacity-75 active:scale-95' onClick={() => handleRemoveProduct(product.slug)}>Delete</button>
                                            <button className='p-2 rounded-lg bg-black text-white font-medium hover:opacity-75 active:scale-95' onClick={() => openModal(product)}>Update</button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                        <TableFooter>
                            <TablePagination
                             rowsPerPage={itemPerPage}
                             page={pageNo}
                             count={totalItems}
                             onPageChange={(event, page) => {
                                 dispatch(changePage({page}));
                                }}
                                onRowsPerPageChange={(event) => {
                                    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
                                    dispatch(changePage({page: 0}));
                             }}
                             rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                             />
                        </TableFooter>
                    </Table>
                    {showModal && <Modal closeModal={closeModal}><AddProduct productData={productData} closeModal={closeModal} /></Modal>}
                </CardContent>
            </ Card>
        </>
    )
}

export default InventoryProducts
