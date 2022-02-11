<template>
  <div style="display: grid;grid-template-columns: repeat(2,50%); height: calc(100vh - 60px)">

    <div>
      <v-img height="100%" :src="selectImg(e1)"></v-img>
    </div>


    <div class="d-flex flex-column justify-center pt-12 flex-wrap align-center">
      <div v-if="e1<2" style="text-align: center; width: 650px" class="question">
        Hallo, bevor Sie mit dem Entwurf Ihres wunderschönen Hochzeitskleides beginnen, stellen wir Ihnen 3 Fragen, um Sie und Ihre Wünsche besser kennenzulernen.
      </div>
      <v-stepper v-model="e1" flat>
        <div style="width: 100%;" class="d-flex justify-center">
          <div class="d-flex align-center" style="width: 300px">
            <v-stepper-step
                :complete="e1 > 1"
                step="1"
            >
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
                :complete="e1 > 2"
                step="2"
            >
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">
            </v-stepper-step>
          </div>
        </div>


        <v-stepper-items>
          <v-stepper-content step="1">
            <div style="width: 633px;padding: 20px" class="d-flex justify-center flex-wrap">
              <div class="questionText"> Wann ist Ihr Hochzeitsdatum und Ihr Datum der standesamtlichen Trauung?
                <v-tooltip max-width="396px" bottom color="#f6f6f6">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                        class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                        large
                        color="#CCC6BB"
                        @click="showInfo=true"
                    >
                      mdi-help-circle-outline
                    </v-icon>
                  </template>
                  <span class="tooltip px-4 py-2">Diese Informationen helfen uns, den Produktionszyklus Ihres Hochzeitskleides besser vorherzusagen.</span>
                </v-tooltip>
              </div>

              <div class="" style="width: 290px;text-align: center">
                <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
<!--                  <template v-slot:activator="{ on }">-->
<!--                    <v-text-field v-on="on"></v-text-field>-->
<!--                  </template>-->
                  <template v-slot:activator="{ on }">
                    <v-text-field
                        class="buttonText mt-4"
                        v-model="date"
                        placeholder="dd/mm/yyyy"
                        full-width
                        append-outer-icon="mdi-calendar"
                        readonly

                        hide-details
                        v-on="on"
                    ></v-text-field>

                  </template>
                  <v-date-picker
                      color="#E0DDD6"
                      no-title
                      v-model="date"
                      :active-picker.sync="activePicker"
                      :min="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                      @change="save"
                  >
                    <v-btn text @click="menu=false">Clear</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn text @click="menu=false">Confirm</v-btn>

                  </v-date-picker>
                </v-menu>
              </div>
            </div>
          </v-stepper-content>

          <v-stepper-content step="2">
            <div style="width: 633px;padding: 20px" class="d-flex justify-center flex-wrap">
              <div class="questionText"> Wie hoch ist Ihr Budget für Ihr Hochzeitskleid und Ihr Standesamtkleid?
                <v-tooltip max-width="396px" bottom color="#f6f6f6">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                        class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                        large
                        color="#CCC6BB"
                    >
                      mdi-help-circle-outline
                    </v-icon>
                  </template>
                  <span class="tooltip px-4 py-2">Diese Informationen helfen uns, den Produktionszyklus Ihres Hochzeitskleides besser vorherzusagen.</span>
                </v-tooltip>
              </div>
              <div class="" style="width: 290px;text-align: center">
                <v-text-field
                    type="number"
                    class="buttonText mt-4"
                    placeholder=""
                    prepend-icon="mdi-currency-eur"
                    hide-details
                ></v-text-field>
              </div>
            </div>
          </v-stepper-content>

          <v-stepper-content step="3">
            <div style="width: 714px;" class="d-flex justify-center flex-wrap">
              <div class="questionText">
                What’s your favourit adress & what’s the thing you definitly don’t like? Picture?
                <v-tooltip max-width="396px" bottom color="#f6f6f6">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                        class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                        large
                        color="#CCC6BB"
                    >
                      mdi-help-circle-outline
                    </v-icon>
                  </template>
                  <span class="tooltip px-4 py-2">Diese Informationen helfen uns, den Produktionszyklus Ihres Hochzeitskleides besser vorherzusagen.</span>
                </v-tooltip>
              </div>
              <div style="width: 568px;margin-top: 58px">
                <v-textarea placeholder="I love Clean, classic, and timeless style" class="buttonText mt-4"
                            outlined></v-textarea>

              </div>
              <div class="" style="width: 568px;">
                <template>
                  <v-file-input
                      multiple
                      placeholder="Upload Picture"
                  >
                    <template v-slot:selection="{ text }">
                      <v-chip
                          small
                          label
                          color="primary"
                      >
                        {{ text }}
                      </v-chip>
                    </template>
                  </v-file-input>
                </template>
              </div>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      <v-spacer></v-spacer>
      <v-btn height="80px" width="100%" @click="e1++" elevation="0" color="#c4c4c4" dark>Weiter</v-btn>
    </div>
    <v-dialog v-model="showInfo" width="50%" >
      <v-card >
        <div style="display: flex; justify-content: end"><v-icon>mdi-plus</v-icon></div>
        <v-card-subtitle>
          Diese Informationen helfen uns, den Produktionszyklus Ihres Hochzeitskleides besser vorherzusagen.
        </v-card-subtitle>
        <v-card-actions style="display: flex; justify-content: center">
          <v-btn x-large>Okey</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "QuestionsPage",
  data: function () {
    return {
      e1: 1,
      activePicker: null,
      date: null,
      menu: false,
      showInfo: false
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date)
    },
    selectImg(item) {
      let img = require('@/assets/image/frameUI/questionImg1.png')
      switch (item) {
        case 2:
          img = require('@/assets/image/frameUI/questionImg2.png')
          break
        case 3:
          img = require('@/assets/image/frameUI/questionImg3.png')
          break
      }
      return img
    }
  }
}
</script>

<style scoped>
.questionText {
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 36px;
  /* or 67% */
  letter-spacing: -0.011em;
  width: fit-content;

}



.question {
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 50px;
  /* or 208% */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.15em;

  color: #4C4C4C;

}

.tooltip {
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 25px;
  /* or 104% */

  color: white !important;
}

.buttonText {
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 36px;
  /* or 67% */

  letter-spacing: -0.011em;

}

</style>
