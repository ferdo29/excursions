import * as React from 'react';
import {useContext, useMemo} from "react";
import UserFB from "../contexts/userFB";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export const useUserData = () => {

    const {user, setAuth} = useContext(UserFB)

    const session = async () => {
        try {
            const KeyUser = await SecureStore.getItemAsync('KeyUser')
            const {accessToken, refreshToken, ...props} = JSON.parse(KeyUser)
            const headers = {headers : {'Content-Type': 'application/json'}}

            const {data: {access_token, refresh_token}} = await axios.post(
                `https://securetoken.googleapis.com/v1/token?key=${process.env.API_KEY}`,
                {
                    grant_type: "refresh_token",
                    refresh_token: refreshToken
                }, headers)
            const {data: user} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.API_KEY}`,
                { idToken: access_token},
                headers
            )

            setAuth({user: user.users[0], accessToken: access_token, refreshToken: refresh_token})

        } catch (e) {
            console.log(e.message)
        }

    }

    const checkedOldSession = (deps) => useMemo(() => {
        !deps && session().then()
    }, [deps])

    return {checkedOldSession}
};