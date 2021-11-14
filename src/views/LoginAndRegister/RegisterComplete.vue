<template>
  <message-display title="Thanks for your registration!" message="        We have sent you an Email,<br>
        please confirm it in your email address,<br>
        klick the link!<br>
        <br>
        After you confirm it,<br>
        this page will atomaticly refresh!<br>
        If it didn’t, please use the Refresh button!" hint="Have Problem in registration?" button-text="Register"
                   :show-button="true"></message-display>
</template>

<script>
import MessageDisplay from '../../components/MessageDisplay'

export default {
  name: "RegisterComplete",
  components: {MessageDisplay}
}
</script>

<style scoped>


</style>
