export default function PageNotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-40">
      <div className="font-bold text-3xl">Page not found</div>
      <div>
        We're sorry, the page you requested could not be found. Please go back
        to the{" "}
        <a className="underline" href="/">
          {" "}
          homepage
        </a>
        .
      </div>
    </div>
  );
}
