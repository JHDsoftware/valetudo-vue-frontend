<template>
  <div style="margin-top: 5%">

    <div class="positionCenter">
      <message-display title=""
                       :show-button="false"
                       message="New password has been <br> successfully settled <br> Please login!"
      ></message-display>
    </div>

    <div class="positionCenter">
      <div>
        <valet-input-text-field title="Email*"
                                v-model="email"
                                style="width: 372px"></valet-input-text-field>

        <valet-input-text-field title="Password*"
                                v-model="passowrd"
                                style="width: 372px" type="password"></valet-input-text-field>

        <div class="text">Forget Password?</div>

        <v-btn
               style="  background-color: #817163;
                        color: white;
                        height: 60px;
                        width: 372px;
                        margin-top: 26px;
                            ">Login</v-btn>
      </div>


    </div>

  </div>
</template>

<script>
import MessageDisplay from "@/components/MessageDisplay";
import ValetInputTextField from "@/components/ValetInputTextField";

export default {
  name: "SetPasswordComplete",
  components: {ValetInputTextField, MessageDisplay},
  data() {
    return {
      email: null,
      passowrd: null
    }
  }
}
</script>

<style scoped>

</style>