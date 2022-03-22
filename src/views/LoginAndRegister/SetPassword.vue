<template>
  <div class="d-flex justify-center align-center" style="height: 100%">
    <v-card width="100%" flat>
    <div class="positionCenter">
      <div class="text">
        Ihr neues Passwort einrichten</div>
    </div>

    <div class="positionCenter" style="margin-top: 40px">
      <div>
          <valet-input-text-field
              :widthInput="'580px'"
              title="Neues Passwort*:"
              v-model="password"
          />

          <valet-input-text-field
              style="width: 581px"
              title="Neues Passwort bestätigen*:"
              v-model="confirmPassword"
              type="password"></valet-input-text-field>

        <div style="margin-top: 24px">
        <ValetButton buttonText="Bestätigen" @click="handle"/>
        </div>
<!--          <v-btn class="buttonText"-->
<!--                 style="color: white;-->
<!--                        height: 60px;-->
<!--                        background-color: #817163;-->
<!--                        margin-top: 23px;-->
<!--                        width: 581px;-->
<!--                            "-->
<!--                 @click="handle"-->
<!--                >Bestätigen</v-btn>-->
      </div>
    </div>

    </v-card>
    <ValetSnackBar
        v-model="snackbar"
        :snackbar-text="snackbarText"
    ></ValetSnackBar>
  </div>
</template>

<script>
import ValetInputTextField from "@/components/ValetInputTextField";
import ValetButton from "@/components/ValetButton";
import ValetSnackBar from "@/components/ValetSnackBar";
import {resetPassword} from "../../api/customerService";

export default {
  name: "SetPassword",
  components: {ValetInputTextField,ValetButton,ValetSnackBar},
  data() {
    return {
      snackbar: false,
      snackbarText: '',
      password: null,
      confirmPassword: null,
      token: localStorage.getItem('token')
    }
  },
  methods:{

    handle(){
      if(this.password !=this.confirmPassword){
        this.snackbar=true
        this.snackbarText="Die beide Password sind nicht gleich"
      }
      else {
        const  res = resetPassword(this.token, this.password)
        if(res.code === 200){
          this.$router.push('/SetPasswordComplete')
        }
        else {
          this.snackbar=true
          this.snackbarText="Ein Fehler war erschienen."
        }
      }

    }
  }
}
</script>

<style scoped>

.text {
  /*font-family: Gill Sans Nova;*/
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 125%;
  /* or 10% */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.011em;

  color: #817163;

}
.buttonText{
  /*font-family: Gill Sans Nova;*/
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
