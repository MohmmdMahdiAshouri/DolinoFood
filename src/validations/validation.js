const restaurantValidation = (data) => {
    let error = {}

    // validation name
    if(!data?.name) error["name"] = "لطفا نام پذیرنده را وارد کنید"
    if(data?.name?.length < 3) error["name"] = "حداقل نام پذیرنده باید سه کاراکتر باشد"

    // validation userName
    if(!data?.userName) error["userName"] = "لطفا نام کاربری را وارد کنید"
    if(data?.userName?.length < 3) error["userName"] = "حداقل نام کاربری باید سه کاراکتر باشد"

    // validation password 
    if(!data?.password) error["password"] = "لطفا رمز عبور را وارد کنید"
    if(data?.password?.length < 5) error["password"] = "حداقل رمز عبور باید پنج کاراکتر باشد"

    if(Object.keys(error).length > 0) {
        return error
    }else{
        return false
    }
}

export default restaurantValidation