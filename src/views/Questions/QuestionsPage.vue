<template>
  <div style="display: grid;grid-template-columns: repeat(2,50%); height: calc(100vh - 60px)">

    <div>
      <v-img height="100%" :src="selectImg(e1)"></v-img>
    </div>


    <div class="">

      <div style="height: calc(100vh - 179px);">


        <div style="padding-top: 200px" class="d-flex justify-center">
          <div v-if="e1<2" style="text-align: center; width: 650px; padding-bottom: 40px " class="question">
            Hallo, bevor Sie mit dem Entwurf Ihres wunderschönen Hochzeitskleides beginnen, stellen wir Ihnen 3 Fragen,
            um
            Sie und Ihre Wünsche besser kennenzulernen.
          </div>
        </div>
        <v-stepper v-model="e1" flat>
          <div style="width: 100%;" class="d-flex justify-center">
            <div class="d-flex align-center" style="width: 300px">
              <div :style=" e1>=1  ? {color: '#817163'} : {color: '#CCC6BB'}">
                <span class="stepText">1</span>
              </div>
              <v-divider></v-divider>
              <div :style=" e1>=2  ? {color: '#817163'} : {color: '#CCC6BB'}">
                <span class="stepText">2</span>
              </div>
              <v-divider></v-divider>
              <div :style=" e1>=3  ? {color: '#817163'} : {color: '#CCC6BB'}">
                <span class="stepText">3</span>
              </div>
            </div>
          </div>


          <v-stepper-items>
            <v-stepper-content v-if="e1===1" class="d-flex justify-center flex-wrap">
              <!--              <div style="width: 633px;" >-->
              <div class="d-flex">
                <div class="questionText" style="width: 560px">
                  Wann ist Ihr Hochzeitsdatum und Ihr Datum der standesamtlichen Trauung?
                </div>

                <div class="d-flex align-end">
                  <v-icon
                      class="ml-2"
                      large
                      color="#CCC6BB"
                      @click="showInfo=true"
                  >
                    mdi-alert-circle
                  </v-icon>
                </div>

              </div>

              <div class="d-flex justify-center text-center">
                <div style="width: 290px; height: 90px">
                  <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                          style="font-size: 36px;"
                          class=" mt-4"
                          v-model="computedDate"
                          placeholder="MM/TT/YYYY"
                          hint="MM/DD/YYYY format"
                          full-width
                          append-outer-icon="mdi-calendar"
                          readonly

                          hide-details
                          v-on="on"
                      ></v-text-field>

                    </template>
                    <v-date-picker
                        style="background-color: #E0DDD6"
                        color="#807163"

                        no-title
                        v-model="date"
                        :active-picker.sync="activePicker"
                        :min="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                        @change="save"
                    >
                      <v-btn text @click="handelClear">Clear</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn text @click="menu=false">Confirm</v-btn>

                    </v-date-picker>
                  </v-menu>
                </div>
              </div>
              <!--              </div>-->
            </v-stepper-content>

            <v-stepper-content v-if="e1===2" class="d-flex justify-center flex-wrap">
              <div style="width: 633px;padding: 20px" class="d-flex justify-center flex-wrap">
                <div class="questionText">
                  Wie hoch ist Ihr Budget für Ihr Hochzeitskleid und Ihr Standesamtkleid?
                </div>
                <div class="d-flex justify-center " style="width: 290px;text-align: center" >
                  <div class="d-flex align-center">
                    <v-icon>mdi-currency-eur</v-icon>
                  </div>
                  <input
                      type="number"
                      style="font-size: 36px;
                            border-bottom: 1px solid lightgrey;
                            padding-left: 120px;
                            width: 300px"
                      :value="budget"
                      @input="budget=$event.target.value; isReady=true"
                  />
                </div>
              </div>
            </v-stepper-content>

            <v-stepper-content v-if="e1===3" class="d-flex justify-center flex-wrap">
              <div style="width: 600px;" class="d-flex justify-center flex-wrap">
                <div class="questionText" style="font-size: 24px">
                  Teilen Sie uns Art und Details Ihrer Lieblingskleidung mit, indem Sie unten Bilder hochladen. Bitte erläutern Sie diese so genau wie möglich, damit wir Ihnen einen besseren Service bieten können. Fühlen Sie sich frei, die Hochzeitskleider/ Details zu teilen, die Sie definitiv vermeiden möchten.
                </div>
                <div style="width: 568px;padding-top: 24px">
                  <v-textarea placeholder="Schreibe etwas..." class=" mt-4"
                              hide-details
                              outlined
                              v-model="areaText"
                              @input="isReady=true"
                  ></v-textarea>

                </div>
                <div class="" style="width: 568px;">
                  <template>
                    <v-file-input
                        multiple
                        class="hochladenText"
                        placeholder="Hier Bilder hochladen"
                        hide-details
                        @click="isReady=true"
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


      </div>


      <div style="height:80px">
        <v-btn height="80px"
               width="100%"
               @click="handelNext"
               elevation="0"
               :color="isReady ? '#817163' : '#c4c4c4' "
               dark>
          Weiter
        </v-btn>
      </div>
    </div>


    <v-dialog v-model="showInfo" width="650px">
      <v-card height="360px">
        <div style="position: absolute; right: 35px; top: 35px">
          <v-icon @click="showInfo=false" large>mdi-close</v-icon>
        </div>

        <div class="d-flex justify-center align-center" style="height: 260px;">
          <div style="width: 560px;" class="question text-center">
            Diese Informationen helfen uns, den Produktionszyklus Ihres Hochzeitskleides besser vorherzusagen.
          </div>

        </div>
        <div style="height: 100px" class="d-flex justify-center">
          <ValetButton
              button-text="Okay"
              @click="showInfo=false"
              style="width: 266px"/>
        </div>
      </v-card>

    </v-dialog>
  </div>
</template>

<script>

import ValetButton from "../../components/ValetButton";

export default {
  name: "QuestionsPage",
  components: {ValetButton},
  data: function () {
    return {
      isReady: false,
      e1: 3,
      activePicker: null,
      date: null,
      budget: null,
      areaText: null,
      menu: false,
      showInfo: false
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },
  computed: {
    computedDate() {
      return this.formatDate(this.date)
    }
  },
  methods: {
    handelNext() {
      if (this.isReady){
        this.e1++
        this.isReady=false
      }
      if(this.e1===4){
        this.$router.push('/CreateNewDress')
      }
    },
    handelClear() {
      this.menu = false
      this.date = null
      this.isReady = false
    },
    // handelInput(){
    //   this.isReady = true
    //   this.budget=this.$event.target.value
    // },
    save(date) {
      this.isReady = true
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
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  }
}
</script>

<style scoped>
.questionText {
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 125%;
  /* or 45px */

  display: flex;
  align-items: center;
  text-align: center;

  color: #4C4C4C;

}


.question {

  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 125%;
  /* or 30px */

  letter-spacing: 0.05em;

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

.stepText {
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 69px;
  text-align: center;
}

.hochladenText{
  font-family: Palanquin;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 125%;
  /* identical to box height, or 22px */


  color: #817163;
}
</style>
