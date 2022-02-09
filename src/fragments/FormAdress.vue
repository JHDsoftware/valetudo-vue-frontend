<template>
  <v-card
      style="display: grid; grid-template-columns: repeat(2,1fr); grid-column-gap: 8px; width: 540px; margin-bottom: 60px"
      flat tile>

    <template v-if="useClose">
    <div style="position: absolute; right: 0px; top:24px">
      <v-icon x-large @click="$emit('closeButton')">mdi-close</v-icon></div>
    </template>
    <template v-if="title">
      <div class="contentText" style="grid-column: 1/3" :style="styleInput">
        {{ title }}
      </div>
    </template>

    <ValetInputTextField title="Vorname*" width-input="266px" v-model="localForm.vorname"/>
    <ValetInputTextField title="Name*" width-input="266px" v-model="localForm.nachname"/>
    <ValetInputTextField title="Adresse*" width-input="540px" v-model="localForm.address"
                         style="grid-column: 1/3"/>
    <ValetInputTextField title="Zusätzliche Adresse" width-input="540px" v-model="localForm.zusatzAdress"
                         style="grid-column: 1/3"/>
    <ValetInputTextField title="PLZ*" width-input="266px" v-model="localForm.zipCode"/>
    <ValetInputTextField title="Stadt*" width-input="266px" v-model="localForm.stadt"/>
    <div class="mt-1">{{ localForm.country }}</div>
    <ValetButton :buttonText="buttonText" style="grid-column: 1/3; margin-top: 24px" @click="$emit('click',true)"></ValetButton>

  </v-card>
</template>

<script>
import ValetInputTextField from '../components/ValetInputTextField'
import ValetButton from '../components/ValetButton'


export default {
  components: {ValetInputTextField,ValetButton},
  name: "FormAdress",
  props: {
    title: {
      type: String,
      default: null
    },
    buttonText:{
      type: String,
      default: 'Speichern'
    },
    form:{
      // type: Object,
      // default: () => {}
    },
    styleInput:{},
    useClose:{
      type: Boolean,
      default: false
    }

  },
  data () {
    return{
      localForm:{
        vorname: '',
        nachname: '',
        address: '',
        zusatzAdress: '',
        zipCode: '',
        stadt: '',
        country: ''
      }
    }
  },

  mounted() {
    this.localForm = this.form
  }
}
</script>

<style scoped>
.contentText {
  font-family: Gill Sans Nova;
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
