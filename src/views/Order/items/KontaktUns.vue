<template>
  <div style="display: grid; grid-template-columns: 1fr 1fr; grid-column-gap: 8px; height: calc(100vh - 60px)">
    <div class="d-flex justify-center align-center">
      <div>
        <div class="d-flex justify-center align-center display-2" style="margin-bottom: 60px; ">Kontakt uns</div>
        <v-card style="display: grid; grid-template-columns: repeat(2,1fr); grid-column-gap: 8px" tile flat>
          <ValetInputTextField title="Vorname*" width-input="266px" v-model="personData.vorname"/>
          <ValetInputTextField title="Name*" width-input="266px" v-model="personData.nachname"/>
          <ValetInputTextField title="E-Mail*" width-input="266px" v-model="personData.email"/>
          <ValetInputTextField title="Handy Number" width-input="266px" v-model="personData.phone"/>
          <div style="grid-column: 1/3; margin-top: 4px">{{ ('Nachricht') }}</div>
          <v-textarea flat outlined style="grid-column: 1/3; margin-top: 24px" v-model="personData.message" solo/>
          <ValetButton buttonText="Senden" style="grid-column: 1/3; margin-top: 4px" @click="send" />
        </v-card>
      </div>
    </div>

    <div class="d-flex flex-column align-end">
      <div style="max-height: 685px">
        <v-img height="685px" :src="require('@/assets/WechatIMG1540_1200.png')"></v-img>
      </div>

      <div style="font-size: 24px;padding: 40px 12px;color: #4c4c4c" >

        © VALETUDO BRIDAL BERLIN
        gegründet im Jahr 2019. Valetudo ist Experte für Hochzeitskleider, maßgeschneiderte Anzüge und Accessoires
        rund um das Thema Hochzeit. Jetzt haben wir mehr als hundert einzigartige Produkte entwickelt.<br>
        <br>
        Mobil: (0)157 5334 7272<br>
        Email: support@valetudo.co

      </div>
    </div>
  </div>

</template>

<script>
import ValetInputTextField from "../../../components/ValetInputTextField"
import ValetButton from '@/components/ValetButton'
import {customerMe,contactUsAdd} from "@/api/customerService";

export default {
  name: "KontaktUns",
  components: {ValetInputTextField, ValetButton},
  data () {
    return {
      personData: {
        vorname: null,
        nachname: null,
        email: null,
        phone: null,
        message: null
      }


    }
  },
  async mounted() {
    const personData = (await customerMe()).data
    this.vorname = personData.firstName
    this.nachname = personData.lastname
    this.email = personData.userName

  },
  methods: {
    async send() {

      const personData = {
        firstName: this.vorname,
        lastName: this.nachname,
        email: this.email,
        phone: this.phone ?? '',
        message: this.message
      }

      await contactUsAdd(personData)


    },



  }
}
</script>

<style scoped>

</style>
