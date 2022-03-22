// import {customerLogin} from "../api/customerService";
// import {refreshHeader} from "../main";

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

// export async function checkLogin(loginEmail, loginPassword) {
//
//         const res = await customerLogin(loginEmail, loginPassword)
//         // console.log(res.data.tokenValue)
//         if (res.code === 200) {
//             localStorage.setItem('token', res.data.tokenValue)
//             localStorage.setItem('id', res.data.loginId)
//
//             refreshHeader()
//             this.$router.replace('/OrderIndex')
//         } else {
//             this.snackbar = true
//             this.snackbarText = "Konto oder Passwort ist falsch"
//         }
//
// }
