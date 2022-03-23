<template>
  <div style="width: 100%;position: relative;" class="d-flex">
    <v-img height="calc(100vh - 64px)"
           :src="require('@/assets/image/frameUI/dress.png')"
           contain style="margin-left: -240px"></v-img>

    <div style="position: absolute;top:323px;right: 78px;width: 680px;text-align: center">
      <div class="questionLabel" style="width: 100%;text-align: center; color: #817163">Gib deinem Kleid zuerst einen Namen</div>



      <v-container style="width: 540px">
      <div >
<!--        <ValetInputTextField-->
<!--            v-model="name"-->
<!--            width-input="540px"-->
<!--            hide-details-->
<!--        >-->
<!--        </ValetInputTextField>-->

        <v-text-field v-model="name"
                      height="52px"
                      class="buttonText2 text-center"
                      style="margin-top: 36px;"/>

        <v-btn @click="createNewDesign"
               block tile
               height="60px"
               class="mt-4"

               :color="name ? '#817163' : '#C4C4C4'"
               elevation="0"
               style="text-transform: none; color: white; font-size: 24px"
        >
          Confirm, start to design!
        </v-btn>
      </div>
      </v-container>
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

    // ?? {code: -1, message: 'The return value is null'}
      const res = (await createNewDesign(this.name))

      console.log("what is res", res)
      if(res.code === 200){
        if(res.id){
          await this.$router.push({
            path: 'edit/' + res.id
          })
        }
      }
      else{
        alert(res.message)
      }


    }
  }
}
</script>

<style scoped>
.questionLabel {
  /*font-family: Palanquin;*/
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 125%;
  /* or 67% */

  letter-spacing: -0.011em;

  color: #4C4C4C;
}

.buttonText2 {
  /*font-family: Palanquin;*/
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
