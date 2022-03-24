<template>
  <div class="d-flex justify-center" style="height: calc(100%); margin-top: 60px">
    <v-card width="60%" flat tile>

      <PersonDataCard
        icon="mdi-account"
        title="Name"
        @click="handleButtonClick('Name')"
      >
        <template v-slot:bodyText>
          <div>{{dataBody.firstName}}</div>
          <div>{{dataBody.lastName}}</div>
          <div>{{dataBody.city}}</div>
          <div>{{dataBody.phone}}</div>
        </template>
      </PersonDataCard>

      <PersonDataCard
          icon="mdi-account"
          title="E-Mail"
          @click="handleButtonClick('E-Mail')"
      >
        <template v-slot:bodyText>
          <div>{{dataBody.userName}}</div>
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
          <div>{{dataBody.firstName}}</div>
          <div>{{dataBody.lastName}}</div>
          <div>{{dataBody.city}}</div>
          <div>{{dataBody.deliveryAddress}}</div>
          <div>{{dataBody.zipCode}}</div>
          <div>{{dataBody.country}}</div>
        </template>
      </PersonDataCard>

      <PersonDataCard
          icon="mdi-home"
          title="Rechnungsadresse"
          @click="handleButtonClick('Rechnungsadresse')"
      >
        <template v-slot:bodyText>
          <div>{{dataBody.firstName}}</div>
          <div>{{dataBody.lastName}}</div>
          <div>{{dataBody.city}}</div>
          <div>{{dataBody.billingAddress}}</div>
          <div>{{dataBody.zipCode}}</div>
          <div>{{dataBody.country}}</div>
        </template>
      </PersonDataCard>


<!--      <template v-for="(items,i) in personData">-->
<!--        <v-card :key="'data'+i" flat tile>-->
<!--          <div-->
<!--              style="display: grid; grid-template-columns: 60px auto 300px;  min-height: 100px"-->
<!--              :style="i < personData.length-1 ? {'border-bottom': '1px solid #BFB8B1'}: {}"-->
<!--              class="py-4">-->
<!--            <div class="contentText">-->
<!--              <v-icon>{{ items.icon }}</v-icon>-->
<!--            </div>-->

<!--            <div class="contentText">-->
<!--              <div class="mb-2 v-caption">{{ items.title }}</div>-->
<!--              <template v-for="(item,j) in items.data">-->
<!--                <div :key="'item'+j">-->
<!--                  {{ item }}-->
<!--                </div>-->
<!--              </template>-->
<!--            </div>-->

<!--            <div>-->
<!--              <ValetButton buttonText="Bearbeiten" @click="handleButtonClick(items)"/>-->
<!--            </div>-->
<!--          </div>-->
<!--        </v-card>-->
<!--      </template>-->
    </v-card>

    <v-dialog v-model="dialogBearbeit" width="35vw" persistent >
      <v-card tile flat>
        <v-icon large style="position: absolute; right: 34px; top: 34px" @click="dialogClose()">mdi-close
        </v-icon>
        <div class="text-center contentText" style="font-size: 36px; padding-top: 60px; padding-bottom: 60px">
          {{ dialogTitle }}
        </div>

        <template v-if="dialogTitle === 'Name'">
          <div class="d-flex justify-center">
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
              <ValetInputTextField title="Handy Number" width-input="266px" v-model="dataBody.phone"/>
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
              <ValetInputTextField :title="'Neues Passwort*'+ hintText " type="password" width-input="540px" v-model="newPassword"/>
              <ValetInputTextField title="Passwort bestätigen*" width-input="540px" type="password" v-model="confirmNewPassword"/>
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

                                   width-input="266px" v-model="dataBody.firstName"/>
              <ValetInputTextField title="Name*"

                                   width-input="266px" v-model="dataBody.lastName"/>
              <ValetInputTextField title="Adresse*" width-input="540px" v-model="dataBody.deliveryAddress"
                                   style="grid-column: 1/3"/>
              <ValetInputTextField title="Zusätzliche Adresse" width-input="540px" v-model="zusatzAdress"
                                   style="grid-column: 1/3"/>
              <ValetInputTextField title="PLZ*" width-input="266px" v-model="dataBody.zipCode"/>
              <ValetInputTextField title="Stadt*" width-input="266px" v-model="dataBody.city"/>
              <div class="mt-1">{{ dataBody.country }}</div>
              <ValetButton buttonText="Speichern"
                           style="grid-column: 1/3; margin-top: 24px"
                           @click="dialogSpeichern"></ValetButton>

            </v-card>
          </div>
        </template>

        <template v-if="dialogTitle === 'Rechnungsadresse'">
          <div class="d-flex justify-center">
            <v-card
                style="display: grid; grid-template-columns: repeat(2,1fr); grid-column-gap: 8px; width: 540px; margin-bottom: 60px"
                flat tile>

              <ValetInputTextField title="Vorname*" width-input="266px" v-model="dataBody.firstName"/>
              <ValetInputTextField title="Name*" width-input="266px" v-model="dataBody.lastName"/>
              <ValetInputTextField title="Adresse*" width-input="540px" v-model="dataBody.billingAddress"
                                   style="grid-column: 1/3"/>
              <ValetInputTextField title="Zusätzliche Adresse" width-input="540px" v-model="zusatzAdress"
                                   style="grid-column: 1/3"/>
              <ValetInputTextField title="PLZ*" width-input="266px" v-model="dataBody.zipCode"/>
              <ValetInputTextField title="Stadt*" width-input="266px" v-model="dataBody.city"/>
              <div class="mt-1">{{ dataBody.country }}</div>
              <ValetButton buttonText="Speichern"
                           style="grid-column: 1/3; margin-top: 24px"
                           @click="dialogSpeichern"></ValetButton>

            </v-card>
          </div>
        </template>

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
import {customerMe, resetPassword} from "@/api/customerService";
import {customerChangeName, customerLogin} from "../../../api/customerService";
import {refreshHeader} from "../../../main";
import PersonDataCard from "../../../fragments/PersonDataCard";
import ValetSnackBar from "@/components/ValetSnackBar";

