  <i18n>
{
   "de": {
    "sub1"      : "Maximal tolerabler Erythrocytenvolumen-Verlust",
    "formel1a"  : "max.tol.Verlust",
    "formel1b"  : "präop.",
    "sub2"      : "Maximal tolerabler Blutverlust:",
    "sub2a"     : "enthält den natürlichen Logarithmus und berücksichtigt damit das nicht-lineare Abfallen des Hämatokrits durch den Blutverlust unter adäquater Volumensubstitution (Isovolämie):",
    "formel2a"  : "Blutvolumen",
    "formel2b"  : "HKT",
    "sub2b"     : "aus",
    "sub3"      : "&nbsp; Erythrocytenvolumen &#x2259; Menge der Erythrocyten",
    "sub4"      : "Differenz der Erythrocytenvolumina ",
    "colRight1" : "Formeln aus :",
    "colRight2" : "Abweichungen von den Formeln des Artikels: <ul> <li> Die Perspiratio insensibilis bei eventeriertem Abdomen wird gesondert zu der von nicht eventeriertem Abdomen berechnet und dann addiert. </li> <li> Der Volumeneffekt von Gelafundin wird mit 100%, wie vom Hersteller angegeben, angesetzt. </li> <li> <sup>5)</sup> Der Volumeneffekt des MAT-Blutes wird in die Volumenbilanz mit aufgenommen, auf das EV heruntergerechnet <span id='formel3'> (<i>EV</i> = <i>HKT</i> * <i>Volumen</i> ) </span>, dieses mit 100% angenommen und die kristalloide Restflüssigkeit, nachdem die Diurese und Gesamt-Perspiratio abgezogen wurden, mit einem Volumeneffekt von 20% dazu addiert."
          },
  "en": {
    "sub1"      : "Maximum tolerable erythrocyte volume loss",
    "formel1a"  : "max.tol.loss",
    "formel1b"  : "preop.",
    "sub2"      : "Maximum tolerable blood loss :",
    "sub2a"     : "contains the natural logarithm and takes it into account the non-linear drop of hematocrit through the Blood loss with adequate volume replacement (isovolemia):",
    "formel2a"  : "Blood loss",
    "formel2b"  : "HCT",
    "sub2b"     : "from",
    "sub3"      : "&nbsp; Erythrocyte volume &#x2259; Amount of erythrocytes",
    "sub4"      : "Difference of erythrocyte volumes ",
    "colRight1" : "Formulas from :",
    "colRight2" : "Deviations from the formulas of the article : <ul> <li> The perspiratio insensibilis in an eviscerated abdomen is calculated separately from the time of the non-eviscerated abdomen and then added together. </li> <li> The volume effect of Gelafundin is set at 100% as described by the manufacturer. </li> <li> <sup> 5) </sup> The volume effect of the MAT blood is included in the volume balance, downscaled to the EV <span id = 'formel3'> (<i> EV </i> = <i> HCT </i> * <i> Volume </i> ) </span>, assuming this with 100% and the crystalloid residual fluid after the diuresis and total perspiratio were subtracted, with a volume effect of 20% added to it."
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
              <sup>1)</sup>
              {{ $t('sub1') }}
            </div>
            <div id="formel2">
              <i>EV</i>
              <sub>{{ $t('formel1a') }}</sub> =
              <i>EV</i>
              <sub>{{ $t('formel1b') }}</sub> -
              <i>EV</i>
              <sub>min.tol.</sub>
            </div>
            <sup>2)</sup>
            {{ $t('sub2') }}
            <div id="formel">{{ $t('sub2a') }}</div>
            <div id="formel2">
              <i>Vol</i>
              <sub>max</sub> =
              <i>{{ $t('formel2a') }}</i> * ln (
              <i>{{ $t('formel2b') }}</i>
              <sub>0</sub> /
              <i>{{ $t('formel2b') }}</i>
              <sub>min</sub> )
            </div>
            <div id="formel">
              {{ $t('sub2b') }}: Böttger, Sebastian. (2008):
              <br>
              <i>
                Untersuchungen zum Transfusionsbedarf bei
                kieferorthopädisch-chirurgischen Eingriffen unter Berücksichtigung
                individueller Patientenparameter.
              </i>
              <nav id="footer-nav">
                <a
                  href="http://geb.uni-giessen.de/geb/volltexte/2008/5470/"
                  target="_blank"
                  rel="noopener"
                >GEB - Giessener Elektronische Bibliothek</a>
              </nav>
            </div>
          </div>

          <div>
            <sup>3)</sup>
            <span v-html="$t('sub3')"></span>
          </div>
          <div>
            <sup>4)</sup>
            {{ $t('sub4') }} (EV)
          </div>
        </div>
        <div class="col-3">
          <div>
            {{ $t('colRight1') }}
            <br>M.Rehm · N.Hulde · T.Kammerer · A.S.Meidert · K.Hofmann-Kiefer (2017):
            <br>
            <i>
              Stand der Wissenschaft in der Flüssigkeits- und Volumentherapie.
              Ein anwenderfreundliches Stufenkonzept.
            </i>
            <nav id="footer-nav">
              <a
                href="https://www.springermedizin.de/volumenersatz-und-schock/stand-der-wissenschaft-in-der-fluessigkeits-und-volumentherapie/12074094?fulltextView=true"
                target="_blank"
                rel="noopener"
              >Anaesthesist 2017·66:153–167</a>
            </nav>
          </div>

          <hr>

          <div v-html="$t('colRight2')"></div>
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

#footer-nav a {
  text-decoration: none;
}
#footer-nav a:link {
  color: $NavSchrift;
}
#footer-nav a:visited {
  color: $NavSchrift;
}
#footer-nav a:active {
  color: $NavSchrift_marked;
}
#footer-nav a:hover {
  color: $NavSchrift_marked;
}
#formel {
  margin-left: 2rem;
  font-size: smaller;
}
#formel2 {
  margin-left: 3rem;
  font-size: smaller;
}
#formel3 {
  margin-left: 0.3rem;
  font-size: smaller;
}
</style>
