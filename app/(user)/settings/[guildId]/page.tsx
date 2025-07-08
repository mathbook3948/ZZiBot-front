import {getUserGuildList} from "@/actions/user/get-user-guild-channel-list";
import UserSettingsForm from "@/views/user/settings/user-settings-form";
import {redirect} from "next/navigation";
import {getUserGuildDetail} from "@/actions/user/get-user-guild-detail";
import {getUserAlarmConfigDetail} from "@/actions/user/get-user-alarm-config-detail";

interface Props {
    params: Promise<{ guildId: string }>
}

const UserSettingsFormPage = async ({params}: Props) => {
    const {guildId} = await params

    if (!guildId) redirect("/")

    const channelRes = await getUserGuildList({guild_id: guildId})
    const guildRes = await getUserGuildDetail({guild_id: guildId})
    const configRes = await getUserAlarmConfigDetail({guild_id: guildId})

    return <UserSettingsForm channelContent={channelRes.data} guildContent={guildRes.data} configContent={configRes.data}/>
}

export default UserSettingsFormPage