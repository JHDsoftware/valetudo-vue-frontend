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
               :src="require('@/assets/image/images/S-'+currentView+'-'+'B1-Da-Ga-Ha-Ia.png')"></v-img>
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
              <v-item v-for="part in remoteSelections" v-slot="{ active, toggle }" :key="part.dressPartType.name">
                <div style="height: 60px" @click="toggle" class="tabItem" :class="active?'active':''">
                  {{ part.dressPartType.name }}
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
            v-for="(item) in availableSelections"
            :key="currentTab+''+item.dressPartCategory.code"
        >
          <v-expansion-panel-header>{{ item.dressPartCategory.code }}.{{
              item.dressPartCategory.name
            }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-item-group mandatory>
              <div style="display: grid;grid-template-columns: repeat(7,1fr)">
                <template v-for="option in item.filteredPart">
                  <v-item :key="option.code" v-slot="{active,toggle}">
                    <div class="weddingItem"
                         @click="selectPart(item.dressPartCategory.code,option.code,option.id,toggle)"
                         :class="active?' active':''">
                      <div style="text-align: center">
                        <img style="height: 116px"
                             :src="require('@/assets/image/ui/'+parts[currentTab].path+'/'+item.dressPartCategory.code+'/'+item.dressPartCategory.code+option.code+'.png')"
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
import { getDressPartList, refreshCurrentPartInfo } from '../api/api'

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
export const excludeImage = ["Fa", "Fc"]
export const topSelection = ["B", "C", "D", "E", "F"]
export const sleevesSelection = ["G", "H", "I"]
export const stripSelection = ["J"]
export const backSelection = ["K", "L"]
export const defaultTop = "B2-Ca-Da-Ea"
const avaliablePicSet = require('@/assets/topSet.json')
export default {
  name: 'MakeADress',
  data: function () {
    return {
      currentTab: 0,
      currentView: views[0],
      remoteSelections: [],
      parts: parts,
      selectedPart: {},
      currentMask: []
    }
  },
  computed: {
    currentDisplayTopVariant () {
      console.log(this.selectedTopParts, 'new top')
      if (this.selectedTopParts.length > 0) {
        //console.log(avaliablePicSet, 'all set')
        const def = avaliablePicSet.find(s => this.selectedTopParts.filter(s => !excludeImage.includes(s)).every(p => s.includes(p)))
        console.log(def, 'founded')

        return (def?.join('-') ?? defaultTop) + ".png"
      } else {
        return defaultTop + '.png'
      }

    },
    selectedTopParts () {
      return Object.entries(this.selectedPart).filter(s=>topSelection.includes(s[0])).map(s => s[0] + s[1].partCode).sort()
    },
    availableSelections () {
      return this.remoteSelections[this.currentTab]?.dressPartCategories.filter(c => {
        c.filteredPart = c.dressParts.filter(d => {
          return this.currentMask.find(m => m.dressPartId === d.id)?.display ?? true
        }) ?? []
        return c.filteredPart.length > 0
      })
    }
  }
  ,
  methods: {
    changeView () {
      this.currentView = views[this.currentView === "F" ? 1 : 0]
    },
    async selectPart (fatherCode, partCode, partId, toggle) {
      console.log(Object.keys(this.selectedPart).filter(k => k > fatherCode), 'need to be reset')
      for (const key of Object.keys(this.selectedPart).filter(k => k > fatherCode)) {
        delete this.selectedPart[key]
      }
      this.$set(this.selectedPart, fatherCode, {
        partId, partCode
      })
      this.currentMask = await refreshCurrentPartInfo(Object.values(this.selectedPart).map(p => p.partId))
      if (toggle) {
        toggle()
      }
    }
  },
  async mounted () {
    this.remoteSelections = await getDressPartList()
    await this.selectPart('B', '1', 1)
    console.log(this.availableSelections, 'defaultSelection')
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
