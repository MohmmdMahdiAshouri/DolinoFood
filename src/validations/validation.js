const restaurantValidation = (data) => {
    let error = {};

    // validation name
    if (!data?.name) error["name"] = "لطفا نام پذیرنده را وارد کنید";
    if (data?.name?.length < 3)
        error["name"] = "حداقل نام پذیرنده باید سه کاراکتر باشد";

    // validation userName
    if (!data?.userName) error["userName"] = "لطفا نام کاربری را وارد کنید";
    if (data?.userName?.length < 3)
        error["userName"] = "حداقل نام کاربری باید سه کاراکتر باشد";

    // validation password
    if (!data?.password) error["password"] = "لطفا رمز عبور را وارد کنید";
    if (data?.password?.length < 5)
        error["password"] = "حداقل رمز عبور باید پنج کاراکتر باشد";

    if (Object.keys(error).length > 0) {
        return error;
    } else {
        return false;
    }
};

export default restaurantValidation;

export const categoryValidation = (data) => {
    let error = {};

    // validation name
    if (!data?.name) error["empty"] = "لطفا نام دسته بندی را وارد کنید";
    if (data?.name?.length < 2)
        error["name"] = "حداقل نام دسته بندی باید دو کاراکتر باشد";

    if (Object.keys(error).length > 0) {
        return error;
    } else {
        return false;
    }
};

export const foodValidation = (data) => {
    let error = {};

    // validation name
    if (!data?.name) error["name"] = "لطفا نام غذا را وارد کنید";
    if (data?.name?.length < 3)
        error["name"] = "حداقل نام غذا باید سه کاراکتر باشد";

    if (!data.catName || !data.catId)
        error["cat"] = "دسته بندی مورد نظر را انتخاب کنید";

    if (Object.keys(error).length > 0) {
        return error;
    } else {
        return false;
    }
};

export const validationPhoneNumber = (mobile) => {
    let regex = /^09\d{9}$/;
    let error = {};
    if (!regex.test(mobile)) {
        error["mobile"] = "شماره وارد شده صحیح نمی باشد";
    }
    return Object.keys(error).length ? error : null;
};

export const addressValidation = (data) => {
    let error = {};

    if (!data?.state || data?.state < 2)
        error["state"] = "حداقل نام استان باید دو کاراکتر باشد";

    if (!data?.city || data?.city < 2)
        error["city"] = "حداقل نام شهر باید دو کاراکتر باشد";

    if (!data?.details || data?.details < 5)
        error["details"] = "آدرس را کامل وارد کنید";

    return Object.keys(error).length ? error : false;
};

export const discountValidation = (data) => {
    let error = {};

    if (!data?.code) error["code"] = "کد تخفیف نمی تواند خالی باشد";

    if (!data?.start) error["start"] = "تاریخ شروع نامعتبر";

    if (!data?.expire) error["expire"] = "تاریخ پایان نامعتبر";

    if (new Date(data?.expire).getTime() <= new Date(data?.start).getTime())
        error["expire"] = "تاریخ انقضای شما قبل از آغاز تاریخ شروع ثبت شده است";

    // if (!data?.active) error["active"] = "لطفا کد را فعال کنید";

    if(data?.value <= 0) error["value"] = "مقادیر منفی و صفر نامعتبر است";
    if(data?.minOrder <= 0) error["minOrder"] = "مقادیر منفی و صفر نامعتبر است";
    if(data?.usageLimit <= 0) error["usageLimit"] = "مقادیر منفی و صفر نامعتبر است";

    return Object.keys(error).length ? error : false;
};
