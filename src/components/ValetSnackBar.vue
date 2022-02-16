<template>
  <v-snackbar
      v-model="snackbar"
      color="#817163"
  >
    {{ snackbarText }}
    <template v-slot:action="{attrs}">
      <v-btn
          color="white"
          text
          v-bind="attrs"
          @click.stop
          @click="snackbar=false"
      >Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "ValetSnackBar",
  // model:{
  //   prop: 'snackBar',
  //   event: 'change'
  // },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    snackbarText:{
      type: String,
      default: 'xxxxx'
    }
  },
  watch:{
    value:{
      immediate: true,
      handler (val){
        this.snackbar = val
      }
    },
    snackbar(val){
      this.$emit('input', val)
    }
  },
  data(){
    return{
      snackbar: this.value
    }
  },
  methods:{

  }
}
</script>

<style scoped>

</style>