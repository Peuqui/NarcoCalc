<i18n>
{
   "de": {
    "PersDaten"       : "Personen-Daten",
    "male"            : "männlich",
    "female"          : "weiblich",
    "height"          : "Körpergröße",
    "weight"          : "Gewicht",
    "preopHB"         : "präop. HB",
    "calc"            : "Berechnungen",
    "bodydata"        : "Körperdaten",
    "beatmung"        : "Tidalvolumen",
    "mtevv"           : "MTEVV",
    "mtbv"            : "MTBV",
    "haemotas"        : "Hämostaseologie",
    "akt"             : "akt.",
    "hkt"             : "HKT",
    "kof"             : "KOF",
    "blutVol"         : "Blutvolumen",
    "preop"           : "präop.",
    "intraop"         : "intraop.",
    "evVerlust"       : "EV-Verlust",
    "blutVerlust"     : "Blutverlust",
    "fluidBilanz"     : "Flüssigkeitsbilanz",
    "eventeriert"     : "event.",
    "gesamt"          : "gesamt",
    "volEffekt"       : "Volumeneffekt",
    "volBilanz"       : "Volumenbilanz",
    "bga"             : "Blutgasanalysen",
    "volTher"         : "Volumentherapie",
    "opZeit"          : "OP-Zeit, gesamt",
    "opZeitEvent"     : "OP-Zeit, eventeriert",
    "stk"             : "Stk",
    "ek"              : "EK",
    "matHK"           : "HKT (MAT)",
    "tk"              : "TK",
    "kristalloide"    : "Kristalloide",
    "diurese"         : "Diurese",
    "3_stufen"        : "3-Stufen-Konzept",
    "stufe"           : "Stufe",
    "erford_Krist"    : "erforderliche Krist.",
    "inkl_Urin_Persp" : "inkl. Urin & Persp.",
    "bv"              : "BV",
    "hinaus"          : "hinaus",
    "kolloidEinsatz"  : "Kolloideinsatz",
    "gr_fast_BV"      : "große und schnelle Blutverluste",
    "normWerte"       : "Normwerte",
    "eryVolumen"      : "Erythrocytenvolumen",
    "mann"            : "Mann",
    "frau"            : "Frau",
    "volPlasma"       : "Plasmavolumen",
    "volEK"           : "Volumen eines EK",
    "evEK"            : "Erythrocytenvolumen (EV) in 1 EK",
    "volFFP"          : "Volumen eines FFP",
    "beiMaxEvent"     : "bei max. Event.",
    "volEffekte"      : "Volumeneffekte",
    "mat"             : "Masch. Autotransfusion",
    "vol"             : "Volumen",
    "kristalloid"     : "Kristalloid"
    
      },
  "en": {
    "PersDaten": "Patient Data",
    "male"            : "male",
    "female"          : "female",
    "height"          : "Body Size",
    "weight"          : "Bodyweight",
    "preopHB"         : "preop. HB",
    "calc"            : "Calculation",
    "bodydata"        : "Body Data",
    "beatmung"        : "Tidal Volume",
    "mtevv"           : "MTEVL",
    "mtbv"            : "MTBL",
    "haemotas"        : "Haemostaseology",
    "akt"             : "act.",
    "hkt"             : "HCT",
    "kof"             : "BSA",
    "blutVol"         : "Blood Volume",
    "preop"           : "preop.",
    "evVerlust"       : "EV Loss",
    "blutVerlust"     : "Blood Loss",
    "fluidBilanz"     : "Fluid Balance",
    "eventeriert"     : "evisc.",
    "gesamt"          : "total",
    "volEffekt"       : "Volume Effect",
    "volBilanz"       : "Volume Balance",
    "bga"             : "Blood Gas Analysis",
    "volTher"         : "Volume Therapy",
    "opZeit"          : "OR-Time",
    "opZeitEvent"     : "OR-Time, eviscerated",
    "stk"             : "pc.",
    "ek"              : "RCC",
    "matHK"           : "HCT (MAT)",
    "tk"              : "TC",
    "kristalloide"    : "Crystalloids",
    "diurese"         : "Diuresis",
    "3_stufen"        : "3-Stage-Concept",
    "stufe"           : "Stage",
    "erford_Krist"    : "required Cryst.",
    "inkl_Urin_Persp" : "incl. Urine & Persp.",
    "bv"              : "BL",
    "hinaus"          : "beyond",
    "kolloidEinsatz"  : "Colloid Use",
    "gr_fast_BV"      : "big and fast Blood Loss",
    "normWerte"       : "Normal values",
    "eryVolumen"      : "Erythrocyte Volume",
    "mann"            : "Men",
    "frau"            : "Women",
    "volPlasma"       : "Plasma Volume",
    "volEK"           : "Volume of 1 RCC",
    "evEK"            : "EV in 1 RCC", 
    "volFFP"          : "Volume 1 FFP",
    "beiMaxEvent"     : "at max. Evisc.",
    "volEffekte"      : "Volume Effects",
    "mat"             : "Mach. Autotransfusion",
    "vol"             : "Volume",
    "kristalloid"     : "Crystalloid"
  }
}
</i18n>

