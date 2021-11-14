<template>
  <div style="display: grid;grid-template-columns: 50% 50%">
    <v-sheet
        style="height: calc(100vh - 60px);border-right: 1px solid #817163;display: flex;justify-content: center;padding-top: 44px;position: relative;">
      <div class="imgContainer" style="width: 788px;position: relative">
        <v-img class="partImg model" width="92.97%"
               :src="require('@/assets/image/structure/model/frontModel.png')"></v-img>
        <v-img class="partImg top" width="92.97%"
               :src="require('@/assets/image/images/B-'+currentView+'-'+currentDisplayTopVariant)"></v-img>
        <v-img class="partImg skirt" width="100%"
               :src="require('@/assets/image/images/S-'+currentView+'-'+'1-Da-Fa-Gabc-Ha-Ia.png')"></v-img>
      </div>
      <div style="position: absolute;right: 46px;bottom: 8px;">
        <div class="roundFab">
          <v-img :src="require('@/assets/image/frameUI/zoom-in.png')"></v-img>
        </div>
        <div @click="changeView" class="roundFab" style="height: 84px;margin-top: 26px">
          <v-img height="84px" :src="require('@/assets/image/frameUI/back.png')"></v-img>
        </div>
      </div>
    </v-sheet>
    <v-card color="#e0ddd6" class="d-flex flex-column">
      <v-card elevation="8" height="60px">
        <div style="width: 100%">
          <v-item-group v-model="currentTab">
            <div style="display: grid;grid-template-columns: repeat(3,1fr);width: 100%">
              <v-item v-for="part in parts" v-slot="{ active, toggle }" :key="part.name">
                <div style="height: 60px" @click="toggle" class="tabItem" :class="active?'active':''">
                  {{ part.name }}
                </div>
              </v-item>
            </div>

          </v-item-group>
        </div>
      </v-card>

      <v-expansion-panels style="margin-top: 2px" accordion mandatory>
        <v-expansion-panel
            class="panel"
            active-class="active"
            v-for="(item) in currentSelections"
            :key="currentTab+''+item.id"
        >
          <v-expansion-panel-header>{{ item.id }}.{{ item.name }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-item-group mandatory>
              <div style="display: grid;grid-template-columns: repeat(7,1fr)">
                <template v-for="option in item.subOptions">
                  <v-item :key="option.id" v-slot="{active,toggle}">
                    <div class="weddingItem" @click="selectPart(currentTab,item.id,option.id,toggle)"
                         :class="active?' active':''">
                      <div style="text-align: center">
                        <img style="height: 116px"
                             :src="require('@/assets/image/ui/'+parts[currentTab].path+'/'+item.id+'/'+option.id+'.png')"
                             alt=""/>
                        <div class="option-label" style="width: 100%">{{ option.name }}</div>
                      </div>

                    </div>
                  </v-item>
                </template>
              </div>
            </v-item-group>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-spacer></v-spacer>
      <v-sheet style="display: grid;grid-template-columns: 50% 50%">
        <v-btn height="60px" block elevation="0" tile color="#817163" dark>
          <v-icon left>mdi-arrow-left-top-bold</v-icon>
          Revoke
        </v-btn>
        <v-btn height="60px" block elevation="0" tile color="#817163" dark>
          <v-icon left>mdi-check-circle-outline</v-icon>
          Finish Design
        </v-btn>
      </v-sheet>
    </v-card>

  </div>
</template>

<script>
import { getDressPartList } from '../api/api'

const parts = [
  {
    name: "Oberteil und Ärmel",
    path: "body"
  },
  {
    name: "Rock",
    path: "skirt"
  },
  {
    name: "Accessories",
    path: "body"
  }
]

export const defaultLook = {}
export const views = ["F", "B"]
export const defaultTop = "2-Ca-Da-Ea"
export default {
  name: 'MakeADress',
  data: function () {
    return {
      currentTab: 0,
      currentView: views[0],
      remoteSelections: [],
      parts: parts
    }
  },
  computed: {
    currentDisplayTopVariant () {
      return (defaultTop) + ".png"
    }
  }
  ,
  methods: {
    changeView () {
      this.currentView = views[this.currentView === "Front" ? 1 : 0]
    }
    ,
    selectPart (whichPartIndex, partFatherId, partId, toggle) {
      toggle()
    }
  },
  async mounted () {
    this.remoteSelections = await getDressPartList()
    console.log(this.remoteSelections)
  },
  components: {}
}
</script>
<style>

.tabItem {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Palanquin;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 25px;
  text-align: center;

  background: #CCC6BB;
  color: #817163;
}

.tabItem.active {


  background: white;
  color: #4C4C4C;
}

.panel {
  background-color: #e0ddd6 !important;
}

.panel.active {
  background-color: white !important;
}

.option-label {
  font-family: Palanquin;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  color: #4C4C4C;
}

.weddingItem {
  width: 123px;
  height: 196px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.weddingItem:hover {
  box-shadow: 0 0 4px rgba(204, 198, 187, 0.8);
}

.weddingItem.active {
  box-shadow: 0 0 4px rgba(204, 198, 187, 0.8);
}

.weddingItem.active .option-label {
  border-bottom: 1px solid black;
}

.partImg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin: auto
}
</style>
