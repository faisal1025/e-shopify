import { IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changePage, nextPage, previousPage } from '../services/common/searchSlice';

const Pagination = ({pages}) => {
    const {page} = useSelector(store => store.search)
    const dispatch = useDispatch()

    return (
        <>
            <div className='border-2 border-slate-900'>
                <IconButton disabled={page === 0 ? true : false} onClick={()=>{dispatch(previousPage())}}>
                    <ArrowBackIosNewIcon fontSize='small'/>
                </IconButton>
            </div>
            {
                [...Array(pages).keys()].slice(1).map((p) => {
                    return (
                    <div className="border-2 border-slate-900">
                        <IconButton color={page === p ? 'primary' : 'default'} onClick={()=>{dispatch(changePage(p))}}>
                            <div className='font-semibold text-sm w-5'>{p}</div>
                        </IconButton>
                    </div>
                    )
                })
            }
            <div className="border-2 border-slate-900">
                <IconButton disabled={page === pages-1 ? true : false} onClick={()=>{dispatch(nextPage())}}>
                    <ArrowForwardIosIcon fontSize='small'/>
                </IconButton>
            </div>
        </>
    )
}

export default Pagination
