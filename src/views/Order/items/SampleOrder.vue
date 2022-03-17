<template>
  <div style="height: calc(100vh - 60px);overflow: hidden">
    <div style="margin-top: 70px;" class="d-flex justify-center flex-wrap">
      <div class="va-title" style="margin-bottom: 16px;text-align: center;width: 100%">Musterbox bestellen</div>
      <v-stepper
          color="#817163"
          alt-labels style="width: 476px" flat tile v-model="anzahlStep">
        <v-stepper-header>
          <template v-for="(item,i) in stepHeaders">
            <v-stepper-step
                :step="item.value"
                :key="i"
                :complete="anzahlStep>item.value">
              {{ item.title }}
            </v-stepper-step>

            <template v-if="i<stepHeaders.length-1">
              <v-divider :key="'divider'+i"/>
            </template>

          </template>
        </v-stepper-header>
      </v-stepper>
    </div>

    <div class="d-flex justify-center">
      <div>
        <template v-if="anzahlStep === 1">
          <div style="padding-top: 96px">
            <div
                style="display: grid;grid-template-columns: repeat(4,1fr);width: 100% ;border-bottom: 1px solid #8F8F8F; padding-bottom: 8px">
              <div>
                <div class="unterTitle24">ARTIKEL</div>
                <div>
                  <div class="unterTitle36">Musterbox</div>
                  <div class="unterTitle18">(Inkl. Versandkosten)</div>
                </div>
              </div>
              <div class="d-flex flex-column align-center">
                <div class="unterTitle24">BRAUTKLEID</div>
                <div class="unterTitle36">{{ productInfo && productInfo.name }}</div>
              </div>
              <div class="d-flex flex-column align-center">
                <div class="unterTitle24">ANZAHL</div>
                <v-select style="width: 120px" v-model="amount"
                          outlined hide-details :items="selectItems"></v-select>
              </div>
              <div class="d-flex align-end flex-column">
                <div class="unterTitle24">PREIS</div>
                <div class="unterTitle36">{{ price | priceDisplay }} €</div>
              </div>
            </div>

            <v-card class="d-flex justify-end" width="80vw" flat>
              <div style="width: 540px; padding-top: 40px">
                <ValetButton button-text="Bestätigen und weiter" @click="confirm"/>
              </div>

            </v-card>
          </div>
        </template>

        <template v-if="anzahlStep === 2">
          <div style="padding-top: 20px">
            <template v-if="showEditAdress">
              <FormAdress title="Lieferadresse"
                          style="font-size: 24px; padding-bottom: 8px;"
                          v-model="lieferAddressForm"
                          button-text="Speichern und weiter"
                          @click="adressConfirm"/>

            </template>
            <template v-else>

              <div class="d-flex justify-center">
                <v-card width="70vw" class="d-flex justify-center" flat>

                  <v-card class="d-flex justify-start" width="30vw" flat tile style="padding-right:20px; margin-bottom: 90px">
                    <div style="font-size: 24px;">
                      <div class="font-weight-bold"> Lieferadresse</div>
                      <template v-for="(item,j) in lieferAddressForm">
                        <div :key="'item'+j">
                          {{ item }}
                        </div>
                      </template>
                      <div style="position: absolute; right: 16px; top: 16px">
                        <v-icon @click="dialogLiferAdress=true">mdi-pencil-plus</v-icon>
                      </div>
                    </div>
                  </v-card>
                  <v-card class="d-flex " width="30vw" style="padding-left: 80px; border-left: 2px solid grey" flat
                          tile>
                    <div style="font-size: 24px; ">
                      <div class="font-weight-bold">Rechnungsadresse</div>
                      <template v-for="(item,j) in RechnungAddressForm">
                        <div :key="'item'+j">
                          {{ item }}
                        </div>
                      </template>
                      <div style="height: 60px;padding-top: 24px">
                        <ValetButton style="width: 540px" button-text="Bestätigen und weiter" @click="confirm"/>
                      </div>
                    </div>
                    <div style="position: absolute; right: 16px; top: 16px; ">
                      <v-icon @click="dialogRechnungAdress=true">mdi-pencil-plus</v-icon>
                    </div>

                  </v-card>

                </v-card>
              </div>

            </template>

          </div>

          <ValetSnackBar
              v-model="snackBar"
              :snackbar-text="snackbarText"
          ></ValetSnackBar>
        </template>

        <template v-if="anzahlStep === 3">
          <template v-if="payStatus">
          <div style="display: grid;grid-template-columns: 540px 1px 540px;grid-gap: 100px">
            <div>
              <v-card height="30vh" flat>
                <div style="text-transform: uppercase; color: #4C4C4C;" class="unterTitle24">ZAHLUNGSART
                </div>
                <div class="mt-4">
                  <v-item-group mandatory v-model="payMethodValue">
                    <v-item #default="{active,toggle}">
                      <div class="d-flex align-baseline" @click="toggle" :class="active?'active':''">
                        <div class="notion"></div>
                        <div class="ml-3 flex-grow-1">
                          <div class="d-flex justify-space-between">
                            <div class="name">PayPal</div>
                            <div class="image" style="width: 170px">
                              <v-img :src="require('@/assets/image/frameUI/paypal.png')"></v-img>
                            </div>
                          </div>
                          <div v-if="active" class="hint mt-3">Du wirst an PayPal weitergeleitet, um den Bezahlvorgang
                            abzuschließen.
                          </div>
                        </div>
                      </div>

                    </v-item>
                    <v-item #default="{active,toggle}">
                      <div class="d-flex align-baseline mt-2" @click="toggle" :class="active?'active':''">
                        <div class="notion"></div>
                        <div class="ml-3 flex-grow-1">
                          <div class="d-flex justify-space-between">
                            <div class="name">Rechnung</div>
                          </div>
                          <div v-if="active" class="hint mt-3">Der Rechnungsbetrag wird erst innerhalb von 14 Tagen nach
                            der Versandbestätigung per E-Mail
                            fällig.
                          </div>
                        </div>
                      </div>

                    </v-item>
                    <v-item #default="{active,toggle}">
                      <div class="d-flex align-baseline mt-2" @click="toggle" :class="active?'active':''">
                        <div class="notion"></div>
                        <div class="ml-3 flex-grow-1">
                          <div class="d-flex justify-space-between">
                            <div class="name">Vorkasse</div>
                          </div>
                          <div v-if="active" class="hint mt-3">Nachdem du deine Bestellung aufgegeben hast, senden wir
                            dir die Informationen zur
                            Banküberweisung per E-Mail. Wir können deine Artikel nur für 7 Tage reservieren. Bitte halte
                            dieses Zeitfenster ein. Je eher wir deine Zahlung erhalten, desto schneller wird deine
                            Bestellung verschickt.
                          </div>
                        </div>
                      </div>

                    </v-item>
                  </v-item-group>
                </div>
              </v-card>
            </div>
            <div style="height: 100%;border-right: 1px solid #000000;"></div>
            <div style="width: 50%">
              <v-card width="40vw" class="d-flex justify-center" flat style="margin-left: 100px ">
                <div>
                  <div style="font-weight: 600; font-size: 24px;">BESTELLÜBERSICHT</div>

                  <v-card width="30vw" flat tile style="padding-right: 20px">

                    <div class="d-flex justify-space-between"
                         style="font-size: 24px; font-weight: bold; border-bottom: 2px solid #AFA69D; margin-top: 39px">
                      Lieferadresse
                      <v-icon @click="dialogLiferAdress=true">mdi-pencil</v-icon>
                    </div>

                    <div style="font-size: 24px; padding-top: 8px">

                      <div>{{ lieferAddressForm.vorname }} {{ lieferAddressForm.nachname }}</div>
                      <div>{{ lieferAddressForm.address }}</div>
                      <div>{{ lieferAddressForm.zipCode }} {{ lieferAddressForm.stadt }}</div>
                      <div>{{ lieferAddressForm.country }}</div>
                    </div>

                    <div class="d-flex justify-space-between unterTitle24"
                         style="border-bottom: 2px solid #AFA69D; font-size: 24px; font-weight: bold; padding-top: 17px">
                      Bestellt
                    </div>

                    <div class="d-flex justify-space-between unterTitle24" style="padding-top: 8px">
                      <div>Musterbox</div>
                      <div style="font-weight: bold">{{ price | priceDisplay }} €</div>
                    </div>

                    <div class="d-flex justify-space-between unterTitle24"
                         style="border-bottom: 1px solid #AFA69D; padding-top: 8px">
                      <div>Versand</div>
                      <div style="font-weight: bold">{{ versandPrice | priceDisplay }} €</div>
                    </div>

                    <div class="d-flex justify-space-between unterTitle24" style="font-size: 24px; padding-top: 15px">
                      <div>Gesamtsumme inkl.MwSt.</div>
                      <div style="font-weight: bold">{{ price + versandPrice | priceDisplay }} €</div>
                    </div>
                  </v-card>

                  <div style="padding-top: 40px">
                    <ValetButton button-text="Bestätigen und bezahlen" @click="tryToPaySampleOrder"/>
                  </div>
                </div>

              </v-card>
            </div>
          </div>
          </template>

          <template v-else>
          <div class="d-flex justify-center" >
            <v-card width="60vw" flat>
              <div class="d-flex justify-center">
                <v-card width="645px" class=" text-center" flat>
                  <div style="font-size: 48px;line-height: 125%; padding-top: 30px; padding-bottom: 55px">
                    Wir konnten Deine Bestellung nicht bearbeiten
                  </div>
                  <div style=" font-size: 36px;line-height: 125%;">
                    Es scheint, dass ein Problem mit PayPal vorliegt. Bitte versuche es später noch einmal.
                  </div>
                </v-card>
              </div>
              <div class="d-flex justify-center" style="padding-top: 24px">
                <v-card class="text-center" flat>
                  <ValetButton style="width: 540px"
                               button-text="Bestellung Ansehen"
                               @click="this.$router.replace('/OrderIndex/Entwurf')"/>

                </v-card>
              </div>
            </v-card>
          </div>
          </template>
        </template>

        <template v-if="anzahlStep === 4">

          <div class="d-flex justify-center">
            <v-card width="60vw" flat>
              <div class="d-flex justify-center">
                <v-card width="645px" class=" text-center" flat>
                  <div style="font-size: 48px;line-height: 125%; padding-top: 30px; padding-bottom: 55px">
                    Vielen Dank für Deine Bestellung
                  </div>
                  <div style=" font-size: 36px;line-height: 125%;">
                    Wir werden Dir eine E-Mail mit all Deinen Bestellinformationen schicken.
                    Du kannst die Bestellung auch in DEINE BESTELLUNG finden.
                  </div>
                </v-card>
              </div>
              <div class="d-flex justify-center" style="padding-top: 24px">
                <v-card class="text-center" flat>
                  <ValetButton style="width: 540px"
                               button-text="Bestellung Ansehen"
                               @click="this.$router.replace('/OrderIndex/Entwurf')"/>

                </v-card>
              </div>
            </v-card>
          </div>



        </template>

      </div>
    </div>

    <v-dialog v-model="dialogLiferAdress" width="35vw">
      <div class="d-flex justify-center" style="background-color: white; ">
        <div>
          <FormAdress
              use-close
              @closeButton="handelClose"
              @click="handelClose"
              title="Lieferadresse ändern"
              v-model="lieferAddressForm"
              :styleInput="{'font-size':'36px', 'display':'flex', 'margin-bottom': '40px', 'margin-top': '40px', 'justify-content': 'center'}"/>

        </div>
      </div>


    </v-dialog>

    <v-dialog v-model="dialogRechnungAdress" width="35vw">
      <div class="d-flex justify-center" style="background-color: white; ">
        <FormAdress
            @closeButton="handelClose"
            @click="handelClose"
            use-close
            v-model="RechnungAddressForm"
            title="Rechnungsadresse ändern"
            :styleInput="{'font-size':'36px', 'display':'flex', 'margin-bottom': '40px', 'margin-top': '40px', 'justify-content': 'center'}"/>
      </div>

    </v-dialog>
  </div>

