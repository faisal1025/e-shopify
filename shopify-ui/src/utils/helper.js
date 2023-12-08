import { toast } from 'react-toastify';

export const getDiscountedPricePercentage = (price, originalPrice) => {
    var discountedPrice = originalPrice - price;
    var discountedPercent = ((discountedPrice/originalPrice)*100).toFixed(2);
    return discountedPercent;
}

export const notAdded = (itemId, cartItems) => {
    let res = true
    cartItems.forEach(items => {
        if(items.productId?._id === itemId){
            console.log(itemId, items.productId?._id );
            res =  false;
        }
    })
    return res;
}

export const notifyAlreadyAdded = () => {
    return toast.info('Item Already Added');
}

export const notifyAdded = () => {
    return toast.success("Item successfully added to cart")
}