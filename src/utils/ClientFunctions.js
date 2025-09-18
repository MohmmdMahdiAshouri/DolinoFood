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
