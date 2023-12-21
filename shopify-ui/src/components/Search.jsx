import { IconButton, OutlinedInput } from '@mui/material'
import { useEffect, useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { getSearchResult, updateSearchText } from '../services/common/searchSlice';
import { useNavigate } from 'react-router';


const Search = () => {
    const dispatch = useDispatch();
    const {searchVal} = useSelector(store => store.search);
    const navigate = useNavigate()


    return (
        <>
             <OutlinedInput
                id="input-with-icon-adornment"
                endAdornment={
                    <IconButton type='submit' onClick={e=>{
                        navigate('/display-search-result');
                        }} className='border-2 rounded-full hover:bg-slate-400'>

                        <SearchIcon />
                    </IconButton>
                }
                variant={'outlined'}
                placeholder='Search Product'
                size='small'
                value={searchVal}
                onChange={e => dispatch(updateSearchText(e.target.value))}
            />
        </>
    )
}

export default Search
