import { useAccount, useConnect, useDisconnect } from "wagmi";
import Button from "./Button";
import WalletOutlined from "@ant-design/icons/lib/icons/WalletOutlined";
import { addressSummary } from "../utils/address";
import useEnsNameFromIndexer from "../hooks/useEnsNameFromIndexer";

export default function Wallet() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect();
  const { ensName } = useEnsNameFromIndexer(address);

  return (
    <>
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
    </>
  );
}
