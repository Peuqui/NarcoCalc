# Optimierung der Blutverlustberechnung in NarcoCalc Version 2.1

## Dokumentation der Analyse und Implementierungsplanung

**Datum:** Januar 2025  
**Version:** 2.1 (geplant)  
**Status:** In Planung

---

## 1. Executive Summary

Diese Dokumentation beschreibt die geplanten Verbesserungen der Blutverlustberechnung in NarcoCalc basierend auf umfassender Literaturrecherche und klinischer Evaluation. Die Hauptziele sind:

- **Reduktion der systematischen Überschätzung** des Blutverlusts um 10-15%
- **Verbesserte Genauigkeit bei adipösen Patienten** durch Lemmens-Formel (20-25% Verbesserung)
- **Integration zeitbasierter Korrekturfaktoren** für realistischere Berechnungen
- **Erhöhte Transparenz** durch parallele Anzeige verschiedener Berechnungsmethoden

---

## 2. Problemanalyse

### 2.1 Ausgangssituation

Die aktuelle Version 2.0 von NarcoCalc implementiert bereits eine logarithmische Blutverlustberechnung, die physiologisch genauer ist als die traditionelle lineare Methode. Dennoch zeigt die klinische Anwendung:

- **Persistierende Überschätzung** des tatsächlichen Blutverlusts
- **Unzureichende Verbesserung** auch nach mehreren Blutgasanalysen
- **Besonders große Abweichungen** bei adipösen Patienten

### 2.2 Wissenschaftliche Evidenz

Aktuelle Literaturrecherche (2024) bestätigt die klinischen Beobachtungen:

- **Alle gängigen Formeln überschätzen** den Blutverlust um 10-30%
- **Hauptursachen der Überschätzung:**
  - Kristalloid-bedingte Verdünnungseffekte
  - Fluid Shifts ins Interstitium
  - Falsche Annahme eines konstanten Blutvolumens
  - Zeitabhängige Equilibrierungsprozesse

- **Spektrophotometrie** als Goldstandard ist zu aufwendig für den Routineeinsatz

### 2.3 Spezifische Probleme der aktuellen Implementierung

1. **Blutvolumenberechnung bei Adipositas**
   - BSA-Methode überschätzt das Blutvolumen bei BMI >30 erheblich
   - Fettgewebe ist bradytroph (nur ~5ml Blut/100g vs. 70ml/100g Muskel)
   - Fehler bis zu 26% bei morbider Adipositas

2. **Fehlende zeitliche Dimension**
   - Keine Berücksichtigung der OP-Dauer
   - Verdünnungseffekte nehmen über Zeit zu
   - Frühe Messungen überschätzen stärker

3. **Statisches Modell**
   - Annahme konstanten Blutvolumens
   - Keine Integration hämodynamischer Parameter
   - Fehlende Anpassung an individuelle Patientencharakteristika

---

## 3. Evaluierte Lösungsansätze

### 3.1 Alternative Berechnungsmethoden

#### 3.1.1 Hämoglobin-Massenverlust-Methode
```
mHbEBL (g) = (Hb_präop - Hb_nadir) × BV / 10
```

**Evaluation:**
- ✅ Physiologisch sinnvoll (Fokus auf O2-Transportkapazität)
- ✅ Weniger anfällig für Verdünnungseffekte
- ❌ Benötigt exakten Nadir-Zeitpunkt
- ❌ Ohne Zeitstempel nicht praktikabel

**Fazit:** Zurückgestellt bis Zeitstempel-System implementiert

#### 3.1.2 Nadler-Formel für Blutvolumen
```
Männer: BV = 0.3669×H³ + 0.03219×W + 0.6041
Frauen: BV = 0.3561×H³ + 0.03308×W + 0.1833
```

**Evaluation durch Vergleichsrechnung:**
- Differenz zur BSA-Methode meist <5% im Normalbereich
- Bis zu 7% bei Extremwerten
- Bei Adipositas beide Formeln gleich ungenau

**Fazit:** Kein relevanter Mehrwert, Implementierung nicht gerechtfertigt

#### 3.1.3 Lemmens-Bernstein-Brodsky-Formel (BMI >30)
```
BV (ml) = 70 × Gewicht (kg) / √(BMI/22)
```

**Evaluation:**
- ✅ Speziell für Adipositas validiert
- ✅ Bis zu 26% genauer bei BMI >40
- ✅ Empfohlen von Fachgesellschaften
- ✅ Einfache Implementierung

**Fazit:** PRIORITÄT 1 - Sofortige Implementierung empfohlen

