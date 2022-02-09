<template>
  <div style="height: 100%;">
    <div class="d-flex justify-center" style="margin-top: 70px">

      <v-stepper alt-labels style="width: 476px" flat tile v-model="anzahlStep">

        <div class="title" style="margin-bottom: 16px">Musterbox bestellen</div>
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
            <v-card class="d-flex justify-space-between" width="80vw" flat>
              <template v-for="(item,i) in headers">
                <div :key="'header'+i" class="unterTitle24">{{ item }}</div>
              </template>
            </v-card>

            <v-card class="d-flex justify-space-between" width="80vw"
                    style="border-bottom: 1px solid #8F8F8F; padding-bottom: 5px" flat>
              <div>
                <div class="unterTitle36">Musterbox</div>
                <div class="unterTitle18">(Inkl. Versandkosten)</div>
              </div>
              <div class="unterTitle36">Anni</div>
              <div class="unterTitle36 d-flex">

                <v-text-field
                    v-model="anzahl"
                    style="width: 50px; "
                    outlined
                    hide-details
                    @click="refreshButtonFlag=true"/>

                <template v-if="refreshButtonFlag">
                  <div style="width: 60px; ">
                    <ValetButton button-text="Aktualisieren" style="height: 56px"
                                 @click="refreshButtonFlag=false"></ValetButton>
                  </div>
                </template>
                <!--          <template >-->
                <v-menu v-model="anzahlMenu" v-if="!refreshButtonFlag">
                  <template v-slot:activator="{on,attrs}">
                    <v-card style="border: 1px solid grey;" v-bind="attrs" v-on="on" height="56px" flat>
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-card>
                  </template>


                  <v-list>
                    <v-list-item v-for="(item,i) in selectItems" :key="'select'+i" dense>
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <!--          </template>-->


              </div>
              <div class="unterTitle36">29,99 €</div>
            </v-card>

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
                          button-text="Speichern und weiter"
                          @click="adressConfirm"/>
            </template>
            <template v-else>

              <div class="d-flex justify-center">
                <v-card width="70vw" class="d-flex justify-center" flat>

                  <v-card class="d-flex justify-start" width="30vw" flat tile style="padding-right: 20px">
                    <div>
                      <div style="font-size: 24px; font-weight: bold">{{ personData[3].title }}</div>
                      <template v-for="(item,j) in personData[3].data">
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
                    <div>
                      <div style="font-size: 24px; font-weight: bold">{{ personData[4].title }}</div>
                      <template v-for="(item,j) in personData[4].data">
                        <div :key="'item'+j">
                          {{ item }}
                        </div>
                      </template>
                      <div style="height: 60px;padding-top: 24px">
                        <ValetButton button-text="Bestätigen und weiter" @click="confirm"/>
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

        </template>

        <template v-if="anzahlStep === 3">

          <div class="d-flex justify-center">
            <div style="width: 50%; border-right: 1px solid grey">
              <v-card height="30vh" flat>
                <div style="font-weight: 600; font-size: 24px;">ZAHLUNGSART</div>

                <div>
                  <v-radio-group v-model="column" style="font-weight: 600; font-size: 36px;">
                    <v-radio label="PayPal">
                      <div>Du wirst an PayPal weitergeleitet, um den Bezahlvorgang abzuschließen.</div>
                    </v-radio>
                    <v-radio label="Rechnung">
                      <div>Der Rechnungsbetrag wird erst innerhalb von 14 Tagen nach der Versandbestätigung per E-Mail
                        fällig.
                      </div>
                    </v-radio>
                    <v-radio label="Vorkasse">
                      <div>Nachdem du deine Bestellung aufgegeben hast, senden wir dir die Informationen zur
                        Banküberweisung per E-Mail. Wir können deine Artikel nur für 7 Tage reservieren. Bitte halte
                        dieses Zeitfenster ein. Je eher wir deine Zahlung erhalten, desto schneller wird deine
                        Bestellung verschickt.
                      </div>
                    </v-radio>
                  </v-radio-group>
                </div>
              </v-card>
            </div>
            <div style="width: 50%">
              <v-card width="40vw" class="d-flex justify-center" flat>
                <div>
                  <div style="font-weight: 600; font-size: 24px;">BESTELLÜBERSICHT</div>
                  <div style="width: 270px; padding-top: 40px">
                    <ValetButton button-text="Bestätigen und bezahlen" @click="confirm"/>
                  </div>
                </div>

              </v-card>
            </div>
          </div>
        </template>

        <template v-if="anzahlStep === 4">

          <div class="d-flex justify-center">
            <v-card width="60vw" flat>
              <div class="d-flex justify-center">
                <v-card width="645px" class=" text-center" flat>
                  <div style="font-size: 48px;line-height: 125%; padding-top: 30px; padding-bottom: 55px">
                    Vielen Dank für Deine Bestellung</div>
                  <div style="font-size: 36px;line-height: 125%;">
                    Wir werden Dir eine E-Mail mit all Deinen Bestellinformationen schicken.
                    Du kannst die Bestellung auch in DEINE BESTELLUNG finden.
                  </div>
                </v-card>
              </div>
              <div  class="d-flex justify-center" style="padding-top: 24px">
                <v-card width="540px" class="text-center" flat>
                    <ValetButton button-text="Bestellung Ansehen"/>

                </v-card>
              </div>


            </v-card>
          </div>

        </template>

      </div>
    </div>

    <v-dialog v-model="dialogLiferAdress" width="45vw">
      <div class="d-flex justify-center" style="background-color: white; ">
        <div>
          <FormAdress
              use-close="true"
              @closeButton="handleClose"
              title="Lieferadresse ändern"
              :styleInput="{'font-size':'36px', 'display':'flex', 'margin-bottom': '40px', 'margin-top': '40px', 'justify-content': 'center'}"/>

        </div>
      </div>


    </v-dialog>

    <v-dialog v-model="dialogRechnungAdress" width="45vw">
      <div class="d-flex justify-center" style="background-color: white; ">
        <FormAdress
            @closeButton="handleClose"
            use-close="true"
            title="Lieferadresse ändern"
            :styleInput="{'font-size':'36px', 'display':'flex', 'margin-bottom': '40px', 'margin-top': '40px', 'justify-content': 'center'}"/>
      </div>

    </v-dialog>
  </div>

</template>

<script>
import ValetButton from "../../../components/ValetButton";
import FormAdress from "../../../fragments/FormAdress";


export default {
  name: "SampleOrder",
  components: {FormAdress, ValetButton},
  computed: {
    items() {
      const res = this.personData[4]
      console.log("items", res)
      return res
    }
  },
  mounted() {

  },
  data() {
    return {

      dialogLiferAdress: false,
      dialogRechnungAdress: false,
      // items: personData[4],
      refreshButtonFlag: false,
      showEditAdress: true,
      anzahlStep: 1,
      anzahl: 1,
      anzahlMenu: false,
      headers: [
        'ARTIKEL', 'BRAUTKLEID', 'ANZAHL', 'PREIS'
      ],
      selectItems: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'],
      stepHeaders: [{title: 'Produkt', value: 1}, {title: 'Adresse', value: 2}, {
        title: 'Zahlung',
        value: 3
      }, {title: 'Fertig', value: 4}],
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
    }
  },
  methods: {
    confirm() {
      this.anzahlStep = this.anzahlStep + 1
    },
    adressConfirm() {
      this.showEditAdress = false
    },
    handleClose() {
      this.dialogLiferAdress = false
      this.dialogRechnungAdress = false
    }
  }
}
</script>

<style scoped>
.title {
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
