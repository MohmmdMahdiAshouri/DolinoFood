"use client"
import { createContext, useState } from "react"

export const ViewContext = createContext()
export const ViewProvider = ({children}) => {
    const [openLoginModal, setOpenLoginModal] = useState(false)
    const [userLogin, setUserLogin] = useState(false)
    return(
        <ViewContext.Provider value={{openLoginModal, setOpenLoginModal, userLogin, setUserLogin}}>
            {children}
        </ViewContext.Provider>
    )
}