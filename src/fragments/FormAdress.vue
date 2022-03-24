<template>
  <v-card
      style="display: grid; grid-template-columns: repeat(2,1fr); grid-column-gap: 8px; width: 540px; margin-bottom: 60px"
      flat tile>

    <template v-if="useClose">
      <div style="position: absolute; right: 0px; top:24px">
        <v-icon x-large @click="handelClose">mdi-close</v-icon>
      </div>
    </template>
    <template v-if="title">
      <div class="contentText" style="grid-column: 1/3" :style="styleInput">
        {{ title }}
      </div>
    </template>

    <ValetInputTextField title="Vorname*"
                         width-input="266px"
                         :customHeight="customHeight"
                         v-model="localForm.firstName"/>
    <ValetInputTextField title="Name*"
                         width-input="266px"
                         :customHeight="customHeight"
                         v-model="localForm.lastName"/>
    <ValetInputTextField title="Adresse*"
                         width-input="540px"
                         :customHeight="customHeight"
                         v-model="localForm.addressLine1"
                         style="grid-column: 1/3"/>
    <ValetInputTextField title="Zusätzliche Adresse"
                         width-input="540px"
                         :customHeight="customHeight"
                         :useRule="false"
                         v-model="localForm.addressLine2"
                         style="grid-column: 1/3"/>
    <ValetInputTextField title="PLZ*"
                         width-input="266px"
                         :customHeight="customHeight"
                         v-model="localForm.postCode"/>
    <ValetInputTextField title="Stadt*"
                         :customHeight="customHeight"
                         width-input="266px"
                         v-model="localForm.city"/>
    <div class="mt-1">{{ localForm.country }}</div>

    <ValetButton :buttonText="buttonText" style="grid-column: 1/3; margin-top: 24px"
                 @click="$emit('click',true); "></ValetButton>

  </v-card>
</template>

<script>
import ValetInputTextField from '../components/ValetInputTextField'
import ValetButton from '../components/ValetButton'

const defaultForm = {
  firstName: '',
  lastName: '',
  addressLine1: '',
  addressLine2: '',
  postCode: '',
  city: '',
  country: 'Germany'
}

export default {
  components: {ValetInputTextField, ValetButton},
  name: "FormAdress",
  props: {
    title: {
      type: String,
      default: null
    },
    buttonText: {
      type: String,
      default: 'Speichern'
    },
    form: {
      // type: Object,
      // default: () => {}
    },
    value:{
      type: Object,
      default: ()=>{}
    },
    styleInput: {},
    useClose: {
      type: Boolean,
      default: false
    },
    customHeight:{
      type: String,
      default: ''
    }

  },
  watch:{
    localForm(val){
      this.$emit('input',val)
    },
    value:{
      immediate: true,
      handler(val){
        this.localForm= val
      }
    }
  },
  data () {
    return {
      localForm: Object.assign({}, defaultForm, this.value)
    }
  },
  methods:{
    handelClose() {
      this.$emit('closeButton')
      // this.localForm = defaultForm
    }
  }
}
</script>

<style scoped>
.contentText {
  /*font-family: Gill Sans Nova;*/
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 125%;
  /* identical to box height, or 30px */

  /*display: flex;*/
  /*align-items: center;*/

  color: #4C4C4C;
}
</style>
