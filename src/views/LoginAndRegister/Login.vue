<template>
  <div class="loginForm"
       style="border-right: 1px solid #817163;width: 100%;display: flex;justify-content: center;align-items: center;height: 100%">
    <div>
      <div class="formTitle mt-n16 d-flex justify-center" style="margin-bottom: 40px; font-weight: 600;" >Login</div>

      <ValetInputTextField
          title="Email*"
          v-model="loginEmail"
          width-input="540px"
      >
      </ValetInputTextField>


      <ValetInputTextField
          type-input="password"
          title="Password*"
          v-model="loginPassword"
          width-input="540px"></ValetInputTextField>

      <ValetButton
          text-before="Passwort vergessen?"
          button-text="Anmelden"
          @click="login"
      ></ValetButton>

    </div>

  </div>
</template>

<script>
import {refreshHeader} from '../../main'
import {customerLogin} from '../../api/customerService'
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
    }
  },
  methods: {
    async login() {
      const res = await customerLogin(this.loginEmail, this.loginPassword)
      console.log(res)
      localStorage.setItem('token', res.tokenValue)
      if(res.code===200)
      {
        await this.$router.push('/order')
        refreshHeader()
      }

    },

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
