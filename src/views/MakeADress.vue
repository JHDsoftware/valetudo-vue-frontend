<template>
  <div style="display: grid;grid-template-columns: 50% 50%;overflow: hidden">
    <template v-if="finished">
      <div style="position:absolute;top: 0;left: 0;width: 100vw;height: calc(100vh - 60px);background: center / cover"
           :style="{backgroundImage:'url('+require('@/assets/image/frameUI/completeBackground.png')+')'}"
      >
        <div style="width: 100%;height: 100%;position: relative">
          <div style="width: 833px;height: 933px;position: absolute;top: 55px;left: 249px">
            <dress-display :dress-id="dressId" :refreshCount="refreshCounter"></dress-display>
          </div>
          <div style="width: 450px;position: absolute;top:251px;text-align: right;right: 436px">
            <div style="font-family: Gill Sans Nova;
font-style: normal;
font-weight: normal;
font-size: 48px;
/* identical to box height, or 50% */

display: flex;
align-items: center;
letter-spacing: -0.011em;

color: #817163;">
              {{ dressName }}
            </div>
            <div style="font-family: Gill Sans Nova;
font-style: normal;
font-weight: normal;
font-size: 24px;
/* identical to box height, or 42% */

display: flex;
align-items: center;
text-align: right;
letter-spacing: -0.011em;

color: #817163;">
              Created at {{ dressDate }}
            </div>
            <div style="font-family: Gill Sans Nova;
font-style: normal;
font-weight: normal;
font-size: 24px;
line-height: 30px;
text-align: left;
letter-spacing: 0.04em;
word-wrap: break-word;
margin-top: 51px;

color: #817163;">
              Nice piece! Do you want to make it ture? In Valetudo, you can find personal consultant (free of charge for
              the first appoinement), you can also order samples of lace and fabrics online. That would be our pleasuere
              to realize your dream dress with you!
            </div>
            <valet-button @click="$router.push('/OrderIndex/Entwurf')" style="margin-top: 51px"
                          button-text="Check your dress in your account">
            </valet-button>
          </div>
        </div>


      </div>

    </template>
    <template v-else>
      <v-sheet
          class="px-8"
          style="height: calc(100vh - 60px);border-right: 1px solid #817163;display: flex;
          justify-content: center;padding-top: 44px;position: relative;background: #CCC6BBD9;"
      >
        <dress-display v-if="!dressLoading" :refresh-counter="refreshCounter" :dress-id="dressId"
                       :current-view="currentView" style="height: 100%"/>
        <div style="position: absolute;right: 46px;bottom: 8px; z-index: 100">
          <div class="roundFab">
            <v-img :src="require('@/assets/image/frameUI/zoom-in.png')"></v-img>
          </div>
          <div @click="changeView" class="roundFab" style="height: 84px;margin-top: 26px">
            <v-img height="84px" :src="require('@/assets/image/frameUI/back.png')"></v-img>
          </div>
        </div>

      </v-sheet>
      <v-card color="#E0DDD6" class="d-flex flex-column">
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
          <template v-if="currentTab<2">
            <v-expansion-panels style="margin-top: 2px" accordion mandatory>
              <v-expansion-panel
                  class="panel"
                  active-class="active"
                  v-for="(item) in availableSelections"
                  :key="currentTab+''+item.dressPartCategory.code"
              >
                <v-expansion-panel-header>
                  <template>{{ item.dressPartCategory.code }}.{{
                      item.dressPartCategory.name
                    }}
                  </template>

                </v-expansion-panel-header>
                <v-expansion-panel-content style="position: relative">
                  <template v-if="currentTab===1&&item.dressPartCategory.code==='G'">
                    <v-btn @click="showExampleLength=true" elevation="0" tile color="#E0DDD6" style="position: absolute;right: 64px;top: -48px;color: #817163;
