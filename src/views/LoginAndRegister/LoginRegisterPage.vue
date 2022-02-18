<template>
  <div
      style="display: grid;grid-template-columns: repeat(2,50%);justify-items: center;padding: 72px 0">

    <div class="loginForm"
         style="border-right: 1px solid #817163;width: 100%;display: flex;justify-content: center;align-items: center;height: 100%">
      <div>
        <div class="formTitle " style="margin-bottom: 40px; ">Login</div>

        <ValetInputTextField
            title="Email*"
            v-model="loginEmail"
            width-input="540px"
        >
        </ValetInputTextField>


        <ValetInputTextField
            title="Password*"
            v-model="loginPassword"
            type="password"
            width-input="540px"></ValetInputTextField>

        <div class="content18"
             style="padding-bottom: 24px;"
        ><span @click="$router.push('/forgetPasswordConfirmEmail')">Passwort vergessen?</span></div>

        <ValetButton
            button-text="Anmelden"
            @click="login"
        ></ValetButton>


      </div>

    </div>


    <div class="registerForm">
      <v-form v-model="registerFormValid" lazy-validation>


        <div class="formTitle" style="margin-bottom: 40px">Register</div>

        <div style="display: grid;grid-template-columns: repeat(2,1fr);grid-column-gap: 8px">
          <ValetInputTextField
              title="Vorname*"
              v-model="firstName"
              width-input="266px"
              :use-style="true"
          ></ValetInputTextField>

          <ValetInputTextField
              title="Name*"
              v-model="lastName"
              :use-style="true"
              width-input="266px"></ValetInputTextField>


          <ValetInputTextField
              title="Stadt*"
              v-model="city"
              width-input="266px"></ValetInputTextField>

          <ValetInputTextField
              :use-rule="false"
              title="Handy Number"
              v-model="phone"
              width-input="266px"></ValetInputTextField>

        </div>


        <ValetInputTextField
            title="Email*"
            v-model="email"
            width-input="540px"
        ></ValetInputTextField>


        <div style="margin-bottom: 8px">
          Password* <span style="font-size: 12px"> Bitte mindestens 8 Zahlen oder Zeichen</span>
        </div>
        <ValetInputTextField
            :use-title="false"
            v-model="password"
            width-input="540px"
            type="password"
        ></ValetInputTextField>


        <ValetInputTextField
            title="Password Confirm*"
            type="password"
            v-model="passwordRepeat"
            width-input="540px"></ValetInputTextField>

        <div style="width: 540px">

          <div class="label12" style="margin-bottom: 24px">
            Durch Klicken auf "Registrieren stimmst du den Nutzungsbedingungen und der
            Datenschutzrichtlinie von Valetuto zu. Valetudo kann dir von Zeit zu Zeit Mitteilungen zusenden. Du kannst
            entsprechende Einstellungen in deinen Kontoeinstellungen ändern. Wir werden nie etwas ohne deine Erlaubnis
            posten.

          </div>

          <ValetButton
              button-text="Register"
              @click="register"
          ></ValetButton>
        </div>

        <!--        <div class="inputRow long mt-2">-->
        <!--          <v-btn @click="register" :disabled="!registerFormValid" block tile height="60px" color="#817163"-->
        <!--                 >Register-->
        <!--          </v-btn>-->
        <!--        </div>-->
      </v-form>

    </div>

    <ValetSnackBar
        v-model="snackbar"
        :snackbar-text="snackbarText"
    ></ValetSnackBar>

  </div>
</template>

<script>
import {refreshHeader} from '../../main'
import {customerLogin, customerRegister} from '../../api/customerService'
import ValetInputTextField from "../../components/ValetInputTextField";
import ValetButton from "../../components/ValetButton";
import ValetSnackBar from "../../components/ValetSnackBar";

export default {
  name: "LoginPage",
  components: {ValetInputTextField, ValetButton, ValetSnackBar},
  computed:{
    // valetSnackBar(){
    //   return this.snackbar
    // }
  },
  data: function () {
    return {
      snackbarText: "",
      snackbar: false,
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
      passwordRepeat: "",
      styleName: {border: '2px solid #4C4C4C'}
    }
  },
  methods: {
    async login() {

      if (this.loginEmail && this.loginPassword) {
        const res = await customerLogin(this.loginEmail, this.loginPassword)
        console.log(res)
        localStorage.setItem('token', res.data.tokenValue)
        if (res.code === 200) {
          refreshHeader()
          this.$router.push('/OrderIndex')
        } else {
          this.snackbar = true
          this.snackbarText = "Konto oder Passwort ist falsch"
        }

      }

    },
    async register() {

      const data = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        city: this.city,
        // phone: this.phone
      }

      if(this.passwordRepeat != this.password){
        this.snackbar=true
        this.snackbarText="Die beide Password sind nicht gleich"
      }
      else{
        if (Object.values(data).every((i)=> i ? true : false)) {
          data.phone=this.phone
          const res = await customerRegister(data)

          if (res.code === 200) {
            await this.$router.push('/registerComplete')
          }else {
            this.snackbar=true
            this.snackbarText="Registrierung erscheit Fehler"
          }
        }
      }



    },
    filter(value, index, arr){
      return arr[value] ? true : false
    }
  }
}
</script>

<style scoped>

.label12 {
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

.content18 {
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 26px;
  color: #817163;
}

</style>
