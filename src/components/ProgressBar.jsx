import { useEffect, useState } from "react";

export default function ProgressBar({ percent, fullWidth = false }) {
  const [colors, setColors] = useState();

  useEffect(() => {
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
          class={`w-[6rem] border-2 border-[#737E76]  min-w-[${
            fullWidth ? "100%" : "6rem"
          }] max-w-[6rem]`}
          style={{
            backgroundColor: colors[1],
          }}
        >
          <div
            style={{
              width: `${isNaN(percent) ? 0 : percent}%`,
              backgroundColor: colors[0],
            }}
            class={`stripes m-[1px] h-[0.5rem] `}
          ></div>
        </div>
      )}
    </>
  );
}
