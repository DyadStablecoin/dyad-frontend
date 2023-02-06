import LoadingCore from "./LoadingCore";

// in-place loading
export default function LoadingInplace({ isLoading, style }) {
  return (
    <>
      {isLoading && (
        <div className="loader2">
          <div role="status">
            <LoadingCore style={style} isLoading />
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}
