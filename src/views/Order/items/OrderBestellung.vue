<template>
  <div>

    <!--    <div class="Header" style="display: grid; grid-template-columns: repeat(8, 1fr); height: 90px">-->
    <!--      <template v-for="(head,ind) in headers">-->
    <!--        <span :key="'bestellung'+ind" class="d-flex align-center justify-center">{{ head }}</span>-->
    <!--      </template>-->
    <!--    </div>-->

    <v-data-table
        :headers="headers"
        :items="items"
    >
      <template v-slot:item.bStatus="{item}">
        <v-checkbox
            v-model="item.bStatus"
            hide-details>

        </v-checkbox>
      </template>
      <template v-slot:item.action="{item}">
        <v-btn style="color: #817163" width="266px">
          {{ item.actionTitle }}
        </v-btn>
      </template>

    </v-data-table>
    <!--    <div v-for="(item,ind) in items" :key="'body'+ind">-->
    <!--        <template v-for="(body,index) in item">-->
    <!--          <div :key="'bestell'+index" class="d-flex align-center justify-center">{{ body }}</div>-->
    <!--          <v-btn>Kontakt uns</v-btn>-->
    <!--        </template>-->
    <!--    </div>-->


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
.Header {
  background: #E0DDD6;
}
</style>
