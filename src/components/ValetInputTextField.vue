<template>
  <div class="inputRow mt-3">
    <div class="label">{{ title}}</div>
    <div style="margin-top: 5px">
      <v-text-field outlined flat hide-details
                    height="60px"
                    style="border-radius: 0"
                    :rules="[rules.required]"
                    v-model="localValue"
                    :type="type" ></v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  name: "ValetInputTextField",
  props:{
    title: {},
    type:{},
    value: {}
  },
  data (){
    return {
      localValue: this.value,
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      }
      // localType: this.type
    }
  }
}
</script>

<style scoped>

</style>