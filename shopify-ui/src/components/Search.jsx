import { IconButton, OutlinedInput } from '@mui/material'
import { useEffect, useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { getSearchResult, updateSearchText } from '../services/common/searchSlice';
import { useNavigate } from 'react-router';


const Search = () => {
    // const [searchVal, setSearchVal] = useState(null);
    const dispatch = useDispatch();
    const {page, searchVal} = useSelector(store => store.search);
    const navigate = useNavigate()

    const handleSearchResult = () => {
        dispatch(getSearchResult({searchVal, page})) 
            .then(result => console.log('#result', result))
            .catch(err => console.log(err))
        
    }

    useEffect(()=>{
        handleSearchResult();
    }, [page])


    return (
        <>
             <OutlinedInput
                id="input-with-icon-adornment"
                endAdornment={
                    <IconButton  onClick={e=>{
                        handleSearchResult(); 
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
