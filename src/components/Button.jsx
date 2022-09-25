export default function Button({ children, onClick, isPrimary, disabled }) {
  return (
    <div
      className={`border-2 border-white pt-4 pb-4 pr-10 pl-10 cursor-pointer ${
        isPrimary && "border-[#FFAFAF]"
      }`}
      onClick={() => {
        onClick();
      }}
    >
      <div>{children}</div>
    </div>
  );
}
