<template>
  <div class="d-flex" style="height: 100%">
    <div class="flex-shrink-0"
         style="width: 296px;height: 100%;border-right: 1px solid #817163;padding-top: 23px;padding-left: 27px">
      <!--      <div class="navHeader" style="">Dein Entwurf</div>-->

      <div style="margin-top: 29px" class="menuItemPanel">
        <div class="navItem">Dein Entwurf</div>
        <div class="navItem ">Deine Bestellung</div>
        <div class="navItem">Persönliche Daten</div>
        <div class="navItem">FAQ</div>
        <div class="navItem">Kontakt</div>
      </div>
    </div>


    <div class="flex-grow-1" style="padding:38px 100px;" v-if="!showdress">
      <div class="pageContent d-flex justify-center" style="width: 100%">
        <div style="display: grid;grid-template-columns: repeat(4,340px);grid-gap: 38px">
          <div class="d-flex justify-center flex-wrap" :key="item.id" v-for="item in myDressList"
               @click="showdress=true">
            <div class="dressContainer hasContent d-flex align-center">
              <dress-display style="height: 290px"
                             :refresh-counter="item.id"
                             :dress-id="item.id"
              ></dress-display>
            </div>
            <div class="d-flex flex-column align-center">
              <div style="margin-top: 38px;" class="dressName">{{ item.name }}</div>
              <div style="margin-top: 18px" class="dressCreateTime">Created by 05. Marz. 2021</div>
            </div>
          </div>
          <div @click="$router.push('/createNewDress')">
            <div class="dressContainer d-flex justify-center align-center">
              <div class="noContent">
                <div class="bigHint">Design your dream dress for free!</div>
                <v-btn block tile height="52px" color="#e0ddd6" class="mt-4" elevation="0">Start</v-btn>
              </div>
            </div>
          </div>

          <div>
            <div class="dressContainer d-flex justify-center align-center">
              <div class="noContent">
                <div class="bigHint">Design more for 19.99 €</div>
                <v-btn block tile height="52px" color="#e0ddd6" class="mt-4" elevation="0">Start</v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else style="display: grid; grid-template-columns: repeat(2,1fr)">
      <div style="position: static">
        <v-img :src="require('@/assets/dresss.png')"></v-img>
        <div style="height: 50px; width: 50px; position: absolute; z-index: 2; top: 29px; left:322px"
             @click="showdress=false">
          <v-icon>mdi-arrow-left</v-icon>
        </div>
      </div>

      <div style="margin-top: 70px; margin-left: 98px; margin-right: 30px">

        <div class="d-flex justify-space-between justify-center" style="margin-bottom: 110px">
          <div style="margin-right: 85px">

            <v-img src="@/assets/picture.png" width="225" height="225"></v-img>
          </div>

          <v-card flat>
            <v-card-title> Mussterbox bestellen</v-card-title>
            <v-card-subtitle>Musterbox für 29,99 €. Darin enthalten sind Stoffmuster (Spitze, Tüll und so weiter) sowie
              ein Maßband und eine Bedienungsanleitung, um Ihre Körpermaße zu nehmen.
            </v-card-subtitle>
            <v-card-actions>
              <v-btn block height="60"
                     elevation="0"
                     color="#817163"
                     class="white--text"
                     style="text-transform: none; font-size: 24px"
                     @click="showKontakt=true"
              >Bestellen
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>

        <div class="d-flex justify-space-between justify-center" style="margin-bottom: 110px">
          <div style="margin-right: 85px">

            <v-img src="@/assets/picture.png" width="225" height="225"></v-img>
          </div>

          <v-card flat>
            <v-card-title> Mussterbox bestellen</v-card-title>
            <v-card-subtitle>Musterbox für 29,99 €. Darin enthalten sind Stoffmuster (Spitze, Tüll und so weiter) sowie
              ein Maßband und eine Bedienungsanleitung, um Ihre Körpermaße zu nehmen.
            </v-card-subtitle>
            <v-card-actions>
              <v-btn block height="60" elevation="0" color="#817163" class="white--text"
                     style="text-transform: none; font-size: 24px">Bestellen
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>

        <div class="d-flex justify-space-between justify-center" style="margin-bottom: 110px">
          <div style="margin-right: 85px">

            <v-img src="@/assets/picture.png" width="225" height="225"></v-img>
          </div>

          <v-card flat>
            <v-card-title> Mussterbox bestellen</v-card-title>
            <v-card-subtitle>Musterbox für 29,99 €. Darin enthalten sind Stoffmuster (Spitze, Tüll und so weiter) sowie
              ein Maßband und eine Bedienungsanleitung, um Ihre Körpermaße zu nehmen.
            </v-card-subtitle>
            <v-card-actions>
              <v-btn block height="60" elevation="0" color="#817163" class="white--text"
                     style="text-transform: none; font-size: 24px">Bestellen
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>

      </div>
    </div>

    <v-dialog v-model="showKontakt"
              persistent
              max-width="40vw"
    >
      <div class="d-flex justify-center">
        <v-card width="40vw" height="65vh">
          <div class="dressName d-flex justify-center" style="margin-top: 61px">
            Kontaktdaten bestätigen
          </div>
          <div style="position: absolute; right: 35px; top: 35px">
            <v-icon x-large @click="showKontakt=false">mdi-close</v-icon>
          </div>

          <div style="margin-top: 40px; " class="dressHint d-flex justify-center">
            <div>
              <div style="width: 540px; margin-bottom: 74px">
                Wir werden uns innerhalb von 1-3 Arbeitstagen mit Dir in Verbindung setzen, um Dir ein Angebot zu
                machen. Bitte überprüfe Deine Kontaktinformationen unten.
              </div>

              <div style="display: grid; grid-template-columns: repeat(2, 1fr); grid-column-gap: 8px ">

                <valet-input-text-field
                    title="Vorname*"
                    v-model="firstname"
                ></valet-input-text-field>

                <valet-input-text-field
                    title="Name*"
                    v-model="lastname"
                ></valet-input-text-field>

                <valet-input-text-field
                    title="Handy Number*"
                    v-model="phone"
                ></valet-input-text-field>

                <valet-input-text-field
                    title="Stadt*"
                    v-model="city"
                ></valet-input-text-field>

              </div>

              <valet-button
                  text-before="Germany"
                  button-text="Anfrage senden"
                  @clickButton="showKontakt=false; showCompleteTip=true"
              >
              </valet-button>
            </div>
          </div>
        </v-card>
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

