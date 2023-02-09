import Footer from "../components/Footer";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
const ConnectionState = dynamic(
  () => import("./ConnectionState").then((mod) => mod.ConnectionState),
  {
    ssr: false,
  }
);

export default function AppLayout({ children }) {
  return (
    <>
      <div className="font-serif font-bold text-white page-container content-wrap">
        <Navbar />
        <ConnectionState>{children}</ConnectionState>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}
