<template>
  <!--  <div style="margin-top: 341px">-->

  <div class="d-flex justify-center ">

    <div style="margin-top: 241px">
      <div class="content text-center" style="width: 650px;"> {{ message }}</div>

      <div class="d-flex justify-center">
        <div class="" style="margin-top: 58px; width: 540px">

          <valet-input-text-field
              title="Email*"
              v-model="email"
              :use-rule="true"
              style="width: 100%"/>

          <ValetButton
              buttonText="Bestätigen"
              @click="confirm"/>

        </div>

      </div>
      <div style="margin-top: 24px; width: 650px" class="hint">
        {{ hintMessage }}
      </div>
    </div>
  </div>


</template>

<script>

import ValetInputTextField from "@/components/ValetInputTextField";
import ValetButton from "@/components/ValetButton";
import {customerCheckEmailRegistered} from '@/api/customerService'

export default {
  name: "ForgetPasswordConfirmEmail",
  components: {ValetInputTextField, ValetButton},
  data() {
    return {
      email: null,
      message: `Bitte geben Sie hier Ihre Registrierungs-E-Mail-Adresse ein, damit wir Ihnen ein temporäres Passwort zum Einloggen schicken können.`,
      hintMessage: `Bitte schreiben Sie uns eine E-Mail mit Ihrem vollständigen Namen an support@valetudo.co, wenn Sie zufällig
        Ihre E-Mail Adresse vergessen haben.`,
      rules: {
        required: v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Required'
        // required: (value) => (value && Boolean(value)) || 'Required'
      }
    }
  },
  methods: {
    customerCheckEmailRegistered,
    async confirm() {

      if (this.email) {
        const res = await customerCheckEmailRegistered(this.email)
        console.log(res)
        if (res.code == 200)
          this.$router.push('/forgetPasswordComplete')
      }

    }
  }
}
</script>

<style scoped>
.buttonText {
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  text-align: center;
  color: white;
  height: 60px;
  background-color: #817163;
  margin-top: 22px;
}

.hint {
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
</style>
