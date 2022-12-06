import { useEffect, useState } from "react";
import { ethers } from "ethers";

export function formatUSD(amount, removeDollarSign = false) {
  // format with commas
  amount = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (removeDollarSign) {
    amount = amount.slice(1);
  }
  return amount.slice(0, -3);
}

export function round2(value) {
  return Math.round(value * 100) / 100;
}
export function round(value, decimals) {
  return Math.round(value * 10 ** decimals) / 10 ** decimals;
}

// thin wrapper around `ethers.utils.parseEther`
export function parseEther(eth) {
  return ethers.utils.parseEther(eth ? String(parseFloat(eth)) : "0");
}
