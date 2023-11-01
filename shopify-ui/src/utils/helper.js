
export const getDiscountedPricePercentage = (price, originalPrice) => {
    var discountedPrice = originalPrice - price;
    var discountedPercent = ((discountedPrice/originalPrice)*100).toFixed(2);
    return discountedPercent;
}