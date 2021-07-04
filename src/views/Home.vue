<template>
  <div class="d-flex">
    <v-sheet height="700px" style="width: 50%;">
      <v-img width="100%" height="100%" :src="require('@/assets/girls-6174061_1920.jpg')"></v-img>
    </v-sheet>
    <v-card style="width: 50%">
      <v-toolbar dense>
        <v-tabs fixed-tabs v-model="currentTab">
          <v-tab>Bo dice and sleeve</v-tab>
          <v-tab>Skirt</v-tab>
          <v-tab>Accessories</v-tab>
        </v-tabs>
      </v-toolbar>
      <v-tabs-items v-model="currentTab">
        <v-tab-item>
          <v-expansion-panels accordion>
            <v-expansion-panel
                v-for="(item) in selections"
                :key="item.id"
            >
              <v-expansion-panel-header>{{item.id}}.{{ item.name }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-item-group>
                  <div class="d-flex flex-wrap">
                    <template v-for="option in item.subOptions">
                      <v-item :key="option.id" v-slot="{active,toggle}">
                        <div class="pa-2 weddingItem" @click="toggle" :class="active?' active':''"
                             style="">
                          <img style="height: 156px"
                               :src="require('@/assets/image/ui/'+item.id+'/'+option.id+'.png')" alt=""/>
                          <div class="option-label">{{ option.name }}</div>
                        </div>
                      </v-item>
                    </template>
                  </div>
                </v-item-group>


              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

  </div>
</template>

<script>
import { selections } from '@/api/api'

export const defaultLook = {}

export default {
  name: 'Home',
  data: function () {
    return {
      currentTab: 0,
      selections: selections
    }
  },
  components: {}
}
</script>
<style>
.option-label {
  font-family: Palanquin;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  width: fit-content;

  color: #4C4C4C;
}

.weddingItem{
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
}

.weddingItem:hover {
  border: 1px solid black;
}

.weddingItem.active .option-label{
  border-bottom: 1px solid black;
}
</style>
