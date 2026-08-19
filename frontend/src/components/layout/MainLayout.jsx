import { Outlet } from "react-router-dom";
import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

function MainLayout() {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">

            <Navbar
                onMenuClick={() => setIsMobileNavOpen(true)}
            />

            <div className="flex">

                <Sidebar />

                <main className="min-w-0 flex-1">
                    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <Outlet />
                    </div>
                </main>

            </div>

            <MobileNav
                isOpen={isMobileNavOpen}
                onClose={() => setIsMobileNavOpen(false)}
            />

        </div>
    );
}

export default MainLayout;