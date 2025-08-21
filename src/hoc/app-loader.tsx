'use client'

import {useSession} from "next-auth/react";
import {useAuthStore} from "@/store/auth.store";
import {ReactNode, useEffect} from "react";
import {useIngredientStore} from "@/store/ingredient.store";

interface IProps {
    children: ReactNode;
}

const AppLoader= ({children}: IProps) => {
    const {data: session, status} = useSession();
    const {isAuth, setAuthState} = useAuthStore();
    const {loadIngredients} = useIngredientStore();

    useEffect(() => {
        setAuthState(status, session)
    }, [status, session, setAuthState]);

    useEffect(() => {
        if(isAuth){
            loadIngredients();
        }
    }, [isAuth, loadIngredients ]);

    return <>{children}</>
}

export default AppLoader;