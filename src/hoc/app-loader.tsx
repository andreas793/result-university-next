'use client'

import {useSession} from "next-auth/react";
import {useAuthStore} from "@/store/auth.store";
import {ReactNode, useEffect} from "react";

interface IProps {
    children: ReactNode;
}

const AppLoader= ({children}: IProps) => {
    const {data: session, status} = useSession();
    const {setAuthState} = useAuthStore();

    useEffect(() => {
        setAuthState(status, session)
    }, [status, session, setAuthState]);
    return <>{children}</>
}

export default AppLoader;