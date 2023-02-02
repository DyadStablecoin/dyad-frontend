import { animated, useSpring } from "react-spring";
import { useRef, useEffect, useState } from "react";
import classNames from "classnames";
import Icon from "./Icon";
import { COLORS } from "../consts/colors";
import { DownOutlined } from "@ant-design/icons";

export default function Dropdown({ options, onChange }) {
  const [selectedOption, setSelectedOption] = useState();
  const [isShowingOptions, setIsShowingOptions] = useState(false);
  const [style, animate] = useSpring(() => ({ height: "0px" }), []);
  const ref = useRef(null);

  useEffect(() => {
    animate({
      height: (isShowingOptions ? ref.current.offsetHeight : 0) + "px",
    });
  }, [animate, ref, isShowingOptions]);

  return (
    <div className="w-full">
      <>
        <div className={"w-max justify-start flex gap-4 items-center"}>
          <a
            className={"cursor-pointer text-white"}
            onClick={() => setIsShowingOptions(!isShowingOptions)}
          >
            {selectedOption ? selectedOption : `Select an Option`}
          </a>
          <div
            className={classNames(
              "transition-all duration-150 w-min h-min",
              isShowingOptions ? "rotate-0" : "rotate-180"
            )}
          >
            <Icon onClick={() => setIsShowingOptions(!isShowingOptions)}>
              <DownOutlined
                style={{ fontSize: "0.9rem", color: COLORS.Purple }}
              />
            </Icon>
          </div>
        </div>
      </>

      {isShowingOptions && (
        <animated.div
          className="absolute overflow-hidden min-w-[6.5rem] z-50 bg-black border border-white w-max"
          style={{
            ...style,
          }}
        >
          <div ref={ref} className="flex flex-col w-full">
            {options.map((option) => {
              return (
                <a
                  key={option}
                  className="px-4 py-2 text-sm text-white transition-all bg-black cursor-pointer hover:text-black hover:bg-white"
                  onClick={() => {
                    setIsShowingOptions(false);
                    setSelectedOption(option);
                    onChange(option);
                  }}
                >
                  {option}
                </a>
              );
            })}
          </div>
        </animated.div>
      )}
    </div>
  );
}
