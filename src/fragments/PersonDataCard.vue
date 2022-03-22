<template>
  <v-card flat>
    <div style="display: grid;
                    grid-template-columns: 60px auto 300px;
                    border-bottom: 1px solid #BFB8B1;
                    min-height: 100px"
         class="py-4">
      <div class="contentText">
        <v-icon>{{icon}}</v-icon>
      </div>

      <div class="contentText">
        <div class="mb-2 v-caption">{{ title }}</div>
        <slot name="bodyText"></slot>
        <!--        <div>{{dataBody.firstName}}</div>-->
        <!--        <div>{{dataBody.lastName}}</div>-->
        <!--        <div>{{dataBody.city}}</div>-->
        <!--        <div>{{dataBody.phone}}</div>-->
      </div>

      <div>
        <ValetButton buttonText="Bearbeiten" @click="buttonClick"/>
      </div>
    </div>
  </v-card>
</template>

<script>
import ValetButton from '@/components/ValetButton'

export default {
  name: "PersonDataCard",
  components: {ValetButton},
  props: {
    icon: {},
    title: {
      type: String,
      default: ''
    },
  },
  data(){
    return{
      dialogBearbeit: false
    }
  },
  methods: {
    buttonClick(){
      this.$emit('click', true)
    }
  //   handleButtonClick(items) {
  //     this.dialogBearbeit = true
  //     this.dText = items
  //     // this.items = items
  //   },
  }
}
</script>

<style scoped>
.v-caption {
  /*font-family: Gill Sans Nova;*/
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 125%;
  /* identical to box height, or 22px */

  display: flex;
  align-items: center;

  color: #4C4C4C;
}

.contentText {
  /*font-family: Gill Sans Nova;*/
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
