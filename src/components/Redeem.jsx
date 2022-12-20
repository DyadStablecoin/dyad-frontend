import { round } from "../utils/currency";
import { useState } from "react";
import TextInput from "./TextInput";
import { ArrowDownOutlined } from "@ant-design/icons";
import PopupContentWithApproval from "./PopupContentWithApproval";
import useEthPrice from "../hooks/useEthPrice";

export default function Redeem({ nft, onClose, setTxHash }) {
  const [dyad, setDyad] = useState("");
  const { ethPrice } = useEthPrice();

  return (
    <PopupContentWithApproval
      fnName="redeem"
      dyad={dyad}
      nft={nft}
      onClose={onClose}
      setTxHash={setTxHash}
      setDyad={setDyad}
    >
      <div className="flex flex-col gap-2 items-center">
        <ArrowDownOutlined />
      </div>
      <div className="flex gap-4 justify-between items-between w-full">
        <div>
          <TextInput
            value={round(dyad / ethPrice, 5)}
            type="number"
            isDisabled
          />
        </div>
        <div className="flex items-center justify-center gap-1">
          <div>
            <img
              className="w-4"
              src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Ethereum-ETH-icon.png"
              alt=""
            />
          </div>
          <div>ETH</div>
        </div>
      </div>
    </PopupContentWithApproval>
  );
}
