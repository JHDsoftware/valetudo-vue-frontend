import hillo from 'hillo'

export const bodySelections = [{
        id: 'B',
        name: 'Primary front bodice neckline',
        subOptions: [
            { id: 1, name: 'Straight' },
            { id: 2, name: 'Sweetheart' },
            { id: 3, name: 'V-neck' },
            { id: 4, name: 'Basket' },
            { id: 5, name: 'Scoop neck' },
            { id: 6, name: 'Crewneck' },
            { id: 7, name: 'Boatneck' },
            { id: 8, name: 'Mockneck' },
            { id: 9, name: 'Off the shoulder' },
            { id: 10, name: 'Slant shoulder' },
            { id: 11, name: 'Waterdrop' }
        ]
    },
    {
        id: 'C',
        name: 'Font bodices lining',
        subOptions: [
            { id: '2a', name: 'Standard' },
            { id: '2b', name: 'Subtle' },
            { id: '2c', name: 'Angeled' },
            { id: '2d', name: 'Pointed' },
            { id: '2e', name: 'Narrow' }
        ]
    },
    {
        id: 'D',
        name: 'Front bodices lining',
        subOptions: [
            { id: 'Da', name: 'Unlined' },
            { id: 'Db', name: 'Lined' },
            { id: 'Dc', name: 'Totally unlined wich lace' }
        ]
    },
    {
        id: 'E',
        name: 'Bodice lace',
        subOptions: [
            { id: 'Ea', name: 'Unlined' },
            { id: 'Eb', name: 'Unlined' },
            { id: 'Ec', name: 'Unlined' },
            { id: 'Ed', name: 'Unlined' },
            { id: 'Ee', name: 'Unlined' },
            { id: 'Ef', name: 'Unlined' }
        ]
    },
    {
        id: 'F',
        name: 'Front bodice details',
        subOptions: [
            { id: 'Fa', name: 'No details' },
            { id: 'Fb', name: 'Folded Neckline' },
            { id: 'Fc', name: 'Bodice ruching' }
        ]
    },
    {
        id: 'G',
        name: 'Body sleeves',
        subOptions: [
            { id: 'Ga', name: 'No' },
            { id: 'Gb', name: 'Short sleeve' },
            { id: 'Gc', name: 'Middle lang sleeves' },
            { id: 'Gd', name: 'Lang sleeves' }
        ]
    },
    {
        id: 'H',
        name: 'Straps details',
        subOptions: [
            { id: 'Ha', name: 'Straight' },
            { id: 'Hb', name: 'Flower' },
            { id: 'Hc', name: 'Flared sleeves' }
        ]
    },
    {
        id: 'I',
        name: 'Sleeves detail: material',
        subOptions: [
            { id: 'Ia', name: 'Fabric' },
            { id: 'Ib', name: 'Nude tull' },
            { id: 'Ic', name: 'Lace' }
        ]
    },
    {
        id: 'J',
        name: 'Straps details',
        subOptions: [
            { id: 'Ja', name: 'Strapless' },
            { id: 'Jb', name: 'Spaghetti straps' },
            { id: 'Jc', name: 'Straps with fabric' },
            { id: 'Jd', name: 'Straps with lace' }
        ]
    },
    {
        id: 'K',
        name: 'Vorrangiger Ausschnitt des Rückens',
        subOptions: [
            { id: 'Ka', name: 'gerade Ausschnitt des Unterteils' },
            { id: 'Kb', name: 'gerade Ausschnitt des Oberteils' },
            { id: 'Kc', name: 'U Ausschnitt' },
            { id: 'Kd', name: 'V Ausschnitt' },
            { id: 'Ke', name: 'Zwei gerade Träger' },
            { id: 'Kf', name: 'trapezförmig' },
            { id: 'Kg', name: 'Kreuz' },
            { id: 'Kh', name: 'Diamant' },
            { id: 'Ki', name: 'Off the shoulder' },
            { id: 'Kj', name: 'One Shoulder Ausschnitt' },
            { id: 'Kk', name: 'Mockneck' }
        ]
    },
    {
        id: 'L',
        name: 'Der Unterstoff des Rückens(Oberteil)',
        subOptions: [
            { id: 'La', name: 'Unterstoff mit Stoff' },
            { id: 'Lb', name: 'Unterstoff mit Spitze' },
            { id: 'Lc', name: 'Bereich ohne Unterstoff mit Spitze bedeckt' },
            { id: 'Ld', name: 'Bereich ohne Unterstoff mit Spitze bedeckt' }
        ]
    },
    {
        id: 'M',
        name: 'Der Verschluss',
        subOptions: [
            { id: 'Ma', name: 'Nur mit Reißverschlus' },
            { id: 'Mb', name: 'mit Reißverschluss und Dekoknöpfe' },
            { id: 'Mc', name: 'Nur mit Knöpf' }
        ]
    }
]
export const skirtSelections = require('@/assets/skirt.json')
export const selections = [bodySelections, skirtSelections]
export const topSet = require('@/assets/topSet.json') ?? [[]]

export function getAvailableSet(selectedPart = []) {
    const selectedTop = Object.values(selectedPart[0]) ?? []
    selectedTop.sort()
    return topSet.filter(s => {
        return selectedTop.every(t => {
            return s.includes(t.toString()) && s.every(str => !str.includes('J'))
        })
    })
}

export const weddingItem = {
    bodice: {},
    sleeves: {},
    skirt: {}
}

export const CUSTOMER_STR = '/customer'

export async function customerUserRegister(email, password, firstName, lastName, city, phone) {
    return await hillo.post('/customer/register', { email, password, firstName, lastName, city, phone })
}

export async function customerCheckEmailRegistered(email) {
    return await hillo.post(CUSTOMER_STR + '/checkEmailRegistered', { email })
}

export async function customerConfirmRegister(uuid) {
    return await hillo.get(CUSTOMER_STR + '/confirmRegister/', { uuid })
}

export async function userLogin(userName, password) {
    return await hillo.post('/customer/login', { userName, password })
}

export async function customerMe() {
    return await hillo.get(CUSTOMER_STR + '/me')
}

export async function customerInit(customer, weddingDate, likeAndHate, imgs) {
    return await hillo.post(CUSTOMER_STR + '/init', { customer, weddingDate, likeAndHate, imgs })
}

export async function getDressPartList() {
    return (await hillo.get('/dressPart/getList')).data
}

export async function refreshCurrentPartInfo(selectedDressPartIds) {
    return (await hillo.post('/dressPart/refreshCurrentPartInfo', {
        dressPartIds: selectedDressPartIds
    })).data
}