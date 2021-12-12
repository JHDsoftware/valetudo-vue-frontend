<template>
  <div style="display: grid;grid-template-columns: repeat(2,50%);height: calc(100vh - 64px)" >
    <div>
      <v-img height="100%" :src="require('@/assets/image/frameUI/questionImg1.png')"></v-img>
    </div>
    <div class="d-flex flex-column justify-center pt-12 flex-wrap align-center">
      <div v-if="e1<2" style="text-align: center" class="question">Hi, before starting to design the wedding dress.<br> We need to
        get to know you a little bit,<br>
        which helps us provide better service.
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
              <div class="questionText"> When is your wedding date?
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
                  <span class="tooltip px-4 py-2">This information helps us better predict the production cycle of your wedding dress.</span>
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
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        class="buttonText mt-4"
                        v-model="date"
                        placeholder="dd/mm/yyyy"
                        full-width
                        append-outer-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        hide-details
                        v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                      v-model="date"
                      :active-picker.sync="activePicker"
                      :min="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                      @change="save"
                  ></v-date-picker>
                </v-menu>
              </div>
            </div>
          </v-stepper-content>

          <v-stepper-content step="2">
            <div style="width: 633px;padding: 20px" class="d-flex justify-center flex-wrap">
              <div class="questionText"> How High is your Budget?
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
                  <span class="tooltip px-4 py-2">This information helps us better predict the production cycle of your wedding dress.</span>
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
                  <span class="tooltip px-4 py-2">This information helps us better predict the production cycle of your wedding dress.</span>
                </v-tooltip>
              </div>
              <div style="width: 568px;margin-top: 58px">
                <v-textarea placeholder="I love Clean, classic, and timeless style" class="buttonText mt-4" outlined></v-textarea>

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
      <v-btn height="80px" width="100%" @click="e1++" elevation="0" color="#c4c4c4" dark>Next</v-btn>
    </div>
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
      menu: false
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
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

  color: #4C4C4C;

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


  color: #817163;
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
