export default function Button({ children, onClick, isSecondary, isDisabled }) {
  return (
    <div
      className={`border border-slate-600 pt-0 pb-0 pr-4 pl-4 cursor-pointer bg-zinc-800
      ${isSecondary && "border-[#FFAFAF] "}
      ${isDisabled && !isSecondary && "opacity-50 cursor-not-allowed"}
      ${
        !isDisabled &&
        !isSecondary &&
        "hover:border-[#00ff65] hover:text-[#00ff65]"
      }
      ${
        !isDisabled &&
        isSecondary &&
        "hover:border-[#FF5733] hover:text-[#FF5733]"
      }
      `}
      onClick={() => {
        onClick();
      }}
    >
      <div>{children}</div>
    </div>
  );
}
