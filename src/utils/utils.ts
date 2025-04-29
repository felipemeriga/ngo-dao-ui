// Convert wei to ether (divide by 10^18)
export const ethValue = (amount: bigint) => {
  const weiValue = BigInt(amount); // Convert input to BigInt
  return Number(weiValue) / Math.pow(10, 18); // Divide by 10^18
};

export const weiValue = (ethValue: number) => {
  return BigInt(ethValue * Math.pow(10, 18));
};

export const formatDeadline = (deadline: bigint): string => {
  // Convert `bigint` to a regular number and multiply by 1000 (to convert seconds to milliseconds)
  const timestamp = Number(deadline) * 1000;

  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Format the date as a human-readable string
  return date.toLocaleString(); // Default format based on system locale
};

export const isInTheFuture = (deadline: bigint | undefined) => {
  const timestamp = Number(deadline) * 1000; // Convert seconds to milliseconds
  return timestamp > Date.now(); // Check if the deadline is in the future
};