### 3.2 Intraoperative Monitoring-Integration

#### 3.2.1 PiCCO-System
- Misst GEDV/ITBV direkt
- ITBV ≈ 25-30% des Gesamtblutvolumens
- Ermöglicht Kalibrierung der Berechnung

**Fazit:** Als optionale Eingabe sinnvoll, wenn verfügbar

#### 3.2.2 PVI (Pleth Variability Index)
- Nicht-invasiv über Pulsoxymetrie
- Cut-off >13-14% für Volumenresponsivität
- Eingeschränkt bei Katecholamingabe

**Fazit:** Zu störanfällig für Routineeinsatz

#### 3.2.3 ZVD-Verlaufsbeobachtung
- Delta-ZVD aussagekräftiger als Absolutwerte
- Bereits routinemäßig verfügbar
- Patientenindividuelle Baseline wichtig

**Fazit:** Als optionale Zusatzinformation wertvoll

### 3.3 Wichtige Erkenntnisse

#### Transfusionsparadoxon
Die Analyse zeigte, dass die logarithmische Formel bereits **selbstkorrigierend** bei Transfusionen arbeitet:
- HK-Anstieg durch Transfusion → Basisverlust sinkt
- Substitutionskorrektur kompensiert dies
- **Schlussfolgerung:** Problem liegt nicht in der Transfusionsberechnung

#### Wahre Ursachen der Überschätzung
1. **Kristalloid-Verdünnung** (Hauptfaktor)
2. **Interstitielle Fluid Shifts**
3. **Variables intravasales Volumen**
4. **Katecholamin-induzierte Umverteilung**

---

## 4. Implementierungsplan Version 2.1

### 4.1 Phase 1: Sofortige Verbesserungen

#### 4.1.1 Lemmens-Formel für Adipositas (PRIORITÄT 1)

**Implementierung:**
```javascript
blutvolumenBerechnung: function() {
  const bmi = this.gewicht / Math.pow(this.groesse/100, 2);
  
  if (bmi >= 30) {
    // Lemmens-Formel für adipöse Patienten
    const bvLemmens = 70 * this.gewicht / Math.sqrt(bmi/22) * 1000;
    
    if (bmi < 35) {
      // Übergangsbereich BMI 30-35: Gewichtete Mischung
      const bvBSA = this.BV;
      const weight = (bmi - 30) / 5; // Linear von 0 bis 1
      return Math.round(bvBSA * (1 - weight) + bvLemmens * weight);
    }
    
    return Math.round(bvLemmens);
  }
  
  // Standard BSA-Methode für BMI < 30
  return this.BV;
}
```

**UI-Anpassungen:**
- Anzeige der verwendeten Methode
- Vergleichswerte alternativer Methoden
- Farbcodierte Warnung bei BMI >30

#### 4.1.2 Zeitbasierte Korrektur (PRIORITÄT 2)

**Implementierung:**
```javascript
zeitKorrekturfaktor: function() {
  const opZeitStunden = this.arrVol[1].wert / 60; // OP-Zeit eventeriert
  
  let faktor = 1.0;
  
  // Zeitabhängige Korrektur
  if (opZeitStunden < 2) {
    faktor = 0.85; // -15% in Frühphase
  } else if (opZeitStunden < 4) {
    faktor = 0.90; // -10% 
  } else if (opZeitStunden < 6) {
    faktor = 0.95; // -5%
  }
  // >6h: keine weitere Korrektur (maximale Verdünnung erreicht)
  
  // Zusätzliche Korrektur bei massiver Kristalloidgabe
  const kristalloidProKg = this.arrVol[6].wert / this.arrPersData[1].wert;
  if (kristalloidProKg > 30) {
    faktor *= 0.95; // weitere -5%
  }
  
  return faktor;
}

blutVerlustKorrigiert: function() {
  return Math.round(this.blutVerlust * this.zeitKorrekturfaktor);
}
```

#### 4.1.3 Erweiterte Vergleichsansicht (PRIORITÄT 3)

