import { useDisclosure } from "@chakra-ui/react";
import { LogoutOutlined, MailOutlined, MoreOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import useNftStatus, { STATUS } from "../hooks/useNftStatus";
import Liquidate from "./Liquidate";
import Popup from "./Popup";
import Move from "./Move";
import Snipe from "./Snipe";
import { animated, useSpring } from "react-spring";
import cn from "classnames";

export default function LeaderboardRowMore({ nft, setTxHash }) {
  const { status } = useNftStatus(nft);
  const [isShowingMore, setIsShowingMore] = useState(false);
  const [isGonnaBeOff, setIsGonnaBeOff] = useState(false);
  const [style, animate] = useSpring(
    () => ({ height: "0px", opacity: 0 }, { config: { duration: 50 } }),
    []
  );
  const ref = useRef(null);
  const fragRef = useRef(null);

  useEffect(() => {
    animate({
      height: (isShowingMore ? ref.current.offsetHeight : 0) + "px",
      opacity: isShowingMore ? 100 : 0,
    });
  }, [animate, ref, isShowingMore]);

  useEffect(() => {
    if (isShowingMore && ref.current) {
      const popupBounds = ref.current.getBoundingClientRect();

      if (
        popupBounds.x + ref.current.offsetWidth + ref.current.offsetWidth / 2 >=
        window.innerWidth
      ) {
        // Make appear to left, other keep right
        setIsGonnaBeOff(true);
      } else {
        setIsGonnaBeOff(false);
      }
    }
  }, [isShowingMore, ref]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fragRef.current && !fragRef.current.contains(event.target)) {
        setIsShowingMore(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [setIsShowingMore]);

  const {
    isOpen: isOpenLiquidate,
    onOpen: onOpenLiquidate,
    onClose: onCloseLiquidate,
  } = useDisclosure();
  const {
    isOpen: isOpenMoveDeposit,
    onOpen: onOpenMoveDeposit,
    onClose: onCloseMoveDeposit,
  } = useDisclosure();
  const {
    isOpen: isOpenSnipe,
    onOpen: onOpenSnipe,
    onClose: onCloseSnipe,
  } = useDisclosure();

  return (
    <div className="relative" ref={fragRef}>
      <a
        className="flex items-center justify-center p-1 rounded cursor-pointer hover:bg-white/10 text-secondary"
        onClick={() => {
          setIsShowingMore(!isShowingMore);
        }}
      >
        <MoreOutlined rotate={90} />
      </a>
      {isShowingMore && (
        <animated.div
          className={cn(
            "absolute overflow-hidden min-w-[8.5rem] duration-75 bg-black border border-white w-max z-20",
            isGonnaBeOff ? "right-0" : "left-0"
          )}
          style={{
            ...style,
          }}
        >
          <div ref={ref} className="flex flex-col w-full h-min">
            <a
              className="flex items-center justify-start gap-4 px-4 py-2 text-white transition-all bg-black cursor-pointer hover:text-black hover:bg-white"
              onClick={() => {
                setIsShowingMore(false);
                onOpenMoveDeposit();
              }}
            >
              <MailOutlined />
              <span>Send DYAD</span>
            </a>
            {status === STATUS.LIQUIDATABLE && (
              <a
                className="flex items-center justify-start gap-4 px-4 py-2 text-white transition-all bg-black cursor-pointer hover:text-black hover:bg-white"
                onClick={() => {
                  setIsShowingMore(false);
                  onOpenLiquidate();
                }}
              >
                <LogoutOutlined />
                <span>Liquidate</span>
              </a>
            )}
            <a
              className="flex items-center justify-start gap-4 px-4 py-2 text-white transition-all bg-black cursor-pointer hover:text-black hover:bg-white"
              onClick={() => {
                setIsShowingMore(false);
                onOpenSnipe();
              }}
            >
              <LogoutOutlined />
              <span>Snipe</span>
            </a>
          </div>
        </animated.div>
      )}

      <Popup isOpen={isOpenLiquidate} onClose={onCloseLiquidate}>
        <Liquidate nft={nft} onClose={onCloseLiquidate} setTxHash={setTxHash} />
      </Popup>
      <Popup isOpen={isOpenMoveDeposit} onClose={onCloseMoveDeposit}>
        <Move nft={nft} onClose={onCloseMoveDeposit} setTxHash={setTxHash} />
      </Popup>
      <Popup isOpen={isOpenSnipe} onClose={onCloseSnipe}>
        <Snipe nft={nft} onClose={onCloseSnipe} setTxHash={setTxHash} />
      </Popup>
    </div>
  );
}
