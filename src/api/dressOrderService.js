import hillo from "hillo";
// import {placeSampleOrder} from "./dressDesginService";

const defaultAddress = {
    firstName: 'Haodong',
    lastName: 'Ju',
    addressLine1: 'KreuzStr.3',
    addressLine2: '',
    postCode: '52080',
    city: 'Aachen',
    stateOrProvice: 'NRW'
}


export async function dressOrder() {
    return (await hillo.post('/dressOrder/myOrder')).data
}

export async function placeSampleOrder (id, quantity = 1, deliveryAddress = defaultAddress, billingAddress = defaultAddress) {
    return (await hillo.post('/dressOrder/placeSampleOrder/' + `${id}`, {
        quantity, deliveryAddress, billingAddress
    })).data
}


// 无订单ID
export async function payNewByPaypal (amount) {
    return (await hillo.post('/dressOrder/createNewByPaypal', {amount})).data
}

export async function payNewByBilling (amount) {
    return (await hillo.post(`/dressOrder/createNewByBilling`, {amount}))
}


// 有订单ID
export async function paySampleOrder (id) {
    return (await hillo.post('/dressOrder/paySampleOrder/' + `${id}`)).data
}

export async function paySampleOrderBilling (id) {
    return (await hillo.post(`/dressOrder/paySampleOrderBilling/${id}`))
}

export async function paySampleOrderAdvance (id) {
    return (await hillo.post(`/dressOrder/paySampleOrderAdvance/${id}`))
}
