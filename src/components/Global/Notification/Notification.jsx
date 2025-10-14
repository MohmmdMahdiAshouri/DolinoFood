"use client";
import { message} from "antd";
import { useImperativeHandle, forwardRef } from "react";

const Notification = forwardRef((props, ref) => {
    const [messageApi, contextHolder] = message.useMessage();

    useImperativeHandle(ref, () => ({
        openError(msg) {
            messageApi.open({
                type: "error",
                content: msg,
            })
        },

        openSuccess(msg) {
            messageApi.open({
                type: "success",
                content: msg,
            });
        },
    }));

    return <>{contextHolder}</>;
});

export default Notification;
