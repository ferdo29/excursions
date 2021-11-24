import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data: [
        {
            id: 1,
            title: 'Оформление заказа',
            data: [
                {
                    id: 11,
                    title: 'Обязательна ли регистрация при покупке экскурсии?',
                    body: 'Если вы сделали заказ, то вы через приложение, то после прохождения регистрации, вы сможете видеть все свои заказы во вкладке меню «Мои заказы». Соответственно, после покупки экскурсии ссылку на нее вы сможете получить на странице «Мои заказы». Регистрация необходима.',
                    open: false
                },
                {
                    id: 12,
                    title: 'Обязательна ли регистрация при покупке экскурсии?',
                    body: 'Если вы сделали заказ, то вы через приложение, то после прохождения регистрации, вы сможете видеть все свои заказы во вкладке меню «Мои заказы». Соответственно, после покупки экскурсии ссылку на нее вы сможете получить на странице «Мои заказы». Регистрация необходима.',
                    open: false
                },
            ]
        },
        {
            id: 2,
            title: 'Изменение или отмена заказа',
            data: [
                {
                    id: 21,
                    title: 'Заказ уже оплачен, могу ли я его вернуть?',
                    body: 'Если вы сделали заказ, то вы через приложение, то после прохождения регистрации, вы сможете видеть все свои заказы во вкладке меню «Мои заказы». Соответственно, после покупки экскурсии ссылку на нее вы сможете получить на странице «Мои заказы». Регистрация необходима.',
                    open: false
                },
                {
                    id: 22,
                    title: 'Могу ли вернуть деньги, если время использования истекло, но экскурсией так и не воспользовались?',
                    body: 'Если вы сделали заказ, то вы через приложение, то после прохождения регистрации, вы сможете видеть все свои заказы во вкладке меню «Мои заказы». Соответственно, после покупки экскурсии ссылку на нее вы сможете получить на странице «Мои заказы». Регистрация необходима.',
                    open: false
                },
            ]
        },
        {
            id: 3,
            title: 'Оформление заказа',
            data: [
                {
                    id: 31,
                    title: 'Обязательна ли регистрация при покупке экскурсии?',
                    body: 'Если вы сделали заказ, то вы через приложение, то после прохождения регистрации, вы сможете видеть все свои заказы во вкладке меню «Мои заказы». Соответственно, после покупки экскурсии ссылку на нее вы сможете получить на странице «Мои заказы». Регистрация необходима.',
                    open: false
                },
                {
                    id: 32,
                    title: 'Обязательна ли регистрация при покупке экскурсии?',
                    body: 'Если вы сделали заказ, то вы через приложение, то после прохождения регистрации, вы сможете видеть все свои заказы во вкладке меню «Мои заказы». Соответственно, после покупки экскурсии ссылку на нее вы сможете получить на странице «Мои заказы». Регистрация необходима.',
                    open: false
                },
            ]
        },
        {
            id: 4,
            title: 'Изменение или отмена заказа',
            data: [
                {
                    id: 41,
                    title: 'Заказ уже оплачен, могу ли я его вернуть?',
                    body: 'Если вы сделали заказ, то вы через приложение, то после прохождения регистрации, вы сможете видеть все свои заказы во вкладке меню «Мои заказы». Соответственно, после покупки экскурсии ссылку на нее вы сможете получить на странице «Мои заказы». Регистрация необходима.',
                    open: false
                },
                {
                    id: 42,
                    title: 'Могу ли вернуть деньги, если время использования истекло, но экскурсией так и не воспользовались?',
                    body: 'Если вы сделали заказ, то вы через приложение, то после прохождения регистрации, вы сможете видеть все свои заказы во вкладке меню «Мои заказы». Соответственно, после покупки экскурсии ссылку на нее вы сможете получить на странице «Мои заказы». Регистрация необходима.',
                    open: false
                },
            ]
        },
    ],
    isLoading: false,
    error: '',
}

const counterSlice = createSlice({
    name: 'faq',
    initialState,
    reducers: {
            setOpenClose(state, action){
                state.data[action.payload.parent].data[action.payload.child] = !state.data[action.payload.parent].data[action.payload.child]
            }
    },

})

export const {setOpenClose} = counterSlice.actions
export default counterSlice.reducer