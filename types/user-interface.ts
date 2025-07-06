export interface CurrentUser {
    accessToken: string
    refreshToken: string
}

export interface DiscordUserProps {
    discord_user_id: string;
    discord_user_name?: string;
    discord_user_global_name?: string;
    discord_user_avatar?: string;
    discord_user_discriminator?: string;
    discord_user_email?: string;
    discord_user_locale?: string;
    discord_user_verified?: boolean;
    discord_user_created_at?: string;     // ISO string
    discord_user_updated_at?: string;     // ISO string
}