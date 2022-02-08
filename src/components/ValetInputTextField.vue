<template>
  <div :style="{width: widthInput}">
    <template v-if="useTitle" style="margin-bottom: 8px">
      <div class="label align-end" v-html="title"></div>
    </template>

    <div style="margin-bottom: 16px">

      <input
          style="borderRadius : 0; width: 100%; height: 60px;"
          :style="useStyle ? {border: '2px solid #4C4C4C'} : {border: '1px solid #4C4C4C'}"
          :rules="useRule? [rules.required] : []"
          v-bind:value="value"
          v-on:input="$emit('input',$event.target.value)"
          :type="type"

      />


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

    value: {},
    widthInput: {},
    rulesInput: {}
  },
  // model:{
  //   prop: "valueInput",
  //   event: "input"
  // },
  data() {
    return {
      // localValue: this.value,
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
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
