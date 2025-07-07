'use client'

import {SidebarProvider} from "@/components/ui/sidebar";
import AppSidebar from "@/views/shared/layout/app-sidebar";
import {UserAuthProvider} from "@/views/shared/layout/user-auth-context";
import UserHeader from "@/views/shared/layout/user-header";
import {AppSidebarGroupProps} from "@/types/app-interface";
import {ChartNoAxesCombined, Settings, SquareTerminal} from "lucide-react";

const userSidebarList: AppSidebarGroupProps[] = [
    {
        name: "명령어",
        children: [
            {
                name: "명령어 목록",
                icon: <SquareTerminal/>,
                href: "/command"
            }
        ]
    },
    {
        name: "관리",
        children: [
            {
                name: "치봇 설정",
                icon: <Settings />,
                href: "/settings"
            }
        ]
    },
    {
        name: "모니터링",
        children: [
            {
                name: "서비스 상태",
                icon: <ChartNoAxesCombined/>,
                href: "https://status.zzibot.com"
            }
        ]
    }
]

const UserLayout = ({
                        children,
                    }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <UserAuthProvider>
            <SidebarProvider>
                <AppSidebar sidebarList={userSidebarList}/>
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