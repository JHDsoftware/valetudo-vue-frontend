<template>
<div>
  <template>
    <div style="display: grid; grid-template-columns: 10px auto 300px; border-bottom: 1px solid" >

      <div>
        <v-icon>mdi-plus</v-icon>
      </div>

      <div>
        <template v-for="(item,ind) in items">
          <div :key="'item'+ind" >
            <div>{{item}}</div>
            <div></div>
          </div>
        </template>
      </div>

      <div>
        <ValetButton buttonText="Bearbeiten"/>
      </div>

    </div>

  </template>
</div>
</template>

<script>

import ValetButton from '@/components/ValetButton'

export default {
  name: "PersonDaten",
  components: {ValetButton}
}
</script>

<style scoped>

</style>
