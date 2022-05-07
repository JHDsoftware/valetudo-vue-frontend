<template>
  <div class="imgContainer" style="width: 100%;position: relative;">
    <div class="partImg skirt" style="height: 160%;" :style="{zIndex:secondaryDisplaySkirtPart?0:1}">
      <img width="100%" style="z-index: 1" :src="require('@/assets/image/images/'+displaySkirtPart)">
    </div>
    <v-img contain class="partImg model" width="92.97%"
           :src="'/model/'+(isFrontView?'frontModel.png':'backModel.png')">
    </v-img>
    <template v-show="!loading">
      <v-img contain style="z-index: 2" class="partImg top" width="92.97%"
             :style="isFrontView?{left:0}:{left: '-1px'}"
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

      <div v-if="secondaryDisplaySkirtPart" class="partImg skirt" style="height: 160%;z-index: 1">
        <img width="100%" style="z-index: 1" :src="require('@/assets/image/images/'+secondaryDisplaySkirtPart)">
      </div>

      <v-img contain class="partImg sleeve" width="92.97%" v-if="displaySleevePart"
             :src="require('@/assets/image/images/'+displaySleevePart)">
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
      <v-img contain style="z-index: 1" class="partImg strip" width="92.97%" v-if="displayStripPart"
             :src="require('@/assets/image/images/'+displayStripPart)">
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
    </template>

  </div>
</template>

<script>

import availablePicSet from "@/assets/topSet.json"
import {
  backSelection,
  defaultSkirt,
  defaultTop, defaultTopBack,
  excludeImage,
  skirtSelection,
  sleevesSelection,
  stripSelection,
  topSelection, views
} from '@/api/dressDisplayRule'
import { loadDesign } from '@/api/dressDesginService'

export default {
  name: "DressDisplay",
  props: {
    dressId: {
      default: -1
    },
    refreshCounter: {},
    currentView: {default: views[0]}
  },
  watch: {
    refreshCounter: {
      immediate: true,
      handler () {
        this.loadPart()
      }
    }
  },
  computed: {
    isFrontView () {
      return this.currentView === views[0]
    },
    selectedTopParts () {
      const topMask = this.isFrontView ? topSelection : backSelection
      return this.filterPartsWithMask(topMask)
    },
    currentDisplayTopVariant () {
      console.log(this.selectedTopParts)
      if (this.selectedTopParts.length > 0) {
        const def = this.findDefaultPartInImageSet('Bodice', this.selectedTopParts.filter(s => s !== "Ga"))
        console.log(def,'身体')
        return (def?.join('-') ?? (this.isFrontView ? defaultTop : defaultTopBack)) + ".png"
      } else {
        return (this.isFrontView ? defaultTop : defaultTopBack) + '.png'
      }
    },
    displaySkirtPart () {
      const skirtParts = this.filterPartsWithMask(skirtSelection, 1)

      if (skirtParts.length > 0) {
        console.log(skirtParts,'裙子')
        const def = this.findDefaultPartInImageSet('Skirt', skirtParts)
        console.log(def)
        return (def?.join('-') ?? defaultSkirt) + ".png"
      } else {
        return defaultSkirt + ".png"
      }
    },
    secondaryDisplaySkirtPart () {
      return this.displaySkirtPart.includes('inside') ?
          this.displaySkirtPart.replace('inside', 'outside') : null
    },
    displayStripPart () {
      const stripPart = this.filterPartsWithMask(stripSelection)
      if (stripPart.length > 0) {
        const def = this.findDefaultPartInImageSet('Strip', [this.selectedTopParts[0], ...stripPart])
        console.log(def)
        return def ? (def?.join('-') + ".png") : null
      } else {
        return null
      }
    },
    displaySleevePart () {
      const sleeveParts = this.filterPartsWithMask(sleevesSelection)
      if (sleeveParts.length > 0) {
        const shouldFilterB9 = this.selectedTopParts.includes('B9')
        const def = this.findDefaultPartInImageSet('Sleeves', sleeveParts, (p) => p.includes('B9') === shouldFilterB9)
        return def ? (def?.join('-') + ".png") : null
      } else {
        return null
      }
    }
  },
  data: function () {
    return {
      loading: true,
      selectedPart: {}

    }
  },
  async mounted () {
    await this.loadPart()
  },
  methods: {
    findDefaultPartInImageSet (partName, selectedParts, excludeFilter = () => true) {
      const targetSet = [partName, this.currentView, ...selectedParts]
      return availablePicSet.filter(excludeFilter).find(s => targetSet.every(p => s.includes(p))) ?? null
    },
    filterPartsWithMask (mask = [], pageFilter = 0) {
      return Object.entries(this.selectedPart).filter(s => {
        const [tab, fatherCode] = s[0].split('/')
        return mask.includes(fatherCode) && parseInt(tab) === pageFilter
      }).map(s => s[0].split('/')[1] + s[1].partCode).sort().filter(s => !excludeImage.includes(s))
    },
    async loadPart () {
      this.loading = true
      const info = await loadDesign(this.dressId)
      this.selectedPart = {}
      if (info?.dressParts?.length > 0) {
        const parts = info.dressParts
        for (const p of parts) {
          const typeCode = p.dressPartCategory.dressPartType.code
          const tab = typeCode === "B" ? 0 : typeCode === "S" ? 1 : 2
          this.$set(this.selectedPart, tab + '/' + p.dressPartCategory.code, {
            partId: p.id, partCode: p.code
          })
        }
      }
      setTimeout(() => {
        this.loading = false
      }, 2000)

    }
  }
}
</script>

<style scoped>
.partImg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin: auto
}
</style>
