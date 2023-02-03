import { useAccount } from "wagmi";
import { formatUSD, round } from "../utils/currency";
import useCR from "../hooks/useCR";
import Menu from "./Menu";
import useSafetyModeActivated from "../hooks/useSafetyMode";
import useEthInPool from "../hooks/useEthInPool";
import useEthPrice from "../hooks/useEthPrice";
import useEthDelta from "../hooks/useEthDelta";
import Stat from "./NavbarStat";
import Divider from "./NavbarDivider";
import Wallet from "./Wallet";
import Logo from "./NavbarLogo";
import SafetyModeWarning from "./SafetyModeWarning";

export default function Navbar() {
  const { isConnected } = useAccount();
  const { ethInPool } = useEthInPool();
  const { ethPrice } = useEthPrice();
  const { cr } = useCR();
  const { ethDelta } = useEthDelta();
  const { isSafetyModeActivated } = useSafetyModeActivated(cr);

  return (
    <div
      className="flex items-center justify-between p-2"
      style={{
        backgroundColor: isSafetyModeActivated && "#2F0F13",
        borderBottom: "0.02rem solid #1f2937",
      }}
    >
      <div className="flex items-center cursor-pointer md:gap-16 justiy-center">
        <Logo />
        {isSafetyModeActivated && <SafetyModeWarning />}
      </div>
      <div className="flex items-center justify-center gap-2">
        {isConnected && (
          <div className="items-center justify-center hidden gap-8 mr-6 lg:flex">
            <Stat name="TVL" value={formatUSD(ethInPool * ethPrice)} />
            <Divider />
            <Stat name="ETH Price Δ" value={formatUSD(ethDelta)} />
            <Divider />
            <Stat name="CR" value={`${round(cr, 0)}%`} />
            <Divider />
          </div>
        )}
        <Wallet />
        <Menu />
      </div>
    </div>
  );
}
