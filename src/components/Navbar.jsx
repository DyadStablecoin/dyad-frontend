import { useAccount } from "wagmi";
import { formatUSD, round } from "../utils/currency";
import logo from "../static/dyad-logo.svg";
import { dNFT_PRICE } from "../consts/consts";
import { WarningFilled } from "@ant-design/icons";
import useCR from "../hooks/useCR";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../consts/colors";
import useSafetyModeActivated from "../hooks/useSafetyMode";
import useEthInPool from "../hooks/useEthInPool";
import useEthPrice from "../hooks/useEthPrice";
import useEthDelta from "../hooks/useEthDelta";
import Stat from "./NavbarStat";
import Divider from "./NavbarDivider";
import Wallet from "./Wallet";

export default function NavBar() {
  let navigate = useNavigate();

  const { isConnected } = useAccount();
  const { ethInPool } = useEthInPool();
  const { ethPrice } = useEthPrice();
  const { cr } = useCR();
  const { ethDelta } = useEthDelta();
  const { isSafetyModeActivated } = useSafetyModeActivated(cr);

  return (
    <div>
      <div
        className="flex items-center justify-between p-2"
        style={{
          backgroundColor: isSafetyModeActivated && "#2F0F13",
          borderBottom: "0.02rem solid #1f2937",
        }}
      >
        <div className="flex md:gap-16 items-center justiy-center cursor-pointer">
          <img
            src={logo}
            alt="logo"
            className="w-14"
            onClick={() => navigate("/")}
          />
          {isSafetyModeActivated && (
            <div className="hidden md:flex gap-2 items-center justify-center">
              <WarningFilled style={{ color: COLORS.Red }} />
              <div style={{ color: COLORS.Red }}>Safety Mode Activated</div>
            </div>
          )}
        </div>
        <div className="flex gap- tems-center justify-center">
          <div className="gap-8 items-center justify-center lg:flex mr-8 hidden">
            {isConnected && (
              <>
                <Stat name="TVL" value={formatUSD(ethInPool * ethPrice)} />
                <Divider />
                <Stat name="dNFT Floor" value={formatUSD(dNFT_PRICE)} />
                <Divider />
                <Stat name="ETH Price Δ" value={formatUSD(ethDelta)} />
                <Divider />
                <Stat name="CR" value={`${round(cr, 0)}%`} />
                <Divider />
              </>
            )}
            <Wallet />
          </div>
          <div className="mr-2">
            <Menu />
          </div>
        </div>
      </div>
      {isSafetyModeActivated && (
        <div className="md:hidden flex gap-2 items-center justify-center m-2">
          <WarningFilled style={{ color: "#E34158" }} />
          <div style={{ color: "#E34158" }}>Safety Mode Activated</div>
        </div>
      )}
    </div>
  );
}
