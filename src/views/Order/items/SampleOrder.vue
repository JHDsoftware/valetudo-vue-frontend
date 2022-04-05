<template>
  <div style="height: calc(100vh - 60px);overflow: hidden">
    <div style="margin-top: 70px;" class="d-flex justify-center flex-wrap">
      <div class="va-title" style="margin-bottom: 16px;text-align: center;width: 100%">
        <span v-if="id != -1">Musterbox</span>
        <span v-else>Entwurf</span>
        bestellen
      </div>
      <v-stepper
          color="#817163"
          alt-labels
          style="width: 646px; font-size: 24px; border: 2px solid white" flat v-model="anzahlStep">
        <v-stepper-header>
          <template v-for="(item,i) in stepHeaders">
            <v-stepper-step
                :step="item.value"
                :key="i"
                style="font-size: 18px"
                @click="handleReturn(i)"
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
                  <div class="unterTitle36" v-if="id != -1">Musterbox</div>
                  <div class="unterTitle36" v-else>Neuer Entwurf</div>

                  <div class="unterTitle18" v-if="id != -1">(Inkl. Versandkosten)</div>
                  <div class="unterTitle18" v-else>(Keine Versandkosten)</div>
                </div>
              </div>

              <div class="d-flex flex-column align-center">
                <div class="unterTitle24" v-if="id != -1">BRAUTKLEID</div>
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
                          v-model="deliveryAddress"
                          button-text="Speichern und weiter"
                          @click="adressConfirm"/>

            </template>
            <template v-else>

              <div class="d-flex justify-center">
                <v-card width="70vw" class="d-flex justify-center" flat>

                  <v-card class="d-flex justify-start" width="30vw" flat tile
                          style="padding-right:20px; margin-bottom: 90px">
                    <div style="font-size: 24px;">
                      <div class="font-weight-bold"> Lieferadresse</div>
                      <template v-for="(item,j) in dataBody.deliveryAddress">
                        <div :key="'item'+j">
                          {{ item }}
                        </div>
                      </template>
                      <div style="position: absolute; right: 16px; top: 16px">
                        <v-icon @click="editLieferadresse">mdi-pencil-plus</v-icon>
                      </div>
                    </div>
                  </v-card>
                  <v-card class="d-flex " width="30vw" style="padding-left: 80px; border-left: 2px solid grey" flat
                          tile>
                    <div style="font-size: 24px; ">
                      <div class="font-weight-bold">Rechnungsadresse</div>
                      <template v-for="(item,j) in dataBody.billingAddress">
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
                            <div v-if="active" class="hint mt-3">Der Rechnungsbetrag wird erst innerhalb von 14 Tagen
                              nach
                              der Versandbestätigung per E-Mail
                              fällig.
                            </div>
                          </div>
                        </div>

                      </v-item>
                      <v-item #default="{active,toggle}" v-if="id != -1">
                        <div class="d-flex align-baseline mt-2" @click="toggle" :class="active?'active':''">
                          <div class="notion"></div>
                          <div class="ml-3 flex-grow-1">
                            <div class="d-flex justify-space-between">
                              <div class="name">Vorkasse</div>
                            </div>
                            <div v-if="active" class="hint mt-3">Nachdem du deine Bestellung aufgegeben hast, senden wir
                              dir die Informationen zur
                              Banküberweisung per E-Mail. Wir können deine Artikel nur für 7 Tage reservieren. Bitte
                              halte
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

                        <div>{{ dataBody.deliveryAddress.firstName }} {{ dataBody.deliveryAddress.lastName }}</div>
                        <div>{{ dataBody.deliveryAddress.addressLine1 }}</div>
                        <div>{{ dataBody.deliveryAddress.postCode }} {{ dataBody.deliveryAddress.city }}</div>
                        <div>{{ dataBody.deliveryAddress.stateOrProvice }}</div>
                        <div>{{ dataBody.deliveryAddress.country }}</div>
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
            <div class="d-flex justify-center">
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
                               @click="$router.replace('/OrderIndex/Entwurf')"/>

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
              :styleInput="{'font-size':'36px', 'display':'flex', 'margin-bottom': '40px', 'margin-top': '40px', 'justify-content': 'center'}"
              title="Lieferadresse ändern"
              v-model="deliveryAddress"
              @click="handelClose"
          />

        </div>
      </div>


    </v-dialog>

    <v-dialog v-model="dialogRechnungAdress" width="35vw">
      <div class="d-flex justify-center" style="background-color: white; ">
        <FormAdress
            @closeButton="handelClose"
            @click="handelClose"
            use-close
            v-model="billingAddress"
            title="Rechnungsadresse ändern"
            :styleInput="{'font-size':'36px', 'display':'flex', 'margin-bottom': '40px', 'margin-top': '40px', 'justify-content': 'center'}"/>
      </div>

    </v-dialog>
  </div>

</template>

<script>
import ValetButton from "../../../components/ValetButton"
import ValetSnackBar from "@/components/ValetSnackBar"
import FormAdress from "../../../fragments/FormAdress"
import {
  loadDesign, payNewByBilling, payNewByPaypal,
  paySampleOrder,
  paySampleOrderAdvance, paySampleOrderBilling,
  placeSampleOrder
} from '../../../api/dressDesginService'
import { customerEditMe, customerMe } from "@/api/customerService"
import {updateAddress} from "@/model/Order";

