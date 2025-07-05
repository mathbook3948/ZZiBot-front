import type {Metadata} from "next";
import "./globals.css";
import AuthProvider from "@/views/shared/layout/auth-provider";
import UserContainer from "@/views/shared/layout/user-container";
import {Toaster} from "sonner";
import {Analytics} from "@vercel/analytics/next";
import {SpeedInsights} from "@vercel/speed-insights/next";

export const metadata: Metadata = {
    title: "치봇",
    description: "치지직, 디스코드와 함께",
    icons: {
        icon: "/logo.png",
    },
};

const RootLayout = ({
                        children,
                    }: Readonly<{
    children: React.ReactNode;
}>) => {

    return (
        <AuthProvider>
            <html lang="ko">
            <body style={{fontFamily: "Pretendard, sans-serif"}}>
            <Toaster position={"top-right"}/>
            <UserContainer>
                {children}
            </UserContainer>
            <Analytics />
            <SpeedInsights/>
            </body>
            </html>
        </AuthProvider>
    );
}

export default RootLayout