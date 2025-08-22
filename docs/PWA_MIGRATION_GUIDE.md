# PWA Migration von GitLab zu GitHub - Technische Details

## 🔄 Was passiert mit installierten PWAs?

### Bereits installierte PWAs (GitLab)
- **Bleiben funktionsfähig** mit der alten URL
- Service Worker cached die App lokal
- Funktioniert offline weiter
- ABER: Keine Updates mehr

### Das Problem:
- PWAs sind an ihre Origin-URL gebunden (https://peuqui.gitlab.io/narcocalc)
- Diese URL kann nicht einfach "umgeleitet" werden
- Service Worker und Manifest sind domain-spezifisch

## 📱 Empfohlene Migrationsstrategie

### 1. **Sanfte Migration mit Update-Hinweis**

Letztes Update auf GitLab mit Hinweis im Service Worker:

```javascript
// registerServiceWorker.js - Letztes GitLab Update
self.addEventListener('activate', event => {
  event.waitUntil(
    clients.claim().then(() => {
      return clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'MIGRATION_NOTICE',
            message: 'Neue Version verfügbar auf GitHub!',
            newUrl: 'https://[username].github.io/narcocalc'
          });
        });
      });
    })
  );
});
```

### 2. **In-App Migration Banner**

```vue
<!-- App.vue - Migration Notice Component -->
<template>
  <div id="app">
    <div v-if="showMigrationNotice" class="migration-banner">
      <div class="migration-content">
        <h3>🚀 NarcoCalc ist umgezogen!</h3>
        <p>Eine neue Version mit verbesserten Funktionen ist verfügbar.</p>
        <button @click="installNewPWA" class="migration-btn">
          Neue Version installieren
        </button>
        <button @click="dismissNotice" class="dismiss-btn">
          Später erinnern
        </button>
      </div>
    </div>
    <!-- Rest der App -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMigrationNotice: false,
      newPWAUrl: 'https://[username].github.io/narcocalc'
    };
  },
  mounted() {
    // Check if running from GitLab domain
    if (window.location.hostname.includes('gitlab.io')) {
      this.showMigrationNotice = true;
    }
  },
  methods: {
    installNewPWA() {
      // Neue PWA URL öffnen
      window.open(this.newPWAUrl, '_blank');
      // Optional: Anleitung anzeigen
      alert('Bitte installieren Sie die App von der neuen Seite. Sie können dann diese alte Version deinstallieren.');
    },
    dismissNotice() {
      this.showMigrationNotice = false;
      localStorage.setItem('migrationDismissed', Date.now());
    }
  }
};
</script>

<style scoped>
.migration-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #ff6b6b;
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  z-index: 9999;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
}

.migration-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.migration-btn {
  background: white;
  color: #ff6b6b;
  border: none;
  padding: 0.5rem 1.5rem;
  margin: 0.5rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.dismiss-btn {
  background: transparent;
  color: white;
  border: 1px solid white;
  padding: 0.5rem 1.5rem;
  margin: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

### 3. **Manifest Update für neue Installation**

```json
// public/manifest.json auf GitHub
{
  "name": "NarcoCalc",
  "short_name": "NarcoCalc",
  "start_url": "/narcocalc/",
  "display": "standalone",
  "theme_color": "#aa2b1d",
  "background_color": "#ffffff",
  "related_applications": [{
    "platform": "webapp",
    "url": "https://peuqui.gitlab.io/narcocalc/manifest.json",
    "id": "narcocalc-legacy",
    "comment": "Legacy GitLab version"
  }]
}
```

## 🔧 Technische Überlegungen

### Service Worker Scope
- GitLab: `/narcocalc/` 
- GitHub: `/narcocalc/`
- Beide können parallel existieren!

### Update-Mechanismus
1. **Push-Benachrichtigungen** (wenn implementiert)
2. **In-App Banner** bei App-Start
3. **Meta-Refresh** auf der GitLab Pages Seite

## 📋 Migrations-Checkliste

### Für Nutzer der alten PWA:
- [ ] Banner-Hinweis beim App-Start
- [ ] Link zur neuen Version
- [ ] Anleitung zum Deinstallieren der alten Version
- [ ] Daten-Export Option (falls relevant)

### Für neue Nutzer:
- [ ] GitLab Pages leitet zur GitHub Version
- [ ] Alte PWA Installation wird verhindert
- [ ] Klare Kommunikation über die neue URL

## 💡 Best Practice Empfehlung

### Zweistufiger Ansatz:

**Phase 1 (1-2 Monate):**
- Beide Versionen parallel betreiben
- Migration Banner in alter App
- Updates nur auf GitHub

**Phase 2:**
- GitLab Version mit "End of Life" Nachricht
- Automatische Weiterleitung für Web-Nutzer
- Service Worker mit Deprecation Warning

### Code für EOL Service Worker:
```javascript
// Finaler Service Worker auf GitLab
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      new Response(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>NarcoCalc - Umgezogen</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              font-family: system-ui, sans-serif;
              padding: 2rem;
              text-align: center;
              background: #f5f5f5;
            }
            .container {
              max-width: 500px;
              margin: 0 auto;
              background: white;
              padding: 2rem;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .button {
              display: inline-block;
              background: #aa2b1d;
              color: white;
              padding: 1rem 2rem;
              text-decoration: none;
              border-radius: 4px;
              margin-top: 1rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>⚠️ Diese Version ist veraltet</h1>
            <p>NarcoCalc ist zu GitHub umgezogen.</p>
            <p>Bitte installieren Sie die neue Version:</p>
            <a href="https://[username].github.io/narcocalc" class="button">
              Zur neuen Version
            </a>
            <p style="margin-top: 2rem; font-size: 0.9em; color: #666;">
              Sie können diese App unter<br>
              Einstellungen → Apps → NarcoCalc<br>
              deinstallieren.
            </p>
          </div>
        </body>
        </html>
      `, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      })
    );
  }
});
```

## 🎯 Zusammenfassung

**Installierte PWAs können nicht "umgeleitet" werden**, aber:
1. Nutzer können informiert werden
2. Sanfte Migration ist möglich
3. Beide Versionen können koexistieren
4. Klare Kommunikation ist entscheidend

Die beste Strategie: **Übergangsphase** mit beiden Versionen, dann schrittweise Abschaltung der alten Version.