<template>
  <div style="margin-top: 15%">
    <div class="positionCenter">
      <div class="text">
        Ihr neues Passwort einrichten</div>
    </div>

    <div class="positionCenter" style="margin-top: 40px">
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

        <div style="margin-top: 8px">
        <ValetButton buttonText="Bestätigen" @clickButton="handle"/>
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

  </div>
</template>

<script>
import ValetInputTextField from "@/components/ValetInputTextField";
import ValetButton from "@/components/ValetButton";

export default {
  name: "SetPassword",
  components: {ValetInputTextField,ValetButton},
  data() {
    return {
      password: null,
      confirmPassword: null
    }
  },
  methods:{
    handle(){

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
