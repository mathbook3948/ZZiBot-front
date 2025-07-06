import {Suspense} from "react";
import AdminLogin from "@/views/auth/admin/admin-login";

const AdminLoginPage = () => {
    return (
        <Suspense>
            <AdminLogin/>
        </Suspense>
    )
}

export default AdminLoginPage