# NarcoCalc - Projektstatus und To-Do-Liste

*Stand: 2025-01-13*

## 📊 Aktueller Status

### ✅ Erledigt

1. **Blutverlust-Formeln analysiert**
   - Aktuelle Implementation basiert auf Rehm et al. 2017
   - MTBV verwendet bereits logarithmische Berechnung
   - Andere Formeln sind linear und berücksichtigen keine Hämodilution

2. **Literaturrecherche durchgeführt**
   - Gießener Dissertation (2008) untersucht
   - Neuere Studien (2020-2025) recherchiert
   - Evidenzbasierte Alternativen identifiziert

3. **GitHub Migration vorbereitet**
   - Code erfolgreich zu GitHub gepusht (privates Repository)
   - GitHub Actions Workflow erstellt
   - Migrationsstrategie für PWA dokumentiert

4. **Dokumentation erstellt**
   - Ausführliche Blutverlust-Formeln Dokumentation
   - PWA Migrationsleitfaden
   - CLAUDE.md für zukünftige Entwicklung

### 🔄 In Arbeit

- Vue 2 zu Vue 3 Migration geplant
- Repository ist privat für Entwicklungsphase

## 📋 To-Do-Liste

### 1. Technische Modernisierung (Priorität: Hoch)

#### Vue 3 Migration
- [ ] Neues Vue 3 + Vite Projekt erstellen
- [ ] TypeScript Integration prüfen
- [ ] Komponenten migrieren:
  - [ ] App.vue (Hauptkomponente)
  - [ ] Haemostaseologie.vue (Kernfunktionalität)
  - [ ] Beatmung.vue
  - [ ] Dosierung.vue
  - [ ] Navigation.vue
  - [ ] Footer.vue
- [ ] Vue I18n auf Version 9 aktualisieren
- [ ] Vue Router auf Version 4 aktualisieren
- [ ] PWA-Plugin für Vite einrichten

#### Dependencies modernisieren
- [ ] vue-numeric-input Alternative für Vue 3 finden
- [ ] vue-flag-icon Alternative evaluieren
- [ ] Build-System von Webpack auf Vite umstellen

### 2. Blutverlust-Formeln verbessern (Priorität: Hoch)

#### Neue Berechnungsmodelle
- [ ] Logarithmische HK-Berechnung implementieren:
  ```javascript
  Blutverlust = -BV × ln(Aktueller_HK / Präop_HK)
  ```
- [ ] Hämodilution-Effekt einbauen
- [ ] Zeitgewichteten mittleren HK berechnen
- [ ] Hämoglobin-Massenverlust als Alternative

#### Validierung
- [ ] Testdaten aus Ihrer Klinik sammeln
- [ ] Vergleich alte vs. neue Formeln
- [ ] Statistische Auswertung
- [ ] Feedback von Kollegen einholen

### 3. UI/UX Verbesserungen (Priorität: Mittel)

- [ ] Responsives Design optimieren
- [ ] Dark Mode implementieren
- [ ] Größere Touch-Targets für mobile Geräte
- [ ] Ergebnisse prominenter darstellen
- [ ] Export-Funktion für Berechnungen
- [ ] Verlaufsdarstellung für multiple HB-Werte

### 4. Neue Features (Priorität: Mittel)

- [ ] Grafische Darstellung des HK-Verlaufs
- [ ] Transfusionstrigger-Berechnung
- [ ] Gerinnungsmanagement-Modul
- [ ] PDF-Export der Berechnungen
- [ ] Offline-Datenspeicherung (IndexedDB)

### 5. Qualitätssicherung (Priorität: Hoch)

- [ ] Unit Tests mit Vitest einrichten
- [ ] E2E Tests mit Playwright
- [ ] Medizinische Validierung aller Formeln
- [ ] Accessibility (WCAG 2.1) prüfen
- [ ] Performance-Optimierung

### 6. Deployment & Migration (Priorität: Niedrig - nach Fertigstellung)

- [ ] GitHub Repository public machen
- [ ] GitHub Pages aktivieren
- [ ] Custom Domain einrichten (falls gewünscht)
- [ ] GitLab Migration durchführen:
  - [ ] Migration Banner implementieren
  - [ ] CI/CD Weiterleitung einrichten
  - [ ] Nutzer informieren
- [ ] App Stores evaluieren (PWA → TWA)

### 7. Dokumentation & Compliance (Priorität: Mittel)

- [ ] Medizinische Dokumentation erweitern
- [ ] API-Dokumentation (falls Backend geplant)
- [ ] Datenschutzerklärung aktualisieren
- [ ] CE-Kennzeichnung prüfen (Medizinprodukt?)
- [ ] Haftungsausschluss prominent platzieren

## 🚀 Empfohlene Reihenfolge

1. **Phase 1: Modernisierung** (1-2 Wochen)
   - Vue 3 Migration
   - Build-System modernisieren
   - Tests einrichten

2. **Phase 2: Formelverbesserung** (2-3 Wochen)
   - Neue Berechnungen implementieren
   - A/B Testing vorbereiten
   - Validierung mit echten Daten

3. **Phase 3: Features & Polish** (2-3 Wochen)
   - UI/UX Verbesserungen
   - Neue Features
   - Performance-Optimierung

4. **Phase 4: Go-Live** (1 Woche)
   - Repository public machen
   - GitLab Migration
   - Nutzer informieren

## 💡 Wichtige Überlegungen

### Medizinische Aspekte
- Formeln müssen evidenzbasiert sein
- Klare Kennzeichnung als Demo/Nicht-Medizinprodukt
- Transparente Berechnungsgrundlagen
- Versionierung für Nachvollziehbarkeit

### Technische Aspekte
- PWA-Funktionalität erhalten
- Offline-Fähigkeit sicherstellen
- Performance auf mobilen Geräten
- Barrierefreiheit gewährleisten

### Rechtliche Aspekte
- Haftungsausschluss prominent
- Datenschutz bei Nutzerdaten
- Open Source Lizenz beibehalten
- CE-Kennzeichnung evaluieren

## 📞 Nächste Schritte

Wenn Sie weitermachen möchten:

1. **Entscheidung**: Vue 2 beibehalten oder auf Vue 3 migrieren?
2. **Prioritäten**: Was ist Ihnen am wichtigsten?
3. **Ressourcen**: Testdaten aus der Klinik?
4. **Timeline**: Wann soll es live gehen?

---

*Alle Dateien und Dokumentationen sind im Repository verfügbar.*
*Bei Fragen oder zur Fortsetzung einfach melden!*