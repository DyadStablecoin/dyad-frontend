export default function Button({ children, onClick, isPrimary, isDisabled }) {
  return (
    <div
      className={`border-2 border-white pt-4 pb-4 pr-10 pl-10 cursor-pointer 
      ${isPrimary && "border-[#FFAFAF] "}
      ${isDisabled && "opacity-50 cursor-not-allowed"}
      `}
      onClick={() => {
        onClick();
      }}
    >
      <div>{children}</div>
    </div>
  );
}
