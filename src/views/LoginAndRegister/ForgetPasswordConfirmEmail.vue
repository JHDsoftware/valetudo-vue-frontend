<template>
  <div style="margin-top: 3%">
    <message-display message="Please give us your registered email adress. <br>
  We will send an new password to you, <br>
  please use this password to login."
                     :show-button="false">
    </message-display>

    <div style="justify-content: center; align-content: center">
      <v-text-field outlined
                    full-width
                    requrired
                    height="163"
                    label="Email"
                    required
                    hide-details
                    v-model="form.email"
      ></v-text-field>
      <v-btn block >Confirm</v-btn>
    </div>
    <div style="margin-top: 41px">
      Please contact us, if your forget your Email adress.
    </div>
  </div>


</template>

<script>
import MessageDisplay from "../../components/MessageDisplay";
export default {
  name: "ForgetPasswordConfirmEmail",
  components: {MessageDisplay},
  data(){
    return {
      form: {}
    }
  }
}
</script>

<style scoped>

</style>
