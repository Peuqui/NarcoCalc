<i18n>
{
   "de": {
    "PersDaten" : "Personen-Daten",
    "male"      : "männlich",
    "female"    : "weiblich",
    "height"    : "Körpergröße",
    "weight"    : "Körpergewicht",
    "comp"      : "Berechnungen",
    "bodydata"  : "Körperdaten",
    "tidal"     : "Tidalvolumen"
    
      },
  "en": {
    "PersDaten" : "Patient Data",
    "male"      : "male",
    "female"    : "female",
    "height"    : "Body Size",
    "weight"    : "Bodyweight",
    "comp"      : "Calculation",
    "bodydata"  : "Body Data",
    "tidal"     : "Tidal Volume"
  }
}
</i18n>

<template>
  <!------- Gridsystem --------------------------------->
  <div class="container border">
    <div class="row">
      <div class="col-6">
        <div class="rahmen">
          <fieldset>
            <legend>{{ $t('PersDaten') }}</legend>
            <table width="100%">
              <tr>
                <td>
                  <label class="sex" for="maennlich">{{ $t('male') }}</label>
                  <input type="radio" v-model="sex" value="m" id="maennlich" name="sex" />
                </td>
                <td>
                  <label class="sex" for="weiblich">{{ $t('female') }}</label>
                  <input type="radio" v-model="sex" value="w" name="sex" />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="groesse">{{ $t('height') }}</label>
                </td>
                <td>
                  :
                  <vue-numeric-input
                    class="input"
                    v-model="groesse"
                    name="groesse"
                    :min="0"
                    :max="250"
                    :step="1"
                    size="6rem"
                    :autofocus="true"
                    :controls="true"
                  ></vue-numeric-input>
                  <span class="units">cm</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="gewicht">{{ $t('weight') }}</label>
                </td>
                <td>
                  :
                  <vue-numeric-input
                    class="input"
                    v-model="gewicht"
                    name="gewicht"
                    :min="0"
                    :max="280"
                    :step="0.5"
                    size="6rem"
                    :controls="true"
                  ></vue-numeric-input>
                  <span class="units">kg</span>
                </td>
              </tr>
            </table>
          </fieldset>

          <br />

          <fieldset>
            <legend>{{ $t('comp') }}</legend>
            <fieldset>
              <legend>{{ $t('bodydata') }}</legend>
              <table width="100%">
                <tr>
                  <td>Body mass index</td>
                  <td>
                    :
                    <span class="input">{{ BMI }}</span>
                    <span class="units">
                      kg/m
                      <sup>2</sup>
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>Predicted Bodyweight</td>
                  <td>
                    :
                    <span class="input">{{ PBW() }}</span>
                    <span class="units">kg</span>
                  </td>
                </tr>
              </table>
            </fieldset>

            <br />

            <fieldset>
              <legend>{{ $t('tidal') }}</legend>
              <table width="100%">
                <tr>
                  <td>6 ml/kg KG</td>
                  <td>
                    :
                    <span class="input">{{ AZV6 }}</span>
                    <span class="units">ml</span>
                  </td>
                </tr>
                <tr>
                  <td>8 ml/kg KG</td>
                  <td>
                    :
                    <span class="input">{{ AZV8 }}</span>
                    <span class="units">ml</span>
                  </td>
                </tr>
              </table>
            </fieldset>
          </fieldset>
        </div>
      </div>
    </div>
    <!--- Fußzeile ------->
    <app-footer></app-footer>
  </div>
</template>

<script>
import FooterBeatmung from "../components/FooterBeatmung.vue";
import VueNumericInput from "vue-numeric-input";
export default {
  name: "Beatmung",
  components: {
    VueNumericInput,
    appFooter: FooterBeatmung
  },
  data() {
    return {
      sex: "m",
      groesse: 175,
      gewicht: 75,
      pbw: 0
    };
  },
  methods: {
    PBW() {
      var geschlecht = 50;
      if (this.sex == "w") {
        geschlecht = 45.5;
      }
      var resPBW = geschlecht + 0.91 * (this.groesse - 152.4);
      resPBW = Math.round(resPBW * 10) / 10;
      this.pbw = resPBW;
      resPBW = ("" + resPBW).replace(".", ",");
      return resPBW;
    }
  },
  computed: {
    BMI: function() {
      var resBMI = this.groesse / 100;
      resBMI = this.gewicht / (resBMI * resBMI);
      resBMI = Math.round(resBMI * 10) / 10;
      resBMI = ("" + resBMI).replace(".", ",");
      return resBMI;
    },
    AZV6: function() {
      var resAZV = (6 * Math.round(this.pbw * 10)) / 10;
      return ("" + resAZV).replace(".", ",");
    },
    AZV8: function() {
      var resAZV = (8 * Math.round(this.pbw * 10)) / 10;
      return ("" + resAZV).replace(".", ",");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles.scss";

td {
  width: 50%;
  border-bottom: 1px solid $Rahmen;
  padding: 0.35rem;
}

.input {
  margin: 0rem 0.5rem;
}

.units {
  font-size: 80%;
  margin-left: 0.2rem;
}

.sex {
  margin-left: 1rem;
}

.rahmen {
  display: inline-block;
}

@media (max-width: 480px) {
  .col-6 {
    font-size: 0.95rem;
  }

  .units {
    font-size: 80%;
    margin-left: 0.2rem;
  }

  .input {
    margin: 0 0rem;
  }
}
</style>

