import i18n from "i18n-js";

export default () => {

    const length = 8
    const numbers = /[0-9]/g
    const upperCaseLetters = /[A-Z]/g
    const upperLetters = /[a-z]/g
    const letters = /[a-zA-Z]/g
    const reg = /.+@.+\.[A-Za-z]+$/

    const minMax = (value, nameField= '', minLength = 2, maxLength = 1000) => {
        if(minLength > maxLength){
            if((value.length < 2)) return {correct: false,   cb: `Минимальная длина ${nameField} ${2} символов` }
            if((value.length > 1000)) return {correct: false,   cb: `Максимальная длина ${nameField} ${1000} символов` }
        }else{
            if((value.length < minLength)) return {correct: false,   cb: `Минимальная длина ${nameField} ${minLength} символов` }
            if((value.length > maxLength)) return {correct: false,   cb: `Максимальная длина ${nameField} ${maxLength} символов` }
        }
        return {correct: true, cb:'' }
    }


    const checkPhone = (value) => {
        if(value.match(numbers).length < 11) return {correct: false,   cb: 'Минимальная длина телефонного номера 11 символов' }
        return {correct: true, cb:'' }
    }
    const checkNumber = (value, nameField= '', minLength = 2, maxLength = 1000) => {
        if((value.length <= 0)) return {correct: false,   cb: `Поле${ " "+ nameField} не заполнено` }
        if (!value.match(numbers) || !!value.match(letters)) return {correct: false, cb: `Поле${ " "+ nameField} должно содержать только числа`}

        const result = minMax(value, nameField, minLength , maxLength)
        if (!result.correct ) return result

        return {correct: true, cb:'' }
    }
    const checkPassword = (value) => {
        if (!value.match(numbers)) return {correct: false, cb: 'Пароль должен содержать чистые символы'}
        if (!value.match(upperLetters)) return {correct: false, cb: 'Пароль должен содержать буквенные символы.'}
        if (!value.match(upperCaseLetters)) return {correct: false, cb: 'Пароль должен содержать хотя бы одну заглавную латинскую букву.'}
        if (!(value.length >= length)) return {correct: false, cb: 'Минимальное количество символов пароля - 8'}
        return {correct: true, cb:'' }
    }
    const checkPasswords = (value, validCompare ) => {
        if (value !== validCompare) return {correct: false, cb: 'Пароли не совпадают'}
        else {return {correct: true, cb: ''}}
    }
    const checkEmail = (value) => {
        if(!value.match(reg)) return {correct: false, cb: 'Вы ввели неверный почтовый адрес' }
        return {correct: true, cb:'' }
    }
    const checkName = (value, nameField = '') => {
        if((value.split(' ').join('').length <= 0)) return {correct: false,   cb: `Поле${ " "+ nameField} не заполнено` }
        if(!(value.length >= 2)) return {correct: false,   cb: `Минимальная длина ${nameField} 2 символа` }
        return {correct: true, cb:'' }
    }
    const checkText = (value, nameField = '', minLength = 2, maxLength = 1000) => {
        if((value.length <= 0)) return {correct: false,   cb: `Поле${ " "+ nameField} не заполнено` }

        const result = minMax(value, nameField, minLength , maxLength)
        if (!result.correct ) return result

        return {correct: true, cb:'' }
    }
    const phoneFormat = (value) => {
        switch (value.match(numbers).length) {
            case 11: return  value.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5")
            case 12: return  value.replace(/(\d2)(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5")
            case 13: return  value.replace(/(\d3)(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5")
            default: return value.match(numbers).join('')
        }

    }


    return {checkPassword, checkPasswords, checkPhone, checkEmail, checkName, checkNumber, checkText, phoneFormat}
}
