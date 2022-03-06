import FooterDesktop from "./FooterDesktop";
import DesktopNavbar from "./navbarDesktop";

export default function LayoutFooter({ children }) {
    return (
        <>
            <main>
                {children}
            </main>
            <FooterDesktop/>
        </>
    )
}