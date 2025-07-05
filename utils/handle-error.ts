import {ResponseProps} from "@/types/response-interface";
import {toast} from "sonner";

const handleError = (res: ResponseProps<unknown>) => {
    console.log("toast", toast)

    toast.error(res.msg);
}

export default handleError