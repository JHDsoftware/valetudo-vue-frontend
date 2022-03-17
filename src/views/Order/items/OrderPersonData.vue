<template>
  <div class="d-flex justify-center" style="height: calc(100%); margin-top: 60px">
    <v-card width="60%" flat tile>

<!--      <v-card flat>-->
<!--        <div style="display: grid;-->
<!--                    grid-template-columns: 60px auto 300px;-->
<!--                    border-bottom: 1px solid #BFB8B1;-->
<!--                    min-height: 100px"-->
<!--             class="py-4">-->
<!--          <div class="contentText">-->
<!--            <v-icon>mdi-account</v-icon>-->
<!--          </div>-->

<!--          <div class="contentText">-->
<!--            <div class="mb-2 v-caption">Name</div>-->
<!--            <div>{{dataBody.firstName}}</div>-->
<!--            <div>{{dataBody.lastName}}</div>-->
<!--            <div>{{dataBody.city}}</div>-->
<!--            <div>{{dataBody.phone}}</div>-->
<!--          </div>-->

<!--          <div>-->
<!--            <ValetButton buttonText="Bearbeiten" @click="handleButtonClick(items)"/>-->
<!--          </div>-->
<!--        </div>-->

<!--      </v-card>-->
      

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
              <div class="mb-2 v-caption">{{ items.title }}</div>
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

    <v-dialog v-model="dialogBearbeit" width="35vw" persistent>
      <v-card tile flat>
        <v-icon large style="position: absolute; right: 34px; top: 34px" @click="dialogClose()">mdi-close
        </v-icon>
        <div class="text-center contentText" style="font-size: 36px; padding-top: 60px; padding-bottom: 60px">
          {{ dText.editTitle }}
        </div>

        <template v-if="dText.title === 'Name'">
          <div class="d-flex justify-center">
            <v-card
                style="display: grid; grid-template-columns: repeat(2, 1fr); grid-column-gap: 8px; width: 540px; margin-bottom: 60px"
                flat tile>

              <ValetInputTextField title="Vorname*"
                                   :rules="requireRule"
                                   :required="true"
                                   width-input="266px" v-model="dText.data.vorname"/>
              <ValetInputTextField title="Nachname*"
                                   width-input="266px"
                                   :rules="requireRule"
                                   v-model="dText.data.nachname"/>
              <ValetInputTextField title="Stadt*" width-input="266px" v-model="dText.data.stadt"/>
              <ValetInputTextField title="Handy Number" width-input="266px" v-model="dText.data.phone"/>
              <div style="margin-top: 24px" class="">Germany</div>
              <ValetButton buttonText="Speichern"
                           style="grid-column: 1/3; margin-top: 24px"
                           @click="dialogSpeichern"></ValetButton>

            </v-card>
          </div>
        </template>

        <template v-if="dText.title === 'E-Mail'">
          <div class="d-flex justify-center">
            <v-card style="width: 540px; margin-bottom: 60px" flat tile>
              <div style="font-size: 24px; font-weight: bold">Aktuelle E-Mail-Adresse</div>
              <div style="font-size: 24px; margin-bottom: 40px">{{ dText.data.Email }}</div>
              <ValetInputTextField title="Neue E-Mail-Adresse*" width-input="540px" v-model="email"/>
              <ValetInputTextField title="Neue E-Mail-Adresse bestätigen*" width-input="540px" v-model="confirmEmail"/>
              <ValetInputTextField title="Passwort*" width-input="540px" type="password" v-model="password"/>
              <ValetButton buttonText="Speichern"
                           style="grid-column: 1/3; margin-top: 24px"
                           @click="dialogSpeichern"></ValetButton>
            </v-card>
          </div>
        </template>


        <template v-if="dText.title === 'Dein Passwort'">
          <div class="d-flex justify-center">
            <v-card style="width: 540px; margin-bottom: 60px" flat tile>
              <ValetInputTextField title="Passwort*" width-input="540px" v-model="password"/>
              <ValetInputTextField :title="'Neues Passwort*'+ hintText " width-input="540px" v-model="confirmEmail"/>
              <ValetInputTextField title="Passwort bestätigen*" width-input="540px" type="password" v-model="password"/>
              <ValetButton buttonText="Speichern"
                           style="grid-column: 1/3; margin-top: 24px"
                           @click="dialogSpeichern"></ValetButton>
            </v-card>
          </div>
        </template>

        <template v-if="dText.title === 'Lieferaddresse'">
          <div class="d-flex justify-center">
            <v-card
                style="display: grid; grid-template-columns: repeat(2,1fr); grid-column-gap: 8px; width: 540px; margin-bottom: 60px"
                flat tile>


              <ValetInputTextField title="Vorname*"

                                   width-input="266px" v-model="dText.data.vorname"/>
              <ValetInputTextField title="Name*"

                                   width-input="266px" v-model="dText.data.nachname"/>
              <ValetInputTextField title="Adresse*" width-input="540px" v-model="dText.data.address"
                                   style="grid-column: 1/3"/>
              <ValetInputTextField title="Zusätzliche Adresse" width-input="540px" v-model="zusatzAdress"
                                   style="grid-column: 1/3"/>
              <ValetInputTextField title="PLZ*" width-input="266px" v-model="dText.data.zipCode"/>
              <ValetInputTextField title="Stadt*" width-input="266px" v-model="dText.data.stadt"/>
              <div class="mt-1">{{ dText.data.country }}</div>
              <ValetButton buttonText="Speichern"
                           style="grid-column: 1/3; margin-top: 24px"
                           @click="dialogSpeichern"></ValetButton>

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
              <ValetButton buttonText="Speichern"
                           style="grid-column: 1/3; margin-top: 24px"
                           @click="dialogSpeichern"></ValetButton>

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
import {customerMe, customerEditMe} from "@/api/customerService";