export default {
  name: "OrderPersonData",
  components: {PersonDataCard, ValetInputTextField, ValetButton,ValetSnackBar},
  watch: {
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
      zusatzAdress: null,
      dText: {},
      dialogBearbeit: false,
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      },
      requireRule: [v => !!v || 'Name is required'],
      dataBody: {
        id:'-1',
        userName: 'test@gmai.com',
        firstName: 'Liqiong',
        lastName: 'Wang',
        city: 'Berlin',
        phone: '01578963222',
        deliveryAddress: 'Teltower Damm 227B, 14177 Berlin, Germany',
        billingAddress: 'Teltower Damm 227B, 14177 Berlin, Germany',
        zipCode: '',
        country: 'Germany'
      },

    }
  },

  methods: {

    async getPersonData() {
      const res = await customerMe()
      if (res.code != 200) {
        return null
      }
      this.dataBody = Object.assign(this.dataBody,res.data)
      this.currentEmail=JSON.parse(JSON.stringify(this.dataBody.userName))
    },
    handleButtonClick(text) {
      this.dialogBearbeit = true
      this.dialogTitle = text
    },
    async dialogSpeichern() {

      try {
        if (this.dialogTitle === 'Name') {
          if (this.dataBody.firstName
              && this.dataBody.lastName
              && this.dataBody.city) {

            const res = await customerChangeName(this.dataBody.id, this.dataBody)
            if(res.code === 200) {
              console.log("change res", res)
            }
            this.dialogBearbeit = false
          }
        } else if (this.dialogTitle === 'E-Mail') {
          if (this.email
              && this.confirmEmail
              && this.password) {

            if(this.email === this.confirmEmail){
              if (this.email && this.password) {
                const res = await customerLogin(this.email, this.password)
                // console.log(res.data.tokenValue)
                if (res.code === 200) {
                  localStorage.setItem('token', res.data.tokenValue)
                  localStorage.setItem('id',res.data.loginId)
                  refreshHeader()

                  this.dataBody.userName=this.email
                  const res = await customerChangeName(this.dataBody.id, this.dataBody)
                  if(res.code === 200) {
                    console.log("change res", res)
                  }

                } else {
                  this.snackbar = true
                  this.snackbarText = "Passwort ist falsch"
                }
              }
            }

            this.dialogBearbeit = false
          }


          }else if(this.dialogTitle == 'Dein Passwort'){

          if(this.newPassword === this.confirmNewPassword){
            if (this.currentEmail && this.currentPassword) {
              const res = await customerLogin(this.currentEmail, this.currentPassword)
              // console.log(res.data.tokenValue)
              if (res.code === 200) {
                localStorage.setItem('token', res.data.tokenValue)
                localStorage.setItem('id',res.data.loginId)
                refreshHeader()

                const resRestPassword = await resetPassword({token:res.data.tokenValue, newPassword:this.newPassword})
                if (resRestPassword.code === 200) {
                  await this.$router.push('/SetPasswordComplete')
                } else {
                  this.snackbar = true
                  this.snackbarText = "Ein Fehler war erschienen."
                }
                // this.snackbar = true
                // this.snackbarText = "Password erfolgreich zurückgesetzt"

                this.dialogBearbeit = false

              } else {
                this.snackbar = true
                this.snackbarText = "Konto oder Passwort ist falsch"
                this.$router.replace('/OrderIndex/OrderPersonData')
              }
            }


          }else{
            this.snackbar=true
            this.snackbarText="Die beide Password sind nicht gleich. "
          }
          this.snackbar=false



        } else if (this.dialogTitle == 'Lieferaddresse') {

          if (this.dataBody.firstName
              && this.dataBody.lastName
              && this.dataBody.billingAddress
              && this.dataBody.zipCode && this.dataBody.city) {

            this.dataBody.deliveryAddress =
                this.dataBody.address + ',' + this.dataBody.zipCode + ',' + this.dataBody.city

            // await this.customerEditMe(this.dataBody)

            const res = await customerChangeName(this.dataBody.id, this.dataBody)
            if(res.code === 200) {
              console.log("change res", res)
            }

            this.dialogBearbeit = false
          }

        } else if (this.dialogTitle == 'Rechnungsadresse') {

          if (this.dataBody.firstName
              && this.dataBody.lastName
              && this.dataBody.billingAddress
              && this.dataBody.zipCode && this.dataBody.city) {

            this.dataBody.billingAddress =
                this.dataBody.address + ',' + this.dataBody.zipCode + ',' + this.dataBody.city

            // await this.customerEditMe(this.dataBody)
            const res = await customerChangeName(this.dataBody.id, this.dataBody)
            if(res.code === 200) {
              console.log("change res", res)
            }

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
