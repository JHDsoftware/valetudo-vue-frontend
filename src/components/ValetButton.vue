<template>
  <div style="width: 100%">
    <template v-if="textBefore">
      <div class="" style="margin-bottom: 24px">{{ textBefore }}</div>
    </template>

    <v-btn @click="clickButton"
           block
           height="60"
           color="#817163"
           class="white--text"
           style="border-radius: 0px; text-transform: none; font-size: 24px" elevation="0">{{ buttonText }}
    </v-btn>

    <template v-if="textAfter">
      <div class="label18" style="margin-top: 24px">
        {{ textAfter }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "ValetInputTextField",
  props: {
    textBefore: {},
    textBeforeClass: {},
    textAfter: {},
    buttonText: {},
    type: {},
    value: {}
  },
  model:{
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
      this.$emit('clickButton')
    }
  }
}
</script>

<style scoped>
.label18 {
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

.label12 {
  font-family: Gill Sans Nova;
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
