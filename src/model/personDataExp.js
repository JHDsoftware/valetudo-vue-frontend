export default {
    personData: [
        {
            title: 'Name',
            icon: 'mdi-account',
            data: {
                vorname: 'Liqiong',
                nachname: 'Wang',
                stadt: 'Berlin',
                phone: '01578963222'
            },
            editTitle: 'Nutzerdaten aktualisieren'
        },
        {
            title: 'E-Mail',
            icon: 'mdi-email',
            data: {Email: 'niw0222@gmail.com'},
            editTitle: 'E-Mail-Adresse ändern'
        },
        {
            title: 'Dein Passwort',
            icon: 'mdi-key',
            data: {Password: '*********'},
            editTitle: 'Passwort ändern'
        },
        {
            title: 'Lieferaddresse',
            icon: 'mdi-home',
            data: {
                vorname: 'Liqiong',
                nachname: 'Wang',
                stadt: 'Berlin',
                address: 'Teltower Damm 227B',
                zipCode: '14177',
                country: 'Germany'
            },
            editTitle: 'Lieferadresse ändern'
        },
        {
            title: 'Rechnungsadresse',
            icon: 'mdi-home',
            data: {
                vorname: 'Liqiong',
                nachname: 'Wang',
                stadt: 'Berlin',
                address: 'Teltower Damm 227B',
                zipCode: '14177',
                country: 'Germany'
            },
            editTitle: 'Rechnungsadresse ändern'
        }
    ],
    getPersonData: function () {
        return this.personData
    },
}

