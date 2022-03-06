import Navbar from "./navbar";
import DesktopNavbar from "./navbarDesktop";

export default function LayoutMobile({ children }) {
    return (
        <>
            <main>
                {children}
            </main>
            <Navbar />
        </>
    )
}