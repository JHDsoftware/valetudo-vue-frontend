<template>
  <div class="d-flex" style="height: 100%">
    <div>
      <div class="flex-grow-1" style="padding:38px 100px;" v-if="!dress">
        <div class="pageContent d-flex justify-center" style="width: 100%">
          <div style="display: grid;grid-template-columns: repeat(4,340px);grid-gap: 38px">
            <div class="d-flex justify-center flex-wrap" :key="item.id" v-for="item in myDressList"
                 @click="cardClick(item)">
              <template v-if="item.name!=='neuer Entwurf'">
                <div class="dressContainer hasContent d-flex align-center" style="position: relative;">
                  <dress-display style="height: 390px;width: 125%;position: absolute;left: -12.5%;top: 24px"
                                 :refresh-counter="item.id"
                                 :dress-id="item.id"
                  ></dress-display>
                  <v-img @click.stop="deleteEntwurf(item)"
                         style="position:absolute;top: 20px;right: 23px;z-index: 2" width="30px"
                         :src="require('@/assets/image/frameUI/delete.png')"></v-img>
                </div>
                <div class="d-flex flex-column align-center">
                  <div style="margin-top: 38px;" class="dressName">{{ item.name }}</div>
                  <div v-if="item.completedAt" style="margin-top: 18px" class="dressCreateTime">Created by
                    {{ dayjs(item.completedAt).format('DD. MMM. YYYY') }}
                  </div>
                </div>
              </template>
              <template v-else>
                <entwurf-card @click="cardClick(item)" title="Deine Entwurf Bearbeit"/>
              </template>

            </div>

            <template v-if="listCount.currentCount<1">
              <div @click="$router.push('/createNewDress/0')">
                <entwurf-card title="Entwirf Dein Traumkleid kostenlos"/>
              </div>
            </template>

            <template v-if="listCount.currentCount<2">
              <div @click="$router.push('/createNewDress/0')">
                <entwurf-card
                    title="Entwirf Dein zweites Brautkleid kostenlos"/>
              </div>
            </template>


            <div @click="$router.push({path: '/SampleOrder/' + '-1'})">
              <entwurf-card
                  title="Entwirf mehr Brautkleid für 19.90 €"
              />
            </div>

          </div>
        </div>
      </div>

      <div v-else
           style="display: grid; grid-template-columns: repeat(2,1fr);height: calc(100vh - 60px);overflow: hidden">
        <div style="background: rgba(204, 198, 187, 0.85);padding-top: 40px;position: relative">
          <div @click="dressEdit(dress)">
            <dress-display v-if="!dressLoading" :current-view="currentView" :dress-id="dress.id"
                           :refreshCounter="dress.id"></dress-display>
          </div>
          <div style="height: 50px; width: 50px; position: absolute; z-index: 2; top: 30px; left:28px"
               @click="dress=null">
            <v-icon>mdi-arrow-left</v-icon>
          </div>
          <div style="position: absolute;right: 46px;bottom: 8px; z-index: 100">
            <div class="roundFab">
              <v-img :src="require('@/assets/image/frameUI/zoom-in.png')"></v-img>
            </div>
            <div @click="changeView" class="roundFab" style="height: 84px;margin-top: 26px">
              <v-img height="84px" :src="require('@/assets/image/frameUI/back.png')"></v-img>
            </div>
          </div>
          <div class="d-flex flex-column align-center"
               style="position:absolute;bottom: 46px;left: 0;right: 0;margin: auto">
            <div style="margin-top: 38px;" class="dressName">{{ dress.name }}</div>
            <div v-if="dress.completedAt" style="margin-top: 18px" class="dressCreateTime">Created by
              {{ dayjs(dress.completedAt).format('DD. MMM. YYYY') }}
            </div>
          </div>
        </div>

        <div style="margin-top: 70px; margin-left: 98px; margin-right: 30px">
          <div class="d-flex justify-space-between justify-center" style="margin-bottom: 110px">
            <div style="margin-right: 85px">
              <v-img src="@/assets/picture.png" width="225" height="225"></v-img>
            </div>

            <v-card flat>
              <v-card-title style="font-size: 24px; margin-bottom: 8px"> Mussterbox bestellen</v-card-title>
              <v-card-subtitle style="font-size: 18px">Musterbox für
                <span style="font-size: 24px; font-weight: bold" v-if="!dress.enableFreeMusterBox">29,99 €</span>
                <span style="font-size: 24px; font-weight: bold" v-else>0,00 €</span>

                . Darin enthalten sind Stoffmuster (Spitze, Tüll und so weiter)
                sowie
                ein Maßband und eine Bedienungsanleitung, um Ihre Körpermaße zu nehmen.
              </v-card-subtitle>
              <v-card-actions>
                <v-btn tile
                       height="60"
                       elevation="0"
                       color="#817163"
                       class="white--text"
                       style="text-transform: none; font-size: 24px; width: 266px"
                       @click="dress.enableFreeMusterBox ? null : toOrderPage(dress.id)"

                >Bestellen
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>

          <div class="d-flex justify-space-between justify-center" style="margin-bottom: 80px">
            <div style="margin-right: 85px">

              <v-img src="@/assets/picture.png" width="225" height="225"></v-img>
            </div>

            <v-card flat>
              <v-card-title style="font-size: 24px; margin-bottom: 8px">Preis anfragen</v-card-title>
              <v-card-subtitle style="font-size: 18px">
                Du bist mit deinem Entwurf zufrieden und möchtest die Skizze in die Realität umsetzen? Dann frag uns
                nach dem Preis. Wir werden Dich in 1-3 Tagen kontaktieren.
              </v-card-subtitle>
              <v-card-actions>
                <v-btn tile height="60" elevation="0" color="#817163" class="white--text"
                       @click="showKontakt=true"
                       style="text-transform: none; font-size: 24px; width: 266px">Preis anfragen
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>

          <div class="d-flex justify-space-between justify-center">
            <div style="margin-right: 85px">

              <v-img src="@/assets/picture.png" width="225" height="225"></v-img>
            </div>

            <v-card flat>
              <v-card-title style="font-size: 24px; margin-bottom: 8px">Termin vereinbaren</v-card-title>
              <v-card-subtitle style="font-size: 18px">Wenn Du weitere Hilfe von einem Experten benötigst, um Dein
                endgültiges Kleid zu
                entwerfen, oder wenn Du Designerkleider in unserem Showroom anprobieren möchtest, dann kannst Du gerne
                einen Termin vereinbaren.

              </v-card-subtitle>
              <v-card-actions>
                <v-btn tile height="60" elevation="0" color="#817163" class="white--text"
                       @click="$router.push('/questionspage')"
                       style="text-transform: none; font-size: 24px; width: 266px">Termin vereinbaren
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>

        </div>
      </div>

      <v-dialog v-model="showKontakt"
                persistent
                width="660px"
      >

        <v-card flat style="padding: 61px 59px 60px 59px">
          <div style="position: absolute; right: 34px; top: 34px">
            <v-icon x-large @click="showKontakt=false">mdi-close</v-icon>
          </div>

          <div class="d-flex justify-center dressName">
            Kontaktdaten bestätigen
          </div>


          <div style="margin-top: 40px; " class="dressHint">
            <div>
              <div style=" margin-bottom: 40px; font-size: 24px; text-align: center">
                Wir werden uns innerhalb von 1-3 Arbeitstagen mit Dir in Verbindung setzen, um Dir ein Angebot zu
                machen. Bitte überprüfe Deine Kontaktinformationen unten.
              </div>

              <!--                <div style="display: grid; grid-template-columns: repeat(2, 1fr); grid-column-gap: 8px ">-->
              <div class="d-flex justify-center flex-wrap">

                <valet-input-text-field
                    title="Vorname*"
                    v-model="personData.firstName"
                    widthInput="266px"
                    style="margin-right: 8px"
                ></valet-input-text-field>

                <valet-input-text-field
                    title="Name*"
                    v-model="personData.lastName"
                    widthInput="266px"
                ></valet-input-text-field>

                <valet-input-text-field
                    title="Handy Number*"
                    v-model="personData.phone"
                    widthInput="266px"
                    style="margin-right: 8px"
                ></valet-input-text-field>

                <valet-input-text-field
                    title="Stadt*"
                    v-model="personData.city"
                    widthInput="266px"
                ></valet-input-text-field>

              </div>

              <div style="width: 540px" class="">
                <valet-button
                    text-before="Germany"
                    button-text="Anfrage senden"
                    @click="showPriceQuestionDialog"
                >
                </valet-button>
              </div>

            </div>
          </div>
        </v-card>

      </v-dialog>
      <v-dialog v-model="confirmDeleteDialog" width="600px">
        <div style="width: 600px;padding: 46px 50px;background: white;text-align: center">
          <div style="
                      font-style: normal;
                      font-weight: 600;
                      font-size: 36px;
                      line-height: 125%;
                      /* or 45px */

                      display: flex;
                      align-items: center;
                      text-align: center;

                      color: #4C4C4C;">
            Wollen Sie den Kleid wirklich löschen?
          </div>
          <div style="display: grid;grid-template-columns: repeat(2,1fr);grid-gap: 8px;" class="mt-5">
            <valet-button @click="confirmDeleteDialog=false" button-text="Abbrechen"></valet-button>
            <valet-button @click="deleteDress" button-text="Löchen"></valet-button>
          </div>

        </div>
      </v-dialog>

      <v-dialog v-model="showCompleteTip" max-width="35vw">
        <div class="d-flex justify-center">
          <v-card width="35vw" height="22vh">
            <div style="position: absolute; right: 35px; top:35px ">
              <v-icon x-large @click="showCompleteTip=false">mdi-close</v-icon>
            </div>

            <div style="font-size: 36px; font-weight: bolder;margin-top: 61px; text-align: center">
              Danke für Deine Preisanfrage
            </div>

            <div style="text-align: center; font-size: 24px; margin-top: 24px">
              Automatisch schließen in 5 Sekunden
            </div>
          </v-card>
        </div>
      </v-dialog>
    </div>
  </div>

