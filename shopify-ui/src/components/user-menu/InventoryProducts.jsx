import { Button, Card, CardContent, CardHeader, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getInventoryProducts } from '../../services/Inventory/productsSlice';
import AddProduct from './AddProduct';
import Modal from '../Modal';

const InventoryProducts = () => {
    const [showModal, setShowModal] = useState(false);
    const {products, pageNo} = useSelector(store => store.inventoryProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInventoryProducts({page: pageNo}))
                .then((result) => console.log(result))
                .catch((err) => console.log('#err', err))
            }, [])
            
            const openModal = () => setShowModal(true);
            const closeModal = () => setShowModal(false);
            
            return (
                <>
            <Card className='w-full min-h-screen relative' variant="outlined">
                <div className=" flex flex-row-reverse pt-2 pr-2">
                    <Button color='primary' variant='outlined' onClick={openModal} startIcon={
                        <AddIcon />
                    }>Add Products</Button>
                </div>
                {showModal && <Modal closeModal={closeModal}><AddProduct /></Modal>}
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
                                            <button className='p-2 rounded-lg bg-black text-white font-medium hover:opacity-75 active:scale-95'>Delete</button>
                                            <button className='p-2 rounded-lg bg-black text-white font-medium hover:opacity-75 active:scale-95'>Update</button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </ Card>
        </>
    )
}

export default InventoryProducts
