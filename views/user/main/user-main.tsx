'use client'

import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {ChevronRight} from "lucide-react";
import {formatNumber} from "@/utils/format-number";

const INSTALLATION_URL = "https://discord.com/oauth2/authorize?client_id=1389229095388446862"

interface Props {
    guildCount: number
    connectedChannelCount: number
}

const UserMain = ({guildCount, connectedChannelCount}: Props) => {

    const handleClickInstallation = () => {
        window.open(INSTALLATION_URL, "_blank")
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-5xl grid grid-cols-2 gap-8 mb-10">

                {/* 왼쪽: 제목 + 설명 + 버튼 */}
                <div className="flex flex-col justify-center">
                    <div className="flex flex-row items-end">
                        <span className="text-5xl text-primary font-bold">치지직, </span>
                        <span className="text-4xl text-primary-foreground font-bold">디스코드와 함께</span>
                    </div>
                    <div className="text-md text-gray-700 mt-2">
                        실시간 스트리밍을 연결합니다.
                    </div>
                    <div className="mt-4">
                        <Button variant="default" onClick={handleClickInstallation} className="cursor-pointer">
                            <div className="flex flex-row items-center gap-1">
                                <ChevronRight/>
                                <span>사용 시작하기</span>
                            </div>
                        </Button>
                    </div>
                </div>

                {/* 오른쪽: 정보 카드 */}
                <div className="flex flex-col gap-2">
                    <Card className="p-4 gap-2">
                        <div className="text-sm">참여 중인 서버</div>
                        <div className="text-2xl font-bold text-primary-foreground">{formatNumber(guildCount)} 서버</div>
                    </Card>

                    <Card className="p-4 gap-2">
                        <div className="text-sm">연결된 치지직 채널 수</div>
                        <div className="text-2xl font-bold text-primary-foreground">{formatNumber(connectedChannelCount)} 채널</div>
                    </Card>
                </div>

            </div>
        </div>
    )
}

export default UserMain