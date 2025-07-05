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
            <div className="flex flex-col flex-1">
                <SidebarTrigger className="m-1 self-start" />
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </SidebarProvider>
    );
}

export default UserLayout