// utils.js
export const convertToRupees = (priceInDollars) => {
  const conversionRate = 75; // 1 USD = 75 INR
  return priceInDollars * conversionRate;
};
