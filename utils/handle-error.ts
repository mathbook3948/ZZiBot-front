import {ResponseProps} from "@/types/response-interface";
import {toast} from "sonner";

const handleError = (res: ResponseProps<unknown>) => {
    toast.error(res.msg);
}

export default handleError