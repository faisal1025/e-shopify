import { IconButton, OutlinedInput } from '@mui/material'
import { useState } from 'react'
import React from 'react'
import { useDispatch } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { getSearchResult } from '../services/common/searchSlice';
import { useNavigate } from 'react-router';

const Search = () => {
    const [searchVal, setSearchVal] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleSearchResult = () => {
        dispatch(getSearchResult(searchVal)) 
            .then(result => console.log('#result', result))
            .catch(err => console.log(err))
    }

    return (
        <>
             <OutlinedInput
                id="input-with-icon-adornment"
                endAdornment={
                    <IconButton  onClick={e=>handleSearchResult()} className='border-2 rounded-full hover:bg-slate-400'>
                        <SearchIcon />
                    </IconButton>
                }
                variant={'outlined'}
                placeholder='Search Product'
                size='small'
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                onFocus={e => {navigate('/display-search-result')}}
            />
        </>
    )
}

export default Search
