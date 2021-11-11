import useValidDataUser from './useValidDataUser'
import i18n from "i18n-js";
const {checkPassword, checkPasswords, checkPhone, checkEmail, checkName, clearingEmailPhone} = useValidDataUser()

const arrayEmail = [
    {name: "ferd22-99@gmailcom", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "ferd22-99gmail.com", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "ferd22-99@mailcom", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "ferd22-99@gmail.com", expected: { correct: true, cb: "" }},

    {name: "ferd2299@gmailcom", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "ferd2299gmail.com", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "ferd2299@mailcom", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "ferd2299@gmail.com", expected: { correct: true, cb: "" }},

    {name: "ca_shehab620hrysyucom", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "ca_shehab620@hrysyucom", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "ca_shehab620hrysyu.com", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "ca_shehab620@hrysyu.com", expected: { correct: true, cb: "" }},

    {name: "ssalman.khanemtaozicom", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "ssalman.khanemtaozi.com", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "ssalman.khan@emtaozicom", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "ssalman.khan@emtaozi.com", expected: { correct: true, cb: "" }},

    {name: "mnicolassfcortez1liteksite", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "mnicolassfcortez1@liteksite", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "mnicolassfcortez1litek.site", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "mnicolassfcortez1@litek.site", expected: { correct: true, cb: "" }},

    {name: "5hamza.maoui.58lmanghinsucom", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "5hamza.maoui.58l@manghinsucom", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "5hamza.maoui.58lmanghinsu.com", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "5hamza.maoui.58l@manghinsu.com", expected: { correct: true, cb: "" }},

    {name: "eadem.zabgmailnicom", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "eadem.zab@gmailnicom", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "eadem.zabgmailni.com", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "eadem.zab@gmailni.com", expected: { correct: true, cb: "" }},

    {name: "nnad.me3txtsqsite", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "nnad.me3@txtsqsite", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "nnad.me3txtsq.site", expected: { correct: false, cb: i18n.t("Error You entered an incorrect mailing address") }},
    {name: "nnad.me3@txtsq.site", expected: { correct: true, cb: "" }},



]
const arrayPhone = [
    {value:'+7 (999) 888-88-8', expected: { correct: false, cb: i18n.t("Error Minimum phone number length 10 characters") }},
    {value:'+72 (999) 888-88-8', expected: { correct: false, cb: i18n.t("Error Minimum phone number length 11 characters") }},
    {value:'+733 (999) 888-88-8', expected: { correct: false, cb: i18n.t("Error Minimum phone number length 12 characters") }},
    {value:'+7333 (999) 888-88-8', expected: { correct: false, cb: i18n.t("Error Minimum phone number length 13 characters") }},
    {value:'+7 (999) 888-88-88', expected: { correct: true, cb: "" }},
    {value:'+72 (999) 888-88-88', expected: { correct: true, cb: "" }},
    {value:'+733 (999) 888-88-88', expected: { correct: true, cb: "" }},
    {value:'+7333 (999) 888-88-88', expected: { correct: true, cb: "" }},

    {value:'+7 346-333-1' , expected: { correct: false, cb: i18n.t("Error Minimum phone number length 10 characters") }},
    {value:'+72 346-333-1' , expected: { correct: false, cb: i18n.t("Error Minimum phone number length 11 characters") }},
    {value:'+733 346-333-1' , expected: { correct: false, cb: i18n.t("Error Minimum phone number length 12 characters") }},
    {value:'+7333 346-333-1' , expected: { correct: false, cb: i18n.t("Error Minimum phone number length 13 characters") }},
    {value:'+7 346-333-1418' , expected: { correct: true, cb: "" }},
    {value:'+72 346-333-1418' , expected: { correct: true, cb: "" }},
    {value:'+733 346-333-1418' , expected: { correct: true, cb: "" }},
    {value:'+7333 346-333-1418' , expected: { correct: true, cb: "" }},

    {value:'+7 ' , expected: { correct: false, cb: i18n.t("Error Minimum phone number length 10 characters") }},
    {value:'+72 ' , expected: { correct: false, cb: i18n.t("Error Minimum phone number length 11 characters") }},
    {value:'+733 ' , expected: { correct: false, cb: i18n.t("Error Minimum phone number length 12 characters") }},
    {value:'+7333 ' , expected: { correct: false, cb: i18n.t("Error Minimum phone number length 13 characters") }},

    {value:'+7 479-652-543' , expected: { correct: false, cb: i18n.t("Error Minimum phone number length 10 characters") }},
    {value:'+72 479-652-543' , expected: { correct: false, cb: i18n.t("Error Minimum phone number length 11 characters") }},
    {value:'+733 479-652-543' , expected: { correct: false, cb: i18n.t("Error Minimum phone number length 12 characters") }},
    {value:'+7333 479-652-543' , expected: { correct: false, cb: i18n.t("Error Minimum phone number length 13 characters") }},
    {value:'+7 479-652-5434' , expected: { correct: true, cb: "" }},
    {value:'+72 479-652-5434' , expected: { correct: true, cb: "" }},
    {value:'+733 479-652-5434' , expected: { correct: true, cb: "" }},
    {value:'+7333 479-652-5434' , expected: { correct: true, cb: "" }},

    {value:'+7 609-814-023' , expected: { correct: false, cb: i18n.t("Error Minimum phone number length 10 characters") }},
    {value:'+72 609-814-023' , expected: { correct: false, cb: i18n.t("Error Minimum phone number length 11 characters") }},
    {value:'+733 609-814-023' , expected: { correct: false, cb: i18n.t("Error Minimum phone number length 12 characters") }},
    {value:'+7333 609-814-023' , expected: { correct: false, cb: i18n.t("Error Minimum phone number length 13 characters") }},
    {value:'+7 609-814-0236' , expected: { correct: true, cb: "" }},
    {value:'+72 609-814-0236' , expected: { correct: true, cb: "" }},
    {value:'+733 609-814-0236' , expected: { correct: true, cb: "" }},
    {value:'+7333 609-814-0236' , expected: { correct: true, cb: "" }},

    {value:'+7 (610)-469-976' , expected: { correct: false, cb: i18n.t("Error Minimum phone number length 10 characters") }},
    {value:'+72 (610)-469-976' , expected: { correct: false, cb: i18n.t("Error Minimum phone number length 11 characters") }},
    {value:'+733 (610)-469-976' , expected: { correct: false, cb: i18n.t("Error Minimum phone number length 12 characters") }},
    {value:'+7333 (610)-469-976' , expected: { correct: false, cb: i18n.t("Error Minimum phone number length 13 characters") }},
    {value:'+7 (610)-469-9760' , expected: { correct: true, cb: "" }},
    {value:'+72 (610)-469-9760' , expected: { correct: true, cb: "" }},
    {value:'+733 (610)-469-9760' , expected: { correct: true, cb: "" }},
    {value:'+7333 (610)-469-9760' , expected: { correct: true, cb: "" }},

    {value:'+7333 (999) 888-88-889' , expected: { correct: false, cb: i18n.t("Error Exceeds phone number lengths") }},


]
const arrayName = [
    {value:'', expected: {correct: false, cb: i18n.t('Error The field is not filled')}},
    {value:' ', expected: {correct: false, cb: i18n.t('Error The field is not filled')}},
    {value:'  ', expected: {correct: false, cb: i18n.t('Error The field is not filled')}},
    {value:'V', expected: {correct: false, cb: i18n.t('Error Minimum name length 2 characters')}},
    {value:'Ali', expected: {correct: true, cb: ''}},
    {value:'Beatriz', expected: {correct: true, cb: ''}},
    {value:'Charles', expected: {correct: true, cb: ''}},
    {value:'Diya', expected: {correct: true, cb: ''}},
    {value:'Eric', expected: {correct: true, cb: ''}},
    {value:'Fatima', expected: {correct: true, cb: ''}},
    {value:'Gabriel', expected: {correct: true, cb: ''}},
    {value:'Hanna', expected: {correct: true, cb: ''}},
    {value:'Rice', expected: {correct: true, cb: ''}},
    {value:'Gray', expected: {correct: true, cb: ''}},
    {value:'Scott', expected: {correct: true, cb: ''}},
]
const arrayPassword = [
    {value:'', valid:'', expected: {correct: false, cb: i18n.t('Error The minimum number of password characters is 8')}, expectedValid: {correct: true, cb: ''}},
    {value:'qwertyui', valid:'qwertyui', expected: {correct: false, cb: i18n.t('Error Password must contain clean characters')}, expectedValid: {correct: true, cb: ''}},
    {value:'123455678', valid:'123455678', expected: {correct: false, cb: i18n.t('Error Password must contain alphabetic characters')}, expectedValid: {correct: true, cb: ''}},
    {value:'12345567p', valid:'12345567p', expected: {correct: false, cb: i18n.t('Error Password must contain at least one uppercase Latin letter')}, expectedValid: {correct: true, cb: ''}},
    {value:'123Lp!@#$%', valid:'123Lp!@#$%', expected: {correct: false, cb: i18n.t('Error Password contains invalid characters')}, expectedValid: {correct: true, cb: ''}},
    {value:'My250889', valid:'My250889', expected: {correct: true, cb: ''}, expectedValid: {correct: true, cb: ''}},

    {value:'7aBW`hU3', valid: '7aBW`hU3', expected: {correct: false, cb: i18n.t('Error Password contains invalid characters')}, expectedValid: {correct: true, cb: ''}},
    {value:'Qs4VkAH', valid: 'Qs4VkAH', expected: {correct: false, cb: i18n.t('Error The minimum number of password characters is 8')}, expectedValid: {correct: true, cb: ''}},
    {value:'PScFXFjxM', valid: 'PScFXFjxM', expected: {correct: false, cb: i18n.t('Error Password must contain clean characters')}, expectedValid: {correct: true, cb: ''}},
    {value:'4sb8kg2wd', valid: '4sb8kg2wd', expected: {correct: false, cb: i18n.t('Error Password must contain at least one uppercase Latin letter')}, expectedValid: {correct: true, cb: ''}},
    {value:'EKHYLU4W8', valid: 'EKHYLU4W8', expected: {correct: false, cb: i18n.t('Error Password must contain alphabetic characters')}, expectedValid: {correct: true, cb: ''}},

    {value:'My250889', valid: 'My250889', expected: {correct: true, cb: ''}, expectedValid: {correct: true, cb: ''}},
    {value:'My250889', valid: 'my250889', expected: {correct: true, cb: ''}, expectedValid: {correct: false, cb: i18n.t('Error Password mismatch')}},

    {value:'2R4XUEbbX', valid: '2R4XUEbbX', expected: {correct: true, cb: ''}, expectedValid: {correct: true, cb: ''}},
    {value:'2R4XUEbbX', valid: '2R4XUEbbX1', expected: {correct: true, cb: ''}, expectedValid: {correct: false, cb: i18n.t('Error Password mismatch')}},
    {value:'zCL7Tha5x', valid: 'zCL7Tha5x', expected: {correct: true, cb: ''}, expectedValid: {correct: true, cb: ''}},
    {value:'zCL7Tha5x', valid: 'zCL7Tha5x1', expected: {correct: true, cb: ''}, expectedValid: {correct: false, cb: i18n.t('Error Password mismatch')}},
    {value:'h9GfXX2MZ', valid: 'h9GfXX2MZ', expected: {correct: true, cb: ''}, expectedValid: {correct: true, cb: ''}},
    {value:'h9GfXX2MZ', valid: 'h9GfXX2MZ1', expected: {correct: true, cb: ''}, expectedValid: {correct: false, cb: i18n.t('Error Password mismatch')}},
    {value:'ZfJgucb6p', valid: 'ZfJgucb6p', expected: {correct: true, cb: ''}, expectedValid: {correct: true, cb: ''}},
    {value:'ZfJgucb6p', valid: 'ZfJgucb6p1', expected: {correct: true, cb: ''}, expectedValid: {correct: false, cb: i18n.t('Error Password mismatch')}},

]
const arrayClear = [
    {value: 'ferd22-99@mail.com', expected:{correct: true, cb: 'ferd22-99@mail.com'}},
    {value: 'ferd22-99@mailcom', expected:{correct: false, cb: ''}},
    {value: '+7 (999) 999-99-99', expected:{correct: true, cb: '79999999999'}},
    {value: '+70 (999) 999-99-99', expected:{correct: true, cb: '709999999999'}},
    {value: '+700 (999) 999-99-99', expected:{correct: true, cb: '7009999999999'}},
    {value: '+7000 (999) 999-99-99', expected:{correct: true, cb: '70009999999999'}},
    {value: '+7 (999) 999-99-99a', expected:{correct: false, cb: ''}},
    {value: '+70 (999) 999-99-99a', expected:{correct: false, cb: ''}},
    {value: '+700 (999) 999-99-99a', expected:{correct: false, cb: ''}},
    {value: '+7000 (999) 999-99-99a', expected:{correct: false, cb: ''}},
    {value: '+7 (999) 999-99-9a', expected:{correct: false, cb: ''}},
    {value: '+70 (999) 999-99-9a', expected:{correct: false, cb: ''}},
    {value: '+700 (999) 999-99-9a', expected:{correct: false, cb: ''}},
    {value: '+7000 (999) 999-99-9a', expected:{correct: false, cb: ''}},
    {value: '+7000 (999) 999-99-999', expected:{correct: false, cb: i18n.t('Error Exceeds phone number lengths')}},
]