</template>

<script>
import DressDisplay from "../../../views/DressDisplay"
import {deleteDress, getMyDesign, myListComplete, myListCount} from '../../../api/dressDesginService'
import ValetInputTextField from "../../../components/ValetInputTextField"
import ValetButton from "../../../components/ValetButton"
import dayjs from 'dayjs'
import { views } from '../../../api/dressDisplayRule'
import { customerMe } from "../../../api/customerService"
import EntwurfCard from "@/fragments/EntwurfCard"
import _ from 'lodash'

export default {
  name: "Entwurf",
  components: {EntwurfCard, DressDisplay, ValetInputTextField, ValetButton},
  data: function () {
    return {
      freeMusterBoxDressList: [],
      myDressList: [],
      dress: null,
      showKontakt: false,
      showCompleteTip: false,
      email: "",
      password: "",
      passwordRepeat: "",
      confirmDeleteDialog: false,
      targetDeleteId: null,
      dayjs,
      currentView: views[0],
      dressLoading: false,
      personData: {
        firstName: null,
        lastName: null,
        email: null,
        city: null,
        phone: null,
        message: null
      },
      listCount: {
        currentCount: null,
        maxDesign: null,
        maxFree: null
      }


    }
  },
  async mounted () {

    if(sessionStorage.getItem('token').toString() === 'null'){
      await this.$router.replace('/')
    }

    const res = await myListCount()

    if (res.code === 200) {
      this.listCount = Object.assign(({}, await myListCount()).data)

      await this.loadDressList()
      await this.getPersonData()

      // console.log('listCount', this.listCount)

      // for(let i=0; i< res.maxFree; i++){
      //   this.freeMusterBoxDressList.push(this.myDressList[i])
      // }


    } else if (res.code === 500) {
      this.message.error('Token ist nicht verfügbar, bitte webseite refresh nochmal.')
    }




  },
  computed: {

  },
  methods: {

    dressEdit (dress) {
      if (!dress.designCompleted) {
        this.$router.push('/edit/' + dress.id)
      }
    },
    deleteEntwurf (item) {
      if (item.designCompleted) {
        this.confirmDeleteDialog = true
        this.targetDeleteId = item.id
      }
    },
    toOrderPage (id) {
      this.$router.push({
        path: '/SampleOrder/' + id,
        query: {
          artikel: 'Mussterbox'
        }
      })
    },
    showPriceQuestionDialog () {
      this.showKontakt = false
      this.showCompleteTip = true

      setTimeout(() => {
        this.showCompleteTip = false
      }, 5000)
    },
    changeView () {
      this.dressLoading = true
      this.currentView = views[this.currentView === views[0] ? 1 : 0]
      setTimeout(() => {
        this.dressLoading = false
      }, 400)
    },
    async deleteDress () {
      if (this.targetDeleteId) {
        await deleteDress(this.targetDeleteId)
        await this.loadDressList()
        this.confirmDeleteDialog = false
      }
    },
    async loadDressList () {
      this.myDressList = await getMyDesign() ?? []
      const order = await myListComplete()

      const freeMusterBox = []
      if(order.code === 200) {

        const dataArr = _.uniq(order.data.map(i=> {return i.dressDesign.id})) ?? []
        // console.log("dataArr",dataArr)
        for(let i=0; i < this.listCount.maxFree; i++){
          freeMusterBox.push(dataArr[i])
        }
      }
      // console.log("freeMusterBox", freeMusterBox)

      this.myDressList.map(item => {
        if(freeMusterBox.find(i => i === item.id)){
          item.enableFreeMusterBox = true
        }
        else {
          item.enableFreeMusterBox = false
        }
      })

      // console.log("this.myDressList",this.myDressList)


      // console.log("xxxx myDressList",this.myDressList)
    },
    cardClick (item) {
      console.log(item)
      if (item.completedAt) {
        this.dress = item
      } else {
        if (item.name === 'neuer Entwurf') {
          this.$router.push('/CreateNewDress/' + item.id)
        } else {
          this.$router.push('/edit/' + item.id)
        }
      }
    },
    async getPersonData () {
      const res = await customerMe()
      if (res.code != 200) {
        return null
      }
      this.personData = Object.assign(this.personData, res.data)
      this.personData.email = res.data.userName

    }
  }


}
</script>

<style scoped>

.noContent {
  width: 311px;
}

.bigHint {
  ont-family: Palanquin;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
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

.dressContainer.hasContent {
  padding: 27px 37px;
  background: rgba(204, 198, 187, 0.85);
}

.dressName {
  /*font-family: Palanquin;*/
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 24px;
  /* identical to box height, or 67% */

  letter-spacing: -0.011em;

  color: #4C4C4C;
}

.dressCreateTime {
  /*font-family: Inter;*/
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


</style>
