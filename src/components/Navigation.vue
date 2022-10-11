<!-- Navigationsleiste -->
<template>
  <nav id="header-nav">
    <div class="container" id="desktop-nav">
      <div class="row">
        <div class="col-6">
          <img @click="gotoHome" src="../assets/logo.png" alt="Logo von NarcoCalc">
          <span>NarcoCalc</span>
          <ul>
            <router-link tag="li" active-class="active" exact to="/Beatmung">
              <a v-if="locale=='de'">Beatmung</a>
              <a v-else-if="locale=='en'">Ventilation</a>
            </router-link>
            <router-link tag="li" active-class="active" to="/Haemostaseologie">
              <a v-if="locale=='de'">Hämostaseologie</a>
              <a v-else-if="locale=='en'">Hemostaseology</a>
            </router-link>
            <router-link tag="li" active-class="active" to="/Dosis">
              <a v-if="locale=='de'">Dosis</a>
              <a v-else-if="locale=='en'">Dose</a>
            </router-link>
            <router-link tag="li" active-class="active" to="/Impressum">
              <a v-if="locale=='de'">Impressum</a>
              <a v-else-if="locale=='en'">Imprint</a>
            </router-link>
            <li>
              <div id="flagDiv">
                <button
                  id="flag"
                  v-for="entry in languages"
                  :key="entry.language"
                  @click="locale=(entry.language)"
                >
                  <flag :iso="entry.flag" v-bind:squared="false"/>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Navigationsleiste mobil -->
    <div class="container" id="mobile-nav">
      <div class="row">
        <div class="col-6">
          <img @click="gotoHome" src="../assets/logo.png" alt="Logo von NarcoCalc">
          <span>NarcoCalc</span>

          <!-- <div v-on:click="hidden = !hidden" id="mobile-nav-dropdown" class="clearfix"> -->
          <div @click="hidden = !hidden" id="mobile-nav-dropdown" class="clearfix">
            <div id="mobile-nav-button">
              <span>&equiv;</span>
            </div>
            <div v-if="!hidden" id="mobile-nav-content" class="clearfix">
              <!--  <div id="mobile-nav-content" class="clearfix"> -->
              <ul>
                <router-link tag="li" active-class="active" exact to="/Beatmung">
                  <a v-if="locale=='de'">Beatmung</a>
                  <a v-else-if="locale=='en'">Ventilation</a>
                </router-link>
                <router-link tag="li" active-class="active" to="/Haemostaseologie">
                  <a v-if="locale=='de'">Hämostaseologie</a>
                  <a v-else-if="locale=='en'">Hemostaseology</a>
                </router-link>
                <router-link tag="li" active-class="active" to="/Dosis">
                  <a v-if="locale=='de'">Dosis</a>
                  <a v-else-if="locale=='en'">Dose</a>
                </router-link>
                <router-link tag="li" active-class="active" to="/Impressum">
                  <a v-if="locale=='de'">Impressum</a>
                  <a v-else-if="locale=='en'">Imprint</a>
                </router-link>
                <li>
                  <div id="flagDiv">
                    <button
                      id="flag"
                      v-for="entry in languages"
                      :key="entry.language"
                      @click="locale=(entry.language)"
                    >
                      <flag :iso="entry.flag" v-bind:squared="false"/>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      hidden: true,
      locale: "de",

      languages: [
        { flag: "de", language: "de" },
        { flag: "gb", language: "en" }
      ]
    };
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val;
    }
  },
  methods: {
    gotoHome() {
      return this.$router.push("/");
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles.scss";

/**========= Navigationsleiste ============ */
#header-nav {
  width: 100%;
  height: 50px;
  background-color: $Navleiste;
  position: relative;
  font-size: 1.1rem;
  color: $NavLeiste_Logo;
}

#header-nav img {
  width: auto;
  height: 45px;
  margin: 0.2rem;
  float: left;
}

#header-nav img:hover {
  box-shadow: 0 0 2px 2px $NavSchrift, 0 0 20px $NavSchrift_marked;
  transition: box-shadow 0.2s ease-in-out;
  cursor: pointer;
}

#header-nav ul {
  margin: 2px;
  padding: 0;
  float: right;
  height: auto;
}

#header-nav li {
  display: inline-block;
  height: 100%;
  margin-right: 0.3rem;
  padding: 0 0.4rem;
}

#header-nav a {
  text-decoration: none;
  color: $NavSchrift;
  display: block;
  padding: 0.8rem 0.5rem;
  transition: 0.3s background-color;
}

#header-nav li.active {
  background-color: $Navleiste_marked;
  cursor: pointer;
}

#header-nav li:hover {
  text-decoration: none;
  box-shadow: inset 0 0 2px 2px $NavSchrift, 0 0 20px $NavSchrift_marked;
  transition: box-shadow 0.3s ease-in-out;
}

#flagDiv {
  height: 30px;
  padding-top: 2px;
}

#flag {
  background-color: $Navleiste;
  border: none;
  padding: 2px 20px;
}

#header-nav .col-6 {
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0;
}

#header-nav .container,
#header-nav .row,
#header-nav .col-6 {
  height: 100%;
}

/** --------- Navigationsleiste (MOBIL) ----------------- */

#mobile-nav-button {
  color: $NavSchrift_marked;
  float: right;
  font-size: 2rem;
  border: 2px solid $NavSchrift;
  width: 37px;
  height: 37px;
  position: relative;
  margin-top: 0.4rem;
  margin-bottom: 8px;
}

#mobile-nav-button > span {
  position: absolute;
  bottom: -2px;
  left: 7px;
}

#mobile-nav-content li {
  display: block;
  text-align: center;
  margin: 0.2rem 0;
}

#mobile-nav-content a {
  width: 100%;
}

#mobile-nav-dropdown {
  position: relative;
  display: block;
  float: right;
}

#mobile-nav-content {
  position: absolute;
  right: 0;
  top: 50px;
  background-color: $Navleiste;
  display: none;
  z-index: 1;
}

#mobile-nav-dropdown:hover {
  cursor: pointer;
}

#mobile-nav-dropdown:hover > #mobile-nav-content {
  display: block;
}

#mobile-nav {
  display: none;
}

@media (max-width: 863px) {
  #desktop-nav {
    display: none;
  }

  #mobile-nav {
    display: block;
  }
}
</style>