describe.each(arrayPassword)('.add(password)', ({value, valid, expected, expectedValid}) => {
    test('shout be defined', () => {
        expect(checkPassword).toBeDefined()
        expect(checkPassword).not.toBeUndefined()
    })
    test("Password check: " + value, () => expect(checkPassword(value)) .toEqual(expected))
    test("Passwords check: " + value + ' , ' + valid, () => expect(checkPasswords(value, valid)) .toEqual(expectedValid))
})

describe.each(arrayEmail)('.add(email)', ({name, expected}) => {
    test('shout be defined', () => {
        expect(checkEmail).toBeDefined()
        expect(checkEmail).not.toBeUndefined()
    })
    test("Email check " + name, () => expect(checkEmail(name)) .toEqual(expected))
})

describe.each(arrayPhone)('.add(phone)', ({value, expected}) => {
    test('shout be defined', () => {
        expect(checkPhone).toBeDefined()
        expect(checkPhone).not.toBeUndefined()
    })
    test("Length number" + value, () => expect(checkPhone(value)) .toEqual(expected))
})

describe.each(arrayName)('.add(name)', ({value, expected}) => {
    test('shout be defined', () => {
        expect(checkName).toBeDefined()
        expect(checkName).not.toBeUndefined()
    })
    test("Check name " + value, () => expect(checkName(value)) .toEqual(expected))
})

describe.each(arrayClear)('.add(clearing)', ({value, expected}) => {
    test('shout be defined', () => {
        expect(clearingEmailPhone).toBeDefined()
        expect(clearingEmailPhone).not.toBeUndefined()
    })
    test("Check name " + value, () => expect(clearingEmailPhone(value)) .toEqual(expected))
})