">
                      Check the specific length of each type!
                    </v-btn>
                  </template>
                  <v-item-group mandatory>
                    <div style="display: grid;grid-template-columns: repeat(7,1fr)">
                      <template v-for="option in item.filteredPart">
                        <v-item :key="option.code+option.id" v-slot="{active,toggle}">
                          <div class="weddingItem"
                               @click="selectPart(item.dressPartCategory.code,option.code,option.id,toggle,currentTab)"
                               :class="active?' active':''">
                            <div style="text-align: center">
                              <img style="height: 116px"
                                   :src="require('@/assets/image/ui/'+parts[currentTab].path+'/'
                                 +item.dressPartCategory.code+'/'+item.dressPartCategory.code+option.code+'.png')"
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
          </template>
          <template v-else>
            <div
                style="display: grid;grid-template-columns: repeat(3,272px);grid-template-rows: min-content;background: white;padding:60px;grid-gap: 16px;height: 100%;">
              <div
                  @click="jumpTo(
                      'https://www.valetudo.co/collections/handmade-schleier-birdcage/products/stickerei-hochzeit-schleier-personalisiert-handarbeit-massgefertigter-schleier-mit-handgestickter-buchstaben-valetudo-berlin')"
                  class="d-flex align-center justify-center pointerMouse">
                <div style="text-align: center">
                  <v-img width="272px" src="@/assets/uiFramework/1.png"></v-img>
                  <div>Stickerei Hochzeit Schleier</div>
                </div>
              </div>
              <div
                  @click="jumpTo('https://www.valetudo.co/products/birdcage-schleier-maiglockchen-french-vintage-valetudo-berlin')"
                  class="d-flex align-center justify-center pointerMouse">
                <div style="text-align: center">
                  <v-img width="272px" src="@/assets/uiFramework/2.png"></v-img>
                  <div>Birdcage Schleier</div>
                </div>
              </div>
              <div @click="jumpTo('https://www.valetudo.co/products/haarband-verformbar-valetudo-berlin')"
                   class="d-flex align-center justify-center pointerMouse">
                <div style="text-align: center">
                  <v-img width="272px" src="@/assets/uiFramework/3.png"></v-img>
                  <div>HAARBAND verformbar</div>
                </div>
              </div>
            </div>
          </template>

        </div>
        <v-sheet style="position: absolute;width:100%;bottom:0;z-index:1;
        display: grid;grid-template-columns: 50% 50%">
          <v-btn @click="initial" height="60px" block elevation="0" tile color="#817163" dark>
            <v-icon left>mdi-arrow-left-top-bold</v-icon>
            Revoke
          </v-btn>
          <v-btn @click="okToFinish" height="60px" block elevation="0" tile color="#817163" dark>
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

color: #817163;">{{ confirmTitle }}</p>
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
            {{ confirmContent }}
          </p>
          <div class="d-flex mt-16">
            <v-btn @click="showDressFinishConfirm=false" elevation="0" tile style="width: 327px;
height: 81px;color:#817163" color="#e0ddd6">Nein
            </v-btn>
            <v-spacer style="width: 14px"></v-spacer>
            <v-btn @click="successCallback" elevation="0" tile style="width: 327px;
height: 81px;color:#817163" color="#e0ddd6">Ja
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
      <v-dialog v-model="showExampleLength">
        <div style="position: relative">
          <v-img :src="require('@/assets/uiFramework/exampleLengthImage.png')"></v-img>
          <v-btn x-large icon style="position: absolute;right: 16px;top: 16px">
            <v-icon x-large @click="showExampleLength=false">mdi-close</v-icon>

          </v-btn>

        </div>
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
    </template>


  </div>
</template>

