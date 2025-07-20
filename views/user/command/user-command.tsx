'use client'

import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {CommandGroup} from "@/types/command-interface";
import UserCommandItem from "@/views/user/command/user-command-item";

const commands: CommandGroup[] = [
    {
        name: "알림 구독",
        commands: [
            {
                command: '/알림목록',
                description: '치지직 라이브 알림이 등록되어 있는 채널을 조회합니다.',
                requiredAdmin: false
            },
            {
                command: '/알림등록',
                description: '치지직 라이브 알림을 받을 채널을 등록합니다.',
                detailDescription: '치지직 채널 주소 또는 치지직 라이브 주소를 입력할 수 있습니다.',
                requiredAdmin: true
            },
            {
                command: '/알림해제',
                description: '선택한 채널의 치지직 라이브 알림을 해제합니다.',
                requiredAdmin: true
            },
        ]
    },
    {
        name: "알림 설정",
        commands: [
            {
                command: '/알림채널설정',
                description: '해당 채널을 봇 알림 채널로 설정합니다.',
                requiredAdmin: true
            }
        ]
    },
    {
        name: "정보 조회",
        commands: [
            {
                command: '/라이브순위',
                description: '라이브 중인 채널을 시청자 수 기준으로 보여줍니다.',
                requiredAdmin: false
            }
        ]
    }
]

const UserCommand = () => {
    return (
        <Tabs defaultValue="all" className="w-full max-w-4xl mx-auto p-6">
            <TabsList>
                <TabsTrigger value="all">전체</TabsTrigger>
                <TabsTrigger value="user">일반</TabsTrigger>
                <TabsTrigger value="admin">관리자</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
                <CommandList commands={commands}/>
            </TabsContent>

            <TabsContent value="user">
                <CommandList commands={commands.map(group => ({
                    ...group,
                    commands: group.commands.filter(cmd => !cmd.requiredAdmin)
                }))}/>
            </TabsContent>

            <TabsContent value="admin">
                <CommandList commands={commands.map(group => ({
                    ...group,
                    commands: group.commands.filter(cmd => cmd.requiredAdmin)
                }))}/>
            </TabsContent>
        </Tabs>
    )
}

const CommandList = ({commands}: { commands: CommandGroup[] }) => {
    return (
        <div className="space-y-6">
            {commands.map((command, index) => {
                if(command.commands.length === 0) return null;

                return <UserCommandItem cmd={command} key={`user-command-item-${index}`}/>
            })}
        </div>
    )
}

export default UserCommand
