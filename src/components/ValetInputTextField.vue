<template>
  <div :style="{width: widthInput}">
    <template v-if="useTitle" style="margin-bottom: 8px">
      <div class="label align-end" v-html="title"></div>
    </template>

    <div style="margin-bottom: 16px">

      <v-text-field
          outlined
          style="borderRadius : 0; width: 100%; "
          :style="customHeight? {'height':customHeight} : {'height': '60px'}"
          :rules="useRule? [rules.required] : []"
          v-model="localValue"
          :type="type"
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
    title: {},
    type: {},

    value: {
      type: String,
      default: ''
    },
    widthInput: {},
    rulesInput: {},
    hideDetails: {
      type: Boolean,
      default: false
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
      rules: {
        required: (value) => (value && Boolean(value)) || 'Erforderlich'
      }
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
  font-family: Gill Sans Nova;
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
