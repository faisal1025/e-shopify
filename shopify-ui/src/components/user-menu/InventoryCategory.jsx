import { Button, Card, CardContent, CardHeader, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getInventoryCategories } from '../../services/Inventory/categoriesSlice';
import Modal from '../Modal';
import AddCategory from './AddCategory';

const InventoryCategory = () => {
    const [showModal, setShowModal] = useState(false);
    const {categories, pageNo} = useSelector(store => store.inventoryCategories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInventoryCategories({page: pageNo}))
                .then((result) => console.log(result))
                .catch((err) => console.log('#err', err))
    }, [])

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <>
            <Card className='w-full min-h-screen relative' variant="outlined">
                <div className="flex flex-row-reverse pt-2 pr-2">
                    <Button color='primary' variant='outlined' onClick={openModal} startIcon={
                        <AddIcon />
                    }>Add Category</Button>
                </div>
                {showModal && <Modal closeModal={closeModal}><AddCategory /></Modal>}
                <CardHeader title={'Categories'}/>
                <CardContent>
                    
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Created On</TableCell>
                                <TableCell>Modified On</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((product, ind) => {
                                return (
                                    <TableRow key={ind} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="left">{product.name}</TableCell>
                                        <TableCell align="left">{product.createdAt}</TableCell>
                                        <TableCell align="left">{product.updatedAt}</TableCell>
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

export default InventoryCategory