<template>
  <!------- Gridsystem --------------------------------->
  <div class="container border">
    <div class="row">
      <div class="col-2">
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
              <tr v-for="inp in arrPersData" :key="inp.id">
                <td>
                  <label>{{ inp.name }}</label>
                </td>
                <td>
                  <vue-numeric-input
                    v-model="inp.wert"
                    class="input"
                    name="inp.name"
                    :min="0"
                    :max="inp.max"
                    :step="inp.step"
                    :precision="1"
                    size="7rem"
                    :autofocus="inp.fokus"
                    :controls="true"
                  ></vue-numeric-input>
                  <span class="units">{{ inp.unit }}</span>
                </td>
              </tr>
              <tr>
                <td>{{ $t('preop') }} {{ $t('hkt') }}</td>
                <td>
                  :
                  <span class="input">{{ praeopHK }}</span>
                  <span class="units">%</span>
                </td>
              </tr>
              <tr>
                <td class="warn">
                  {{ $t('mtevv') }}
                  <sup>1)</sup>
                </td>
                <td>
                  :
                  <span class="input warn">{{ maxTolEVV }}</span>
                  <span class="units warn">ml</span>
                </td>
              </tr>
              <tr>
                <td class="warn">
                  {{ $t('mtbv') }}
                  <sup>2)</sup>
                </td>
                <td>
                  :
                  <span class="input warn">{{ MTBV }}</span>
                  <span class="units warn">ml</span>
                </td>
              </tr>
            </table>
          </fieldset>

          <br />

          <!--- Berechnungen ------->
          <fieldset>
            <legend>{{ $t('calc') }}</legend>
            <fieldset>
              <legend>{{ $t('haemotas') }}</legend>
              <table width="100%">
                <tr>
                  <td>
                    <span class="input">{{ $t('akt') }} HB</span>
                  </td>
                  <td>
                    :
                    <span>{{ aktHB() }}</span>
                    <span class="units">g/dl</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span class="input">{{ $t('akt') }} {{ $t('hkt') }}</span>
                  </td>
                  <td>
                    :
                    <span>{{ aktHK() }}</span>
                    <span class="units">g/dl</span>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span class="input">&#x2205; {{ $t('hkt') }}</span>
                  </td>
                  <td>
                    :
                    <span>{{ calcMittlHK() }}</span>
                    <span class="units">%</span>
                  </td>
                </tr>
                <tr>
                  <td>{{ $t('kof') }}</td>
                  <td>
                    :
                    <span class="input">{{ KOF }}</span>
                    <span class="units">
                      m
                      <sup>2</sup>
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>{{ $t('blutVol') }}</td>
                  <td>
                    :
                    <span class="input">{{ BV }}</span>
                    <span class="units">ml</span>
                  </td>
                </tr>

                <tr>
                  <td>
                    {{ $t('preop') }} EV
                    <sup>3)</sup>
                  </td>
                  <td>
                    :
                    <span class="input">{{ praeopEV }}</span>
                    <span class="units">ml</span>
                  </td>
                </tr>

                <tr>
                  <td>intraop. EV</td>
                  <td>
                    :
                    <span class="input">{{ intraopEV }}</span>
                    <span class="units">ml</span>
                  </td>
                </tr>

                <tr>
                  <td>
                    &#x0394;-EV
                    <sup>4)</sup>
                  </td>
                  <td>
                    :
                    <span class="input">{{ deltaEV }}</span>
                    <span class="units">ml</span>
                  </td>
                </tr>
                <tr>
                  <td>{{ $t('evVerlust') }}</td>
                  <td>
                    :
                    <span class="input">{{ eryVerlust }}</span>
                    <span class="units">ml</span>
                  </td>
                </tr>
                <tr>
                  <td class="warn">{{ $t('blutVerlust') }}</td>
                  <td>
                    :
                    <span class="input warn">{{ blutVerlust }}</span>
                    <span class="units warn">ml</span>
                  </td>
                </tr>
              </table>
            </fieldset>

            <br />
            <!--- Flüssigkeitsbilanzen ------->
            <fieldset>
              <legend>{{ $t('fluidBilanz') }}</legend>
              <table width="100%">
                <tr>
                  <td>Perspiratio, norm</td>
                  <td>
                    :
                    <span class="input">{{ normPerspiratio() }}</span>
                    <span class="units">ml</span>
                  </td>
                </tr>
                <tr>
                  <td>Perspiratio, {{ $t('eventeriert') }}</td>
                  <td>
                    :
                    <span class="input">{{ eventPerspiratio }}</span>
                    <span class="units">ml</span>
                  </td>
                </tr>
                <tr>
                  <td>Perspiratio, {{ $t('gesamt') }}</td>
                  <td>
                    :
                    <span class="input">{{ gesamtPerspiratio }}</span>
                    <span class="units">ml</span>
                  </td>
                </tr>
                <tr>
                  <td>{{ $t('volEffekt') }}</td>
                  <td>
                    :
                    <span class="input">{{ volEffekt }}</span>
                    <span class="units">ml</span>
                  </td>
                </tr>
                <tr>
                  <td class="warn ohneBorder">{{ $t('volBilanz') }}</td>
                  <td class="ohneBorder">
                    :
                    <span class="input warn">{{ volBilanz }}</span>
                    <span class="units warn">ml</span>
                  </td>
                </tr>
              </table>
            </fieldset>
          </fieldset>
        </div>
      </div>

      <!--- intraoperative Blutgasanalysen ------->
      <div class="col-2">
        <div class="rahmen">
          <fieldset>
            <legend>intraop. {{ $t('bga') }}</legend>
            <table width="100%">
              <tr v-for="inp in arrHB" :key="inp.id">
                <td>
                  <label>{{ inp.name }}</label>
                </td>
                <td>
                  <vue-numeric-input
                    v-model="inp.wert"
                    class="input"
                    name="inp.name"
                    :min="0"
                    :max="20"
                    :step="0.1"
                    :precision="1"
                    size="7rem"
                    :controls="true"
                  ></vue-numeric-input>
                  <span class="units">g/dl</span>
                </td>
              </tr>
            </table>
          </fieldset>
          <br />

          <!--- Volumentherapie ------->
          <fieldset>
            <legend>{{ $t('volTher') }}</legend>
            <table width="100%">
              <tr v-for="inp in arrVol" :key="inp.id">
                <td>
                  <label>{{ inp.name }}</label>
                </td>
                <td>
                  <vue-numeric-input
                    v-model="inp.wert"
                    class="input"
                    name="inp.name"
                    :min="0"
                    :max="inp.max"
                    :step="inp.step"
                    size="7rem"
                    :controls="true"
                  ></vue-numeric-input>
                  <span class="units">{{ inp.unit }}</span>
                </td>
              </tr>
            </table>
          </fieldset>
        </div>
      </div>

      <!--- 3-Stufenkonzept ------->
      <div class="col-2">
        <div class="rahmen">
          <fieldset>
            <legend>
              {{ $t('3_stufen') }}
              <span class="kleiner">("take this with a grain of salt")</span>
            </legend>
            <fieldset>
              <legend>
                1. {{ $t('stufe') }}:
                <span
                  class="kleiner"
                >&#x003C; 20% {{ $t('bv') }} &#x2192; 4-5x {{ $t('kristalloide') }}</span>
              </legend>
              <table width="100%">
                <tr>
                  <td>20% {{ $t('blutVerlust') }}</td>
                  <td>
                    :
                    <span class="input">{{ zwanzigProzentVerlust }}</span>
                    <span class="units">ml</span>
                  </td>
                </tr>
                <tr>
                  <td class="ohneBorder">
                    {{ $t('erford_Krist') }}
                    <span class="kleiner">{{ $t('inkl_Urin_Persp') }}</span>
                  </td>
                  <td class="ohneBorder">
                    :
                    <span class="input">{{ kristallErsatz }}</span>
                    <span class="units">ml</span>
                  </td>
                </tr>
              </table>
            </fieldset>
            <br />
            <fieldset>
              <legend>
                2. {{ $t('stufe') }}:
                <span
                  class="kleiner"
                >&#x003E; 20% {{ $t('bv') }} &#x2192; 1:1 {{ $t('kolloidEinsatz') }}</span>
              </legend>
              <table width="100%">
                <tr>
                  <td class="ohneBorder">&#x003E; 20% {{ $t('blutVerlust') }} {{ $t('hinaus') }}</td>
                  <td class="ohneBorder">
                    :
                    <span class="input">{{ prozPlusBlutVerlust }}</span>
                    <span class="units">ml</span>
                  </td>
                </tr>
              </table>
            </fieldset>
            <br />
            <fieldset>
              <legend>
                3. {{ $t('stufe') }}:
                <span class="kleiner">{{ $t('gr_fast_BV') }}</span>
              </legend>
              <table width="100%">
                <tr>
                  <td class="ohneBorder">&#x2192; {{ $t('ek') }}, FFP, {{ $t('tk') }}</td>
                </tr>
                <tr>
                  <td class="ohneBorder">&#x2192; Fibrinogen, PPSP, Tranexam, Desmopressin</td>
                </tr>
              </table>
            </fieldset>
          </fieldset>
          <br />

          <!--- Normwerte ------->
          <fieldset>
            <legend>
              {{ $t('normWerte') }}
              <span class="kleiner">
                (&#x2259; ml/m
                <sup>2</sup>
                {{ $t('kof') }} )
              </span>
            </legend>
            <table width="100%">
              <tr>
                <td class="ohneBorder">{{ $t('eryVolumen') }} (EV) {{ $t('mann') }}</td>
                <td class="ohneBorder">
                  : 1100
                  <span class="units">ml</span>
                </td>
              </tr>
              <tr>
                <td>{{ $t('eryVolumen') }} (EV) {{ $t('frau') }}</td>
                <td>
                  : 850
                  <span class="units">ml</span>
                </td>
              </tr>
              <tr>
                <td class="ohneBorder">{{ $t('volPlasma') }} {{ $t('mann') }}</td>
                <td class="ohneBorder">
                  : 1578
                  <span class="units">ml</span>
                </td>
              </tr>
              <tr>
                <td>{{ $t('volPlasma') }} {{ $t('frau') }}</td>
                <td>
                  : 1395
                  <span class="units">ml</span>
                </td>
              </tr>
              <tr>
                <td class="ohneBorder">{{ $t('blutVol') }} {{ $t('mann') }}</td>
                <td class="ohneBorder">
                  : {{ BVMann }}
                  <span class="units">ml</span>
                </td>
              </tr>
              <tr>
                <td>{{ $t('blutVol') }} {{ $t('frau') }}</td>
                <td>
                  : {{ BVFrau }}
                  <span class="units">ml</span>
                </td>
              </tr>
              <tr>
                <td class="ohneBorder">{{ $t('volEK') }}</td>
                <td class="ohneBorder">
                  : {{ VolEffektEK }}
                  <span class="units">ml</span>
                </td>
              </tr>
              <tr>
                <td class="ohneBorder">{{ $t('evEK') }}</td>
                <td class="ohneBorder">
                  : {{ EryVolEK }}
                  <span class="units">ml</span>
                </td>
              </tr>

              <tr>
                <td>{{ $t('volFFP') }}</td>
                <td>
                  : 300
                  <span class="units">ml</span>
                </td>
              </tr>

              <tr>
                <td class="ohneBorder">Perspiratio insensibilis</td>
                <td class="ohneBorder">
                  : 0,5
                  <span class="units">ml/kg/h</span>
                </td>
              </tr>
              <tr>
                <td class="ohneBorder">{{ $t('beiMaxEvent') }}</td>
                <td class="ohneBorder">
                  : 1
                  <span class="units">ml/kg/h</span>
                </td>
              </tr>
            </table>
          </fieldset>
          <br />
          <table width="100%">
            <fieldset>
              <legend>{{ $t('volEffekte') }}</legend>
              <tr>
                <td class="ohneBorder">Gelafundin</td>
                <td class="ohneBorder">: 100%</td>
              </tr>
              <tr>
                <td class="ohneBorder">Haes 6%</td>
                <td class="ohneBorder">: 100%</td>
              </tr>
              <tr>
                <td class="ohneBorder">{{ $t('kristalloide') }}</td>
                <td class="ohneBorder">: 20%</td>
              </tr>
              <tr>
                <td class="ohneBorder">{{ $t('mat') }} (MAT)</td>
                <td class="ohneBorder" id="formel3">
                  :
                  <i>{{ $t('vol') }}</i> =
                  <i>EV</i> +
                  <i>{{ $t('kristalloid') }}</i>
                  <span id="formel3">
                    <sup>5)</sup>
                  </span>
                </td>
              </tr>
            </fieldset>
          </table>
        </div>
      </div>
    </div>

    <!--- Fußzeile ------->
    <app-footer></app-footer>
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import VueNumericInput from "vue-numeric-input";
export default {
  name: "Haemostaseologie",
  components: {
    VueNumericInput,
    appFooter: Footer
  },

  data() {
    return {
      sex: "m",
      BVMann: 2678,
      BVFrau: 2245,
      VolEffektKris: 0.2,
      VolEffektGela: 1,
      VolEffektHaes: 1,
      VolEffektEK: 300,
      VolEffektFFP: 300,
      EryVolEK: 200,
      akt_HB: 0,
      akt_HK: 0,
      mittl_HK: 0,

      arrPersData: [
        {
          name: "Körpergröße",
          wert: 175,
          max: 250,
          step: 1,
          fokus: true,
          unit: "cm"
        },
        {
          name: "Gewicht",
          wert: 75,
          max: 250,
          step: 0.5,
          fokus: false,
          unit: "kg"
        },
        {
          name: "Präop. HB",
          wert: 14,
          max: 250,
          step: 0.1,
          fokus: false,
          unit: "g/dl"
        },
        {
          name: "min. tol. HB",
          wert: 8.5,
          max: 20,
          step: 0.1,
          fokus: false,
          unit: "g/dl"
        }
      ],

      arrHB: [
        { name: "HB 1", wert: 0 },
        { name: "HB 2", wert: 0 },
        { name: "HB 3", wert: 0 },
        { name: "HB 4", wert: 0 },
        { name: "HB 5", wert: 0 },
        { name: "HB 6", wert: 0 },
        { name: "HB 7", wert: 0 },
        { name: "HB 8", wert: 0 },
        { name: "HB 9", wert: 0 },
        { name: "HB 10", wert: 0 }
      ],

      arrVol: [
        { name: "OP-Zeit, gesamt", wert: 0, max: 1200, step: 10, unit: "min" }, // Index: 0
        {
          name: "OP-Zeit, eventeriert",
          wert: 0,
          max: 1200,
          step: 10,
          unit: "min"
        }, // Index: 1
        { name: "EK", wert: 0, max: 100, step: 1, unit: "Stk" }, // Index: 2
        { name: "MAT", wert: 0, max: 10000, step: 100, unit: "ml" }, // Index: 3
        { name: "HKT (MAT)", wert: 55, max: 100, step: 1, unit: "%" }, // Index: 4
        { name: "FFP", wert: 0, max: 100, step: 1, unit: "Stk" }, // Index: 5
        { name: "Kristalloide", wert: 0, max: 10000, step: 100, unit: "ml" }, // Index: 6
        { name: "Gelafundin", wert: 0, max: 10000, step: 100, unit: "ml" }, // Index: 7
        { name: "Haes", wert: 0, max: 10000, step: 100, unit: "ml" }, // Index: 8
        { name: "Diurese", wert: 0, max: 10000, step: 10, unit: "ml" } // Index: 9
      ]
    };
  },

  computed: {
    /** Berechnungen */
    KOF: function() {
      var resKOF = Math.sqrt(
        (this.arrPersData[0].wert * this.arrPersData[1].wert) / 3600
      );
      resKOF = Math.round(resKOF * 100) / 100;
      return ("" + resKOF).replace(".", ",");
    },
    BV: function() {
      var bv1 = this.BVMann;
      if (this.sex == "w") {
        bv1 = this.BVFrau;
      }
      bv1 = bv1 * this.KOF.replace(",", ".");
      bv1 = Math.round(bv1);
      return ("" + bv1).replace(".", ",");
    },
    praeopHK: function() {
      var hk = Math.round(this.arrPersData[2].wert * 3.2 * 10) / 10;
      return ("" + hk).replace(".", ",");
    },

    praeopEV: function() {
      var ev =
        this.BV.replace(",", ".") * (this.praeopHK.replace(",", ".") / 100);
      ev = Math.round(ev);
      return ("" + ev).replace(".", ",");
    },

    MTBV: function() {
      var minHK = Math.round(this.arrPersData[3].wert * 3.2 * 10) / 10;
      var mtbv = this.BV * Math.log(this.praeopHK.replace(",", ".") / minHK);
      mtbv = Math.round(mtbv);
      return ("" + mtbv).replace(".", ",");
    },

    maxTolEVV: function() {
      var minHK = Math.round(this.arrPersData[3].wert * 3.2 * 10) / 10;
      var tolEVV = this.BV.replace(",", ".") * (minHK / 100);
      tolEVV = Math.round(this.praeopEV.replace(",", ".") - tolEVV);
      return ("" + tolEVV).replace(".", ",");
    },

    intraopEV: function() {
      var ev =
        this.BV.replace(",", ".") * (this.aktHK().replace(",", ".") / 100);
      ev = Math.round(ev);
      return ("" + ev).replace(".", ",");
    },
    deltaEV: function() {
      var dEV =
        this.praeopEV.replace(",", ".") - this.intraopEV.replace(",", ".");
      return ("" + dEV).replace(".", ",");
    },

    matEV: function() {
      return this.arrVol[3].wert * (this.arrVol[4].wert / 100);
    },

    matKristalloidMenge: function() {
      return this.arrVol[3].wert - this.matEV;
    },

    eryVerlust: function() {
      var ev = Math.round(
        this.deltaEV.replace(",", ".") * 1 +
          this.arrVol[2].wert * this.EryVolEK +
          this.matEV
      );
      return ("" + ev).replace(".", ",");
    },

    blutVerlust: function() {
      if (this.mittl_HK > 0) {
        var bv = this.eryVerlust.replace(",", ".") / (this.mittl_HK / 100);
        bv = Math.round(bv);
        return bv;
      }
      return 0;
    },

    kristallErsatz: function() {
      return Math.round(
        this.zwanzigProzentVerlust * 5 +
          this.arrVol[9].wert +
          this.gesamtPerspiratio
      );
    },

    zwanzigProzentVerlust: function() {
      return Math.round(this.BV.replace(",", ".") * 0.2);
    },

    prozPlusBlutVerlust: function() {
      var temp = Math.round(this.blutVerlust - this.zwanzigProzentVerlust);
      if (temp > 0) {
        return temp;
      } else {
        return 0;
      }
    },

    eventPerspiratio: function() {
      return Math.round((this.arrPersData[1].wert * this.arrVol[1].wert) / 60);
    },

    gesamtPerspiratio: function() {
      return Math.round(this.normPerspiratio() + this.eventPerspiratio);
    },

    volEffekt: function() {
      var vol =
        this.arrVol[2].wert * this.VolEffektEK +
        this.matEV +
        (this.arrVol[6].wert +
          this.matKristalloidMenge -
          (this.gesamtPerspiratio + this.arrVol[9].wert)) *
          this.VolEffektKris +
        this.arrVol[7].wert * this.VolEffektGela +
        this.arrVol[8].wert * this.VolEffektHaes +
        this.arrVol[5].wert * this.VolEffektFFP;
      return Math.round(vol);
    },

    volBilanz: function() {
      this.local_v_for_Schleifen();
      return this.volEffekt - this.blutVerlust;
    }
  },
  /* 
  watch: {},
 */
  methods: {
    /** Lokalisierung der v-for-Schleifen */
    local_v_for_Schleifen: function() {
      this.arrPersData[0].name = this.$i18n.t("height");
      this.arrPersData[1].name = this.$i18n.t("weight");
      this.arrPersData[2].name = this.$i18n.t("preopHB");

      this.arrVol[0].name = this.$i18n.t("opZeit");
      this.arrVol[1].name = this.$i18n.t("opZeitEvent");
      this.arrVol[2].name = this.$i18n.t("ek");
      this.arrVol[2].unit = this.$i18n.t("stk");
      this.arrVol[3].name = this.$i18n.t("mat");
      this.arrVol[4].name = this.$i18n.t("matHK");
      this.arrVol[5].unit = this.$i18n.t("stk");
      this.arrVol[6].name = this.$i18n.t("kristalloide");
      this.arrVol[9].name = this.$i18n.t("diurese");
    },

    aktHB() {
      for (var i = this.arrHB.length - 1; i >= 0; i--) {
        if (this.arrHB[i].wert > 0) {
          this.akt_HB = this.arrHB[i].wert;
          return ("" + this.akt_HB).replace(".", ",");
        }
      }
      return ("" + this.arrPersData[2].wert).replace(".", ",");
    },

    aktHK() {
      for (var i = this.arrHB.length - 1; i >= 0; i--) {
        if (this.arrHB[i].wert > 0) {
          var akt_HB = this.arrHB[i].wert;
          this.akt_HK = Math.round(akt_HB * 3.2 * 10) / 10;
          return ("" + this.akt_HK).replace(".", ",");
        }
      }
      var hk = Math.round(this.arrPersData[2].wert * 3.2 * 10) / 10;
      return ("" + hk).replace(".", ",");
    },

    calcMittlHK() {
      var zaehler = 0;
      var mittlHB = 0;
      for (var i = 0; i < this.arrHB.length; i++) {
        if (this.arrHB[i].wert > 0) {
          mittlHB = mittlHB + this.arrHB[i].wert;
          zaehler++;
        }
      }
      if (zaehler > 0) {
        mittlHB = mittlHB + this.arrPersData[2].wert;
        var hk = (mittlHB / (zaehler + 1)) * 3.2;
        hk = Math.round(hk * 10) / 10;
        this.mittl_HK = hk;
        return ("" + hk).replace(".", ",");
      } else {
        return Math.round(this.arrPersData[2].wert * 3.2 * 10) / 10;
      }
    },

    normPerspiratio() {
      if (this.arrVol[0].wert < this.arrVol[1].wert) {
        this.arrVol[0].wert = this.arrVol[1].wert;
      }
      return Math.round(
        (this.arrPersData[1].wert *
          0.5 *
          (this.arrVol[0].wert - this.arrVol[1].wert)) /
          60
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles.scss";

td {
  border-bottom: 1px solid $Rahmen;
  padding: 0.4rem;
}

.ohneBorder {
  border-bottom: 0;
  padding: 0.4rem;
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
  display: block;
}

.warn {
  color: $NavSchrift;
}

.kleiner {
  font-size: small;
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

