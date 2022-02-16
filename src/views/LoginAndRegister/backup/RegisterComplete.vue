<template>
  <message-display
      title="Vielen Dank für Ihre Anmeldung"
      :message="message"
      hint="Ich habe Probleme bei der Registrierung"
      button-text="Aktualisieren"
      :show-button="true"
      v-on:clickButton="$router.replace('/login')"
      v-on:clickHint="$router.replace('/FAQ')"
  ></message-display>
</template>


<script>
import MessageDisplay from '../../../components/MessageDisplay'

export default {
  name: "RegisterComplete",
  components: {MessageDisplay},
  data() {
    return {
      message: "Wir haben Ihnen eine E-Mail geschickt. Bitte klicken Sie auf den Link, um Ihre Anmeldung zu bestätigen.\n" +
          "Klicken Sie nach Ihrer Bestätigung auf den Button \"Aktualisieren\"."
    }
  },
  methods: {

  }
}
</script>

<style scoped>


</style>
