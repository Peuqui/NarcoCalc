<i18n>
{
   "de": {
    "PersDaten"     : "Personen-Daten",
    "dosiscalcNark" : "Dosisberechnung Narkotika",
    "dosiscalcKat"  : "Dosisberechnung Katecholamine",
    "konzentration" : "Konzentration",
    "weight"        : "Körpergewicht",
    "dosis"         : "Dosis",
    "laufrate"      : "Laufrate",
    "ketamin"       : "Ketamin",
    "dobutamin"     : "Dobutamin",
    "adrenalin"     : "Adrenalin",
    "noradrenalin"  : "Noradrenalin"
      },
  "en": {
    "PersDaten"     : "Patient Data",
    "dosiscalcNark" : "Dose Calculation Narcotics",
    "dosiscalcKat"  : "Dose Calculation Catecholamine",
    "konzentration" : "Concentration",
    "weight"        : "Bodyweight",
    "dosis"         : "Dose",
    "laufrate"      : "Run Rate",
    "ketamin"       : "Ketamine",
    "dobutamin"     : "Dobutamine",
    "adrenalin"     : "Epinephrine",
    "noradrenalin"  : "Norepinephrine"
  }
}
</i18n>

<template>
  <!------- Gridsystem --------------------------------->
  <div class="container border">
    <div class="row">
      <div class="col-6 table-scrollable">
        <div class="rahmen">
          <fieldset>
            <legend>{{ $t('PersDaten') }}</legend>
            <label for="gewicht">{{ $t('weight') }}</label>
            <vue-numeric-input
              class="input"
              v-model="gewicht"
              name="gewicht"
              :min="0"
              :max="280"
              :step="0.5"
              size="6rem"
              :autofocus="true"
              :controls="true"
            ></vue-numeric-input>
            <span class="units">kg</span>
          </fieldset>

          <br>
          <br>

          <!--- Berechung Narkotika ------->
          <fieldset>
            <legend>{{ $t('dosiscalcNark') }}</legend>
            <table width="100%">
              <tr>
                <td></td>
                <td>{{ $t('konzentration') }}</td>
                <td>{{ $t('dosis') }}</td>
                <td>{{ $t('laufrate') }}</td>
              </tr>
              <tr v-for="inp in arrNark" :key="inp.id">
                <td>
                  <label>{{ inp.name }}</label>
                </td>
                <td>
                  <vue-numeric-input
                    v-model="inp.konz"
                    class="input"
                    :name="inp.name"
                    :min="inp.minK"
                    :max="inp.maxK"
                    :step="inp.stepK"
                    size="5.5rem"
                    :controls="true"
                  ></vue-numeric-input>
                  <span class="units">{{ inp.unitK }}</span>
                </td>
                <td>
                  <vue-numeric-input
                    v-model="inp.dosis"
                    class="input"
                    :name="inp.name"
                    :min="inp.minD"
                    :max="inp.maxD"
                    :step="inp.stepD"
                    :precision="2"
                    size="6rem"
                    :controls="true"
                  ></vue-numeric-input>
                  <span class="units">{{ inp.unitD }}</span>
                </td>
                <td>
                  <span class="input" v-if="inp.name=='Propofol'">{{ calcPropofol }}</span>
                  <span class="input" v-else-if="inp.name=='Remifentanil'">{{ calcUltiva }}</span>
                  <span class="input" v-else-if="inp.name=='Ketamin'">{{ calcKetamin }}</span>
                  <span class="units">ml/h</span>
                </td>
              </tr>
            </table>
          </fieldset>

          <br>
          <br>

          <!--- Berechung Katecholamine ------->
          <fieldset>
            <legend>{{ $t('dosiscalcKat') }}</legend>
            <table width="100%">
              <tr>
                <td></td>
                <td>{{ $t('konzentration') }}</td>
                <td colspan="3">{{ $t('dosis') }}</td>
                <td>{{ $t('laufrate') }}</td>
              </tr>
              <tr v-for="inp in arrKat" :key="inp.id">
                <td>
                  <label>{{ inp.name }}</label>
                </td>
                <td>
                  <vue-numeric-input
                    v-model="inp.konz"
                    class="input"
                    :name="inp.name"
                    :min="inp.minK"
                    :max="inp.maxK"
                    :step="inp.stepK"
                    :precision="2"
                    size="6rem"
                    :controls="true"
                  ></vue-numeric-input>
                  <span class="units">mg/ml</span>
                </td>
                <td>
                  <!-- Dosis in mg/h -->
                  <vue-numeric-input
                    v-model="inp.dosis"
                    class="input"
                    :name="inp.name"
                    :min="inp.minD"
                    :max="inp.maxD"
                    :step="inp.stepD"
                    :precision="2"
                    size="6rem"
                    :controls="true"
                  ></vue-numeric-input>
                  <span class="units">mg/h</span>
                </td>

                <td>
                  <!-- Dosis µg/min -->
                  <span class="input" v-if="inp.name=='Dobutamin'">{{ calcDobutamin_ugmin }}</span>
                  <span
                    class="input"
                    v-else-if="inp.name=='Noradrenalin'"
                  >{{ calcNoradrenalin_ugmin }}</span>
                  <span class="input" v-else-if="inp.name=='Adrenalin'">{{ calcAdrenalin_ugmin }}</span>
                  <span class="units">µg/min</span>
                </td>

                <td>
                  <!-- Dosis µg/kg/min -->
                  <span class="input" v-if="inp.name=='Dobutamin'">{{ calcDobutamin }}</span>
                  <span class="input" v-else-if="inp.name=='Noradrenalin'">{{ calcNoradrenalin }}</span>
                  <span class="input" v-else-if="inp.name=='Adrenalin'">{{ calcAdrenalin }}</span>
                  <span class="units">µg/kg/min</span>
                </td>

                <!-- Perfusorlaufrate in ml/h -->
                <td>
                  <span class="input" v-if="inp.name=='Dobutamin'">{{ calcDobutamin_mlh }}</span>
                  <span
                    class="input"
                    v-else-if="inp.name=='Noradrenalin'"
                  >{{ calcNoradrenalin_mlh }}</span>
                  <span class="input" v-else-if="inp.name=='Adrenalin'">{{ calcAdrenalin_mlh }}</span>
                  <span class="units">ml/h</span>
                </td>
              </tr>
            </table>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueNumericInput from "vue-numeric-input";
