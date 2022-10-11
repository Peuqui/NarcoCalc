  <i18n>
{
   "de": {
        "kateg"                   : "Kategorie",
        "risk"                    : "Erkrankungsrisiko",
        "starkesUntergewicht"     : "Starkes Untergewicht",
        "maessigesUntergewicht"   : "Mäßiges Untergewicht",
        "leichtesUntergewicht"    :"Leichtes Untergewicht",
        "niedrig"                 : "niedrig",
        "erhoeht"                 : "erhöht",
        "hoch"                    : "hoch",
        "sehrHoch"               : "sehr hoch",
        "normalGewicht"           : "Normalgewicht",
        "durchschnittlich"        : "durchschnittlich",
        "preAdispositas"          : "Präadipositas",
        "geringErhoeht"           : "gering erhöht",
        "adipositasI"             : "Adipositas Grad I",
        "adipositasII"            : "Adipositas Grad II",
        "adipositasIII"           : "Adipositas Grad III"
          },
  "en": {
        "kateg"                   : "Category",
        "risk"                    : "Risk of Disease",
        "starkesUntergewicht"     : "Massive Underweight",
        "maessigesUntergewicht"   : "Moderate Underweight",
        "leichtesUntergewicht"    : "Light Underweight",
        "niedrig"                 : "low",
        "erhoeht"                 : "elevated",
        "hoch"                    : "high",
        "sehrHoch"               : "very high",
        "normalGewicht"           : "Normal Weight",
        "durchschnittlich"        : "average",
        "preAdispositas"          : "Pre-obesity",
        "geringErhoeht"           : "minor increased",
        "adipositasI"             : "Obesity Grade I",
        "adipositasII"            : "Obesity Grade II",
        "adipositasIII"           : "Obesity Grade III"
 }
}
</i18n>

<template>
<!--- Fußzeile ------->
<footer id="footer">
  <div class="container">
    <div class="row">
      <div class="col-3">
        <div>
          <div>
            <fieldset>
              <legend>
                &nbsp;BMI
                <span id="kleinst">(WHO-Definition) &nbsp;</span>
              </legend>
              <table width="100%">
                <body id="klein">
                  <tr>
                    <th align="left">{{ $t('kateg') }}</th>
                    <th align="left">BMI</th>
                    <th align="left">{{ $t('risk') }}</th>
                  </tr>
                  <tr>
                    <td colspan="3"></td>
                  </tr>
                  <tr>
                    <td>{{ $t('starkesUntergewicht') }}</td>
                    <td>&lt; 16</td>
                    <td rowspan="2"></td>
                  </tr>
                  <tr>
                    <td>{{ $t('maessigesUntergewicht') }}</td>
                    <td>16 - 16,9</td>
                  </tr>

                  <tr>
                    <td>{{ $t('leichtesUntergewicht') }}</td>
                    <td>17 - 18,4</td>
                    <td>{{ $t('niedrig') }}</td>
                  </tr>
                  <tr>
                    <td id="footer-normwert">{{ $t('normalGewicht') }}</td>
                    <td id="footer-normwert">18,5 - 24,9</td>
                    <td id="footer-normwert">{{ $t('durchschnittlich') }}</td>
                  </tr>

                  <tr>
                    <td>{{ $t('preAdispositas') }}</td>
                    <td>25 - 29,9</td>
                    <td>{{ $t('geringErhoeht') }}</td>
                  </tr>

                  <tr>
                    <td>{{ $t('adipositasI') }}</td>
                    <td>30 - 34,9</td>
                    <td>{{ $t('niedrig') }}</td>
                  </tr>

                  <tr>
                    <td>{{ $t('adipositasII') }}</td>
                    <td>35 - 39,9</td>
                    <td>{{ $t('hoch') }}</td>
                  </tr>

                  <tr>
                    <td>{{ $t('adipositasIII') }}</td>
                    <td>&ge; 40</td>
                    <td>{{ $t('sehrHoch') }}</td>
                  </tr>
                </body>
              </table>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles.scss";

/** ----- Footer ---------- */

#footer {
  background-color: $Footerleiste;
  height: auto;
  margin-bottom: 10px;
}

td {
  width: 50%;
  border-bottom: 1px solid $Rahmen;
  padding: 0.35rem;
}

#footer-normwert {
  text-decoration: none;
  color: $NavSchrift;
}

#klein {
  font-size: small;
}

#kleinst {
  margin-left: 0.5rem;
  font-size: x-small;
}
</style>
