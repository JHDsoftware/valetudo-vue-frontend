<template>
  <v-app>
    <v-app-bar height="60px" app class="d-flex justify-center" flat
               style="border-bottom: 1px solid #817163;background-color: white">
      <div class="d-flex align-center">
        <v-img width="118px" :src="require('@/assets/image/frameUI/logoFront.png')"></v-img>
        <v-img width="80px" class="ml-2" :src="require('@/assets/image/frameUI/logoBack.png')"></v-img>
      </div>
      <div style="position: fixed;right: 63px;top:22px" class="d-flex">

        <template v-if="!hideLoginStatus">

          <router-link class="flatButton text-decoration-none" to="/">Login/Register</router-link>
        </template>

        <template v-if="!hideKontStatus">
          <div class="flatButton text-decoration-none"
               @click="checkToken"
               style="margin-left: 32px">Konto
          </div>
        </template>

      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>

</template>

<script>

export default {

  created() {
    if (this.$route.path == '/')
      this.$router.replace('/')
  },

  computed: {
    routePath() {
      return this.$route.path
    },
    hideKontStatus() {
      const path = ['/', '/registerComplete', '/FAQ',
        '/Login', '/ConfirmEmail', '/ResetPassword','/customer/confirmRegister']

      return path.indexOf(this.routePath) >= 0
    },
    hideLoginStatus() {
      const path = ['/OrderIndex/Entwurf',
        '/OrderIndex/OrderPersonData',
        '/OrderIndex/OrderBestellung',
        '/OrderIndex/FAQ',
        '/OrderIndex/KontaktUns',
        '/questionspage',
          '/CreateNewDress'
      ]

      if (this.routePath.match('/SampleOrder') || this.routePath.match('/edit')) {
        return true
      }

      return path.indexOf(this.routePath) >= 0
    }
  },
  data() {
    return {}

  },

  methods: {
    checkToken() {
      const token = localStorage.getItem('token')
      if (token) {
        this.$router.replace('/OrderIndex/Entwurf')
      }
    },

  }
}
</script>
<style>

.appHeaderValetudo {
  color: #CCC6BB
}

.appHeaderMyDress {
  /*font-family: Oranienbaum;*/
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 25px;
  width: 120px;

  color: #4C4C4C;
}

.flatButton {
  /*font-family: Palanquin;*/
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 24px;
  /* identical to box height */
  color: #817163;
}

.label {

  /*font-family: Inter;*/
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  display: flex;
  align-items: center;
  letter-spacing: -0.011em;

  color: #4C4C4C;
}

.titleAlert {
  /*font-family: Palanquin;*/
  font-style: normal;
  font-weight: 300;
  font-size: 48px;
  line-height: 125%;
  /* identical to box height */

  text-align: center;

  color: #817163;
}

.content {
  /*font-family: Palanquin;*/
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 45px;
  /* or 125% */

  letter-spacing: -0.011em;

  color: #4C4C4C;
}

.formTitle {
  /*font-family: Gill Sans Nova;*/
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 125%;
  text-align: center;
  /* identical to box height, or 60px */

  color: #817163;
}

.inputRow {
  width: 348px;
}

.inputRow.long {
  width: 409px;
}

.inputRow.longX {
  width: 562px;
}

.textInput {
  border-radius: 0;
  height: 60px;
  line-height: 60px;
}

.tinyHint {
  /*font-family: Inter;*/
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

.positionCenter {
  display: flex;
  justify-content: center;
  align-content: center;
}

.buttonText {
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

.text24 {
  font-size: 24px;
  line-height: 34px;
}

.text36 {
  font-size: 36px;
  line-height: 52px;
  /* identical to box height */

  color: #4C4C4C;

}

.pointerMouse{
  cursor: pointer;
}

</style>