export default {
  name: "Dosis",
  components: {
    VueNumericInput
  },
  data() {
    return {
      gewicht: 75,

      arrNark: [
        {
          name: "Propofol",
          konz: 10,
          minK: 10,
          maxK: 20,
          stepK: 1,
          unitK: "mg/ml",
          dosis: 4,
          minD: 0,
          maxD: 100,
          stepD: 0.1,
          unitD: "mg/kg/h"
        }, // Index: 0
        {
          name: "Remifentanil",
          konz: 40,
          minK: 0,
          maxK: 100,
          stepK: 10,
          unitK: "µg/ml",
          dosis: 0.25,
          minD: 0,
          maxD: 20000,
          stepD: 0.01,
          unitD: "µg/kg/min"
        }, // Index: 1
        {
          name: "Ketamin",
          konz: 1,
          minK: 0,
          maxK: 50,
          stepK: 1,
          unitK: "mg/ml",
          dosis: 0.25,
          minD: 0,
          maxD: 10,
          stepD: 0.01,
          unitD: "mg/kg/h"
        } // Index: 2
      ],
      arrKat: [
        {
          name: "Dobutamin",
          konz: 5,
          minK: 5,
          maxK: 5,
          stepK: 0,
          dosis: 10,
          minD: 0,
          maxD: 100,
          stepD: 0.5
        }, // Index: 0
        {
          name: "Noradrenalin",
          konz: 0.1,
          minK: 0.02,
          maxK: 1,
          stepK: 0.1,
          dosis: 0.1,
          minD: 0,
          maxD: 100,
          stepD: 0.01
        }, // Index: 1
        {
          name: "Adrenalin",
          konz: 0.1,
          minK: 0.01,
          maxK: 1,
          stepK: 0.1,
          dosis: 0.1,
          minD: 0,
          maxD: 100,
          stepD: 0.01
        } // Index: 2
      ]
    };
  },
  computed: {
    calcPropofol: function() {
      /*   var rate = (this.gewicht * this.propDosis) / this.propKonz; */
      var rate = (this.gewicht * this.arrNark[0].dosis) / this.arrNark[0].konz;
      rate = Math.round(rate * 10) / 10;
      return ("" + rate).replace(".", ",");
    },
    calcUltiva: function() {
      /*  var rate = ((this.gewicht * this.ultDosis) / this.ultKonz) * 60; */
      var rate =
        ((this.gewicht * this.arrNark[1].dosis) / this.arrNark[1].konz) * 60;
      rate = Math.round(rate * 10) / 10;
      return ("" + rate).replace(".", ",");
    },
    calcKetamin: function() {
      /*  var rate = (this.gewicht * this.ketDosis) / this.ketKonz; */
      var rate = (this.gewicht * this.arrNark[2].dosis) / this.arrNark[2].konz;
      rate = Math.round(rate * 10) / 10;
      return ("" + rate).replace(".", ",");
    },

    /**
     * Katecholamine
     */
    calcDobutamin_ugmin: function() {
      var rate = (this.arrKat[0].dosis / 60) * 1000;
      rate = Math.round(rate * 10) / 10;
      return ("" + rate).replace(".", ",");
    },

    calcNoradrenalin_ugmin: function() {
      var rate = (this.arrKat[1].dosis / 60) * 1000;
      rate = Math.round(rate * 100) / 100;
      return ("" + rate).replace(".", ",");
    },

    calcAdrenalin_ugmin: function() {
      var rate = (this.arrKat[2].dosis / 60) * 1000;
      rate = Math.round(rate * 100) / 100;
      return ("" + rate).replace(".", ",");
    },

    calcDobutamin: function() {
      var rate = (this.arrKat[0].dosis / this.gewicht / 60) * 1000;
      rate = Math.round(rate * 100) / 100;
      return ("" + rate).replace(".", ",");
    },

    calcNoradrenalin: function() {
      var rate = (this.arrKat[1].dosis / this.gewicht / 60) * 1000;
      rate = Math.round(rate * 1000) / 1000;
      return ("" + rate).replace(".", ",");
    },

    calcAdrenalin: function() {
      var rate = (this.arrKat[2].dosis / this.gewicht / 60) * 1000;
      rate = Math.round(rate * 1000) / 1000;
      return ("" + rate).replace(".", ",");
    },

    calcDobutamin_mlh: function() {
      var rate = this.arrKat[0].dosis / this.arrKat[0].konz;
      rate = Math.round(rate * 10) / 10;
      return ("" + rate).replace(".", ",");
    },

    calcNoradrenalin_mlh: function() {
      var rate = this.arrKat[1].dosis / this.arrKat[1].konz;
      rate = Math.round(rate * 10) / 10;
      return ("" + rate).replace(".", ",");
    },

    calcAdrenalin_mlh: function() {
      var rate = this.arrKat[2].dosis / this.arrKat[2].konz;
      rate = Math.round(rate * 10) / 10;
      return ("" + rate).replace(".", ",");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles.scss";

table,
td {
  border: 1px solid $Rahmen;
  border-collapse: collapse;
  padding: 0.35rem;
}

/* td {
  width: 25%;
} */

.table-scrollable {
  width: 100%;
  overflow-y: auto;
  margin: 0 0 1em;
}

.table-scrollable::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
}

.table-scrollable::-webkit-scrollbar-thumb {
  border-radius: 8px;
  border: 3px solid #fff;
  background-color: rgba(0, 0, 0, 0.3);
}

.input {
  margin: 0.3rem 0.5rem;
}

.units {
  font-size: 80%;
  margin-left: 0.1rem;
}

.rahmen {
  display: inline-block;
}

@media (max-width: 480px) {
  .col-6 {
    font-size: smaller;
  }

  .input {
    margin: 0 0rem;
  }
}
</style>