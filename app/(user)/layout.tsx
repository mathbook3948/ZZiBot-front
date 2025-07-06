'use client'

import {SidebarProvider} from "@/components/ui/sidebar";
import AppSidebar from "@/views/shared/layout/app-sidebar";
import {UserAuthProvider} from "@/views/shared/layout/user-auth-context";
import UserHeader from "@/views/shared/layout/user-header";

const UserLayout = ({
                        children,
                    }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <UserAuthProvider>
            <SidebarProvider>
                <AppSidebar/>
                <div className="flex flex-col flex-1">
                    <UserHeader/>
                    <div className="flex-1">
                        {children}
                    </div>
                </div>
            </SidebarProvider>
        </UserAuthProvider>
    );
}

export default UserLayout