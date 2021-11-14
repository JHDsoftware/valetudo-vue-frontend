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
import { selections } from '@/api/api'
import { getAvailableSet } from '../api/api'

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
      parts: parts,
      selections: selections,
      currentView: views[0],
      availableSet: [],
      currentSelectedParts: [[], []],
      currentDisplaySkirtVariant: "",
      currentMask: {}
    }
  },
  watch: {
    currentTab (val) {
      console.log(this.selections[val], 'CurrentSelections')
    }
  },
  computed: {
    currentDisplayTopVariant () {
      return ((this.availableSet?.[0]?.join("-")) ?? defaultTop) + ".png"
    },
    currentSelections () {
      const result = []
      const temp = this.selections[this.currentTab]
      result.push(temp[0])//主选项不受筛选限制
      console.log(temp)
      temp.forEach(opt => {
        const exist = Object.keys(this.currentMask).find(i => i === opt.id)
        if (exist) {
          const currentOpt = {...opt, subOptions: []}
          opt.subOptions.forEach(subOpt => {
            const mask = this.currentMask[exist]
            if (mask.some(m => (exist + m) === subOpt.id)) {
              currentOpt.subOptions.push({...subOpt})
            }
          })
          result.push(currentOpt)
        }
      })
      console.log(result)
      return result
    }
  }
  ,
  methods: {
    changeView () {
      this.currentView = views[this.currentView === "Front" ? 1 : 0]
    }
    ,
    selectPart (whichPartIndex, partFatherId, partId, toggle) {
      if (partFatherId === 'B') {
        this.currentSelectedParts[whichPartIndex] = []
      }
      this.$set(this.currentSelectedParts[whichPartIndex], partFatherId, partId)
      console.log(partFatherId, partId)
      this.availableSet = getAvailableSet(this.currentSelectedParts, partFatherId)
      this.currentMask = this.availableSet.reduce((arr, i) => {
        const temp = [...i]
        temp.shift()
        arr.push(temp)
        return arr
      }, []).flat().reduce((arr, i) => {
        const [mainOption, rest] = i.split("")
        if (arr[mainOption]) {
          if (!arr[mainOption].includes(rest)) {
            arr[mainOption].push(rest)
          }
        } else {
          arr[mainOption] = [rest]
        }
        return arr
      }, {})
      toggle()
    }
  }
  ,
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
