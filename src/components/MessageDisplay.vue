<template>
  <div class="fill-height d-flex justify-center align-center">
    <div style="width: 700px;text-align: center">
      <div class="d-flex justify-center ">
        <v-icon size="54px">mdi-check-circle-outline</v-icon>
      </div>
      <div class="titleAlert">{{ title }}</div>
      <div class="content d-flex justify-center align-center py-7" style="width: 100%;text-align: center" v-html="message">
      </div>
      <div v-if="showButton">
        <v-btn tile width="405px" height="60px" color="#e0ddd6" elevation="0">{{ buttonText }}</v-btn>
        <br>
      </div>
      <div style="height: 58px" class="d-flex align-center justify-center">
        <span class="mt-2" v-html="hint"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageDisplay",
  props: {
    title: {},
    message: {},
    showButton: {},
    buttonText: {},
    hint: {}
  }
}
</script>

<style scoped>

</style>
