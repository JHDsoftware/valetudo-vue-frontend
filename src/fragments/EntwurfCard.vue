<template>
  <div class="dressContainer d-flex justify-center align-center">
    <div class="noContent" style="width: 260px; font-size: 24px">
      <div class="bigHint">{{ title }}</div>
      <v-btn block
             tile
             style="text-transform: none; "
             height="52px"
             color="#e0ddd6"
             class="mt-4"
             elevation="0">Los geht's
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "EntwurfCard",
  props: {
    title: {
      type: String,
      default: ""
    }
  }
}
</script>

<style scoped>
.noContent {
  width: 311px;
}

.bigHint {
  ont-family: Palanquin;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 40px;
  /* or 111% */
  letter-spacing: -0.011em;
  text-align: center;
  color: #817163;

}

.dressContainer {
  width: 340px;
  height: 500px;
  border: 2px solid #817163;
  box-sizing: border-box;
  box-shadow: 0px 6px 6px 2px #CCC6BB;
}

.dressContainer.hasContent {
  padding: 27px 37px;
  background: rgba(204, 198, 187, 0.85);
}

</style>