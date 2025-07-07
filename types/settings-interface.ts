export interface DiscordGuildProps {
    id: string;
    name: string;
    icon: string | null;
    banner: string | null;
    owner: boolean;
    permissions: number;
    permissions_new: string;
    features: string[];
}

export interface DiscordGuildDetailProps {
    discord_user_guild_id: string;
    discord_user_guild_name: string;
    discord_user_guild_icon: string | null;
    discord_user_guild_banner: string | null;
    discord_user_guild_owner: boolean;
    discord_user_guild_permissions: number;
    discord_user_guild_permissions_new: string;
}

export interface DiscordGuildChannelProps {
    id: string;
    type: number;
    last_message_id: string;
    flags: number;
    guild_id: string;
    name: string;
    parent_id: string;
    rate_limit_per_user: number;
    topic: string;
    position: number;
    permission_overwrites: {id: string, type: number, allow: string, deny: string}[]
    nsfw: boolean;
}