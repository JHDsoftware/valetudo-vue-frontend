<template>
  <div style="display: flex; justify-content: start; align-self: center; width: 950px;background-color: #E0DDD6"
       class="textFamily"
       @click="show=!show">
    <div style="padding-right: 40px; padding-left: 40px; width: 100%">
      <!--      <div style="padding-bottom: 8px" class="text36">{{ title }}</div>-->

      <div class="d-flex justify-space-between" style="height: 60px;">
        <span class="text24">{{ question }}</span>
        <v-icon v-if="show">mdi-plus</v-icon>
        <v-icon v-else>mdi-minus</v-icon>
      </div>

      <div v-if="!show" style="height: 60px;" class="text24">
        {{ answer }}
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: "FAQText",
  props: {
    title: {},
    question: {},
    answer: {},

  },
  data() {
    return {
      show: true
    }
  }
}
</script>

<style scoped>
.text24 {
  font-size: 24px;
  line-height: 34px;
  display: flex;
  align-items: center;
}

.text36 {
  font-size: 36px;
  line-height: 52px;
  /* identical to box height */

  color: #4C4C4C;

}
</style>
