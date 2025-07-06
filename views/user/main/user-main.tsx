'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { formatNumber } from "@/utils/format-number";

const INSTALLATION_URL = "https://discord.com/oauth2/authorize?client_id=1389229095388446862"

interface Props {
    guildCount: number
    connectedChannelCount: number
}

const UserMain = ({ guildCount, connectedChannelCount }: Props) => {
    const handleClickInstallation = () => {
        window.open(INSTALLATION_URL, "_blank")
    }

    return (
        <div className="w-full h-full flex items-center justify-center px-4">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

                {/* 왼쪽: 제목 + 설명 + 버튼 */}
                <div className="flex flex-col justify-center text-center md:text-left">
                    <div className="flex flex-col justify-center md:pl-4" >
                        <div className="flex flex-wrap items-end gap-x-2 gap-y-1 text-center md:text-left justify-center md:justify-start">
                            <span className="text-4xl sm:text-5xl text-primary font-bold leading-none">치지직,</span>
                            <span className="text-3xl sm:text-4xl text-foreground font-bold relative top-px break-keep">디스코드와 함께</span>
                        </div>

                        <div className="text-base sm:text-md text-muted-foreground mt-2">
                            실시간 스트리밍을 연결합니다.
                        </div>
                        <div className="mt-4 flex justify-center md:justify-start">
                            <Button variant="default" onClick={handleClickInstallation}>
                                <div className="flex flex-row items-center gap-1">
                                    <ChevronRight />
                                    <span>사용 시작하기</span>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* 오른쪽: 정보 카드 */}
                <div className="flex flex-col gap-4">
                    <Card className="p-4">
                        <div className="text-sm">참여 중인 서버</div>
                        <div className="text-2xl font-bold text-card-foreground">
                            {formatNumber(guildCount)} 서버
                        </div>
                    </Card>

                    <Card className="p-4">
                        <div className="text-sm">연결된 치지직 채널 수</div>
                        <div className="text-2xl font-bold text-card-foreground">
                            {formatNumber(connectedChannelCount)} 채널
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default UserMain
