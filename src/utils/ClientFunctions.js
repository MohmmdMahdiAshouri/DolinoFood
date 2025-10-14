import { S3 } from "aws-sdk";

export const checkAccess = (access, userAccess) => {
    const hasPermission = access.some(
        (permission) => userAccess.includes(permission)
        // {
        //     if (userAccess === permission) {
        //         return true;
        //     }
        // }
    );
    return hasPermission;
};

export const fetchData = async (api, method, data) => {
    //success - status - message - data
    let result = {};
    let options = {};
    options["method"] = method ? method : "GET";
    if (method.toLowerCase() !== "get") {
        options["body"] = JSON.stringify(data);
        options["headers"] = { "Content-Type": "application/json" };
    }

    try {
        const res = await fetch(api, options);
        const final = await res.json();

        if (res.status === 200) {
            result["success"] = final.success;
            result["status"] = res.status;
            result["message"] = final.message;
            result["data"] = final.data;
        } else {
            result["success"] = false;
            result["status"] = res.status;
            result["message"] = final.message;
            result["data"] = final?.data || null;
        }
    } catch (error) {
        result["success"] = false;
        result["status"] = 500;
        result["message"] = error.message;
    }

    return result;
};

export const uploadFile = async (file) => {
    try {
        //check selected file - step1
        if (!file)
            return { success: false, message: "لطفا یک فایل را انتخاب کنید" };

        //check limit size - step2
        if (file.size > 1024 * 1024 * 2)
            return {
                success: false,
                message: "حجم فایل باید کمتر از 2 مگابایت باشد",
            };

        //check file format - step3
        const allowedTypes = [
            "image/png",
            "image/jpg",
            "image/jpeg",
            "image/gif",
            "image/webp",
        ];
        if (!allowedTypes.includes(file.type))
            return {
                success: false,
                message: "فرمت فایل انتخاب شده صحیح نیست",
            };

        //change file name - step4
        const newFileName = `upload_${Date.now()}_${file.name}`;

        //config - step5
        const s3 = new S3({
            accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY,
            secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_KEY,
            endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
        });

        const params = {
            Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME,
            Key: newFileName,
            Body: file,
        };

        //upload file - step6
        const response = await s3.upload(params).promise();

        //get link - step7
        const finalLink = s3.getSignedUrl("getObject", {
            Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME,
            Key: newFileName,
            Expires: 31526000,
        });

        console.log("فایل با موفقیت اپلود شد");

        return { success: true, newFileName };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const Status = (status) => {
    switch (status) {
        case "pending":
            return "درحال بررسی";
        case "success":
            return "تایید شده";
        case "paid":
            return "پرداخت شده";
        case "waiting":
            return "در انتظار پرداخت";
        case "declined":
            return "رد شده";
        case "needEdit":
            return "نیاز به ویرایش";
        default:
            return "نامشخص";
    }
};

export const STATUSES = [
    { title: "تایید شده", value: "success" },
    { title: "درحال بررسی", value: "pending" },
    { title: "نیاز به ویرایش", value: "needEdit" },
    { title: "رد شده", value: "declined" },
    { title: "پرداخت شده", value: "paid" },
    { title: "در انتظار پرداخت", value: "waiting" },
];
