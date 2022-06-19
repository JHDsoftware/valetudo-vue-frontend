<template>
  <div>
    <v-simple-table>
      <thead style="height: 90px;background: #e0ddd6;">
      <tr>
        <th style="font-size: 18px">Bestellnummber</th>
        <th style="font-size: 18px">Bestelldatum</th>
        <th style="font-size: 18px">Artikel</th>
        <th style="font-size: 18px">Name des Kleides</th>
        <th style="font-size: 18px">Anzahl</th>
        <th style="font-size: 18px">Gesamtsumme</th>
        <th style="font-size: 18px">Bezahlstatus</th>
        <th style="font-size: 18px">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in items" :key="i.bId+ i.localDateTime">
        <td style="font-size: 24px">{{ i.bId }}</td>
        <td style="font-size: 24px">{{ i.time }}</td>
        <td style="font-size: 24px">{{ i.orderType==='Design'?'Entwurf':'MusterBox' }}</td>
        <td style="font-size: 24px">{{ i.name ? i.name : '-' }}</td>
        <td style="font-size: 24px">{{ i.quantity }}</td>
        <td style="font-size: 24px">{{ i.price.toFixed(2).replace('.', ',') + " €" }}</td>
        <td>
          <v-icon x-large
                  :color="i.paymentStatusIcon==='mdi-close-circle'?'grey':''">
            {{ i.paymentStatusIcon }}
          </v-icon>
        </td>
        <td style="width: 266px">
          <valet-button :button-text="i.buttonText"
                        @click="handleZahlen(i)"></valet-button>
        </td>
      </tr>

      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import { orderBestellungHeader } from '@/model/Order'
// import { myOrderList } from '@/api/dressDesginService'
import dayjs from 'dayjs'
import ValetButton from '../../../components/ValetButton'
import {dressOrder} from "../../../api/dressOrderService";

export default {
  name: "OrderBestellung",
  components: {ValetButton},

  data () {
    return {
      headers: orderBestellungHeader,
      items: []
      // listComplete: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    paymentStatus (item) {
      let iconStatus = 'mdi-close-circle'
      let buttonText = 'Bezahlen'
      if (item === 'Success') {
        iconStatus = 'mdi-check-circle'
        buttonText = 'Kontakt uns'
      }
      if (item === 'Pending') {
        iconStatus = 'mdi-help-circle'
        buttonText = 'Kontakt uns'
      }
      return [iconStatus, buttonText]
    },
    handleZahlen (i) {
      console.log("i",i)
      if (i.paymentStatus === 'NotApplicable') {
        this.$router.push({
          path: '/SampleOrder/' + i.dressDesignId,
          query: {
            data: 3,
            artikel: i.orderType==='Design'?'Entwurf':'MusterBox'
          }
        })

      } else {
        this.$router.push('/OrderIndex/KontaktUns')
      }

    },
    async init() {

      if (sessionStorage.getItem('token').toString() === 'null') {
        await this.$router.replace('/')
      }

      const myOrder = (await dressOrder()) ?? []
      // console.log("myOrder", myOrder)

      this.items = myOrder.filter(i=>!i.dressDesign.hideForCustomer).map(item => {

        return {
          dressDesignId: item.dressDesign.id,
          bId: item.id,
          name: item.dressDesign.name,
          time: dayjs(item.dressDesign.completedAt).format('YYYY-MM-DD'),
          orderType: item.orderType,
          quantity: item.count || 1,
          paymentStatusIcon: this.paymentStatus(item.paymentStatus)[0],
          buttonText: this.paymentStatus(item.paymentStatus)[1],
          price: item.price,
          paymentStatus: item.paymentStatus
        }

      })

      this.items.reverse()
    }
  }
}
</script>

<style scoped>

th {
  border-bottom: 1px solid #817163 !important;
  border-right: 2px solid #e0ddd6 !important;
  /*font-family: Gill Sans Nova;*/
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 125%;
  /* identical to box height, or 22px */

  text-align: center;

  /*color: #6F6154;*/
  color: #e0ddd6;
  /*box-shadow: 0px 4px 4px rgba(204, 198, 187, 0.85);*/
  /*box-shadow: 2px 4px 4px #e0ddd6;*/
}

td, th {
  text-align: center !important;
  /*border-bottom: 1px solid #817163 !important;*/

}

td {
  /*font-family: Gill Sans Nova;*/
  font-style: normal;
  font-weight: bold;
  font-size: 26px;

  text-align: center;

  /*color: #4C4C4C;*/
  height: 120px !important;
}

.text18 {
  font-size: 18px
}

</style>
