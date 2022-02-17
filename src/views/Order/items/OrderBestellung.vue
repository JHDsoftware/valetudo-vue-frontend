<template>
  <div>
    <v-simple-table>
      <thead style="height: 90px;background: #e0ddd6;color:  #6F6154;">
      <tr>
        <th>Bestellnummber </th>
        <th>Bestelldatum </th>
        <th>Artikel </th>
        <th>Name des Kleides </th>
        <th>Anzahl </th>
        <th>Gesamtsumme </th>
        <th>Bezahlstatus </th>
        <th>action </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Bestellnummber </td>
        <td>Bestelldatum </td>
        <td>Artikel </td>
        <td>Name des Kleides </td>
        <td>Anzahl </td>
        <td>Gesamtsumme </td>
        <td>Bezahlstatus </td>
        <td>Action </td>
      </tr>

      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import {orderBestellungHeader} from '@/model/Order'

export default {
  name: "Bestellung",
  data() {
    return {
      headers: orderBestellungHeader,
      items: [{
        bn: 1013,
        bdatum: "2022-01-01",
        artikel: 'Mussterbox',
        name: 'Joan&D',
        anzahl: 1,
        gesamtsum: '29,99 €',
        bStatus: 0,
        action: '1'
      },
        {
          bn: 1013,
          bdatum: "2022-01-01",
          artikel: 'Mussterbox',
          name: 'Joan&D',
          anzahl: 1,
          gesamtsum: '29,99 €',
          bStatus: 0,
        },{
          bn: 1013,
          bdatum: "2022-01-01",
          artikel: 'Mussterbox',
          name: 'Joan&D',
          anzahl: 1,
          gesamtsum: '29,99 €',
          bStatus: 0,
        },{
          bn: 1013,
          bdatum: "2022-01-01",
          artikel: 'Mussterbox',
          name: 'Joan&D',
          anzahl: 1,
          gesamtsum: '29,99 €',
          bStatus: 0,
        }
      ]
    }
  }
}
</script>

<style scoped>

td,th{
  text-align: center !important;
  border-bottom: 1px solid #817163 !important;
}
th{
  border-bottom: 1px solid #817163 !important;
  box-shadow: 0px 4px 4px rgba(204, 198, 187, 0.85);
}

td{
  height: 120px !important;
}
</style>
