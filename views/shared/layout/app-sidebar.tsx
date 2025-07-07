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
import Image from "next/image";
import Link from "next/link";
import SidebarFooterDropdown from "@/views/shared/layout/sidebar-footer-dropdown";
import {AppSidebarGroupProps} from "@/types/app-interface";

interface Props {
    sidebarList: AppSidebarGroupProps[]
}

const AppSidebar = ({sidebarList}: Props) => {
    return (
        <Sidebar className="border-sidebar-border">
            <SidebarHeader>
                <Link href="/">
                    <div className="w-full flex flex-row items-center gap-2 p-2">
                        <Image
                            src="/logo.png"
                            alt="zzibot-logo"
                            width={30}
                            height={30}
                            className="rounded-md"
                        />
                        <span className="text-xl font-semibold leading-none">치봇</span>
                    </div>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                {sidebarList.map((group, index1) => (
                    <SidebarGroup key={`sidebar-group-${index1}`}>
                        <SidebarGroupLabel>{group.name}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.children.map((menu, index2) => (
                                    <SidebarMenuButton key={`sidebar-menu-${index2}`} asChild>
                                        <a href={menu.href}>
                                            {menu.icon}
                                            {menu.name}
                                        </a>
                                    </SidebarMenuButton>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarFooterDropdown/>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar