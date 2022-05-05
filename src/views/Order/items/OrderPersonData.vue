<template>
  <div class="d-flex justify-center" style="height: calc(100%); margin-top: 60px">
    <v-card width="60%" flat tile>

      <PersonDataCard
          icon="mdi-account"
          title="Name"
          @click="handleButtonClick('Name')"
      >
        <template v-slot:bodyText>
          <div>{{ dataBody.firstName }}</div>
          <div>{{ dataBody.lastName }}</div>
          <div>{{ dataBody.city }}</div>
          <div>{{ dataBody.phone }}</div>
        </template>
      </PersonDataCard>

      <PersonDataCard
          icon="mdi-account"
          title="E-Mail"
          @click="handleButtonClick('E-Mail')"
      >
        <template v-slot:bodyText>
          <div>{{ dataBody.userName }}</div>
        </template>
      </PersonDataCard>

      <PersonDataCard
          icon="mdi-key"
          title="Dein Passwort"
          @click="handleButtonClick('Dein Passwort')"
      >
        <template v-slot:bodyText>
          <div>*********</div>
        </template>
      </PersonDataCard>

      <PersonDataCard
          icon="mdi-home"
          title="Lieferaddresse"
          @click="handleButtonClick('Lieferaddresse')"
      >
        <template v-slot:bodyText>
          <div>{{ dataBody.deliveryAddress.firstName }} {{ dataBody.deliveryAddress.lastName }}</div>
          <div>{{ dataBody.deliveryAddress.addressLine1 }}</div>
          <div>{{ dataBody.deliveryAddress.addressLine2 }}</div>
          <div>{{ dataBody.deliveryAddress.postCode }} {{ dataBody.deliveryAddress.city }}</div>
          <div>{{ dataBody.deliveryAddress.stateOrProvice }} {{ dataBody.country }}</div>
        </template>
      </PersonDataCard>

      <PersonDataCard
          icon="mdi-home"
          title="Rechnungsaddresse"
          @click="handleButtonClick('Rechnungsaddresse')"
      >
        <template v-slot:bodyText>
          <div>{{ dataBody.billingAddress.firstName }} {{ dataBody.billingAddress.lastName }}</div>
          <div>{{ dataBody.billingAddress.addressLine1 }}</div>
          <div>{{ dataBody.billingAddress.addressLine2 }}</div>
          <div>{{ dataBody.billingAddress.postCode }} {{ dataBody.billingAddress.city }}</div>
          <div>{{ dataBody.billingAddress.stateOrProvice }} {{ dataBody.country }}</div>
        </template>
      </PersonDataCard>

    </v-card>

    <v-dialog v-model="dialogBearbeit" width="640px" persistent>
      <v-card tile flat>
        <v-icon large style="position: absolute; right: 34px; top: 34px" @click="dialogClose()">mdi-close
        </v-icon>
        <div class="text-center contentText" style="font-size: 36px; padding-top: 60px; padding-bottom: 60px">
          {{ dialogTitle }}
        </div>

        <template v-if="dialogTitle === 'Name'">
          <div class="d-flex justify-center mx-2">
            <v-card
                style="display: grid; grid-template-columns: repeat(2, 1fr); grid-column-gap: 8px; width: 540px; margin-bottom: 60px"
                flat tile>

              <ValetInputTextField title="Vorname*"
                                   :rules="requireRule"
                                   :required="true"
                                   width-input="266px" v-model="dataBody.firstName"/>
              <ValetInputTextField title="Nachname*"
                                   width-input="266px"
                                   :rules="requireRule"
                                   v-model="dataBody.lastName"/>
              <ValetInputTextField title="Stadt*" width-input="266px" v-model="dataBody.city"/>
              <ValetInputTextField title="Handy Number"
                                   width-input="266px"
                                   v-model="dataBody.phone"
                                   :useRule="false"/>
              <div style="margin-top: 24px" class="">{{ dataBody.country }}</div>
              <ValetButton buttonText="Speichern"
                           style="grid-column: 1/3; margin-top: 24px"
                           @click="dialogSpeichern"></ValetButton>

            </v-card>
          </div>
        </template>

        <template v-if="dialogTitle === 'E-Mail'">
          <div class="d-flex justify-center">
            <v-card style="width: 540px; margin-bottom: 60px" flat tile>
              <div style="font-size: 24px; font-weight: bold">Aktuelle E-Mail-Adresse</div>
              <div style="font-size: 24px; margin-bottom: 40px">{{ dataBody.userName }}</div>
              <ValetInputTextField title="Neue E-Mail-Adresse*" width-input="540px" v-model="email"/>
              <ValetInputTextField title="Neue E-Mail-Adresse bestätigen*" width-input="540px" v-model="confirmEmail"/>
              <ValetInputTextField title="Passwort*" width-input="540px" type="password" v-model="password"/>
              <ValetButton buttonText="Speichern"
                           style="grid-column: 1/3; margin-top: 24px"
                           @click="dialogSpeichern"></ValetButton>
            </v-card>
          </div>
        </template>


        <template v-if="dialogTitle === 'Dein Passwort'">
          <div class="d-flex justify-center">
            <v-card style="width: 540px; margin-bottom: 60px" flat tile>
              <ValetInputTextField title="Passwort*" width-input="540px" type="password" v-model="currentPassword"/>
              <ValetInputTextField :title="'Neues Passwort*'+ hintText " type="password" width-input="540px"
                                   v-model="newPassword"/>
              <ValetInputTextField title="Passwort bestätigen*" width-input="540px" type="password"
                                   v-model="confirmNewPassword"/>
              <ValetButton buttonText="Speichern"
                           style="grid-column: 1/3; margin-top: 24px"
                           @click="dialogSpeichern"></ValetButton>
            </v-card>
          </div>
        </template>

        <template v-if="dialogTitle === 'Lieferaddresse'">
          <div class="d-flex justify-center">
            <v-card
                style="display: grid; grid-template-columns: repeat(2,1fr); grid-column-gap: 8px; width: 540px; margin-bottom: 60px"
                flat tile>


              <ValetInputTextField title="Vorname*"

                                   width-input="266px" v-model="deliveryAddress.firstName"/>
              <ValetInputTextField title="Name*"

                                   width-input="266px" v-model="deliveryAddress.lastName"/>
              <ValetInputTextField title="Adresse*" width-input="540px" v-model="deliveryAddress.addressLine1"
                                   style="grid-column: 1/3"/>

              <ValetInputTextField title="Zusätzliche Adresse" width-input="266px"
                                   v-model="deliveryAddress.addressLine2"
                                   :useRule="false"
              />

              <ValetInputTextField title="Staat/Provinz*"
                                   width-input="266px"
                                   v-model="deliveryAddress.stateOrProvice"/>


              <ValetInputTextField title="PLZ*" width-input="266px" v-model="deliveryAddress.postCode"/>
              <ValetInputTextField title="Stadt*" width-input="266px" v-model="deliveryAddress.city"/>
              <div class="mt-1">{{ country }}</div>
              <ValetButton buttonText="Speichern"
                           style="grid-column: 1/3; margin-top: 24px"
                           @click="dialogSpeichern"></ValetButton>

            </v-card>
          </div>
        </template>

        <template v-if="dialogTitle === 'Rechnungsaddresse'">
          <div class="d-flex justify-center">
            <v-card
                style="display: grid; grid-template-columns: repeat(2,1fr); grid-column-gap: 8px; width: 540px; margin-bottom: 60px"
                flat tile>

              <ValetInputTextField title="Vorname*" width-input="266px" v-model="billingAddress.firstName"/>
              <ValetInputTextField title="Name*" width-input="266px" v-model="billingAddress.lastName"/>
              <ValetInputTextField title="Adresse*" width-input="540px" v-model="billingAddress.addressLine1"
                                   style="grid-column: 1/3"/>

              <ValetInputTextField title="Zusätzliche Adresse" width-input="266px"
                                   v-model="billingAddress.addressLine2"
                                   :useRule="false"/>

              <ValetInputTextField title="Staat/Provinz*"
                                   width-input="266px"
                                   v-model="billingAddress.stateOrProvice"/>

              <ValetInputTextField title="PLZ*" width-input="266px" v-model="billingAddress.postCode"/>
              <ValetInputTextField title="Stadt*" width-input="266px" v-model="billingAddress.city"/>
              <div class="mt-1">{{ country }}</div>
              <ValetButton buttonText="Speichern"
                           style="grid-column: 1/3; margin-top: 24px"
                           @click="dialogSpeichern"></ValetButton>

            </v-card>
          </div>
        </template>

      </v-card>
    </v-dialog>

    <v-dialog v-model="showPasswortChangeComplete" width="30vw">
      <v-card height="12vw">
        <v-card-title class="formTitle " >
          Änderung erfolgreich!
        </v-card-title>

        <v-card-subtitle>
          Bitte den Linker in Ihre Email bestätigen
        </v-card-subtitle>

        <v-card-actions>
          <v-spacer></v-spacer>
          <div style="width: 80px" >

            <ValetButton
                button-text="OK"
                @click="handleConfirm"
            ></ValetButton>
          </div>
        </v-card-actions>
      </v-card>

    </v-dialog>


    <ValetSnackBar
        v-model="snackbar"
        :snackbar-text="snackbarText"
    ></ValetSnackBar>
  </div>
