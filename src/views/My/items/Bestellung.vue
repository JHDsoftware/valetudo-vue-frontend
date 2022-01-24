<template>
  <div>

    <div class="Header" style="display: grid; grid-template-columns: repeat(8, 1fr); height: 90px">
      <template v-for="(head,ind) in headers">
        <span :key="'bestellung'+ind" class="d-flex align-center justify-center">{{ head }}</span>
      </template>
    </div>

<!--    <div v-for="(item,ind) in bodys" :key="'body'+ind">-->
<!--        <template v-for="(body,index) in item">-->
<!--          <div :key="'bestell'+index" class="d-flex align-center justify-center">{{ body }}</div>-->
<!--          <v-btn>Kontakt uns</v-btn>-->
<!--        </template>-->
<!--    </div>-->


  </div>
</template>

<script>
export default {
  name: "Bestellung",
  data() {
    return {
      headers: ['Bestellnummer', 'Bestelldatum', 'Artikel', 'Name des Kleides', 'Anzahl', 'Gesamtsumme', 'Bezahlstatus', 'Action'],
      bodys: [{
        bn: 1013, bdatum: "2022-01-01", artikel: 'Mussterbox', name: 'Joan&D', anzahl:1,  gesamtsum: '29,99 €', bStatus: 0,
      }]
    }
  }
}
</script>

<style scoped>
.Header {
  background: #E0DDD6;
}
</style>
