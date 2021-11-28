<template>
  <!--  <div style="margin-top: 341px">-->
  <div style="margin-top: 241px">

    <div class="text-center">
      <div class="content " v-html="message"></div>
    </div>

    <div class="positionCenter">

      <div class="inputRow longX mt-3 " style="margin-top: 48px">

        <valet-input-text-field title="Email*"
                                v-model="email" style="width: 562px"></valet-input-text-field>

        <v-btn block style="color: white;
                            height: 60px;
                            background-color: #817163;
                            margin-top: 22px;"
               class="buttonText">Confirm
        </v-btn>

        <div style="margin-top: 41px" class="positionCenter">
          Please contact us, if you forget your Email adress.
        </div>
      </div>
    </div>


  </div>


</template>

<script>

import ValetInputTextField from "@/components/ValetInputTextField";

export default {
  name: "ForgetPasswordConfirmEmail",
  components: {ValetInputTextField},
  data() {
    return {
      email: null,
      message: `Please give us your registered email adress. <br> We will send an new password to you, <br> please use this password to login.`,
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
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

</style>
