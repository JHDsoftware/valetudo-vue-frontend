// import {customerLogin} from "../api/customerService";
// import {refreshHeader} from "../main";

import {customerEditMe, customerUploadDressOrderAddress} from "@/api/customerService";

export const orderBestellungHeader = [
    {
        text: 'Bestellnummer',
        align: 'start',
        sortable: false,
        value: 'bn'
    },
    {
        text: 'Bestelldatum',
        value: 'bdatum'
    },
    {
        text: 'Artikel',
        value: 'artikel'
    },
    {
        text: 'Name des Kleides',
        value: 'name'
    },
    {
        text: 'Anzahl',
        value: 'anzahl'
    },
    {
        text: 'Gesamtsumme',
        value: 'gesamtsum'
    },
    {
        text: 'Bezahlstatus',
        value: 'bStatus'
    },
    {text: 'Action', value: 'actionTitle'}
]


export async function updateAddress(dataBodyWithAddress, address, str = 'deliveryAddress') {

    let snackbar = false
    let snackbarText = ''
    // let dataBody = {}
    let sourceAddress =
        str === 'billingAddress' ? dataBodyWithAddress.billingAddress : dataBodyWithAddress.deliveryAddress

    if (JSON.stringify(sourceAddress) === JSON.stringify(address)) {

        return {snackbar, snackbarText}
    }

    // const data = {
    //     ...dataBody.deliveryAddress,
    //     firstName: dataBody.firstName,
    //     lastName: dataBody.lastName,
    //     city: dataBody.city
    // }


    const uploadAddress = await customerUploadDressOrderAddress(address)
    let addressId =
        str === 'billingAddress' ?
            {billingAddressId: uploadAddress.data.id} :
            {deliveryAddressId: uploadAddress.data.id}


    if (uploadAddress.code === 200) {

        const res = await customerEditMe({...dataBodyWithAddress, ...addressId})
        // dataBody = Object.assign(dataBody, res.data)
        if (res.code != 200) {
            snackbar = true
            snackbarText = res.message
        }
    } else {
        snackbar = true
        snackbarText = uploadAddress.message
    }

    return {snackbar, snackbarText}
}


export function firstQuestion(listCount){

    const showBaseQuestion = JSON.parse(localStorage.getItem('showBaseQuestion')) ?? true
    console.log("showBaseQuestion", showBaseQuestion)

    if (listCount.currentCount === 0) {
        if (showBaseQuestion){
            window.path.replace('/questionspage')
            localStorage.setItem('showBaseQuestion', false)
        }else {
            window.path.replace('/OrderIndex/Entwurf')
        }
    }
}
