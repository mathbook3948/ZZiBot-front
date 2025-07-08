'use client'

import {ResponseProps} from "@/types/response-interface";
import {AlarmConfigProps, DiscordGuildChannelProps, DiscordGuildDetailProps} from "@/types/settings-interface";
import {useEffect} from "react";
import handleError from "@/utils/handle-error";
import {useRouter} from "next/navigation";

interface Props {
    channelContent: ResponseProps<DiscordGuildChannelProps[]>
    guildContent: ResponseProps<DiscordGuildDetailProps>
    configContent: ResponseProps<AlarmConfigProps>
}

const UserSettingsForm = ({channelContent, guildContent, configContent}: Props) => {
    const router = useRouter()

    console.log("channelContent", channelContent)
    console.log("guildContent", guildContent)
    console.log("configContent", configContent)

    useEffect(() => {
        if (!channelContent.result || !guildContent.result || !configContent.result) {
            handleError(guildContent.msg ? guildContent : channelContent.msg ? guildContent : configContent)
            router.push('/settings')
        }
    }, [channelContent, configContent, guildContent, router]);

    return (
        <div className="w-full max-w-3xl mx-auto p-6 flex flex-col gap-4">
            <div>
                <span
                    className="text-4xl font-bold text-primary">{guildContent.content?.discord_user_guild_name} 채널 설정</span>
            </div>
        </div>
    )
}

export default UserSettingsForm