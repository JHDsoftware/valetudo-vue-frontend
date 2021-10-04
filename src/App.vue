<template>
  <v-app>
    <v-app-bar height="60px" app class="d-flex justify-center" flat style="border-bottom: 1px solid #817163;background-color: white" >
      <v-app-bar-title style="flex-grow: 1">
        Valetudo my Dress
      </v-app-bar-title>
      <div style="position: fixed;right: 43px;top:22px" class="d-flex">
        <div class="flatButton">Login/Register</div>
        <div class="flatButton" style="margin-left: 32px">Konto</div>
      </div>
    </v-app-bar>
    <v-main style="">
      <router-view></router-view>
    </v-main>
  </v-app>

</template>
<style>
.flatButton {
  font-family: Palanquin;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 24px;
  /* identical to box height */


  color: #817163;
}
</style>

