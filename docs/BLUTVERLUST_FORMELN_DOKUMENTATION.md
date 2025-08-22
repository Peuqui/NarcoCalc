# Dokumentation: Blutverlust-Berechnungsformeln in NarcoCalc

## 1. Übersicht

Diese Dokumentation analysiert die aktuellen Blutverlust-Berechnungsformeln in der NarcoCalc-App und erarbeitet einen evidenzbasierten Plan zur Verbesserung der Formeln.

## 2. Aktuelle Implementierung in NarcoCalc

### 2.1 Verwendete Formeln (basierend auf Rehm et al. 2017)

Die App verwendet derzeit folgende Berechnungen:

#### Blutvolumen (BV)
```javascript
BV = BV_geschlechtsspezifisch × KOF
```
- Männer: 2678 ml/m² KOF
- Frauen: 2245 ml/m² KOF
- KOF = √((Körpergröße × Gewicht) / 3600)

#### Präoperatives Erythrozytenvolumen (EV)
```javascript
praeopEV = BV × (praeopHK / 100)
```

#### Intraoperatives Erythrozytenvolumen
```javascript
intraopEV = BV × (aktHK / 100)
```

#### Erythrozytenverlust
```javascript
eryVerlust = deltaEV + (EK_Anzahl × EryVolEK) + matEV
```
- deltaEV = praeopEV - intraopEV
- EryVolEK = 200 ml (Erythrozytenvolumen pro EK)

#### Blutverlust
```javascript
blutVerlust = eryVerlust / (mittlererHK / 100)
```

#### Maximal tolerierbarer Blutverlust (MTBV) - mit Logarithmus
```javascript
MTBV = BV × ln(praeopHK / minHK)
```
**Dies ist die einzige Formel mit natürlichem Logarithmus!**

### 2.2 Probleme der aktuellen Implementierung

1. **Lineare Berechnung**: Die meisten Formeln nehmen einen linearen Zusammenhang zwischen Hämatokrit und Blutverlust an
2. **Mittlerer Hämatokrit**: Verwendet arithmetisches Mittel statt gewichtetes Mittel über Zeit
3. **Keine Berücksichtigung der Hämodilution**: Volumensubstitution wird nicht in die HK-Berechnung einbezogen
4. **Statische Betrachtung**: Keine dynamische Anpassung während der OP

## 3. Analyse der Evidenz

### 3.1 Gießener Dissertation (2008)
- Erwähnt Berechnung des maximal erlaubten Blutverlusts basierend auf Geschlecht, Gewicht, Körpergröße und präoperativem Hämatokrit
- Spezifische Formeln mit Logarithmus wurden in der verfügbaren Zusammenfassung nicht gefunden

### 3.2 Rehm et al. (2017) - Der Anaesthesist
"Stand der Wissenschaft in der Flüssigkeits- und Volumentherapie"
- Empfiehlt 1:1 Ersatz von Flüssigkeitsverlusten mit kristalloiden Lösungen
- 3-Stufen-Konzept für Volumentherapie
- Perspiratio insensibilis: 0,5-1,0 ml/kg/h

### 3.3 Neuere Studien (2020-2025)

#### Hämoglobin-Massenverlust-Ansatz (2020)
- Genauere Methode als Blutvolumenverlust-Schätzung
- Berücksichtigt tatsächlichen Hb-Gehalt statt nur Volumen

#### López-Picado Formel
- Eine von drei häufig studierten Formeln
- Details nicht in verfügbaren Quellen

#### Gross-Formel (2025)
- Verwendet prä- und postoperative Erythrozyten-Volumen-Fraktion (EVF/Hämatokrit)
- Medianwerte zeigen Unterschiede zu gewichtsbasierten Methoden

### 3.4 Nadler-Formel für Blutvolumen
- Gilt als genaueste Methode
- Berücksichtigt Geschlecht, Größe, Gewicht und weitere Parameter

## 4. Vorschläge zur Formelverbesserung

### 4.1 Logarithmische Hämatokrit-Berechnung

**Hypothese**: Der nicht-lineare Abfall des Hämatokrits unter Volumensubstitution

```
Aktueller_HK = Präop_HK × e^(-Blutverlust/BV)
```

