<template>
  <div
      style="display: grid;grid-template-columns: repeat(2,50%);justify-items: center;align-items: center;padding: 72px 0">
    <div class="loginForm"
         style="border-right: 1px solid #817163;width: 100%;display: flex;justify-content: center;align-items: center;height: 100%">
      <div>
        <div class="formTitle mt-n16">Login</div>
        <div class="inputRow mt-4">
          <div class="label">Email*</div>
          <v-text-field outlined flat v-model="loginEmail" hide-details height="60px"
                        style="border-radius: 0"></v-text-field>
        </div>
        <div class="inputRow mt-3">
          <div class="label">Password*</div>
          <v-text-field outlined flat hide-details v-model="loginPassword" height="60px" type="password"
                        style="border-radius: 0"></v-text-field>
        </div>
        <div class="inputRow mt-3">
          <div class="label">Forget Password?*</div>
        </div>
        <div class="inputRow mt-3">
          <v-btn block tile height="60px" @click="login" color="#e0ddd6" elevation="0">Login</v-btn>
        </div>
      </div>

    </div>
    <div class="registerForm">
      <v-form v-model="registerFormValid" lazy-validation>
        <div class="formTitle">Register</div>
        <div class="inputRow long mt-4 pr-3"
             style="display: grid;grid-template-columns: repeat(2,50%);grid-gap: 10px">
          <div>
            <div class="label">First name*</div>
            <v-text-field :rules="[rules.required]"
                          :validate-on-blur="false"
                          v-model="firstName" outlined flat hide-details height="60px"
                          style="border-radius: 0"></v-text-field>
          </div>
          <div>
            <div class="label">Surname*</div>
            <v-text-field :rules="[rules.required]"
                          :validate-on-blur="false"
                          v-model="lastName" outlined flat hide-details height="60px"
                          style="border-radius: 0"></v-text-field>
          </div>
        </div>
        <div class="inputRow long mt-2">
          <div class="label">City*</div>
          <v-text-field :rules="[rules.required]"
                        :validate-on-blur="false"
                        v-model="city" outlined flat hide-details height="60px"
                        style="border-radius: 0"></v-text-field>
        </div>
        <div class="inputRow long mt-2">
          <div class="label">Phone Number</div>
          <v-text-field :rules="[rules.required]"
                        :validate-on-blur="false"
                        v-model="phone" outlined flat hide-details height="60px"
                        style="border-radius: 0"></v-text-field>
        </div>
        <div class="inputRow long mt-2">
          <div class="label">Email*</div>
          <v-text-field :rules="[rules.required]"
                        :validate-on-blur="false"
                        v-model="email" outlined flat hide-details height="60px"
                        style="border-radius: 0"></v-text-field>
        </div>
        <div class="inputRow long mt-2">
          <div class="label">Password*</div>
          <v-text-field :rules="[rules.required]"
                        :validate-on-blur="false"
                        v-model="password" outlined flat hide-details height="60px" type="password"
                        style="border-radius: 0"></v-text-field>
        </div>
        <div class="inputRow long mt-2">
          <div class="label">Password Confirm*</div>
          <v-text-field :rules="[rules.required]"
                        :validate-on-blur="false" v-model="passwordRepeat" outlined flat hide-details height="60px"
                        type="password"
                        style="border-radius: 0"></v-text-field>
        </div>
        <div class="inputRow long mt-2">
          <div class="tinyHint">Durch Klicken auf "Registrieren stimmst du den Nutzungsbedingungen und der
            Datenschutzrichtlinie von Valetuto zu. Valetudo kann dir von Zeit zu Zeit Mitteilungen zusenden. Du kannst
            entsprechende Einstellungen in deinen Kontoeinstellungen ändern. Wir werden nie etwas ohne deine Erlaubnis
            posten.
          </div>
        </div>
        <div class="inputRow long mt-2">
          <v-btn @click="register" :disabled="!registerFormValid" block tile height="60px" color="#e0ddd6"
                 elevation="0">Register
          </v-btn>
        </div>
      </v-form>

    </div>
  </div>
</template>

<script>
import { customerLogin, customerRegister } from '../../api/api'
import { refreshHeader } from '../../main'

export default {
  name: "LoginPage",
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
    async login () {
      const res = await customerLogin(this.loginEmail, this.loginPassword)
      console.log(res)
      localStorage.setItem('token', res.tokenValue)
      refreshHeader()
      await this.$router.push('/order')
    },
    async register () {
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


</style>
