<template>
  <message-display title="Thanks!" message="We have sent you an email, <br>
you can find an new password there,<br>
please use this password to login." hint="Please check your Trash because the Email may be wrongly placed.<br>
Please contact us, if your haven’t receive any Email."
                   :show-button="false"></message-display>
</template>


<script>
import MessageDisplay from '../../components/MessageDisplay'

export default {
  name: "ForgetPasswordComplete",
  components: {MessageDisplay}
}
</script>

<style scoped>

</style>