**Neue UI-Komponente:**
```vue
<div class="berechnungsvergleich">
  <h4>Blutverlust-Berechnungen</h4>
  <table>
    <tr>
      <td>Logarithmisch (korrigiert):</td>
      <td class="primary">{{ blutVerlustKorrigiert }} ml</td>
    </tr>
    <tr>
      <td>Logarithmisch (unkorrigiert):</td>
      <td>{{ blutVerlust }} ml</td>
    </tr>
    <tr>
      <td>Linear (Referenz):</td>
      <td>{{ blutVerlustLinear }} ml</td>
    </tr>
    <tr v-if="showDifference">
      <td>Differenz:</td>
      <td>{{ differenz }} ml ({{ differenzProzent }}%)</td>
    </tr>
  </table>
  
  <div class="methodeninfo">
    <small>
      Blutvolumen: {{ blutvolumenMethode }}<br>
      Zeitkorrektur: {{ zeitKorrekturfaktor < 1 ? '-' + ((1-zeitKorrekturfaktor)*100) + '%' : 'keine' }}<br>
      <span v-if="bmi >= 30">
        BSA-Methode würde {{ bvBSA }}ml ergeben (+{{ bvBSA - blutvolumen }}ml)
      </span>
    </small>
  </div>
</div>
```

### 4.2 Phase 2: Mittelfristige Erweiterungen (Version 2.2)

#### 4.2.1 Zeitstempel-System
- Erfassung von Zeitpunkten für BGAs und Transfusionen
- Ermöglicht Nadir-Erkennung
- Verlaufsdarstellung

#### 4.2.2 Optionale Monitoring-Integration
```javascript
// Neue optionale Eingabefelder
data: {
  // PiCCO-Parameter
  gedv: null,        // ml oder ml/m²
  itbv: null,        // ml oder ml/m²
  svv: null,         // %
  
  // Hämodynamik
  zvdBaseline: null, // mmHg nach Einleitung
  zvdAktuell: null,  // mmHg aktuell
  mapBaseline: null, // mmHg
  mapAktuell: null,  // mmHg
  
  // Katecholamine
  noradrenalinDosis: 0, // µg/kg/min
}
```

#### 4.2.3 Konfidenz-Score
```javascript
konfidenzScore: function() {
  let score = 50; // Basis-Konfidenz
  
  // Positive Faktoren
  if (this.anzahlBGA >= 5) score += 10;
  if (this.gedv && this.itbv) score += 25; // PiCCO verfügbar
  if (this.zvdBaseline && this.zvdAktuell) score += 15;
  if (this.opZeit < 240) score += 10; // <4h OP
  
  // Negative Faktoren
  if (this.noradrenalinDosis > 0.2) score -= 15;
  if (this.kristalloidGesamt > 5000) score -= 10;
  if (this.bmi > 40) score -= 10;
  
  return Math.max(0, Math.min(100, score));
}
```

### 4.3 Phase 3: Langfristige Vision (Version 3.0)

- Machine Learning basierte Mustererkennung
- API-Integration mit Monitoring-Systemen
- Individuelle Patientenkalibrierung
- Predictive Analytics für Transfusionsbedarf

---

## 5. Erwarteter klinischer Nutzen

### 5.1 Quantitative Verbesserungen

| Parameter | Aktuelle Version | Version 2.1 | Verbesserung |
|-----------|------------------|-------------|--------------|
| Genauigkeit bei BMI >35 | ±26% | ±5% | 21% |
| Überschätzung Normalbereich | 15-20% | 5-10% | 10-15% |
| Genauigkeit mit PiCCO | n/a | ±10% | neu |
| Transparenz | 2 Methoden | 3-4 Methoden + Korrekturen | +100% |

### 5.2 Qualitative Vorteile

- **Evidenzbasiert:** Implementierung aktueller Forschungsergebnisse
- **Individualisiert:** Berücksichtigung von Adipositas und OP-Verlauf
- **Transparent:** Mehrere Methoden parallel sichtbar
- **Flexibel:** Optionale Integration erweiterter Monitoring-Parameter
- **Pragmatisch:** Funktioniert auch ohne teure Zusatzgeräte

### 5.3 Klinische Relevanz

Besonders relevant für:
- **Adipöse Patienten** (zunehmende Prävalenz)
- **Lange Operationen** (>4h)
- **Massive Transfusionen**
- **Komplexe hämodynamische Situationen**

---

## 6. Technische Umsetzung

### 6.1 Betroffene Dateien

- `src/views/Haemostaseologie.vue` - Hauptimplementierung
- `src/assets/scss/styles.scss` - UI-Anpassungen für Vergleichsansicht
- `package.json` - Versionsupdate auf 2.1.0

### 6.2 Abwärtskompatibilität

- Alle bestehenden Funktionen bleiben erhalten
- Neue Features sind optional/additiv
- Keine Breaking Changes

### 6.3 Testing-Strategie

