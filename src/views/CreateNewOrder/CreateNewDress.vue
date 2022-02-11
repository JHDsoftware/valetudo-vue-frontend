<template>
  <div style="width: 100%;position: relative;" class="d-flex">
    <v-img height="calc(100vh - 64px)" :src="require('@/assets/image/frameUI/dress.png')"></v-img>
    <div style="position: absolute;top:323px;right: 144px;width: 587px;text-align: center">
      <div class="questionLabel" style="width: 100%;text-align: center">Gib deinem Kleid zuerst einen Namen</div>
      <div style="width: 587px">
        <v-text-field v-model="name" class="buttonText2 text-center" style="margin-top: 36px"/>
        <v-btn @click="createNewDesign" block tile height="60px" class="mt-4" color="#e0ddd6" elevation="0">
          Confirm, start to design!
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>

import { createNewDesign } from '../../api/dressDesginService'

export default {
  name: "CreateNewDress",
  data: function () {
    return {
      name: null
    }
  },
  methods: {
    async createNewDesign () {
      const res = await createNewDesign(this.name)
      if(res.id){
        await this.$router.push({
          path: 'edit/' + res.id
        })
      }else{
        alert(res)
      }

    }
  }
}
</script>

<style scoped>
.questionLabel {
  font-family: Palanquin;
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 24px;
  /* or 67% */

  letter-spacing: -0.011em;

  color: #4C4C4C;
}

.buttonText2 {
  font-family: Palanquin;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 30px;


  /* or 67% */
}


</style>
<style>
.v-input input {
  text-align: center;
}
</style>