export default {
  name: "SampleOrder",
  components: {FormAdress, ValetButton, ValetSnackBar},
  computed: {

    price () {
      return (this.amount ?? 1) * 29.99
    },
    versandPrice () {
      return 0.00
    }
  },
  props: {
    id: {},
    status: {}
  },

  data () {
    return {
      payStatus: true,
      payMethodValue: 0,
      token: null,

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
          stateOrProvice: ''
        },
        billingAddress: {
          id: null,
          firstName: '',
          lastName: '',
          addressLine1: '',
          addressLine2: '',
          postCode: '',
          city: '',
          stateOrProvice: ''
        }
      },

      billingAddress: {
        id: null,
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        postCode: '',
        city: '',
        stateOrProvice: ''
      },
      deliveryAddress: {
        id: null,
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        postCode: '',
        city: '',
        stateOrProvice: ''
      },
      defaultAddress: {
        id: null,
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        postCode: '',
        city: '',
        stateOrProvice: '',
        // country: 'Germany'
      }

    }
  },
  async mounted () {
    this.productInfo = await loadDesign(this.id)
    this.token = localStorage.getItem('token')
    await this.getPersonData()

  },

  methods: {

    async getPersonData() {
      const res = await customerMe()
      if (res.code !== 200) {
        return null
      }

      const tempData ={
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        city: res.data.city
      }

      this.dataBody = res.data
      // console.log('this.dataBody', this.dataBody)

      if (!this.dataBody.billingAddress) {
        this.dataBody.billingAddress = Object.assign(this.defaultAddress, tempData)

      }
      this.billingAddress = Object.assign({}, this.dataBody.billingAddress)

      if (!this.dataBody.deliveryAddress) {
        this.dataBody.deliveryAddress = Object.assign(this.defaultAddress, tempData)
      }
      this.deliveryAddress = Object.assign({}, this.dataBody.deliveryAddress)

      console.log('this.dataBody', this.dataBody)
    },
    handleReturn(i) {
      if (this.anzahlStep > (i + 1)) {
        this.anzahlStep = (i + 1)
      }
    },
    async adressConfirm() {

      const res = Object.entries(this.dataBody.deliveryAddress).filter(i => i[0] !== 'addressLine2')

      // console.log('adressConfirm x', res, this.dataBody.deliveryAddress)
      const isNoEmpty = res.every(i => {
        return !!i[1]
      })
      if (isNoEmpty) {
        this.showEditAdress = false
      } else {
        this.snackBar = true
      }

      const resUpdate = await updateAddress(this.dataBody, this.deliveryAddress, 'deliveryAddress')
      this.snackbar = resUpdate.snackbar
      this.snackbarText = resUpdate.snackbarText
      await this.getPersonData()

    },

    async confirm() {

      if (this.anzahlStep === 2) {

        await customerEditMe(this.dataBody)
      }

      this.anzahlStep = this.anzahlStep + 1

    },

    async handelClose() {
      if (JSON.stringify(this.deliveryAddress) != JSON.stringify(this.dataBody.deliveryAddress)) {
        const resUpdate = await updateAddress(this.dataBody, this.deliveryAddress, 'deliveryAddress')
        this.snackbar = resUpdate.snackbar
        this.snackbarText = resUpdate.snackbarText
        await this.getPersonData()
      }

      if (JSON.stringify(this.billingAddress) != JSON.stringify(this.dataBody.billingAddress)) {
        const resUpdate = await updateAddress(this.dataBody, this.billingAddress, 'billingAddress')
        this.snackbar = resUpdate.snackbar
        this.snackbarText = resUpdate.snackbarText
        await this.getPersonData()
      }

      this.dialogRechnungAdress = false
      this.dialogLiferAdress = false
    },

    async placeAndPaySampleOrder(id) {
      await placeSampleOrder(id, this.amount, this.deliveryAddress, this.billingAddress)

      switch (this.payMethodValue) {
        case 0:
          location.href = (await paySampleOrder(id)).data
          break
        case 1:
          if ((await paySampleOrderAdvance(id)).code === 200) {
            await this.$router.replace('/SampleOrderComplete')
          }
          break
        default:
          if ((await paySampleOrderBilling(id)).code === 200) {
            await this.$router.replace('/SampleOrderComplete')
          }
      }

    },

    async tryToPaySampleOrder() {
      if (this.id != -1) {
        await this.placeAndPaySampleOrder(this.id)

      } else {
        let res = null
        switch (this.payMethodValue) {
          case 0:
            res = await payNewByPaypal(this.amount)
            if (res) {
              console.log(res)
              // window.location = res.data
            }
            break
          default:
            if ((await payNewByBilling(this.amount)).code === 200) {
              await this.$router.replace('/SampleOrderComplete')
            }
        }
      }
    },

    editLieferadresse() {
      this.dialogLiferAdress = true
      this.deliveryAddress = Object.assign({},this.dataBody.deliveryAddress)
    }
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
  /*font-family: Gill Sans Nova;*/
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
  /*font-family: Gill Sans Nova;*/
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
  /*font-family: Gill Sans Nova;*/
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
  /*font-family: Gill Sans Nova;*/
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
