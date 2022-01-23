<template>
  <div class="d-flex" style="height: 100%">
    <div class="flex-shrink-0"
         style="width: 296px;height: 100%;border-right: 1px solid #817163;padding-top: 23px;padding-left: 27px">
      <div class="navHeader">Liqiong's Dress</div>
      <div style="margin-top: 29px" class="menuItemPanel">
        <div class="navItem active">Your Drawing</div>
        <div class="navItem">Your Data</div>
        <div class="navItem">Q&A</div>
        <div class="navItem">Contact us</div>
      </div>
    </div>
    <div class="flex-grow-1" style="padding:38px 100px;">
      <div class="pageContent d-flex justify-center" style="width: 100%">
        <div style="display: grid;grid-template-columns: repeat(4,340px);grid-gap: 38px">
          <div class="d-flex justify-center flex-wrap" :key="item.id" v-for="item in myDressList">
            <div class="dressContainer hasContent d-flex align-center">
              <dress-display style="height: 290px"
                             :refresh-counter="item.id"
                             :dress-id="item.id"
              ></dress-display>
            </div>
            <div class="d-flex flex-column align-center">
              <div style="margin-top: 38px;" class="dressName">{{ item.name }}</div>
              <div style="margin-top: 18px" class="dressCreateTime">Created by 05. Marz. 2021</div>
            </div>
          </div>
          <div @click="$router.push('/createNewDress')">
            <div class="dressContainer d-flex justify-center align-center">
              <div class="noContent">
                <div class="bigHint">Design your dream dress for free!</div>
                <v-btn block tile height="52px" color="#e0ddd6" class="mt-4" elevation="0">Start</v-btn>
              </div>
            </div>
          </div>

          <div>
            <div class="dressContainer d-flex justify-center align-center">
              <div class="noContent">
                <div class="bigHint">Design more for 19.99 €</div>
                <v-btn block tile height="52px" color="#e0ddd6" class="mt-4" elevation="0">Start</v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import DressDisplay from "@/views/DressDisplay";
import { getMyDesign } from '../../api/dressDesginService'

export default {
  name: "OrderPage",
  components: {DressDisplay},
  data: function () {
    return {
      myDressList: []
    };
  },
  methods: {
    async loadDressList() {
      this.myDressList = await getMyDesign()
      console.log(this.myDressList)
    }
  },
  mounted() {
    this.loadDressList()
  }
}
</script>

<style scoped>
.navHeader {
  font-family: Palanquin, serif;
  font-style: normal;
  font-weight: 600;
  font-size: 35px;
  line-height: 63px;
  color: #CCC6BB;
}

.navItem {
  cursor: pointer;
  font-family: Palanquin;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 43px;
  margin-top: 16px;
  color: #817163;

}

.navItem:hover {
  border-bottom: 3px solid #817163;
}

.navItem.active {
  border-bottom: 3px solid #817163;
}

.noContent {
  width: 311px;
}

.bigHint {
  ont-family: Palanquin;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
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

.dressName {
  font-family: Palanquin;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 24px;
  /* identical to box height, or 67% */

  display: flex;
  align-items: center;
  letter-spacing: -0.011em;

  color: #4C4C4C;
}

.dressCreateTime {
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 10px;
  /* identical to box height, or 56% */

  display: flex;
  align-items: center;
  letter-spacing: -0.011em;

  color: #4C4C4C;
}

.dressContainer.hasContent {
  padding: 27px 37px;
  background: rgba(204, 198, 187, 0.85);
}
</style>
