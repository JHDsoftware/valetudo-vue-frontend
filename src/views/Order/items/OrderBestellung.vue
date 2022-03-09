<template>
  <div>
    <v-simple-table>
      <thead style="height: 90px;background: #e0ddd6;color:  #6F6154;">
      <tr>
        <th>Bestellnummber</th>
        <th>Bestelldatum</th>
        <th>Artikel</th>
        <th>Name des Kleides</th>
        <th>Anzahl</th>
        <th>Gesamtsumme</th>
        <th>Bezahlstatus</th>
        <th>action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in items" :key="i.bId">
        <td>{{ i.bId }}</td>
        <td>{{ i.time }}</td>
        <td>{{ i.type }}</td>
        <td>{{ i.name ?i.name: '-' }}</td>
        <td>{{ i.quantity }}</td>
        <td>{{ i.totalPrice.toFixed(2).replace('.', ',') + " €" }}</td>
        <td>{{ i.paymentStatus }}</td>
        <td><valet-button  :button-text="'Kontakt uns'" @click="$router.push('/OrderIndex/KontaktUns')"></valet-button></td>
      </tr>

      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import { orderBestellungHeader } from '@/model/Order'
import { getMyDesign } from '../../../api/dressDesginService'
import dayjs from 'dayjs'
import ValetButton from '../../../components/ValetButton'

export default {
  name: "Bestellung",
  components: {ValetButton},
  data () {
    return {
      headers: orderBestellungHeader,
      items: []
    }
  },
  async mounted () {
    this.items = (await getMyDesign()).filter(i => i.designCompleted).map(i => {
      i.bId = i.id.toString().padStart(4, '0')
      i.time = dayjs(i.completedAt).format('YYYY-MM-DD')
      i.type = 'MusterBox'
      i.quantity = i.quantity || 1

      return i
    })
    console.log(this.items)
  }
}
</script>

<style scoped>

td, th {
  text-align: center !important;
  border-bottom: 1px solid #817163 !important;
}

th {
  border-bottom: 1px solid #817163 !important;
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 125%;
  /* identical to box height, or 22px */

  text-align: center;

  color: #6F6154;
  box-shadow: 0px 4px 4px rgba(204, 198, 187, 0.85);
}

td {
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;

  text-align: center;

  color: #4C4C4C;
  height: 120px !important;
}
</style>
