'use client'

import {ResponseProps} from "@/types/response-interface";
import {AlarmConfigProps, DiscordGuildChannelProps, DiscordGuildDetailProps} from "@/types/settings-interface";
import {useEffect, useState, useTransition} from "react";
import handleError from "@/utils/handle-error";
import {useRouter} from "next/navigation";
import CommonSelect, {SelectNode} from "@/views/shared/common-select";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {MoveLeft} from "lucide-react";
import {modifyUserAlarmConfig} from "@/actions/user/modify-user-alarm-config";
import {toast} from "sonner";
import {sendTestAlarm} from "@/actions/user/send-user-test-alarm";

interface Props {
    channelContent: ResponseProps<DiscordGuildChannelProps[]>
    guildContent: ResponseProps<DiscordGuildDetailProps>
    configContent: ResponseProps<AlarmConfigProps>
    guildId: string
}

const UserSettingsForm = ({channelContent, guildContent, configContent, guildId}: Props) => {
    const router = useRouter()
    const [selectedChannelId, setSelectedChannelId] = useState('')
    const [customMessage, setCustomMessage] = useState('')
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        if (![channelContent, guildContent, configContent].every(c => c.result)) {
            handleError([guildContent, channelContent, configContent].find(c => !c.result && c.msg) || configContent)
            router.push('/settings')
        }
    }, [channelContent, configContent, guildContent, router]);

    useEffect(() => {
        setSelectedChannelId(configContent.content?.channel_id ?? "")
    }, [configContent]);

    useEffect(() => {
        setCustomMessage(configContent.content?.custom_message ?? "")
    }, [configContent]);

    const handleSubmit = () => {
        startTransition(async () => {
            const res = await modifyUserAlarmConfig({
                channel_id: selectedChannelId,
                guild_id: guildId,
                custom_message: customMessage
            })

            if (!res.success) {
                handleError(res.data)
                return
            }

            toast.success("저장에 성공했습니다.")
        })
    }

    const handleAlarmTest = () => {
        sendTestAlarm({guild_id: guildId}).then(res => {
            console.log("res", res)
            if(!res.success) {
                handleError(res.data)
                return
            }

            toast.success("테스트 알림을 발송하였습니다.")
        })
    }

    const dataList: SelectNode[] = (channelContent.content ?? [])
        .map(channel => ({
            value: channel.id,
            label: channel.name,
        }))
        .sort((a, b) => a.label.localeCompare(b.label, 'ko'));

    return (
        <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
            <div className="flex justify-start items-center">
                <Button variant="ghost" size="sm" onClick={() => router.push('/settings')}
                        className="hover:!bg-transparent pl-0 cursor-pointer">
                    <div className="flex flex-row items-center gap-1">
                        <MoveLeft/>
                        <span>돌아가기</span>
                    </div>
                </Button>
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold text-primary">
                    {guildContent.content?.discord_user_guild_name} 채널 설정
                </h2>
                <Tabs defaultValue="settings" className="w-full">
                    <TabsList className="w-fit">
                        <TabsTrigger value="latest">최근 알림</TabsTrigger>
                        <TabsTrigger value="settings">설정</TabsTrigger>
                    </TabsList>

                    <TabsContent value="latest">
                        <div className="p-4 border rounded-xl bg-muted/50 text-sm text-muted-foreground">
                            test
                        </div>
                    </TabsContent>

                    <TabsContent value="settings">
                        <div className="mt-4 p-6 border rounded-2xl bg-muted/40 space-y-6">
                            <div>
                                <Label className="mb-2 block text-base font-medium text-muted-foreground">알림 발송
                                    채널</Label>
                                <CommonSelect options={dataList} value={selectedChannelId}
                                              onChange={setSelectedChannelId}/>
                            </div>

                            <div>
                                <Label className="mb-2 block text-base font-medium text-muted-foreground">추가 메시지</Label>
                                <Textarea
                                    value={customMessage}
                                    onChange={e => setCustomMessage(e.target.value)}
                                    placeholder="@everyone 같은 멘션이나 일반 텍스트를 입력할 수 있습니다."
                                    className="w-full min-h-[200px] max-h-[400px] resize-none rounded-2xl border border-muted bg-muted/50 p-4 text-sm"
                                />
                            </div>

                            <div className="flex flex row gap-2 justify-end">
                                <Button variant="secondary" onClick={handleAlarmTest}>알림 테스트</Button>
                                <Button variant="default" onClick={handleSubmit}>저장</Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default UserSettingsForm