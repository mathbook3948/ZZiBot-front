export interface LoginContentProps {
    accessToken: string
    refreshToken: string
}

export interface RefreshContentProps extends LoginContentProps {
    type: 'admin' | 'user'
}