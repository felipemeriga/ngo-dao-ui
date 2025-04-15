// Convert wei to ether (divide by 10^18)
export const ethValue = (amount: bigint) => {
  const weiValue = BigInt(amount); // Convert input to BigInt
  return Number(weiValue) / Math.pow(10, 18); // Divide by 10^18
};
