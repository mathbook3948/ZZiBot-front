import {JSX} from "react";

export interface AppSidebarGroupProps {
    name: string
    children: AppSidebarProps[]
}
export interface AppSidebarProps {
    name: string
    icon: JSX.Element
    href: string
}