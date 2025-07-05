import type {Metadata} from "next";
import "./globals.css";
import AuthProvider from "@/views/shared/layout/auth-provider";
import UserContainer from "@/views/shared/layout/user-container";
import {Toaster} from "sonner";
import {Analytics} from "@vercel/analytics/next";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {ThemeProvider} from "@/views/shared/layout/theme-provider";

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
            <ThemeProvider>
                <html lang="ko" suppressHydrationWarning>
                <body style={{fontFamily: "Pretendard, sans-serif"}}>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                    (function() {
                      try {
                        var theme = localStorage.getItem('theme');
                        var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        var mode = theme === 'dark' || (!theme && systemDark) ? 'dark' : 'light';
                        document.documentElement.classList.remove('light', 'dark');
                        document.documentElement.classList.add(mode);
                      } catch(e){}
                    })();
            `
                    }}
                />
                <Toaster position={"top-right"}/>
                <UserContainer>
                    {children}
                </UserContainer>
                <Analytics/>
                <SpeedInsights/>
                </body>
                </html>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default RootLayout