</template>

<script>

import ValetButton from '@/components/ValetButton'
import ValetInputTextField from "@/components/ValetInputTextField";
import {customerMe} from "@/api/customerService";
import {
  customerChangeEmail,
  customerChangePassword,
  customerEditMe,customerRegister
} from "../../../api/customerService";

import PersonDataCard from "../../../fragments/PersonDataCard";
import ValetSnackBar from "@/components/ValetSnackBar";
import {updateAddress} from '@/model/Order'

export default {
  name: "OrderPersonData",
  components: {PersonDataCard, ValetInputTextField, ValetButton, ValetSnackBar},
  watch: {},
  computed: {
    // dTextData() {
    //   return this.dText.data
    // },
  },
  async mounted() {
    await this.getPersonData()
  },
  data() {
    return {
      showPasswortChangeComplete: false,
      currentPassword: null,
      newPassword: null,
      confirmNewPassword: null,
      currentEmail: null,
      dialogTitle: null,
      snackbar: null,
      snackbarText: null,
      valid: true,
      password: null,
      confirmEmail: null,
      email: null,
      hintText: '<span style="font-size: 12px; line-height: 17px; padding-left: 5px"> Bitte mindestens 8 Zahlen oder Zeichen</span>',
      // addressLine2: null,
      dText: {},
      dialogBearbeit: false,
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      },
      requireRule: [v => !!v || 'Name is required'],

      noDeliveryAddress: true,
      noBillingAddress: true,
      country: 'Germany',
      dataBody: {
        id: '-1',
        userName: 'test@gmai.com',
        firstName: 'test',
        lastName: 'test',
        city: 'Berlin',
        phone: '01578963222',
        postCode: '',
        country: 'Germany',

        deliveryAddress: {
          id: null,
          firstName: '',
          lastName: '',
          addressLine1: '',
          addressLine2: '',
          postCode: '',
          city: '',
          stateOrProvice: 'NRW'
        },
        billingAddress: {
          id: null,
          firstName: '',
          lastName: '',
          addressLine1: '',
          addressLine2: '',
          postCode: '',
          city: '',
          stateOrProvice: 'NRW'
        },

      },
      defaultAddress: {
        // id: null,
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        postCode: '',
        city: '',
        stateOrProvice: 'NRW'
      },
    }
  },

  methods: {
    handleConfirm(){
      this.showPasswortChangeComplete = false
      this.$router.push('/Login')
    },

    async getPersonData() {
      const res = await customerMe()
      if (res.code != 200) {
        return null
      }
      this.dataBody = res.data

      const tempData = {
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        city: res.data.city
      }

      // console.log('this.defaultAddress',this.defaultAddress,tempData)

      if (!this.dataBody.deliveryAddress) {
        this.dataBody.deliveryAddress = Object.assign(this.defaultAddress, tempData)
      }

      if (!this.dataBody.billingAddress) {
        this.dataBody.billingAddress = Object.assign(this.defaultAddress, tempData)

      }

      this.currentEmail = JSON.parse(JSON.stringify(this.dataBody.userName))

      // console.log("It's Done!")
    },
    handleButtonClick(text) {
      this.dialogBearbeit = true
      this.dialogTitle = text
      if (this.dialogTitle === 'Lieferaddresse') {
        this.deliveryAddress = Object.assign({}, this.dataBody.deliveryAddress)
      }
      if (this.dialogTitle === 'Rechnungsaddresse') {
        this.billingAddress = Object.assign({}, this.dataBody.billingAddress)
      }
    },
    async dialogSpeichern() {

      try {
        console.log("this.dialogTitle", this.dialogTitle)

        switch (this.dialogTitle) {
          case 'Name':
            if (this.dataBody.firstName
                && this.dataBody.lastName
                && this.dataBody.city) {
              const res = await customerEditMe(this.dataBody)

              // const res = await customerChangeName(this.dataBody.id, {name: this.dataBody.lastName})
              if (res.code === 200) {
                console.log("change res", res)
              } else {
                this.snackbar = true
                this.snackbarText = res.message
              }
              this.dialogBearbeit = false
            }
            break;

          case 'E-Mail':
            if (this.email
                && this.confirmEmail
                && this.password) {

              if (this.email === this.confirmEmail) {

                const res = await customerChangeEmail({email: this.email})
                if (res.code === 200) {


                  this.showPasswortChangeComplete = true

                  const data = {
                    email: this.email
                  }
                  const res = await customerRegister('/customer/changeEmail', data, '#/emailChanged')
                  sessionStorage.setItem('token', res.data.tokenValue)
                  // await this.$router.replace('/Login')




                  // this.dialogBearbeit = false

                } else {
                  this.snackbar = true
                  this.snackbarText = res.message
                }
              }

              this.dialogBearbeit = false
            }
            break

          case 'Dein Passwort':

            if (this.newPassword.length < 8) {
              this.snackbar = true
              this.snackbarText = 'Bitte mindestens 8 Zahlen oder Zeichen'
              return null
            }

            if (this.newPassword === this.confirmNewPassword) {
              const resChangePassword = await customerChangePassword({
                oldPassword: this.currentPassword,
                newPassword: this.newPassword
              })

              if (resChangePassword.code === 200) {

                // const data = {
                //   oldPassword: this.currentPassword,
                //   newPassword: this.newPassword
                // }
                // const res = await customerRegister('/customer/changePassword',data, '#/passwordChanged')
                // sessionStorage.setItem('token', res.data.tokenValue)

                this.showPasswortChangeComplete = true
                // this.snackbar = true
                // this.snackbarText = "Passwortänderung erfolgreich!"


                console.log("get resChangePassword")

                // this.currentPassword = null
                // this.confirmNewPassword = null
                // this.newPassword = null
                // window.setTimeout(function(){
                // },10000)


              } else {
                this.snackbar = true
                this.snackbarText = resChangePassword.message
              }

              this.dialogBearbeit = false


            } else {
              this.snackbar = true
              this.snackbarText = "Die beide Password sind nicht gleich. "
            }
            this.snackbar = false


            break

          case 'Lieferaddresse':

            if (this.deliveryAddress.firstName
                && this.deliveryAddress.lastName
                && this.deliveryAddress.addressLine1
                && this.deliveryAddress.postCode
                && this.deliveryAddress.stateOrProvice
                && this.deliveryAddress.city) {

              const res = await updateAddress(this.dataBody, this.deliveryAddress, 'deliveryAddress')
              this.snackbar = res.snackbar
              this.snackbarText = res.snackbarText

              await this.getPersonData()
              this.dialogBearbeit = false
            }
            break

          case 'Rechnungsaddresse':

            if (this.billingAddress.firstName
                && this.billingAddress.lastName
                && this.billingAddress.addressLine1
                && this.billingAddress.postCode
                && this.billingAddress.stateOrProvice
                && this.billingAddress.city) {

              const res = await updateAddress(this.dataBody, this.billingAddress, 'billingAddress')
              this.snackbar = res.snackbar
              this.snackbarText = res.snackbarText

              await this.getPersonData()
              this.dialogBearbeit = false
            }
            break

          default:
            this.dialogBearbeit = false

        }
        this.dText = {}


      } catch (e) {
        console.log(e)
      }


    },
    dialogClose() {
      this.dialogBearbeit = false
      // this.dTextData = {}
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
  /*font-family: Gill Sans Nova;*/
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
  /*font-family: Gill Sans Nova;*/
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
