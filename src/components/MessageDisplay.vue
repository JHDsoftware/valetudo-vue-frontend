<template>
  <div class="fill-height d-flex justify-center align-center">
    <div style="width: 700px;text-align: center">
      <div class="d-flex justify-center ">
        <v-icon v-if="showTopLogo" size="54px">mdi-check-circle-outline</v-icon>
      </div>
      <div class="titleAlert">{{ title }}</div>
      <div class="content d-flex justify-center align-center py-7" style="width: 100%;text-align: center; white-space: pre-wrap" >{{message}}
      </div>
      <slot ></slot>
      <div v-if="showButton" style="margin-bottom: 24px">
        <v-btn tile width="540px"
               height="60px"
               style="background-color: #817163; color: white;font-size: 24px; text-transform: none "
               elevation="0" @click="clickButton">{{ buttonText }}</v-btn>
      </div>
      <div style="width: 650px" class="d-flex align-center justify-center" @click="clickHint">
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
    showTopLogo: {},
    buttonText: {},
    hint: {}
  },
  methods :{
   clickButton(){
     this.$emit('clickButton')
   },
    clickHint() {
     this.$emit('clickHint')
    }

  }
}
</script>

<style scoped>

</style>
