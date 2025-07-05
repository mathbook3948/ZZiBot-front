'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {SquareTerminal} from "lucide-react";
import Image from "next/image";

const AppSidebar = () => {
    return (
        <Sidebar className="border-sidebar-border">
            <SidebarHeader>
                <div className="w-full flex flex-row items-center gap-2">
                    <Image
                        src="/logo.jpg"
                        alt="zzibot-logo"
                        width={30}
                        height={30}
                        className="rounded-md"
                    />
                    <span className="text-xl font-semibold leading-none">치봇</span>
                </div>
            </SidebarHeader>
            <SidebarContent>

                <SidebarGroup>
                    <SidebarGroupLabel>대시보드</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/dashboard">
                                        <SquareTerminal/>
                                        사용자 대시보드
                                    </a>
                                </SidebarMenuButton>
                                <SidebarMenuButton asChild>
                                    <a href="/admin/dashboard">
                                        <SquareTerminal/>
                                        관리자 대시보드
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>명령어</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/command">
                                        <SquareTerminal/>
                                        명령어
                                    </a>
                                </SidebarMenuButton>
                                <SidebarMenuButton asChild>
                                    <a href="/command">
                                        <SquareTerminal/>
                                        명령어2
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter/>
        </Sidebar>
    )
}

export default AppSidebar