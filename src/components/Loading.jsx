import LoadingCore from "./LoadingCore";

// global loading, that blocks the application
export default function Loading({ isLoading }) {
  return (
    <>
      {isLoading && (
        <div className="loader">
          <div role="status " className="top-1/2 left-1/2 fixed">
            <LoadingCore isLoading />
          </div>
        </div>
      )}
    </>
  );
}
