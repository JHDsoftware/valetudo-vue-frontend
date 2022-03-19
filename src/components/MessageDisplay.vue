<template>

  <v-card width="100%" flat>
  <div class="fill-height d-flex justify-center align-center">
    <div style="text-align: center">
      <div class="d-flex justify-center ">
        <v-icon v-if="showTopLogo" size="54px">mdi-check-circle-outline</v-icon>
      </div>
      <v-container class="pa-0">
        <div class="titleAlert" >{{ title }}</div>
      </v-container>

      <v-container class="pa-0">
        <div class="content d-flex  align-center"
             style="padding-top: 40px; padding-bottom: 24px; white-space: pre-wrap"
             :style="{'width': messageWidth}"
        >{{message}}
        </div>
      </v-container>

      <slot name="TextTop"></slot>
      <slot name="TextBottom"></slot>
      <div v-if="showButton">
        <v-btn tile :width="buttonWidth"
               :height="buttonHeight"
               style="background-color: #817163; color: white;font-size: 24px; text-transform: none "
               elevation="0" @click="clickButton">{{ buttonText }}</v-btn>
      </div>
      <div style="width: 650px; padding-top: 24px" class="d-flex align-center justify-center" @click="clickHint">
        <span v-html="hint"></span>
      </div>
    </div>
  </div>
  </v-card>
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
    hint: {},
    buttonWidth:{
      type: String,
      default: '540px'
    },
    buttonHeight: {
      type: String,
      default: '60px'
    },
    messageWidth: {
      stye: String,
      default: '650px'
    }

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
