import {SidebarTrigger} from "@/components/ui/sidebar";
import {Button} from "@/components/ui/button";
import {LogIn, LogOut} from "lucide-react";
import {useUserAuth} from "@/views/shared/layout/user-auth-context";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

const UserHeader = () => {
    const {isLoggedIn, setIsLoggedIn} = useUserAuth()
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/auth/user/logout', {method: 'GET'});
        toast.success("로그아웃에 성공했습니다.");
        setIsLoggedIn(false);
        router.push('/');
    };

    const handleLogin = async () => {
        router.push('/login');
    }

    return (
        <header className="flex flex-row items-center justify-between w-full">
            <SidebarTrigger className="m-1 self-start"/>
            <div>
                {typeof isLoggedIn !== "undefined" && (
                    <Button variant="ghost" className="cursor-pointer mr-1" onClick={isLoggedIn ? handleLogout : handleLogin}>
                        {isLoggedIn ? <LogOut/> : <LogIn/>}
                        {isLoggedIn ? "로그아웃" : "로그인"}
                    </Button>
                )}
            </div>
        </header>
    )
}

export default UserHeader