<template>
  <div style="width: 100%">
    <template v-if="textBefore">
      <div class="" style="margin-bottom: 24px">{{ textBefore }}</div>
    </template>

    <div @click="clickButton"
         class="d-flex justify-center align-center label24"
    >
      <span>
      {{ buttonText }}
    </span>
    </div>

    <template v-if="textAfter">
      <div class="label18" style="margin-top: 24px">
        {{ textAfter }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "ValetButton",
  props: {
    textBefore: {},
    textBeforeClass: {},
    textAfter: {},
    buttonText: {},
    type: {},
    value: {}
  },
  model: {
    prop: "value",
    event: "input"
  },
  data() {
    return {
      localValue: this.value,
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      }
      // localType: this.type
    }
  },
  methods: {
    clickButton() {
      this.$emit('click', true)
    }
  }
}
</script>

<style scoped>
.label18 {
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

.label24 {
  /*font-family: Gill Sans Nova;*/
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 10px;
  /* or 42% */
  width: 100%;
  height: 60px;
  background: #817163;

  text-align: center;
  letter-spacing: -0.011em;

  color: #FFFFFF;
  border-radius: 0px;
  text-transform: none;

}

.label12 {
  /*font-family: Gill Sans Nova;*/
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 125%;
  /* or 15px */

  display: flex;
  align-items: center;

  color: #4C4C4C;
}
</style>
