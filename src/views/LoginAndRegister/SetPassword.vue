<template>
  <div style="margin-top: 15%">
    <div class="positionCenter">
      <div class="text" style="width: 650px; margin-top: 251px">
        Bitte geben Sie hier Ihre Registrierungs-E-Mail-Adresse ein, damit wir Ihnen ein temporäres Passwort zum Einloggen schicken können.</div>
    </div>

    <div class="positionCenter" style="margin-top: 61px">
      <div>
          <valet-input-text-field
              style="width: 581px"
              title="E-Mail*"
              v-model="password"
          />

          <valet-input-text-field
              style="width: 581px"
              title="Confirm new password:"
              v-model="confirmPassword"
              type="password"></valet-input-text-field>

          <v-btn class="buttonText"
                 style="color: white;
                        height: 60px;
                        background-color: #817163;
                        margin-top: 23px;
                        width: 581px;
                            "
                >Save</v-btn>
      </div>
    </div>

  </div>
</template>

<script>
import ValetInputTextField from "@/components/ValetInputTextField";

export default {
  name: "SetPassword",
  components: {ValetInputTextField},
  data() {
    return {
      password: null,
      confirmPassword: null
    }
  }
}
</script>

<style scoped>

.text {
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 5px;
  /* or 10% */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.011em;

  color: #817163;

}
.buttonText{
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


</style>