'use client'

import {ResponseProps} from "@/types/response-interface";
import {DiscordGuildChannelProps, DiscordGuildDetailProps} from "@/types/settings-interface";
import {useEffect} from "react";
import handleError from "@/utils/handle-error";
import {useRouter} from "next/navigation";

interface Props {
    channelContent: ResponseProps<DiscordGuildChannelProps[]>
    guildContent: ResponseProps<DiscordGuildDetailProps>
}

const UserSettingsForm = ({channelContent, guildContent}: Props) => {
    const router = useRouter()

    console.log("channelContent", channelContent)
    console.log("guildContent", guildContent)

    useEffect(() => {
        if (!channelContent.result || !guildContent.result) {
            handleError(guildContent.msg ? guildContent : channelContent)
            router.push('/settings')
        }
    }, [channelContent, guildContent, router]);

    return (
        <div className="w-full max-w-3xl mx-auto p-6 flex flex-col gap-4">
            <div>
                <span className="text-4xl font-bold text-primary">{guildContent.content?.discord_user_guild_name} 채널 설정</span>
            </div>
        </div>
    )
}

export default UserSettingsForm