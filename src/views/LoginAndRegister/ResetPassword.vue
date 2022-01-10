<template>
  <div class="fill-height d-flex justify-center align-center">
    <div style="">
      <div class="content d-flex " style="width: 650px;text-align: center; white-space: pre-wrap">
        Bitte geben Sie hier Ihre Registrierungs-E-Mail-Adresse ein, damit wir Ihnen ein temporäres Passwort zum
        Einloggen schicken können.
      </div>

      <div  style="">

        <div class="content" style="margin-bottom: 8px">Email*</div>
        <v-text-field outlined flat hide-details height="60px" style="border-radius: 0" v-model="email"></v-text-field>
        <v-btn block
               tile
               height="60px"
               color="#e0ddd6"
               elevation="0"
               class="buttonText"
               style="background-color: #817163; color: white;"
               @click="checkEmail"
               >
          Bestätigen</v-btn>


      </div>


      <div style="width: 650px;margin-top: 24px" class="postion hint">
      <span >
        Bitte schreiben Sie uns eine E-Mail mit Ihrem vollständigen Namen an support@valetudo.co,
        wenn Sie zufällig Ihre E-Mail Adresse vergessen haben.</span>
      </div>

    </div>
  </div>


</template>

<script>
export default {
  name: "ResetPassword",
  data() {
    return  {
      email: null
    }
  },
  methods:{
    checkEmail(){

    }
  }
}
</script>

<style scoped>
.postion{
  display: flex;
  align-items: center;
  text-align: center;
}
.content{

}
.hint{
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 26px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #4C4C4C;
}
.buttonText{
  margin-top: 24px;

  font-weight: 600;
  font-size: 24px;
  line-height: 125%;
  text-transform: none
}
</style>
