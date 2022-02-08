<template>

    <v-card style="display: grid; grid-template-columns: 1fr 1fr; grid-column-gap: 8px; height: 100%"

            class="fill-height">
      <div class="d-flex justify-center align-center" >
        <div >
        <div class="d-flex justify-center align-center display-2" style="margin-bottom: 60px; ">Kontakt uns</div>
        <v-card style="display: grid; grid-template-columns: repeat(2,1fr); grid-column-gap: 8px" tile flat>
          <ValetInputTextField title="Vorname*" width-input="266px" v-model="personData.vorname"/>
          <ValetInputTextField title="Name*" width-input="266px" v-model="personData.nachname"/>
          <ValetInputTextField title="E-Mail*" width-input="266px" v-model="personData.email"/>
          <ValetInputTextField title="Vorname*" width-input="266px" v-model="personData.phone"/>
          <div style="grid-column: 1/3; margin-top: 4px" >{{('Nachricht')}}</div>
          <v-textarea style="grid-column: 1/3; margin-top: 24px" v-model="personData.nachricht" solo />
          <ValetButton buttonText="Senden" style="grid-column: 1/3; margin-top: 4px"/>
        </v-card>
        </div>
      </div>

      <v-card class="justify-end">
        <v-img :src="require('@/assets/WechatIMG1540_1200.png')" width="80%"></v-img>
        <div style="width: 620px;font-size: 24px">

            © VALETUDO BRIDAL BERLIN
            gegründet im Jahr 2019. Valetudo ist Experte für Hochzeitskleider, maßgeschneiderte Anzüge und Accessoires
            rund um das Thema Hochzeit. Jetzt haben wir mehr als hundert einzigartige Produkte entwickelt.

            Mobil: (0)157 5334 7272
            Email: support@valetudo.co

        </div>
      </v-card>
    </v-card>

</template>

<script>
import ValetInputTextField from "../../../components/ValetInputTextField";
import ValetButton from '@/components/ValetButton';
export default {
  name: "KontaktUns",
  components: {ValetInputTextField,ValetButton},
  data() {
    return {
      personData: {
        vorname: null,
        nachname: null,
        email: null,
        phone: null,
        nachricht: null
      }


    }
  }
}
</script>

<style scoped>

</style>
