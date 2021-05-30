import React from 'react'
import {Background} from "./HomeCss"

export const Home = ({children}) => {
    return (
        <Background>
            {children}
        </Background>
    )
}

