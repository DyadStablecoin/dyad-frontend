export function addressSummary(address, length = 6) {
  return `${address.slice(0, length + 2)}...${address.slice(42 - length, 42)}`;
}
