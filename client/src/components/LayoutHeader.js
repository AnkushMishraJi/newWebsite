import DesktopNavbar from "./navbarDesktop";

export default function LayoutHeader({ children }) {
    return (
        <>
            <DesktopNavbar />
            <main>
                {children}
            </main>
        </>
    )
}