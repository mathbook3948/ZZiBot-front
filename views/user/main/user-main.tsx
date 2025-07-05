'use client'

import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";

const UserMain = () => {
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
                        <Button>사용 시작하기</Button>
                    </div>
                </div>

                {/* 오른쪽: 정보 카드 */}
                <div className="flex flex-col gap-2">
                    <Card className="p-4 gap-2">
                        <div className="text-sm">참여 중인 서버</div>
                        <div className="text-2xl font-bold text-primary-foreground">17개</div>
                    </Card>

                    <Card className="p-4 gap-2">
                        <div className="text-sm">연결된 치지직 채널 수</div>
                        <div className="text-2xl font-bold text-primary-foreground">17개</div>
                    </Card>
                </div>

            </div>
        </div>
    )
}

export default UserMain