export default {
  name: "OrderPersonData",
  components: {ValetInputTextField, ValetButton},
  watch: {
    dataBody(val) {
      this.personData[0].data.vorname = val.firstName
      this.personData[0].data.nachname = val.lastName
      this.personData[0].data.stadt = val.city
      this.personData[0].data.phone = val.phone

      this.personData[1].data.Email = val.userName
      // this.personData[2].data.Password

      const delivery =val.deliveryAddress.split(',')
      this.personData[3].data.address = delivery[0] ?? ''
      this.personData[3].data.zipCode = delivery[1] ?? ''
      this.personData[3].data.stadt = delivery[2] ?? ''

      this.personData[3].data.vorname = val.firstName
      this.personData[3].data.nachname = val.lastName
      // this.personData[3].data.zipCode=personData.


      const billing =val.billingAddress.split(',')
      this.personData[4].data.address = billing[0] ?? ''
      this.personData[4].data.zipCode = billing[1] ?? ''
      this.personData[4].data.stadt = billing[2] ?? ''

      this.personData[4].data.address = val.billingAddress.split(',')
      this.personData[4].data.vorname = val.firstName
      this.personData[4].data.nachname = val.lastName
      // this.personData[4].data.
    }
  },
  computed:{
    dTextData() {
      return this.dText.data
    },
  },
  mounted() {
    this.getPersonData()
  },
  data() {
    return {
      valid: true,
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
      requireRule: [v => !!v || 'Name is required'],
      dataBody: {
        firstName: 'Liqiong',
        lastName: 'Wang',
        city: 'Berlin',
        phone: '01578963222',
        deliveryAddress: 'Teltower Damm 227B, 14177 Berlin, Germany',
        billingAddress: 'Teltower Damm 227B, 14177 Berlin, Germany'
      },
      lieferAddressForm: {
        vorname: '',
        nachname: '',
        address: '',
        zusatzAdress: '',
        zipCode: '',
        stadt: '',
        country: 'Germany'
      },
      RechnungAddressForm: {
        vorname: '',
        nachname: '',
        address: '',
        zusatzAdress: '',
        zipCode: '',
        stadt: '',
        country: ''
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
          editTitle: 'Lieferaddresse ändern'
        },
        {
          title: 'Rechnungsadresse',
          icon: 'mdi-home',
          data: {
            vorname: 'Liqiong Wang',
            nachname: 'Wang',
            address: 'Teltower Damm 227B',
            stadt: 'Berlin',
            zipCode: '14177',
            country: 'Germany'
          },
          editTitle: 'Rechnungsadresse ändern'
        }
      ],
    }
  },

  methods: {

    async getPersonData() {
      // console.log("get Data")
      const res = await customerMe()
      if (res.code != 200) {
        return null
      }

      this.dataBody = res.data

      // const personData = res.data
      //
      // this.dataBody.firstName = personData.firstName
      // this.dataBody.lastName = personData.lastName
      // this.dataBody.city = personData.city
      // this.dataBody.deliveryAddress = personData.deliveryAddress
      // this.dataBody.billingAddress = personData.billingAddress
      // this.dataBody.phone = personData.phone

    },
    handleButtonClick(items) {

      this.dialogBearbeit = true
      this.dText = items
      // this.items = items
    },
    async dialogSpeichern() {

      console.log('this.dTextData',this.dTextData)
      try {
        if (this.dText.title === 'Name') {
          if (this.dTextData.vorname
              && this.dTextData.nachname
              && this.dTextData.stadt) {

            this.dataBody.firstName = this.dTextData.vorname
            this.dataBody.lastName = this.dTextData.nachname
            this.dataBody.city = this.dTextData.stadt

            await customerEditMe(this.dataBody)
            this.dialogBearbeit = false
          }
        } else if (this.dText.title === 'E-Mail') {
          if (this.dTextData.Email
              && this.dTextData.confirmEmail
              && this.dTextData.password) {

            // this.dataBody.firstName = this.dTextData.vorname
            // this.dataBody.lastName = this.dTextData.nachname
            // this.dataBody.city = this.dTextData.stadt

            // await this.custo
            this.dialogBearbeit = false
          }


          // }else if(this.item.title == 'Dein Passwort'){
          //
        } else if (this.dText.title == 'Lieferaddresse') {

          if (this.dTextData.firstName
              && this.dTextData.lastName
              && this.dTextData.billingAddress
              && this.dTextData.zipCode && this.dTextData.stadt) {
            this.dataBody.firstName = this.dTextData.vorname
            this.dataBody.lastName = this.dTextData.nachname
            this.dataBody.deliveryAddress =
                this.dTextData.address + ',' + this.dTextData.zipCode + ',' + this.dTextData.stadt

            await this.customerEditMe(this.dataBody)
            this.dialogBearbeit = false
          }

        } else if (this.dText.title == 'Rechnungsadresse') {

          if (this.dTextData.firstName
              && this.dTextData.lastName
              && this.dTextData.billingAddress
              && this.dTextData.zipCode && this.dTextData.stadt) {

            this.dataBody.firstName = this.dTextData.vorname
            this.dataBody.lastName = this.dTextData.nachname
            this.dataBody.billingAddress =
                this.dTextData.address + ',' + this.dTextData.zipCode + ',' + this.dTextData.stadt

            await this.customerEditMe(this.dataBody)
            this.dialogBearbeit = false
          }

        } else {
          this.dialogBearbeit = true
        }
        this.dText = {}
      } catch (e) {
        console.log(e)
      }


    },
    dialogClose() {
      this.dialogBearbeit = false
      this.dTextData = {}
    },
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidatiaon()
    }
  }
}
</script>

<style scoped>
.v-caption {
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 125%;
  /* identical to box height, or 22px */

  display: flex;
  align-items: center;

  color: #4C4C4C;
}

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
