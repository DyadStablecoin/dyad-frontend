import { useAccount, useConnect, useDisconnect } from "wagmi";
import { formatUSD, round } from "../utils/currency";
import Button from "./Button";
import logo from "../static/dyad-logo.svg";
import WalletOutlined from "@ant-design/icons/lib/icons/WalletOutlined";
import { dNFT_PRICE } from "../consts/consts";
import { WarningFilled } from "@ant-design/icons";
import useCR from "../hooks/useCR";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../consts/colors";
import useSafetyModeActivated from "../hooks/useSafetyMode";
import { addressSummary } from "../utils/address";
import useEthInPool from "../hooks/useEthInPool";
import useEthPrice from "../hooks/useEthPrice";
import useEnsNameFromIndexer from "../hooks/useEnsNameFromIndexer";
import useEthDelta from "../hooks/useEthDelta";
import Stat from "./NavbarStat";
import Divider from "./NavbarDivider";

export default function NavBar() {
  let navigate = useNavigate();

  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const { ensName } = useEnsNameFromIndexer(address);
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
          <div className="gap-8 items-center justify-center flex mr-8">
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
            {address ? (
              <Button
                onClick={() => disconnect()}
                borderColor="#463D81"
                bgColor="#0F0D1B"
              >
                <div className="flex items-center gap-2">
                  <a className="cursor-pointer">Disconnect</a>
                  <div>{ensName || addressSummary(address)}</div>
                </div>
              </Button>
            ) : (
              <Button
                borderColor="#463D81"
                bgColor="#0F0D1B"
                onClick={() => {
                  connect({ connector: connectors[4] }); // 4 is for metamask
                }}
              >
                <div className="flex gap-2 items-center justify-center">
                  <WalletOutlined />
                  <div>Connect</div>
                </div>
              </Button>
            )}
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
