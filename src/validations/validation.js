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
    return Object.keys(error).length ? error : null
};
