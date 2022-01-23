import hillo from 'hillo'

export const topSet = require('@/assets/topSet.json') ?? [[]]


export const weddingItem = {
    bodice: {}, sleeves: {}, skirt: {}
}

export const CUSTOMER_STR = '/customer'
export const DressDesignEndPoint = '/dressDesign'
export const DressPartEndPoint = '/dressPart'

//CustomerController
export async function customerRegister(email, password, firstName, lastName, city, phone) {
    return await hillo.post(CUSTOMER_STR + '/register', {email, password, firstName, lastName, city, phone})
}

/**
 *
 * @param email
 * @return {Promise<number>}
 */
export async function customerCheckEmailRegistered(email) {
    return await hillo.post(CUSTOMER_STR + '/checkEmailRegistered', {email})
}

export async function customerConfirmRegister(uuid) {
    return await hillo.get(CUSTOMER_STR + '/confirmRegister/', {uuid})
}

export async function customerLogin(userName, password) {
    return (await hillo.post(CUSTOMER_STR + '/login', {userName, password})).data
}

export async function customerMe() {
    return await hillo.get(CUSTOMER_STR + '/me')
}

export async function customerInit(customer, weddingDate, likeAndHate, imgs) {
    return await hillo.post(CUSTOMER_STR + '/init', {customer, weddingDate, likeAndHate, imgs})
}

//DressDesignController
export async function updateMyDesignParts(designId, dressPartIds) {
    return (await hillo.post(DressDesignEndPoint + '/' + `${designId}` + '/updateParts', {dressPartIds})).data
}

export async function completeDesign(id) {
    return (await hillo.post(DressDesignEndPoint + '/setComplete/' + `${id}`)).data
}

export async function placeSampleOrder(id, quantity, deliveryAddress, billingAddress) {
    return (await hillo.post(DressDesignEndPoint + '/placeSampleOrder/' + `${id}`, {
        quantity, deliveryAddress, billingAddress
    })).data
}

export async function loadDesign(id) {
    return (await hillo.get(DressDesignEndPoint + '/getById/' + id)).data
}

export async function createNewDesign(name) {
    return (await hillo.post(DressDesignEndPoint + '/createNew', {name})).data
}

//DressPartController
export async function getDressPartList() {
    return (await hillo.get(DressPartEndPoint + '/getList')).data
}

export async function setDressComplete(id) {
    return (await hillo.post(DressDesignEndPoint + '/setComplete/' + id))
}

export async function refreshCurrentPartInfo(selectedDressPartIds) {
    return (await hillo.post(DressPartEndPoint + '/refreshCurrentPartInfo', {
        dressPartIds: selectedDressPartIds
    })).data
}

export async function getMyDesign() {
    return (await hillo.post(DressDesignEndPoint + '/myList')).data
}



