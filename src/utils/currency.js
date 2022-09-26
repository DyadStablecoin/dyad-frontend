export function formatUSD(amount) {
  // format with commas
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
