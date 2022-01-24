<template>
  <div style="margin-top: 5%" class="positionCenter">

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
                              v-model="email"
                              style="width: 100%"
                              ></valet-input-text-field>

      <valet-input-text-field title="Password*"
                              v-model="passowrd"
                              style="width: 100%"
                              type="password"></valet-input-text-field>

      <div style="margin-top: 10px">
      <valet-button
          textBefore="Passwort vergessen?"
          buttonText="Anmelden"></valet-button>
      </div>
    </div>

<!--    <div class="positionCenter">-->
<!--      <div>-->


<!--        <div class="text">Forget Password?</div>-->

<!--        <v-btn-->
<!--               style="  background-color: #817163;-->
<!--                        color: white;-->
<!--                        height: 60px;-->
<!--                        width: 372px;-->
<!--                        margin-top: 26px;-->
<!--                            ">Login</v-btn>-->
<!--      </div>-->


<!--    </div>-->

  </div>
</template>

<script>

import ValetInputTextField from "@/components/ValetInputTextField";
import ValetButton from "@/components/ValetButton";

export default {
  name: "SetPasswordComplete",
  components: {ValetInputTextField,ValetButton},
  data() {
    return {
      email: null,
      passowrd: null
    }
  }
}
</script>

<style scoped>
.titleAlert {
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 125%;
  /* or 60px */

  text-align: center;

  color: #817163;
}
</style>