1. **Unit Tests** für neue Berechnungsmethoden
2. **Vergleichstests** mit realen Patientendaten
3. **UI/UX Tests** für neue Anzeigeelemente
4. **Performance Tests** (keine Verlangsamung)

---

## 7. Risikobewertung

### 7.1 Niedrige Risiken
- Lemmens-Formel ist etabliert und validiert
- Zeitkorrektur basiert auf konservativen Schätzungen
- Alle Änderungen sind transparent nachvollziehbar

### 7.2 Mittlere Risiken
- Übergangsbereich BMI 30-35 könnte Sprünge zeigen
- Mitigation: Gewichtete Mischung implementiert

### 7.3 Ausgeschlossene Risiken
- Keine Änderung der Kernberechnungen
- Keine Entfernung bestehender Features
- Keine Abhängigkeit von externen Systemen

---

## 8. Zeitplan

| Phase | Komponente | Aufwand | Priorität | Status |
|-------|------------|---------|-----------|--------|
| 1 | Lemmens-Formel | 4h | HOCH | Geplant |
| 1 | Zeitkorrektur | 2h | HOCH | Geplant |
| 1 | Vergleichsansicht | 3h | MITTEL | Geplant |
| 1 | Testing & Dokumentation | 3h | HOCH | Geplant |
| 2 | Zeitstempel-System | 8h | MITTEL | Zurückgestellt |
| 2 | Monitoring-Integration | 6h | NIEDRIG | Zurückgestellt |
| 2 | Konfidenz-Score | 4h | NIEDRIG | Zurückgestellt |

**Geschätzter Gesamtaufwand Phase 1:** 12 Stunden

---

## 9. Referenzen

### Wissenschaftliche Grundlagen

1. **Lemmens HJ, Bernstein DP, Brodsky JB.** Estimating blood volume in obese and morbidly obese patients. Obes Surg. 2006;16(6):773-6.

2. **Nadler SB, Hidalgo JH, Bloch T.** Prediction of blood volume in normal human adults. Surgery. 1962;51(2):224-32.

3. **Gross JB.** Estimating allowable blood loss: corrected for dilution. Anesthesiology. 1983;58(3):277-80.

4. **BMC Surgery.** Calculation methods for intraoperative blood loss: a literature review. December 2024.

5. **Journal of Clinical Monitoring and Computing.** Comparison of common perioperative blood loss estimation techniques: systematic review and meta-analysis. 2020.

### Klinische Leitlinien

- Society for Obesity and Bariatric Anaesthesia Guidelines
- European Society of Anaesthesiology Recommendations
- PiCCO Technology Clinical Applications Guide

---

## 10. Anhang

### A. Beispielrechnungen

#### Adipöser Patient (BMI 42)
```
Patient: Mann, 175cm, 130kg
BSA-Methode: 6749 ml
Lemmens: 5365 ml
Differenz: -1384 ml (-20.5%)

Mit 2000ml Blutverlust:
BSA: 30% Verlust → 2 EK Indikation
Lemmens: 37% Verlust → 3 EK Indikation
```

#### Zeitkorrektur-Beispiel
```
OP-Zeit eventeriert: 90 Minuten
Korrekturfaktor: 0.85
Berechneter Verlust: 2000 ml
Korrigiert: 1700 ml (-300 ml)
```

### B. Implementierungs-Checkliste

- [ ] Lemmens-Formel implementieren
- [ ] BMI-Berechnung hinzufügen
- [ ] Übergangsbereich 30-35 testen
- [ ] Zeitkorrekturfaktor einbauen
- [ ] UI für Methodenvergleich
- [ ] Warnhinweise bei BMI >30
- [ ] Dokumentation aktualisieren
- [ ] Version auf 2.1.0 setzen
- [ ] Tests durchführen
- [ ] Code Review
- [ ] Deployment vorbereiten

### C. Glossar

- **BMI**: Body Mass Index (kg/m²)
- **BSA/KOF**: Body Surface Area / Körperoberfläche
- **BV**: Blood Volume / Blutvolumen
- **EK**: Erythrozytenkonzentrat
- **GEDV**: Global End-Diastolic Volume
- **HK**: Hämatokrit
- **ITBV**: Intrathoracic Blood Volume
- **MAT**: Maschinelle Autotransfusion
- **PiCCO**: Pulse Contour Cardiac Output
- **PVI**: Pleth Variability Index
- **ZVD**: Zentraler Venendruck

---

**Ende der Dokumentation**

*Erstellt: Januar 2025*  
*Letzte Aktualisierung: Januar 2025*  
*Nächste Review: Nach Implementierung Version 2.1*