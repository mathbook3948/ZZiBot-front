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