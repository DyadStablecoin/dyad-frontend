export default function ProgressBar({ color, percent }) {
  function getColors() {
    if (percent < 33) {
      return ["#71AD76", "#0A110B"];
    }
    if (percent < 66) {
      return ["#E6A264", "#181008"];
    }

    return ["#E66476", "#110A0A"];
  }

  const colors = getColors();

  return (
    <div class={`border-2 border-[#737E76] bg-[${colors[1]}] max-w-[6rem]`}>
      <div
        class={`stripes m-[1px] bg-[${colors[0]}] w-[${
          "" + percent
        }%] h-[0.5rem]`}
      ></div>
    </div>
  );
}
