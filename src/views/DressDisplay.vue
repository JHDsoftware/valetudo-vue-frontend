<template>
  <div class="imgContainer" style="width: 100%;position: relative;">
    <v-img class="partImg model"  width="92.97%"
           :src="'/model/'+(isFrontView?'frontModel.png':'backModel.png')">
    </v-img>

    <v-img style="z-index: 2" class="partImg top" width="92.97%"
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
    <v-img style="z-index: 1" class="partImg strip" width="92.97%" v-if="displayStripPart"
           :src="require('@/assets/image/images/'+displayStripPart)"></v-img>
  </div>
</template>

<script>

import availablePicSet from "@/assets/topSet.json"
import {
  backSelection,
  defaultSkirt,
  defaultTop,
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
    currentView: {default:views[0]}
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
    isFrontView(){
      return this.currentView===views[0]
    },
    selectedTopParts () {
      const topMask=this.isFrontView?topSelection:backSelection
      return this.filterPartsWithMask(topMask)
    },
    currentDisplayTopVariant () {
      if (this.selectedTopParts.length > 0) {
        const def = this.findDefaultPartInImageSet('Bodice', this.selectedTopParts.filter(s => s !== "Ga"))
        return (def?.join('-') ?? defaultTop) + ".png"
      } else {
        return defaultTop + '.png'
      }
    },
    displaySkirtPart () {
      const skirtParts = this.filterPartsWithMask(skirtSelection, 1)
      if (skirtParts.length > 0) {
        const def = this.findDefaultPartInImageSet('Skirt', skirtParts)
        return (def?.join('-') ?? defaultSkirt) + ".png"
      } else {
        return defaultSkirt + ".png"
      }
    },
    displayStripPart () {
      const stripPart = this.filterPartsWithMask(stripSelection)
      if (stripPart.length > 0) {
        const def = this.findDefaultPartInImageSet('Strip', [this.selectedTopParts[0], ...stripPart])
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
      selectedPart: {},

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
