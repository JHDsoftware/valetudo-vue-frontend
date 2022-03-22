<template>
  <div :style="{width: widthInput}">
    <template v-if="useTitle" >
      <div class="label align-end"
           style=" line-height: 26px; font-size: 18px; margin-bottom: 8px; font-weight: 400;"
           v-html="title"></div>
    </template>

    <div style="margin-bottom: 8px">

      <v-text-field
          outlined
          style="borderRadius : 0; width: 100%; font-size: 24px; line-height: 34px; "
          :height="customHeight ? customHeight : '60px'"
          :rules="useRule? rules : []"
          v-model="localValue"
          :type="type"
          :required="required"
          :hide-details="hideDetails"
      />
<!--      :style="useStyle ? {border: '2px solid #4C4C4C'} : {}"-->

    </div>

  </div>
</template>

<script>
export default {
  name: "ValetInputTextField",
  props: {
    useStyle: {
      type: Boolean,
      default: false,
    },
    typeInput: {
      type: String,
      default: ''
    },
    useTitle: {
      type: Boolean,
      default: true
    },
    useRule: {
      type: Boolean,
      default: true
    },
    rules: {
      type: Array,
      default: () => [v => !!v || 'Field is required']
    },
    required: {
      type: Boolean,
      default: false
    },
    title: {},
    type: {},

    value: {
      type: String,
      default: ''
    },
    widthInput: {
      type: String,
      default: '550px'
    },
    rulesInput: {
      type: Object,
      default: ()=> {}
    },
    hideDetails: {
      type: Boolean,
      default: true
    },
    customHeight:{
      type:String,
      default: ''
    }
  },
  watch:{
    localValue(val){
      this.$emit('input', val)
    },
    value:{
      immediate:true,
      handler(val){
        this.localValue = val
      }
    }
  },
  data() {
    return {
      localValue: this.value,
      // localRules: {
      //   required: [(value) => (value && Boolean(value)) || 'Erforderlich']
      // }
      // localType: this.type
    }
  },
  methods:{
    // handleInput(e){
    //   this.$emit('input', e.target.value)
    // }
  }
}
</script>

<style scoped>
.label {
  /*font-family: Gill Sans Nova;*/
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 26px;
  /* identical to box height */

  display: flex;
  align-items: start;

  color: #4C4C4C;

}
</style>
