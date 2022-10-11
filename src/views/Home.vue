<i18n>
{
   "de": {
    "hello": "<p><b>Herzlich Willkommen auf der Website von</b> <span class='span2'>NarcoCalc</span> <b>!</b> </p> <p>Dies ist eine sogenannte \"Progressive Web App\", die nur mittels HTML, CSS, JavaScript und dem Framework \"Vue.js\" entwickelt wurde. Damit ist es möglich, diese App direkt von der Website aus, unabhängig vom verwendeten Betriebssystem, auf dem Computer, bzw. dem Mobilgerät zu installieren und offline zu nutzen. Dazu wird unter Android automatisch ein Hinweis eingeblendet, dem man zustimmen kann. Unter iOS hingegen muß man selbst \"Add to Homescreen\" anwählen.</p> <p>Es wird empfohlen, den \"Google Chrome\"-Browser zu verwenden. Unter iOS spielt der Browsertyp keine Rolle, da apple-bedingt bei allen verschiedenen Browsern ohnehin dieselbe Engine unter der Oberfläche zum Einsatz kommt.</p> <p>Das eingesetzte \"Gridsystem\" ermöglicht ein \"responsives\" Design, das sich automatisch an die verschiedenen Bildschirmauflösungen anpaßt und wurde im Hinblick auf den \"mobile first\"-Ansatz für die optimierte Nutzung auf Mobilgeräten entworfen.</p> <p>Die bereitgestellten Formeln zur Berechnung von, für die Anästhesie wichtigen, Parametern sind nur zu Demonstrationszwecken, nicht jedoch für die Anwendung am Patienten geeignet. Es wird keine Haftung für die Korrektheit der errechneten Daten übernommen.</p> <p>Zu diesem Begrüßungsbildschirm kommen Sie mittels Klick auf das Logo in der linken oberen Ecke zurück.</p> <p>Der Programmcode steht als Open Source mit der \"MIT License\" zur Verfügung und kann unter <span id='footer-nav'> <a href='https://gitlab.com/Peuqui/narcocalc' target='_blank' rel='noopener'>gitlab.com/Peuqui/narcocalc</a> </span> heruntergeladen werden.</p>"
    },
  "en": {
    "hello": "<p><b>Welcome at the website of</b> <span class='span2'>NarcoCalc</span> <b>!</b></p> <p>This is a so-called \"Progressive Web App\", which is developed only with HTML, CSS, JavaScript and the framework \"Vue.js\". Therefor it is possible to use this app offline too directly after installing from the website on the computer or mobile device independent from the operating system. An automatic hint is displayed on an android device, which has to be agreed. Under iOS, you have to select yourself \"Add to HomeScreen\".</p> <p>For optimal functionality it is recommended to use the \"Google Chrome Browser\". The browser type on iOS devices is irrelevant, because the underlying engine of every browser is Apple induced the same.</p> <p>The implemented \"grid system\" enables a \"responsive design\", which adapts automatically to different screen resolutions and was developed in regard to the \"mobile first approach\" for an optimized user experience on mobile devices.</p> <p>The provided formulas for anaesthesia related computations are only for demonstration purposes and are not appropriate for practical use at patients. No responsibility for the correctness of the data is assumed.</p> <p>To come back to this welcome screen, click onto the logo at the upper left corner.</p> <p>The Sourcecode is published under the \"MIT License\" and can be downloaded at <span id='footer-nav'> <a href='https://gitlab.com/Peuqui/narcocalc' target='_blank' rel='noopener'>gitlab.com/Peuqui/narcocalc</a></span>.</p>"
    }
}
</i18n>

<template>
  <div class="container border">
    <div class="row">
      <div class="col-6">
        <span class="span1">NarcoCalc</span>
        <img class="bild" src="../assets/logo.png" alt="Logo von NarcoCalc" />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <p v-html="$t('hello')"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",

  watch: {
    locale(val) {
      this.$i18n.locale = val;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles.scss";

.container {
  max-width: 650px;
}

.bild {
  max-width: 100%;
  height: auto;
  margin: 0.1rem;
  float: left;
}

.span1 {
  color: $Navleiste_marked;
  float: right;
}

.span2 {
  color: $NavSchrift;
  font-size: 1.3rem;
  padding: 0.3rem;
}
</style>
