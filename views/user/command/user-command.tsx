'use client'

import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'

interface CommandGroup {
    name: string
    commands: Command[]
}

interface Command {
    command: string
    description?: string
    requiredAdmin: boolean
}

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
            {commands.map((group, idx) =>
                group.commands.length > 0 ? (
                    <div key={idx} className="space-y-2">
                        <h2 className="text-xl font-semibold border-b pb-1">{group.name}</h2>
                        <ul className="space-y-1">
                            {group.commands.map((cmd, i) => (
                                <li key={i} className="bg-gray-50 border rounded px-4 py-2">
                                    <p className="font-mono font-medium text-blue-600">{cmd.command}</p>
                                    {cmd.description && (
                                        <p className="text-sm text-gray-600">{cmd.description}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null
            )}
        </div>
    )
}

export default UserCommand
