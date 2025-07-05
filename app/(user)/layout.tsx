'use client'

import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import AppSidebar from "@/views/shared/layout/app-sidebar";

const UserLayout = ({
                        children,
                    }: Readonly<{
    children: React.ReactNode;
}>) => {

    return (
        <SidebarProvider>
            <AppSidebar/>
            <div>
                <SidebarTrigger className="m-1"/>
                {children}
            </div>
        </SidebarProvider>
    );
}

export default UserLayout