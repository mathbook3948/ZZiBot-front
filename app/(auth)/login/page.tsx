import {redirect} from "next/navigation";

const AdminLoginPage = () => {

    const client_id = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID
    if(!client_id) redirect("/")

    const url = new URL("https://discord.com/oauth2/authorize")
    url.searchParams.set("client_id", client_id)
    url.searchParams.set("redirect_uri", `${process.env.NEXT_PUBLIC_ZZIBOT_URL}/api/auth/discord/callback`)
    url.searchParams.set("response_type", "code")
    url.searchParams.set("scope", "identify guilds")

    console.log("url", url.toString())

    redirect(url.toString())

    return null
}

export default AdminLoginPage