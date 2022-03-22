<template>
  <div style="height: 100%" class="d-flex justify-center align-center">

    <v-card width="540px" flat>
    <div style="width: 540px">

      <div class="titleAlert" style="margin-bottom: 40px">
        Neues Passwort wurde erfolgreich eingerichtet.
        Bitte einloggen.
      </div>

<!--      <message-display title=""-->
<!--                       :show-button="false"-->
<!--                       message="New password has been <br> successfully settled <br> Please login!"-->
<!--      ></message-display>-->

      <valet-input-text-field title="Email*"
                              v-model="loginEmail"
                              style="width: 100%"
                              ></valet-input-text-field>

      <valet-input-text-field title="Password*"
                              v-model="loginPassword"
                              style="width: 100%"
                              type="password"></valet-input-text-field>


      <div class="content18"
           style="padding-bottom: 24px;"
      ><span @click="$router.push('/forgetPasswordConfirmEmail')">Passwort vergessen?</span></div>

        <ValetButton
            button-text="Anmelden"
            @click="login"
        ></ValetButton>

    </div>

    <ValetSnackBar
        v-model="snackbar"
        :snackbar-text="snackbarText"
    ></ValetSnackBar>

    </v-card>
  </div>
</template>

<script>

import ValetInputTextField from "@/components/ValetInputTextField";
import ValetButton from "@/components/ValetButton";
import {customerLogin} from "@/api/customerService";
import {refreshHeader} from "@/main";
import ValetSnackBar from "@/components/ValetSnackBar";

export default {
  name: "SetPasswordComplete",
  components: {ValetInputTextField,ValetButton,ValetSnackBar},
  data() {
    return {
      snackbar: false,
      snackbarText: '',
      loginEmail: null,
      loginPassword: null
    }
  },
  methods:{
    async login() {
      if (this.loginEmail && this.loginPassword) {
        const res = await customerLogin(this.loginEmail, this.loginPassword)
        console.log(res)
        localStorage.setItem('token', res.tokenValue)
        if (res.code === 200) {
          refreshHeader()
          this.$router.replace('/OrderIndex')
        } else {
          this.snackbar = true
          this.snackbarText = "Konto oder Passwort ist falsch"
        }
      }
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
  /* or 60px */

  text-align: center;

  color: #817163;
}
</style>
