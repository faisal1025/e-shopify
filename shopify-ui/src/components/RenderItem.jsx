
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { add, remove } from '../services/product/cartSlice'
import { useDispatch } from 'react-redux'


const RenderItem = ({item, type}) => {
    console.log(item);
    const dispatch = useDispatch()

    return (
        <>
            {
                type.vertical ?
                <Card variant={'outlined'} className='min-w-full hover:scale-100 hover:cursor-pointer p-1'>
                    <div className="flex justify-evenly items-center">
                        <CardMedia sx={{ height: 140, width: 200 }}
                        component={'img'}
                        src={item.coverPhoto}
                        title="green iguana" />

                        <CardContent>
                            <Typography gutterBottom variant="h6">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.price}
                            </Typography>
                        </CardContent>

                        <CardActions> 
                            <Button fullWidth size='small' variant='contained' color='error' onClick={()=>{dispatch(remove({item}))}}>Remove from Cart</Button>
                        </CardActions>
                    </div>
                </Card> :
                <Card variant={'outlined'} className='min-w-[20%] hover:scale-105 hover:cursor-pointer'>
                    <CardMedia sx={{ height: 140 }}
                    image={item.coverPhoto}
                    title="green iguana" />

                    <CardContent>
                        <Typography gutterBottom variant="h6">
                            {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {item.price}
                        </Typography>
                    </CardContent>

                    <CardActions> 
                        <Button fullWidth size='small' variant='contained' color='primary' onClick={()=>{dispatch(add({item}))}}>Add to Cart</Button>
                    </CardActions>
                </Card>


            }
        </>
    )
}

export default RenderItem
