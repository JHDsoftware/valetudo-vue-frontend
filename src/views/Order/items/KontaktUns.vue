<template>
  <div style="display: grid; grid-template-columns: 1fr 1fr; grid-column-gap: 8px; height: calc(100vh - 60px)">
    <div class="d-flex justify-center align-center">
      <div>
        <div class="d-flex justify-center align-center display-2" style="margin-bottom: 60px; ">Kontakt uns</div>
        <v-card style="display: grid; grid-template-columns: repeat(2,1fr); grid-column-gap: 8px" tile flat>
          <ValetInputTextField title="Vorname*" width-input="266px" v-model="personData.firstName"/>
          <ValetInputTextField title="Name*" width-input="266px" v-model="personData.lastName"/>
          <ValetInputTextField title="E-Mail*" width-input="266px" v-model="personData.userName"/>
          <ValetInputTextField title="Handy Number" width-input="266px" v-model="personData.phone" :rules="[]"/>
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

    <ValetSnackBar
        v-model="snackbar"
        :snackbar-text="snackbarText"
    ></ValetSnackBar>
  </div>

</template>

<script>
import ValetInputTextField from "../../../components/ValetInputTextField"
import ValetButton from '@/components/ValetButton'
import {customerMe,contactUsAdd} from "@/api/customerService";
import ValetSnackBar from "@/components/ValetSnackBar";

export default {
  name: "KontaktUns",
  components: {ValetInputTextField, ValetButton,ValetSnackBar},
  data () {
    return {
      snackbar:null,
      snackbarText: null,
      personData:{
        firstName: null,
        lastName: null,
        userName: null,
        email: null,
        phone: null,
        message: null
      },
      defaultPersonData: {
        firstName: null,
        lastName: null,
        userName: null,
        phone: null,
        message: null,
        email: null,
      }


    }
  },
  async mounted() {
    await this.getPersonData()
  },
  methods: {
    async getPersonData() {
      const res = await customerMe()
      if (res.code != 200) {
        return null
      }
      this.personData = Object.assign(this.personData, res.data)
      this.personData.email = res.data.userName
      console.log("this.personData",this.personData)

    },
    async send() {
      if(!this.personData.message){
        this.snackbar=true
        this.snackbarText="Bitte die entsprechende Nachrichten eingeben"
        return null
      }

      const res = await contactUsAdd(this.personData)
      console.log("send", res)

      if(res.code === 200){

        this.snackbar=true,
        this.snackbarText= "Erfolgreich geschicket!"
        this.personData.message = null

      }
      else {
        this.snackbar=true,
        this.snackbarText= res.message
        // this.message.warning("Error, bitte ausloggen und versuchen Sie noch mal.")
      }
    },



  }
}
</script>

<style scoped>

</style>
