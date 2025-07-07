'use client'

import {createContext, useContext, useEffect, useState} from 'react'
import {getTokens} from "@/actions/common/get-tokens";
import {DiscordUserProps} from "@/types/user-interface";

interface UserAuthContextType {
    isLoggedIn?: boolean
    setIsLoggedIn: (value: boolean) => void
    discordUser?: DiscordUserProps
    setDiscordUser: (value: DiscordUserProps) => void
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined)

const checkLogin = async (): Promise<boolean> => {
    const token = await getTokens();
    return !!token;
};

export const UserAuthProvider = ({children}: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>()
    const [discordUser, setDiscordUser] = useState<DiscordUserProps>()

    useEffect(() => {
        checkLogin().then(loginState => setIsLoggedIn(loginState))
    }, []);

    return (
        <UserAuthContext.Provider value={{isLoggedIn, setIsLoggedIn, discordUser, setDiscordUser}}>
            {children}
        </UserAuthContext.Provider>
    )
}

export const useUserAuth = () => {
    const context = useContext(UserAuthContext)
    if (!context) throw new Error('useUserAuth must be used within UserAuthProvider')
    return context
}
