'use client'

import {ResponseProps} from "@/types/response-interface";
import {DiscordGuildProps} from "@/types/dashboard-interface";
import {useEffect} from "react";
import handleError from "@/utils/handle-error";

interface Props {
    content: ResponseProps<DiscordGuildProps[]>
}

const UserDashboard = ({content}: Props) => {

    console.log(content)

    useEffect(() => {
        if(!content.result) handleError(content)
    }, []);

    return (
        <div>
            test
        </div>
    )
}

export default UserDashboard