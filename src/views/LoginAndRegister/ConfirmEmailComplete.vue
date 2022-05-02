<template>
  <div class="d-flex justify-center align-center">
    <div style="margin-top: 276px">

      <div class="titleAlert" style="margin-bottom: 40px">
        Vielen Dank
      </div>

      <div class="contentAlert" style="margin-bottom: 24px; width: 650px; white-space: pre-wrap">
        {{message}}
      </div>

      <div class="d-flex justify-center align-center">
        <div style="width: 266px">
          <ValetButton
              button-text="Anmelden"
              @click="next"
          />
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import ValetButton from '../../components/ValetButton'

export default {
  name: "ForgetPasswordComplete",
  components: { ValetButton},
  data() {
    return {
      message: `Wir haben Ihnen das neue Passwort an Ihre E-Mail geschickt. \n Bitte überprüfen Sie Ihren "Trash" oder “Spam”, wenn Sie die E-Mail in Ihrem E-Mail-Eingang nicht finden können.`
    }
  },
  methods:{
    next(){
      sessionStorage.setItem('token',null)
      this.$router.replace('/ResetPassword')
    }
  }
}
</script>

<style scoped>

.titleAlert {
  /*font-family: Gill Sans Nova;*/
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 125%;
  /* identical to box height, or 60px */

  text-align: center;

  color: #817163;

}
.contentAlert{
  /*font-family: Gill Sans Nova;*/
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 125%;
  /* or 45px */

  display: flex;
  align-items: center;
  text-align: center;

  color: #4C4C4C;
}
</style>
