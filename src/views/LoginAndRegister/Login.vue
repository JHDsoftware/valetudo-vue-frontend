<template>
  <div class="loginForm"
       style="border-right: 1px solid #817163;width: 100%;display: flex;justify-content: center;align-items: center;height: 100%">
    <div>
      <div class="formTitle mt-n16" style="margin-bottom: 40px; font-weight: 600;">Login</div>

      <ValetInputTextField
          title="Email*"
          v-model="loginEmail"
          width-input="540px"
      >
      </ValetInputTextField>


      <ValetInputTextField
          title="Password*"
          v-model="loginPassword"
          width-input="540px"></ValetInputTextField>

      <ValetButton
          text-before="Passwort vergessen?"
          button-text="Anmelden"
          v-on:clickButton="login"
      ></ValetButton>

    </div>

  </div>
</template>

<script>
import {refreshHeader} from '../../main'
import {customerLogin, customerRegister} from '../../api/customerService'
import ValetInputTextField from "../../components/ValetInputTextField";
import ValetButton from "../../components/ValetButton";

export default {
  name: "LoginPage",
  components: {ValetInputTextField, ValetButton},
  data: function () {
    return {

      loginEmail: "",
      loginPassword: "",

      registerFormValid: false,

      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      },
      firstName: "",
      lastName: "",
      city: "",
      phone: "",
      email: "",
      password: "",
      passwordRepeat: ""
    }
  },
  methods: {
    async login() {
      const res = await customerLogin(this.loginEmail, this.loginPassword)
      console.log(res)
      localStorage.setItem('token', res.tokenValue)
      refreshHeader()
      await this.$router.push('/order')
    },
    async register() {
      const res = await customerRegister(
          this.email, this.password,
          this.firstName, this.lastName,
          this.city, this.phone)
      if (res.code === 200) {
        await this.$router.push('/registerComplete')
      }
      console.log(res)
    }
  }
}
</script>

<style scoped>

.label12{
  font-family: Gill Sans Nova;
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
