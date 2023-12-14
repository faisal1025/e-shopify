import React, { Children, useEffect } from 'react'
import { ReactDOM } from 'react-dom';
import AddProduct from './user-menu/AddProduct'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({closeModal, children}) => {
    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        }
    }, [])
    return(
        <>
            <div className='fixed flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-opacity-75 bg-slate-400' onClick={closeModal}>
                <div className='z-20 my-4 overflow-y-scroll max-h-[90%] py-4 bg-white w-3/4' onClick={(e) => e.stopPropagation()}>
                    <div className='flex flex-row-reverse'>
                        <IconButton onClick={closeModal}><CloseIcon /></IconButton>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}


export default Modal
