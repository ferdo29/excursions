import i18n from "i18n-js";

export default () => {

    const length = 8
    const numbers = /[0-9]/g
    const upperCaseLetters = /[A-Z]/g
    const upperLetters = /[a-z]/g
    const wordAll = /[aA-zZ]/g
    const reg = /(.+)(@)(.+)(\.)(.+)/
    const lat = /[',.!?;:()"|\/\\@#$%ˆ&*()_\-=+{}\[\]`˜±§<>©˙∆˚¬…Ω≈√∫˜µ≥≤÷∑´®†¥¨ˆøπ“‘]/gm

    const checkPassword = (password) => {
        if (!(password.length >= length)) return {
            correct: false,
            cb: i18n.t("Error The minimum number of password characters is 8")
        }
        if (!password.match(numbers)) return {correct: false, cb: i18n.t("Error Password must contain clean characters")}
        if (!password.match(upperLetters)) return {correct: false, cb: i18n.t("Error Password must contain alphabetic characters")}
        if (!password.match(upperCaseLetters)) return {
            correct: false,
            cb: i18n.t("Error Password must contain at least one uppercase Latin letter")
        }
        if (password.match(lat)) return {correct: false, cb: i18n.t("Error Password contains invalid characters")}

        return {correct: true, cb: ''}
    }
    const checkPasswords = (password, validPassword) => {
        if (password !== validPassword) return {correct: false, cb: i18n.t('Error Password mismatch')}
        return {correct: true, cb: ''}
    }
    const checkPhone = (phone) => {

        const lengthNumber = phone.replace(/[+()-]|\s/gm, '').length
        const phoneSlice = phone.slice(1, 100).split(' ')[0].length
        const message = (num) => i18n.t(`Error Minimum phone number length ${num} characters`)

        if (phone) {
            if (phoneSlice === 1 && lengthNumber < 11) return {
                correct: false,
                cb: message(10)
            }
            if (phoneSlice === 2 && lengthNumber < 12) return {
                correct: false,
                cb: message(11)
            }
            if (phoneSlice === 3 && lengthNumber < 13) return {
                correct: false,
                cb: message(12)
            }
            if (phoneSlice === 4 && lengthNumber < 14) return {
                correct: false,
                cb: message(13)
            }
            if (lengthNumber > 14) return {
                correct: false,
                cb: i18n.t(`Error Exceeds phone number lengths`)
            }
        }
        return {correct: true, cb: ''}
    }
    const checkEmail = (email) => {
        if (!email.match(reg)) return {correct: false, cb: i18n.t("Error You entered an incorrect mailing address")}
        return {correct: true, cb: ''}
    }
    const checkName = (name) => {
        if ((name.replace(/\s/gm, '').length <= 0)) return {correct: false, cb: i18n.t('Error The field is not filled')}
        if (name.length > 0 && name.length < 2) return {correct: false, cb: i18n.t('Error Minimum name length 2 characters')}
        return {correct: true, cb: ''}
    }
    const clearingEmailPhone = (str) => {
        if(str.match(wordAll)) {
            if (str.match(reg)){
                return {correct: true, cb: str}
            }else {
                return {correct: false, cb: ''}
            }
        }else{
            const {correct, cb} = checkPhone(str)
            if (correct) return {correct, cb: str.replace(lat, '').replace(/\s/gm, '')}
                         return {correct, cb}
            // return  {correct: true, cb: word.replace(lat, '').replace(/\s/gm, '')}
        }
    }


    return {checkPassword, checkPasswords, checkPhone, checkEmail, checkName, clearingEmailPhone}
}