<script>
import DressDisplay from "@/views/DressDisplay"
import { views } from '../api/dressDisplayRule'
import { getDressPartList, refreshCurrentPartInfo } from '../api/dressPartService'
import { loadDesign, setDressComplete, updateMyDesignParts } from '../api/dressDesginService'
import ValetButton from '../components/ValetButton'
import dayjs from 'dayjs'

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
      dressLoading: false,
      remoteSelections: [],
      parts: parts,
      selectedPart: {},
      currentMask: [],
      loading: true,

      showDressFinishConfirm: null,
      showLoading: null,
      showExampleLength: null,

      refreshCounter: 0,
      finished: false,
      dressName: "",
      dressDate: "",

      confirmTitle: "",
      confirmContent: "",
      successCallback: () => {
      }
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
        const {name, completedAt} = await setDressComplete(this.dressId)
        this.dressName = name
        this.dressDate = dayjs(completedAt).format('DD. MMM. YYYY')
        this.finished = true
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
    showConfirm (title, content, ok) {
      this.confirmContent = content
      this.confirmTitle = title
      this.successCallback = () => {
        ok()
        this.showDressFinishConfirm = false
      }
      this.showDressFinishConfirm = true
    },
    okToFinish () {
      this.showConfirm('Wir bieten zwei Zeichnungen kostenlos an,\n' +
          'und das dritte kostet 19,99 €', 'Wollen Sie es fertigstellen?', this.finishDesign)
    },
    okToChange (rest) {
      this.showConfirm('Wenn Sie den primären vorderen Miederausschnitt ändern, geht das vorherige Design verloren, da dies die Grundlage des Kleiddesigns ist', 'Wollen Sie es ändern?', rest)
    },
    needAMeetingD () {
      this.showConfirm('Unterstoff mit Spitze ist eine spezielle Technik. Wenn Sie damit ein Kleid entwerfen möchten, vereinbaren Sie bitte einen Termin mit uns.', 'Möchten Sie einen Termin buchen?')
    },
    needAMeetingF () {
      this.showConfirm('Rüschen des Oberteils ist eine spezielle Technik. Wenn Sie damit ein Kleid entwerfen möchten, vereinbaren Sie bitte einen Termin mit uns.', 'Möchten Sie einen Termin buchen?')
    },

    changeView () {
      this.setView(this.currentView === views[0] ? 1 : 0)
    },
    setView (index) {
      this.dressLoading = true
      this.currentView = views[index]
      setTimeout(() => {
        this.dressLoading = false
      }, 400)
    },
    shouldChangeView (fatherCode, tab, noChange = false) {
      if (!noChange) {
        let targetView = null
        if (tab === 0) {
          if (['K', 'L'].includes(fatherCode)) {
            targetView = 1
          } else{
            targetView = 0
          }
        } else {
          if (['L', 'M'].includes(fatherCode)) {
            targetView = 1
          }
          else{
            targetView = 0
          }
        }
        if (targetView && views[targetView] !== this.currentView) {
          this.setView(targetView)
        }
      }

    },
    shouldCancelOther (fatherCode, tab) {
      console.log(this.selectedPart)
      if (tab === 0) {
        if (['J'].includes(fatherCode)) {
          delete this.selectedPart['0/I']
          delete this.selectedPart['0/G']
        } else if (['I', 'G'].includes(fatherCode)) {
          delete this.selectedPart['0/J']
        }
      }
    },
    async beforeChange (tab, fatherCode, callback, justPass = false) {
      if (!justPass && fatherCode === 'B' && Object.keys(this.selectedPart).filter(k => !k.includes('B') && k.includes(tab.toString())).length > 0) {
        this.okToChange(callback)
      } else {
        callback()
      }
    },
    async selectPart (fatherCode, partCode, partId, toggle = null, tab = 0, removeFatherKey = true) {
      await this.beforeChange(tab, fatherCode, async () => {
        if (fatherCode === 'D' && partCode === 'c') {
          this.needAMeetingD()
          return
        }
        if (fatherCode === 'F' && partCode === 'c') {
          this.needAMeetingF()
          return
        }
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
        this.shouldCancelOther(fatherCode, tab)
        const currentPart = Object.values(this.selectedPart).map(p => p.partId)
        this.currentMask = await refreshCurrentPartInfo(currentPart)
        await updateMyDesignParts(this.dressId, currentPart)
        this.shouldChangeView(fatherCode, tab, !removeFatherKey)
        this.refreshCounter++

        if (toggle) {
          toggle()
        }

        if (fatherCode === 'B' && partCode === '10' && tab === 0) {
          this.selectPart("J", "j", 52)
        }
      }, !removeFatherKey)

    },
    jumpTo (url) {
      window.open( url)
    },
    async initial () {
      await this.selectPart('B', '1', 1, null, 0)
      await this.selectPart('B', '1', 61, null, 1)
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
      this.initial()
    }
    this.loading = false

  },
  components: {ValetButton, DressDisplay}
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


</style>
