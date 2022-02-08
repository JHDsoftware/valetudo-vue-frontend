<template>
  <div class="d-flex justify-center" style="height: calc(100%); margin-top: 60px">
    <v-card width="60%" flat tile>
      <template v-for="(items,i) in personData">
        <v-card :key="'data'+i" flat tile>
          <div
              style="display: grid; grid-template-columns: 60px auto 300px;  min-height: 100px"
              :style="i < personData.length-1 ? {'border-bottom': '1px solid #BFB8B1'}: {}"
              class="py-4">
            <div class="contentText">
              <v-icon>{{ items.icon }}</v-icon>
            </div>

            <div class="contentText">
              <div>{{ items.title }}</div>
              <template v-for="(item,j) in items.data">
                <div :key="'item'+j">
                  {{ item }}
                </div>
              </template>
            </div>

            <div>
              <ValetButton buttonText="Bearbeiten" @click="handleButtonClick(items)"/>
            </div>
          </div>
        </v-card>
      </template>


    </v-card>
    <v-dialog v-model="dialogBearbeit" width="40vw" persistent>
      <v-card tile flat>
        <v-icon large style="position: absolute; right: 34px; top: 34px" @click="dialogClose">mdi-close
        </v-icon>
        <div class="text-center contentText" style="font-size: 36px; padding-top: 60px; padding-bottom: 60px">
          {{ dText.editTitle }}
        </div>

        <template v-if="dText.title === 'Name'">
          <div class="d-flex justify-center">
            <v-card
                style="display: grid; grid-template-columns: repeat(2, 1fr); grid-column-gap: 8px; width: 540px; margin-bottom: 60px"
                flat tile>
              <ValetInputTextField title="Vorname*" width-input="266px" v-model="dText.data.vorname"/>
              <ValetInputTextField title="Nachname*" width-input="266px" v-model="dText.data.nachname"/>
              <ValetInputTextField title="Stadt*" width-input="266px" v-model="dText.data.stadt"/>
              <ValetInputTextField title="Handy Number" width-input="266px" v-model="dText.data.phone"/>
              <div style="margin-top: 24px" class="">Germany</div>
              <ValetButton buttonText="Speichern" style="grid-column: 1/3; margin-top: 24px"></ValetButton>
            </v-card>
          </div>
        </template>

        <template v-if="dText.title === 'E-Mail'">
          <div class="d-flex justify-center">
            <v-card style="width: 540px; margin-bottom: 60px" flat tile>
              <div style="font-size: 24px; font-weight: bold">Aktuelle E-Mail-Adresse</div>
              <div style="font-size: 24px; margin-bottom: 40px">{{ dText.data.Email }}</div>
              <ValetInputTextField title="Neue E-Mail-Adresse*" width-input="540px" v-model="email"/>
              <ValetInputTextField title="Neue E-Mail-Adresse bestaätigen*" width-input="540px" v-model="confirmEmail"/>
              <ValetInputTextField title="Passwort*" width-input="540px" type="password" v-model="password"/>
              <ValetButton buttonText="Speichern" style="grid-column: 1/3; margin-top: 24px"></ValetButton>
            </v-card>
          </div>
        </template>


        <template v-if="dText.title === 'Dein Passwort'">
          <div class="d-flex justify-center">
            <v-card style="width: 540px; margin-bottom: 60px" flat tile>
              <ValetInputTextField title="Passwort*" width-input="540px" v-model="password"/>
              <ValetInputTextField :title="'Neues Passwort*'+ hintText " width-input="540px" v-model="confirmEmail"/>
              <ValetInputTextField title="Passwort bestätigen*" width-input="540px" type="password" v-model="password"/>
              <ValetButton buttonText="Speichern" style="grid-column: 1/3; margin-top: 24px"></ValetButton>
            </v-card>
          </div>
        </template>

        <template v-if="dText.title === 'Lieferaddresse'">
          <div class="d-flex justify-center">
            <v-card
                style="display: grid; grid-template-columns: repeat(2,1fr); grid-column-gap: 8px; width: 540px; margin-bottom: 60px"
                flat tile>

              <ValetInputTextField title="Vorname*" width-input="266px" v-model="dText.data.vorname"/>
              <ValetInputTextField title="Name*" width-input="266px" v-model="dText.data.nachname"/>
              <ValetInputTextField title="Adresse*" width-input="540px" v-model="dText.data.address"
                                   style="grid-column: 1/3"/>
              <ValetInputTextField title="Zusätzliche Adresse" width-input="540px" v-model="zusatzAdress"
                                   style="grid-column: 1/3"/>
              <ValetInputTextField title="PLZ*" width-input="266px" v-model="dText.data.zipCode"/>
              <ValetInputTextField title="Stadt*" width-input="266px" v-model="dText.data.stadt"/>
              <div class="mt-1">{{ dText.data.country }}</div>
              <ValetButton buttonText="Speichern" style="grid-column: 1/3; margin-top: 24px"></ValetButton>

            </v-card>
          </div>
        </template>

        <template v-if="dText.title === 'Rechnungsadresse'">
          <div class="d-flex justify-center">
            <v-card
                style="display: grid; grid-template-columns: repeat(2,1fr); grid-column-gap: 8px; width: 540px; margin-bottom: 60px"
                flat tile>

              <ValetInputTextField title="Vorname*" width-input="266px" v-model="dText.data.vorname"/>
              <ValetInputTextField title="Name*" width-input="266px" v-model="dText.data.nachname"/>
              <ValetInputTextField title="Adresse*" width-input="540px" v-model="dText.data.address"
                                   style="grid-column: 1/3"/>
              <ValetInputTextField title="Zusätzliche Adresse" width-input="540px" v-model="zusatzAdress"
                                   style="grid-column: 1/3"/>
              <ValetInputTextField title="PLZ*" width-input="266px" v-model="dText.data.zipCode"/>
              <ValetInputTextField title="Stadt*" width-input="266px" v-model="dText.data.stadt"/>
              <div class="mt-1">{{ dText.data.country }}</div>
              <ValetButton buttonText="Speichern" style="grid-column: 1/3; margin-top: 24px"></ValetButton>

            </v-card>
          </div>
        </template>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import ValetButton from '@/components/ValetButton'
import ValetInputTextField from "@/components/ValetInputTextField";

export default {
  name: "PersonDaten",
  components: {ValetInputTextField, ValetButton},
  data() {
    return {
      password: null,
      confirmEmail: null,
      email: null,
      hintText: '<span style="font-size: 12px; line-height: 17px; padding-left: 5px"> Bitte mindestens 8 Zahlen oder Zeichen</span>',
      zusatzAdress: null,
      dText: {},
      dialogBearbeit: false,
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      },
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
      ]
    }
  },
  methods: {
    handleButtonClick(items) {
      console.log("dText", items)
      this.dialogBearbeit = true
      this.dText = items
      // this.items = items
    },
    dialogClose() {
      this.dText = {},
      this.dialogBearbeit = false
    }
  }
}
</script>

<style scoped>
.contentText {
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 125%;
  /* identical to box height, or 30px */

  /*display: flex;*/
  /*align-items: center;*/

  color: #4C4C4C;
}
</style>
