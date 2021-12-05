<template>
  <v-app>
    <v-app-bar height="60px" app class="d-flex justify-center" flat
               style="border-bottom: 1px solid #817163;background-color: white">
      <v-app-bar-title style="flex-grow: 1">
        Valetudo my Dress
      </v-app-bar-title>
      <div style="position: fixed;right: 43px;top:22px" class="d-flex">
        <router-link class="flatButton" to="/">Login/Register</router-link>
        <router-link class="flatButton" to="/order" style="margin-left: 32px">Konto</router-link>
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

.label {

  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  display: flex;
  align-items: center;
  letter-spacing: -0.011em;

  color: #4C4C4C;
}

.titleAlert {
  font-family: Palanquin;
  font-style: normal;
  font-weight: 300;
  font-size: 48px;
  line-height: 87px;
  /* identical to box height */

  text-align: center;

  color: #817163;
}

.content {
  font-family: Palanquin;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 45px;
  /* or 125% */

  letter-spacing: -0.011em;

  color: #4C4C4C;
}

.formTitle {
  font-family: Palanquin;
  font-style: normal;
  font-weight: 300;
  font-size: 48px;
  text-align: center;
  color: #817163;
}

.inputRow {
  width: 348px;
}

.inputRow.long {
  width: 409px;
}

.textInput {
  border-radius: 0;
  height: 60px;
  line-height: 60px;
}

.tinyHint {
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 15px;
  /* or 150% */
  display: flex;
  align-items: center;
  letter-spacing: -0.011em;
  color: #4C4C4C;
}

</style>

