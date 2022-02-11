<template>
<div style="margin-left: 160px; margin-top: 160px">

  <div class="display-2 mb-10">临时内部开发测试页面总览(开发完成后移除)</div>

  <div class="d-flex">
    <v-card style="font-size: 26px" flat width="50%">
      <v-list>

        <div>登录注册：</div>
        <v-list-item>
          <div @click="$router.push('/registerComplete')" style="border-bottom: 1px solid grey">RegisterComplete</div>
        </v-list-item>
        <v-list-item>
          <div @click="$router.push('/createNewDress')" style="border-bottom: 1px solid grey">CreateNewDress</div>
        </v-list-item>

        <v-list-item>
          <div @click="$router.push('/login')" style="border-bottom: 1px solid grey">Login</div>
        </v-list-item>

        <v-list-item>
          <div @click="$router.push('/FAQ')" style="border-bottom: 1px solid grey">FAQ</div>
        </v-list-item>

        <v-list-item>
          <div @click="$router.push('/forgetPasswordConfirmEmail')" style="border-bottom: 1px solid grey">ForgetPasswordConfirmEmail</div>
        </v-list-item>

        <v-list-item>
          <div @click="$router.push('/resetPassword')" style="border-bottom: 1px solid grey">ResetPassword</div>
        </v-list-item>

        <v-list-item>
          <div @click="$router.push('/forgetPasswordComplete')" style="border-bottom: 1px solid grey">ForgetPasswordComplete</div>
        </v-list-item>

        <v-list-item>
          <div @click="$router.push('/resetPassword')" style="border-bottom: 1px solid grey">ResetPassword</div>
        </v-list-item>


        <div>问题：</div>

        <v-list-item>
          <div @click="$router.push('/questionspage')" style="border-bottom: 1px solid grey">Questionspage</div>
        </v-list-item>



      </v-list>


    </v-card>

    <v-card style="font-size: 26px" flat width="50%">
      <div>例子：</div>

      <v-list-item>
        <div @click="$router.push('/SampleOrder')" style="border-bottom: 1px solid grey">SampleOrder</div>
      </v-list-item>


      <div>订单：</div>
      <v-list-item>
        <div @click="$router.push('/OrderIndex')" style="border-bottom: 1px solid grey">OrderIndex</div>
      </v-list-item>

      <div>DressDisplay：</div>
      <v-list-item>
        <div @click="$router.push('/DressDisplay')" style="border-bottom: 1px solid grey">DressDisplay</div>
      </v-list-item>

      <div>MakeADress：</div>
      <v-list-item>
        <div @click="$router.push('/DressDisplay')" style="border-bottom: 1px solid grey">MakeADress</div>
      </v-list-item>

    </v-card>
  </div>


</div>
</template>

<script>
export default {
  name: "temporaryGuid"
}
</script>

<style scoped>

</style>