Umgestellt nach Blutverlust:
```
Blutverlust = -BV × ln(Aktueller_HK / Präop_HK)
```

**Vorteile**:
- Berücksichtigt exponentiellen Verdünnungseffekt
- Physiologisch akkurater bei großen Blutverlusten
- Bereits teilweise implementiert (MTBV-Formel)

### 4.2 Dynamische Hämodilution

Berücksichtigung der Volumensubstitution:
```
Effektives_BV = BV_initial + Volumensubstitution × Volumeneffekt
```

### 4.3 Zeitgewichteter mittlerer Hämatokrit

Statt arithmetisches Mittel:
```
Mittlerer_HK = Σ(HK_i × Zeitintervall_i) / Gesamt_OP_Zeit
```

### 4.4 Hämoglobin-Massenverlust-Berechnung

```
Hb_Massenverlust = (Präop_Hb × BV_präop) - (Postop_Hb × BV_postop)
```

## 5. Implementierungsplan

### Phase 1: Validierung (Priorität: Hoch)
1. Retrospektive Datenanalyse mit realen OP-Daten
2. Vergleich aktuelle Formeln vs. tatsächlicher Blutverlust
3. Statistische Auswertung der Abweichungen

### Phase 2: Formeloptimierung (Priorität: Hoch)
1. Implementation logarithmischer HK-Berechnung
2. Integration der Hämodilution
3. Zeitgewichtete HK-Berechnung

### Phase 3: Erweiterte Features (Priorität: Mittel)
1. Hb-Massenverlust als Alternative
2. Nadler-Formel für BV-Berechnung
3. Dynamische Anpassung während OP

### Phase 4: Validierung & Testing (Priorität: Hoch)
1. Prospektive Validierung mit neuen Daten
2. Vergleich mit etablierten Methoden
3. Anpassung basierend auf Feedback

## 6. To-Do Liste für Implementierung

### Kurzfristig (vor Programmierung)
- [ ] Literaturrecherche vertiefen (speziell Gießener Formel-Details)
- [ ] Zugang zu Volltext Rehm et al. 2017 organisieren
- [ ] Retrospektive Daten aus Ihrer Klinik sammeln
- [ ] Statistische Analysemethoden definieren
- [ ] GitHub-Repository vorbereiten

### Mittelfristig (Programmierung)
- [ ] Projekt von GitLab zu GitHub migrieren
- [ ] Neue Berechnungsmodule implementieren
- [ ] A/B-Testing-Framework einbauen
- [ ] Validierungsdaten-Interface erstellen
- [ ] Dokumentation für medizinisches Personal

### Langfristig (nach Implementierung)
- [ ] Klinische Validierungsstudie
- [ ] Publikation der Ergebnisse
- [ ] CE-Zertifizierung prüfen
- [ ] Integration in Kliniksysteme

## 7. Sicherheitshinweise

- App bleibt Demo-Version bis zur vollständigen Validierung
- Deutlicher Hinweis auf experimentelle Formeln
- Logging aller Berechnungen für Auswertung
- Fallback auf bewährte Formeln bei Unsicherheit

## 8. Offene Fragen

1. **Gießener Formel**: Vollständige mathematische Herleitung noch unklar
2. **Validierungsdaten**: Welche retrospektiven Daten sind verfügbar?
3. **Regulatorische Anforderungen**: Bei Übergang von Demo zu Medizinprodukt
4. **Integration**: Schnittstellen zu bestehenden Anästhesie-Systemen?

## 9. Literaturverzeichnis

1. Rehm M, Hulde N, Kammerer T, et al. Stand der Wissenschaft in der Flüssigkeits- und Volumentherapie. Anaesthesist. 2017;66:153-167.
2. Gerdessen L, et al. Comparison of common perioperative blood loss estimation techniques. 2021.
3. López-Picado A, et al. Determination of Perioperative Blood Loss: accuracy or Approximation? 2017.
4. Nadler SB, et al. Prediction of blood volume in normal human adults. Surgery. 1962.
5. Dissertation Universität Gießen. 2008. URN: urn:nbn:de:hebis:26-opus-54704

---

*Erstellt: 2025-01-13*  
*Autor: Dr. med. [Ihr Name], Oberarzt Anästhesiologie*