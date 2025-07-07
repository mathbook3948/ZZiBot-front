'use client'

import {useQuery} from "@tanstack/react-query";
import {getUserDetail} from "@/actions/user/get-user-detail";
import handleError from "@/utils/handle-error";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {SidebarMenuButton} from "@/components/ui/sidebar";
import {ChevronUp, LogOut, Moon, Sun, User2} from "lucide-react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {Skeleton} from "@/components/ui/skeleton";
import {useTheme} from "@/views/shared/layout/theme-provider";
import {useUserAuth} from "@/views/shared/layout/user-auth-context";
import {useEffect} from "react";

const SidebarFooterDropdown = () => {
    const router = useRouter();
    const {theme, setTheme} = useTheme()
    const {isLoggedIn, setIsLoggedIn} = useUserAuth()

    const {data, isLoading, refetch} = useQuery({
        queryKey: ['user-detail'],
        queryFn: async () => {
            if (!isLoggedIn) return null;

            const res = await getUserDetail();
            if (!res.success) {
                handleError(res.data);
                return null;
            }
            return res.data.content!;
        }
    });

    useEffect(() => {
        if (isLoggedIn) {
            refetch();
        }
    }, [isLoggedIn]);

    const handleLogout = async () => {
        await fetch('/api/auth/user/logout', {method: 'GET'});
        toast.success("로그아웃에 성공했습니다.");
        setIsLoggedIn(false)
        router.push('/');
    };

    const handleLogin = async () => {
        if (!isLoggedIn) router.push('/login');
    }

    const handleSetTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton onClick={handleLogin} className="cursor-pointer">
                    {!!isLoggedIn && (
                        <>
                            {isLoggedIn ? (
                                isLoading || !data ? (
                                    <>
                                        <Skeleton className="w-6 h-6 rounded-full mr-2" />
                                        <Skeleton className="h-4 w-20" />
                                    </>
                                ) : (
                                    <>
                                        {data.discord_user_avatar ? (
                                            <img
                                                src={`https://cdn.discordapp.com/avatars/${data.discord_user_id}/${data.discord_user_avatar}.${data.discord_user_avatar.startsWith('a_') ? 'gif' : 'png'}?size=40`}
                                                alt="avatar"
                                                className="w-6 h-6 rounded-full mr-2"
                                            />
                                        ) : (
                                            <User2 className="w-6 h-6 mr-2" />
                                        )}
                                        {data.discord_user_global_name}
                                    </>
                                )
                            ) : (
                                <>로그인</>
                            )}
                        </>
                    )}
                    {!isLoading && data && <ChevronUp className="ml-auto" />}
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            {data && (
                <DropdownMenuContent
                    side="top"
                    align="center"
                    sideOffset={8}
                    className="min-w-[12rem] p-2 space-y-1 rounded-md border bg-popover text-popover-foreground shadow-md"
                >
                    <DropdownMenuItem>
                        <span>Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSetTheme}>
                        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        <span className="ml-2">
                        {theme === "dark" ? "라이트 모드" : "다크 모드"}
                    </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut />
                        <span className="ml-2">로그아웃</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    );
}

export default SidebarFooterDropdown;