</template>

<script>
import DressDisplay from "@/views/DressDisplay";
import {getMyDesign} from '../../api/dressDesginService'
import ValetInputTextField from "../../components/ValetInputTextField";
import ValetButton from "../../components/ValetButton";

export default {
  name: "OrderPage",
  components: {ValetInputTextField, DressDisplay, ValetButton},
  data: function () {
    return {
      myDressList: [],
      showdress: false,
      showKontakt: false,
      showCompleteTip: false
    };
  },
  methods: {
    async loadDressList() {
      this.myDressList = await getMyDesign()
      console.log(this.myDressList)
    }
  },
  mounted() {
    this.loadDressList()
  }
}
</script>

<style scoped>
.navHeader {
  font-family: Palanquin, serif;
  font-style: normal;
  font-weight: 600;
  font-size: 35px;
  line-height: 63px;
  color: #CCC6BB;
}

.navItem {
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 125%;
  /* identical to box height, or 30px */

  color: #CCC6BB;
  border-bottom: 1px solid #CCC6BB;
}

.navItem:hover {
  color: #817163;
  border-bottom: 3px solid #817163;
}

.navItem.active {
  border-bottom: 3px solid #817163;
}

.noContent {
  width: 311px;
}

.bigHint {
  ont-family: Palanquin;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
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

.dressName {
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 125%;
  /* identical to box height, or 45px */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.011em;

  color: #4C4C4C;
}

.dressHint {
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 125%;
  /* or 30px */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.011em;

  color: #4C4C4C;
}

.dressCreateTime {
  font-family: Inter;
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

.dressContainer.hasContent {
  padding: 27px 37px;
  background: rgba(204, 198, 187, 0.85);
}

.dressContainer.hasContent:hover {

}
</style>
