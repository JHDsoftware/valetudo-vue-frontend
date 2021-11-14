<template>
  <div class="fill-height d-flex justify-center align-center">
    <div style="width: 700px;text-align: center">
      <div class="content d-flex justify-center align-center" style="width: 100%;height:163px;text-align: center">
        Please give us your registered email address.<br>
        We will send an new password to you,<br>
        please use this password to login.
      </div>
      <div class="d-flex justify-center flex-wrap mt-6">
        <div class="inputRow long">
          <div class="label">Email*</div>
          <v-text-field outlined flat hide-details height="60px" style="border-radius: 0"></v-text-field>
        </div>
        <div class="inputRow long mt-5">
          <v-btn block tile height="60px" color="#e0ddd6" elevation="0">Register</v-btn><br>
        </div>
      </div>
      <div style="height: 58px;margin-top: 196px" class="d-flex align-center justify-center" >
        <span class="mt-2">Please contact us, if your forget your Email address. </span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ResetPassword"
}
</script>

<style scoped>

</style>
