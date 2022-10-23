import { useEffect, useState } from "react";

export default function ProgressBar({ percent, fullWidth = false }) {
  const [colors, setColors] = useState();

  function getColors() {
    if (isNaN(percent)) {
      percent = 0;
    }
    if (percent < 33) {
      return ["#71AD76", "#0A110B"];
    }
    if (percent < 66) {
      return ["#E6A264", "#181008"];
    }

    return ["#E66476", "#110A0A"];
  }

  useEffect(() => {
    setColors(getColors());
  }, []);

  return (
    <>
      {colors && (
        <div
          class={`border-2 border-[#737E76] bg-[${colors[1]}] min-w-[${
            fullWidth ? "100%" : "6rem"
          }] max-w-[6rem]`}
        >
          <div
            style={{
              width: `${isNaN(percent) ? 0 : percent}%`,
              backgroundColor: colors[0],
            }}
            class={`stripes m-[1px] h-[0.5rem]`}
          ></div>
        </div>
      )}
    </>
  );
}
