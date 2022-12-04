import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { round2 } from "../utils/currency";

export default function ProgressBar({ percent, fullWidth = false }) {
  const [colors, setColors] = useState();

  useEffect(() => {
    // do not ask me why we need this, but without it the tooltip does not show
    // sometimes.
    ReactTooltip.rebuild();

    if (percent < 33) {
      setColors(["#E34158", "#0A110B"]);
    } else if (percent < 66) {
      setColors(["#E6A264", "#181008"]);
    } else {
      setColors(["#71AD76", "#110A0A"]);
    }
  }, [percent]);

  return (
    <>
      {colors && (
        <div
          data-tip={`${round2(percent)}%` || "0%"}
          class={`w-[6rem] border-2 border-[#737E76]  min-w-[${
            fullWidth ? "100%" : "6rem"
          }] max-w-[6rem] pr-[2px]`}
          style={{
            backgroundColor: colors[1],
          }}
        >
          <div
            style={{
              // limit it to 100%
              width: `${isNaN(percent) ? 0 : percent > 100 ? 100 : percent}%`,
              backgroundColor: colors[0],
            }}
            class={`stripes m-[1px] h-[0.5rem] `}
          ></div>
        </div>
      )}
      <ReactTooltip />
    </>
  );
}
