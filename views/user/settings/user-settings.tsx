'use client'

import {ResponseProps} from "@/types/response-interface";
import {DiscordGuildProps} from "@/types/settings-interface";
import {useEffect, useMemo, useState} from "react";
import handleError from "@/utils/handle-error";
import {useUserAuth} from "@/views/shared/layout/user-auth-context";
import {Card} from "@/components/ui/card";
import {ImageOff} from "lucide-react";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";

interface Props {
    content: ResponseProps<DiscordGuildProps[]>
}

const UserSettings = ({content}: Props) => {
    const {discordUser} = useUserAuth()
    const [search, setSearch] = useState('')
    const router = useRouter()

    console.log("content", content)

    useEffect(() => {
        if (!content.result) handleError(content)
    }, [content]);

    const handleClickGuild = (guild: DiscordGuildProps) => {
        router.push(`/settings/${guild.id}`)
    }

    const filtered = useMemo(() => {
        if (!content.content) return [];
        return content.content.filter((guild) =>
            guild.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, content.content]);

    return (
        <div className="w-full max-w-3xl mx-auto p-6 flex flex-col gap-4">
            <div>
                <span className="text-4xl font-bold text-primary">치봇 설정</span>
                <div className="text-base sm:text-md text-muted-foreground mt-2">
                    &#39;{discordUser?.discord_user_global_name}&#39;님이 관리자 권한이 존재하고, 치봇이 참여중인 서버만 표시됩니다.
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="w-[200px]">
                    <Input onChange={e => setSearch(e.target.value)} placeholder="서버명 검색"/>
                </div>
                {filtered.length === 0 && (
                    <div className="text-muted-foreground text-center py-8">
                        검색된 서버가 없습니다.
                    </div>
                )}
                {filtered.map((guild, index) => (
                    <Card key={`user-dashboard-card-${index}`} className="p-6" onClick={() => handleClickGuild(guild)}>
                        <div className="flex flex-row items-center justify-between">
                            <div className="text-3xl font-semibold">
                                {guild.name}
                            </div>

                            {guild.icon ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                                    alt={`img-${guild.name}`}
                                    className="rounded-md w-20 h-20"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-md bg-muted flex items-center justify-center">
                                    <div className="text-muted-foreground">
                                        <ImageOff className="w-10 h-10"/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>

                ))}
            </div>
        </div>
    )
}

export default UserSettings