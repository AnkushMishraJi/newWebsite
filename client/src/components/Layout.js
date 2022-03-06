import FooterDesktop from "./FooterDesktop";
import DesktopNavbar from "./navbarDesktop";

export default function Layout({ children }) {
    return (
        <>
            <DesktopNavbar />
            <main>
                {children}
            </main>
            <FooterDesktop/>
        </>
    )
}