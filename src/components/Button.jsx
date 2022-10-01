export default function Button({ children, onClick, isSecondary, isDisabled }) {
  return (
    <div
      className={`border-2 border-white pt-4 pb-4 pr-10 pl-10 cursor-pointer 
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