</template>

<script>
import ValetButton from "../../../components/ValetButton"
import ValetSnackBar from "@/components/ValetSnackBar";
import FormAdress from "../../../fragments/FormAdress"
import {
  loadDesign,
  paySampleOrder,
  paySampleOrderAdvance, paySampleOrderBilling,
  placeAndPaySampleOrder,
  placeSampleOrder
} from '../../../api/dressDesginService'
import {customerEditMe, customerMe} from "@/api/customerService"


export default {
  name: "SampleOrder",
  components: {FormAdress, ValetButton, ValetSnackBar},
  computed: {
    // items() {
    //   const res = this.personData[4]
    //   console.log("items", res)
    //   return res
    // },
    price() {
      return (this.amount ?? 1) * 29.99
    },
    versandPrice() {
      return 0.00
    }
  },
  props: {id: {}, status: {}},
  async mounted() {
    this.productInfo = await loadDesign(this.id)
    this.dataBody = (await customerMe()).data ?? []

    this.token = localStorage.getItem('token')

    const val = this.dataBody
    console.log("databody",val,'lieferAddressForm',this.lieferAddressForm)
    this.lieferAddressForm.vorname = val.firstName
    this.lieferAddressForm.nachname = val.lastName
    this.lieferAddressForm.address = val.address.split(',')[0]
    this.lieferAddressForm.zipCode = val.address.split(',')[1]
    this.lieferAddressForm.stadt = val.address.split(',')[1] ?? null

    this.RechnungAddressForm.vorname = val.firstName
    this.RechnungAddressForm.nachname = val.lastName
    this.RechnungAddressForm.address = val.address.split(',')[0]
    this.RechnungAddressForm.zipCode = val.address.split(',')[1]
    this.RechnungAddressForm.stadt = val.address.split(',')[1] ?? null

    console.log(this.productInfo)
  },
  watch:{
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


      },

  },
  data() {
    return {
      payStatus: true,
      payMethodValue:0,
      token: null,
      dataBody:[],
      snackBar: false,
      snackbarText: "Alle erforderliche Field soll ausgeführt werden.",
      amount: '1',
      dialogLiferAdress: false,
      dialogRechnungAdress: false,
      productInfo: null,
      refreshButtonFlag: false,
      showEditAdress: true,
      anzahlStep: 1,
      anzahl: 1,
      anzahlMenu: false,
      headers: [
        'ARTIKEL', 'BRAUTKLEID', 'ANZAHL', 'PREIS'
      ],
      selectItems: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'],
      stepHeaders: [
        {title: 'Produkt', value: 1},
        {title: 'Adresse', value: 2},
        {title: 'Zahlung', value: 3},
        {title: 'Fertig', value: 4}],
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
          title: 'Lieferadresse',
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
      }
    }
  },
  methods: {
    async confirm() {


      if (this.anzahlStep === 2) {
        const data = {
          firstName: this.lieferAddressForm.vorname,
          lastName: this.lieferAddressForm.nachname,
          Lieferadresse: this.lieferAddressForm.address + ',' + this.lieferAddressForm.zipCode,
          phone: this.phone
        }

        await customerEditMe(data)
      }

      this.anzahlStep = this.anzahlStep + 1


    },
    async placeAndPaySampleOrder(id) {
      await placeSampleOrder(id, parseInt(this.amount), this.lieferAddressForm.address, this.RechnungAddressForm.address)

      switch (this.payMethodValue) {
        case 0:
          return (await paySampleOrder(id))
        case 1:
          return (await paySampleOrderAdvance(id))
        default:
          return (await paySampleOrderBilling(id))
      }

    },

    async tryToPaySampleOrder() {
      // console.log(this.id, '要支付的订单ID')
      location.href = await placeAndPaySampleOrder(this.id)

    },
    async adressConfirm() {
      const res = Object.entries(this.lieferAddressForm).filter(i => i[0] != 'zusatzAdress')


      await customerEditMe(this.dataBody)


      console.log("res.every(i => {return i[1] ? true : false})", res.every(i => {
        return i[1] ? true : false
      }))
      if (res.every(i => {
        return i[1] ? true : false
      })) {
        this.showEditAdress = false
      } else {
        this.snackBar = true
      }
      this.RechnungAddressForm = Object.assign({},this.lieferAddressForm)
    },
    handelClose() {
      this.dialogLiferAdress = false
      this.dialogRechnungAdress = false
    },

  }
}
</script>

<style scoped>
.active .notion {
  background: #817163;

}

.notion {
  width: 30px;
  border-radius: 15px;
  height: 30px;
  flex-shrink: 0;
  border: 1px solid #817163;
  box-sizing: border-box;
}

.name {
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 125%;
  /* identical to box height, or 45px */

  display: flex;
  align-items: center;
  text-transform: capitalize;

  color: #4C4C4C;
}


.va-title {
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 135%;
  /* identical to box height, or 65px */

  text-align: center;

  color: #817163;
}

.unterTitle18 {
  font-size: 18px;
}

.unterTitle24 {
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 125%;
  /* identical to box height, or 30px */

  /*display: flex;*/
  /*align-items: center;*/
  /*text-transform: uppercase;*/

  color: #4C4C4C;
}

.unterTitle36 {
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 125%;
  /* identical to box height, or 45px */

  /*display: flex;*/
  /*align-items: center;*/

  color: #4C4C4C;
}


</style>
