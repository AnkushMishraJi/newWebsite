import FooterDesktop from "./FooterDesktop";
import DesktopNavbar from "./navbarDesktop";

export default function Layout({ children },props) {
    console.log(props, "position")
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