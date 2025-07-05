import {Suspense} from "react";
import AdminLogin from "@/views/auth/admin/admin-login";

const LoginPage = () => {
    return (
        <Suspense>
            <AdminLogin/>
        </Suspense>
    )
}

export default LoginPage