<template>
  <div style="display: grid;grid-template-columns: 50% 50%;overflow: hidden">
    <v-sheet
        style="height: calc(100vh - 60px);border-right: 1px solid #817163;display: flex;justify-content: center;padding-top: 44px;position: relative;background: #CCC6BBD9">
      <div class="imgContainer" style="width: 788px;position: relative">
        <v-img class="partImg model" width="92.97%"
               :src="require('@/assets/image/structure/model/frontModel.png')"></v-img>
        <template v-if="!loading">
          <v-img class="partImg top" width="92.97%"
                 :src="require('@/assets/image/images/'+currentDisplayTopVariant)">
            <template v-slot:placeholder>
              <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
              >
                <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-img class="partImg skirt" width="100%"
                 :src="require('@/assets/image/images/'+displaySkirtPart)"></v-img>
          <v-img class="partImg sleeve" width="92.97%" v-if="displaySleevePart"
                 :src="require('@/assets/image/images/'+displaySleevePart)"></v-img>
          <v-img class="partImg strip" width="92.97%" v-if="displayStripPart"
                 :src="require('@/assets/image/images/'+displayStripPart)"></v-img>
        </template>

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
      <div style="height: calc(100vh - 60px - 64px - 60px);overflow-y: scroll">
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
                           @click="selectPart(item.dressPartCategory.code,option.code,option.id,toggle,currentTab)"
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
      </div>
      <v-sheet style="position: absolute;width:100%;bottom:0;z-index:1;display: grid;grid-template-columns: 50% 50%">
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
import { getDressPartList, loadDesign, refreshCurrentPartInfo, updateMyDesignParts } from '../api/api'

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
export const views = ["Front", "Back"]
export const excludeImage = ["Fa", "Fc", "Dc"]
export const topSelection = ["B", "C", "D", "E", "F"]
const skirtSelection = ["B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]
export const sleevesSelection = ["G", "H", "I"]
export const stripSelection = ["J"]
export const backSelection = ["K", "L"]
export const defaultTop = "Bodice-Front-B2-Ca-Da-Ea"
export const defaultSkirt = "Skirt-Front-B1-Da-Ga-Ha-Ia"
const availablePicSet = require('@/assets/topSet.json')
export default {
  name: 'MakeADress',
  props: {
    dressId: {
      default: -1
    }
  },
  data: function () {
    return {
      currentInfo: {},
      currentTab: 0,
      currentView: views[0],
      remoteSelections: [],
      parts: parts,
      selectedPart: {},
      currentMask: [],
      loading: true
    }
  },
  computed: {

    currentDisplayTopVariant () {
      console.log(this.selectedTopParts, 'Top')
      if (this.selectedTopParts.length > 0) {
        const def = this.findDefaultPartInImageSet('Bodice', this.selectedTopParts)
        console.log(def, 'founded Top')
        return (def?.join('-') ?? defaultTop) + ".png"
      } else {
        return defaultTop + '.png'
      }
    },
    selectedTopParts () {
      return this.filterPartsWithMask(topSelection)
    },
    displaySkirtPart () {
      const skirtParts = this.filterPartsWithMask(skirtSelection, 1)
      console.log(skirtParts, 'Skirt')
      if (skirtParts.length > 0) {
        const def = this.findDefaultPartInImageSet('Skirt', skirtParts)
        console.log(def, 'founded Skirt')
        return (def?.join('-') ?? defaultSkirt) + ".png"
      } else {
        return defaultSkirt + ".png"
      }
    },
    displayStripPart () {
      const stripPart = this.filterPartsWithMask(stripSelection)
      console.log(stripPart)
      if (stripPart.length > 0) {
        const def = this.findDefaultPartInImageSet('Strip', [this.selectedTopParts[0], ...stripPart])
        console.log(def, 'founded Strip')
        return def ? (def?.join('-') + ".png") : null
      } else {
        return null
      }
    },
    displaySleevePart () {
      const sleeveParts = this.filterPartsWithMask(sleevesSelection)
      console.log(sleeveParts)
      if (sleeveParts.length > 0) {
        const shouldFilterB9 = this.selectedTopParts.includes('B9')
        const def = this.findDefaultPartInImageSet('Sleeves', sleeveParts, (p) => p.includes('B9') === shouldFilterB9)
        console.log(def, 'founded Sleeve')
        return def ? (def?.join('-') + ".png") : null
      } else {
        return null
      }
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
    findDefaultPartInImageSet (partName, selectedParts, excludeFilter = () => true) {
      const targetSet = [partName, this.currentView, ...selectedParts]
      const res = availablePicSet.filter(excludeFilter).find(s => targetSet.every(p => s.includes(p))) ?? null
      return res
    },
    filterPartsWithMask (mask = [], pageFilter = 0) {
      return Object.entries(this.selectedPart).filter(s => {
        const [tab, fatherCode] = s[0].split('/')
        return mask.includes(fatherCode) && parseInt(tab) === pageFilter
      }).map(s => s[0].split('/')[1] + s[1].partCode).sort().filter(s => !excludeImage.includes(s))
    },
    changeView () {
      this.currentView = views[this.currentView === views[0] ? 1 : 0]
    },
    async selectPart (fatherCode, partCode, partId, toggle = null, tab = 0, removeFatherKey = true) {
      if (removeFatherKey) {
        for (const key of Object.keys(this.selectedPart).filter(k => k.split('/')[1] > fatherCode)) {
          delete this.selectedPart[key]
        }
      }
      this.$set(this.selectedPart, tab + '/' + fatherCode, {
        partId, partCode
      })
      const currentPart = Object.values(this.selectedPart).map(p => p.partId)
      this.currentMask = await refreshCurrentPartInfo(currentPart)
      const res = await updateMyDesignParts(this.dressId, currentPart)
      console.log(res)
      if (toggle) {
        toggle()
      }
    }
  },
  async mounted () {
    console.log('loading dressId', this.dressId)
    if (parseInt(this.dressId) === -1) {
      await this.$router.push('/createNewDress')
      return
    }
    this.currentInfo = await loadDesign(this.dressId)
    console.log(this.currentInfo)
    this.remoteSelections = await getDressPartList()
    if (this.currentInfo?.dressParts?.length > 0) {
      const parts = this.currentInfo.dressParts
      for (const p of parts) {
        const typeCode = p.dressPartCategory.dressPartType.code
        const tab = typeCode === "B" ? 0 : typeCode === "S" ? 1 : 2
        await this.selectPart(p.dressPartCategory.code, p.code, p.id, null, tab, false)
      }
    } else {
      await this.selectPart('B', '1', 1, null, 0)
      await this.selectPart('B', '1', 61, null, 1)
    }
    this.loading = false

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
