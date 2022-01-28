<template>
  <div style="display: grid;grid-template-columns: 50% 50%;overflow: hidden">
    <v-sheet
        style="height: calc(100vh - 60px);border-right: 1px solid #817163;display: flex;justify-content: center;padding-top: 44px;position: relative;background: #CCC6BBD9">
      <dress-display :refresh-counter="refreshCounter" :dress-id="dressId"/>
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
          <v-item-group mandatory v-model="currentTab">
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
        <v-btn @click="showDressFinishConfirm=true" height="60px" block elevation="0" tile color="#817163" dark>
          <v-icon left>mdi-check-circle-outline</v-icon>
          Finish Design
        </v-btn>
      </v-sheet>
    </v-card>
    <v-dialog width="748px" v-model="showDressFinishConfirm">
      <v-card height="405px" style="padding:31px 42px">
        <div class="d-flex justify-end">
          <v-icon @click="showDressFinishConfirm=false" style="width: 29px">mdi-close</v-icon>
        </div>
        <div class="mt-2">
          <p style="font-family: Gill Sans Nova;
font-style: normal;
font-weight: normal;
font-size: 24px;
line-height: 30px;
/* or 125% */

display: flex;
align-items: center;
text-align: center;
letter-spacing: -0.011em;

color: #817163;">We offer two drawings for free,<br>
            and the third one costs 19,99 €</p>
        </div>
        <p style="font-family: Gill Sans Nova;
font-style: normal;
font-weight: normal;
font-size: 36px;
line-height: 50px;
/* or 139% */

display: flex;
align-items: center;
text-align: center;
letter-spacing: -0.011em;

color: #817163;" class="mt-6">
          Are you sure to finish your drawing?
        </p>
        <div class="d-flex mt-16">
          <v-btn @click="showDressFinishConfirm=false" elevation="0" tile style="width: 327px;
height: 81px;color:#817163" color="#e0ddd6">No, not yet
          </v-btn>
          <v-spacer style="width: 14px"></v-spacer>
          <v-btn @click="finishDesign" elevation="0" tile style="width: 327px;
height: 81px;color:#817163" color="#e0ddd6">Yes, I am done!
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog width="738px" v-model="showLoading">
      <v-card height="405px" class="d-flex align-center justify-center">
        <p style="font-family: Gill Sans Nova;
font-style: normal;
font-weight: normal;
font-size: 36px;
line-height: 50px;
/* or 139% */

display: flex;
align-items: center;
text-align: center;
letter-spacing: -0.011em;

color: #817163;">You dress will be saved...</p>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import DressDisplay from "@/views/DressDisplay"
import { views } from '../api/dressDisplayRule'
import { getDressPartList, refreshCurrentPartInfo } from '../api/dressPartService'
import { loadDesign, setDressComplete, updateMyDesignParts } from '../api/dressDesginService'

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
      loading: true,
      showDressFinishConfirm: null,
      showLoading: null,
      refreshCounter: 0
    }
  },
  computed: {
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
    async finishDesign () {
      this.showLoading = true
      try {
        const res = await setDressComplete(this.dressId)
        console.log(res)
      } catch (e) {
        console.log(e)
      } finally {
        this.showLoading = false
      }
    },
    logSelectedParts () {
      console.log("------>")
      for (const key of Object.keys(this.selectedPart)) {
        console.log(key + this.selectedPart[key].partCode)
      }
      console.log("------>")
    },
    changeView () {
      this.currentView = views[this.currentView === views[0] ? 1 : 0]
    },
    async selectPart (fatherCode, partCode, partId, toggle = null, tab = 0, removeFatherKey = true) {
      this.logSelectedParts()
      if (removeFatherKey) {
        for (const key of Object.keys(this.selectedPart).filter(k => {
          const [t, fCode] = k.split('/')
          return parseInt(t) === tab && fCode > fatherCode
        })) {
          delete this.selectedPart[key]
        }
      }
      this.$set(this.selectedPart, tab + '/' + fatherCode, {
        partId, partCode
      })
      const currentPart = Object.values(this.selectedPart).map(p => p.partId)
      this.currentMask = await refreshCurrentPartInfo(currentPart)
      console.log(currentPart)
      await updateMyDesignParts(this.dressId, currentPart)
      this.refreshCounter++
      if (toggle) {
        toggle()
      }
    }
  },
  async mounted () {
    console.log('loading dressId', this.dressId)
    if (!this.dressId || parseInt(this.dressId) === -1) {
      await this.$router.push('/createNewDress')
      return
    }
    this.currentInfo = await loadDesign(this.dressId)
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
  components: {DressDisplay}
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
