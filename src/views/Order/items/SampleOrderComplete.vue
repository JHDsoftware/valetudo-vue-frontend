<template>
  <div style="height: calc(100vh - 60px);overflow: hidden">
    <div style="margin-top: 70px;" class="d-flex justify-center flex-wrap">

      <div class="va-title" style="margin-bottom: 16px;text-align: center;width: 100%">
        <span v-if="id!=-1">Musterbox</span>
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

    <div class="d-flex justify-center" style="padding-top: 90px">
      <div>

        <template v-if="anzahlStep === 4">

          <div class="d-flex justify-center">
            <v-card width="60vw" flat >
              <div class="d-flex justify-center">
                <v-card width="645px" class=" text-center" flat>
                  <div style="font-size: 48px;line-height: 125%; padding-top: 30px; padding-bottom: 55px">
                    Vielen Dank für Deine Bestellung
                  </div>
                  <div style=" font-size: 36px;line-height: 125%; ">
                    Wir werden Dir eine E-Mail mit all Deinen Bestellinformationen schicken.
                    </div>
                  <div style=" font-size: 36px;line-height: 125%; ">
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


    <!--    <v-dialog v-model="dialogLiferAdress" width="35vw">-->
    <!--      <div class="d-flex justify-center" style="background-color: white; ">-->
    <!--        <div>-->
    <!--          <FormAdress-->
    <!--              use-close-->
    <!--              @closeButton="handelClose"-->
    <!--              @click="handelClose"-->
    <!--              title="Lieferadresse ändern"-->
    <!--              v-model="dataBody.deliveryAddress"-->
    <!--              :styleInput="{'font-size':'36px', 'display':'flex', 'margin-bottom': '40px', 'margin-top': '40px', 'justify-content': 'center'}"/>-->

    <!--        </div>-->
    <!--      </div>-->


    <!--    </v-dialog>-->

    <!--    <v-dialog v-model="dialogRechnungAdress" width="35vw">-->
    <!--      <div class="d-flex justify-center" style="background-color: white; ">-->
    <!--        <FormAdress-->
    <!--            @closeButton="handelClose"-->
    <!--            @click="handelClose"-->
    <!--            use-close-->
    <!--            v-model="dataBody.billingAddress"-->
    <!--            title="Rechnungsadresse ändern"-->
    <!--            :styleInput="{'font-size':'36px', 'display':'flex', 'margin-bottom': '40px', 'margin-top': '40px', 'justify-content': 'center'}"/>-->
    <!--      </div>-->

    <!--    </v-dialog>-->
  </div>
</template>

<script>
import ValetButton from "../../../components/ValetButton"

export default {
  name: "SampleOrderComplete",
  components: {ValetButton},
  data() {
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
      anzahlStep: 4,
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
        },

      },

      // deliveryAddress: {
      //   firstName: '',
      //   lastName: '',
      //   addressLine1: '',
      //   addressLine2: '',
      //   postCode: '',
      //   city: '',
      //   country: 'Germany'
      // },
      // billingAddress: {
      //   firstName: '',
      //   lastName: '',
      //   addressLine1: '',
      //   addressLine2: '',
      //   postCode: '',
      //   city: '',
      //   country: 'Germany'
      // },
      defaultAddress: {
        id: null,
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        postCode: '',
        city: '',
        stateOrProvice: '',
        country: 'Germany'
      },

    }
  },
}
</script>

<style scoped>
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
</style>