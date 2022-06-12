import { Message } from "primeng/api";
import { Const } from "./const";

export function addErrorMsg(error: any): Message {
    return {
        severity: Const.severity_msg.error,
        summary: error.error.detail,
        detail: error.message,
    }
}