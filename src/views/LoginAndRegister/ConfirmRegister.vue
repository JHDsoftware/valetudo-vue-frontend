<template>
  <div class="loginForm"
       style="border-right: 1px solid #817163;width: 100%;display: flex;justify-content: center;align-items: center;height: 100%">
    <div>
      <div class="formTitle mt-n16 d-flex justify-center" style="margin-bottom: 40px; font-weight: 600;">Login</div>

      <ValetInputTextField
          title="E-Mail*"
          v-model="loginEmail"
          width-input="540px"
      >
      </ValetInputTextField>


      <ValetInputTextField
          type-input="password"
          title="Password*"
          v-model="loginPassword"
          type="password"
          width-input="540px"></ValetInputTextField>

      <div class="content18"
           style="padding-bottom: 24px;"
      ><span @click="$router.push('/ConfirmEmail')">Passwort vergessen?</span></div>

      <ValetButton
          button-text="Anmelden"
          @click="login"
      ></ValetButton>

    </div>

    <ValetSnackBar
        v-model="snackbar"
        :snackbar-text="snackbarText"
    ></ValetSnackBar>
  </div>
</template>

<script>
import {refreshHeader} from '../../main'
import {customerLogin} from '../../api/customerService'
import ValetInputTextField from "../../components/ValetInputTextField";
import ValetButton from "../../components/ValetButton";
import ValetSnackBar from "@/components/ValetSnackBar";
import hillo from "hillo";
// import {GlobalSetting} from '@/GlobalSetting'

export default {
  name: "ConfirmRegister",
  components: {ValetInputTextField, ValetButton,ValetSnackBar},
  data: function () {
    return {

      snackbar: false,
      snackbarText: '',
      loginEmail: "",
      loginPassword: "",

      registerFormValid: false,

      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      },
    }
  },

  async mounted() {
    this.init()
  },
  methods: {
    async init() {
      // const currentPath = this.$route.path.split('/customer/confirmRegister?')
      const currentPath = this.$route.path.split('/customer/confirmChangeEmail?')
      console.log("currentPath", currentPath)

      // GlobalSetting
      // const newUrl = 'http://3.124.147.27:8080/customer/confirmRegister?' + currentPath[1]
      const newUrl = 'http://3.124.147.27:8080/customer/confirmChangeEmail?' + currentPath[1]
      await hillo.get(newUrl)
    },
    async login() {

      try{
        if (this.loginEmail && this.loginPassword) {
          const res = await customerLogin(this.loginEmail, this.loginPassword)
          // console.log(res.data.tokenValue)
          if (res.code === 200) {
            localStorage.setItem('token', res.data.tokenValue)
            localStorage.setItem('id',res.data.loginId)

            refreshHeader()
            this.$router.replace('/OrderIndex')
          } else {
            this.snackbar = true
            this.snackbarText = "Konto oder Passwort ist falsch"
          }
        }
      }
      catch(e){
        this.snackbar=true
        this.snackbarText="Email ist noch nicht aktiviert."
      }


    },

  }
}
</script>

<style scoped>

.label12 {
  /*font-family: Gill Sans Nova;*/
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 125%;
  /* or 15px */

  display: flex;
  align-items: center;

  color: #4C4C4C;
}

</style>


