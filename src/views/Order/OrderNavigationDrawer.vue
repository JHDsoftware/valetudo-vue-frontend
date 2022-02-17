<template>
  <div class="d-flex" style="height: 100%">
    <div class="flex-shrink-0"
         style="width: 240px;height: 100%;border-right: 1px solid #817163;padding-top: 60px;padding-left: 40px">
      <!--      <div class="navHeader" style="">Dein Entwurf</div>-->

      <div style="margin-top: 29px" class="menuItemPanel">

        <template v-for="(item,i) in menuRouter">
<!--          <div class="navItem" :key="'item' + i" :to="item.to">{{ item.title }}</div>-->
          <div class="navItem" :key="'item' + i" @click="$router.push(item.to)">{{ item.title }} </div>

        </template>

      </div>
    </div>



  </div>

</template>

<script>
import {getMyDesign} from '../../api/dressDesginService'
// import DressDisplay from "@/views/DressDisplay";
// import ValetInputTextField from "../../../components/ValetInputTextField";
// import ValetButton from "../../../components/ValetButton";

export default {
  name: "OrderPage",
  // components: {ValetInputTextField, DressDisplay, ValetButton},
  data: function () {
    return {
      myDressList: [],
      showdress: false,
      showKontakt: false,
      showCompleteTip: false,
      menuRouter: [
        {
          title: 'Dein Entwurf',
          to: '/OrderIndex/Entwurf'
        },
        {
          title: 'Deine Bestellung',
          to: '/OrderIndex/OrderBestellung'
        },
        {
          title: 'Persönliche Daten',
          to: '/OrderIndex/OrderPersonData',
        },
        {
          title: 'FAQ',
          to: '/OrderIndex/FAQ'
        },
        {
          title: 'KontaktUns',
          to: '/OrderIndex/KontaktUns'
        }
      ]
    };
  },
  methods: {
    computedItem() {

    },
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
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 125%;
  /* identical to box height, or 30px */

  color: #CCC6BB;
  border-bottom: 1px solid #CCC6BB;
}

.navItem:hover {
  color: #817163;
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
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 125%;
  /* identical to box height, or 45px */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.011em;

  color: #4C4C4C;
}

.dressHint {
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 125%;
  /* or 30px */

  display: flex;
  align-items: center;
  text-align: center;
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

.dressContainer.hasContent:hover {

}
</style>
