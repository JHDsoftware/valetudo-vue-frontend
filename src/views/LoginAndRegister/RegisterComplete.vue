<template>
  <div class="d-flex align-center flex-wrap" style="height: 100%">
  <message-display
      title="Vielen Dank für Ihre Anmeldung"
      button-text="Aktualisieren"
      button-height="60px"
      button-width="266px"
      :show-button="true"
      :message="message"
      message-width="650px"
      :hint="hint"
      v-on:clickButton="$router.replace('/login')"
      v-on:clickHint="$router.replace('/FAQ')"
  >
    <template v-slot:TextTop>
      <div>

      </div>
    </template>
  </message-display>
  </div>
</template>


<script>
import MessageDisplay from '../../components/MessageDisplay'

export default {
  name: "RegisterComplete",
  components: {MessageDisplay},
  data() {
    return {
      message: "Wir haben Ihnen eine E-Mail geschickt. Bitte klicken Sie auf den Link, um Ihre Anmeldung zu bestätigen.\n" +
          "Klicken Sie nach Ihrer Bestätigung auf den Button \"Aktualisieren\".",
      hint: `<span style="font-size: 18px; color: #817163">Ich habe Probleme bei der Registrierung</span>`
    }
  },
  methods: {

  }
}
</script>

<style scoped>


</style>
