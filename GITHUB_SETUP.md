# GitHub Setup Anleitung

## 1. Repository auf GitHub erstellen

1. Gehen Sie zu https://github.com/new
2. Repository Name: `narcocalc`
3. Description: "Anästhesie-Rechner (Progressive Web App) - Medical calculator for anaesthesia"
4. **Private repository** ✓ (zum Testen)
5. **NICHT** "Initialize with README" ankreuzen
6. Create repository

## 2. Code zu GitHub pushen

```bash
# Im narcocalc Verzeichnis
cd /home/mp/medizin/narcocalc

# GitHub als Remote hinzufügen
git remote add github https://github.com/Peuqui/narcocalc.git

# Aktuellen Stand committen
git add .
git commit -m "Prepare for GitHub migration: Add GitHub Actions workflow"

# Zu GitHub pushen
git push -u github main
```

## 3. GitHub Pages aktivieren

1. Gehen Sie zu: https://github.com/Peuqui/narcocalc/settings/pages
2. Source: "GitHub Actions" auswählen
3. Save

## 4. Erste Deployment triggern

```bash
# Kleine Änderung machen um Build zu triggern
echo "# Deployed on GitHub Pages" >> README.md
git add README.md
git commit -m "Trigger GitHub Actions deployment"
git push github main
```

## 5. Deployment überprüfen

1. Actions Tab: https://github.com/Peuqui/narcocalc/actions
2. Warten bis "Build and Deploy" grün ist
3. Ihre App ist erreichbar unter: https://Peuqui.github.io/narcocalc

## 6. PWA testen

- [ ] Seite lädt korrekt
- [ ] PWA kann installiert werden
- [ ] Offline-Funktionalität
- [ ] Alle Berechnungen funktionieren
- [ ] Sprachwechsel funktioniert

## 7. Optional: Custom Domain

Falls Sie eine eigene Domain haben:
1. CNAME Record auf `Peuqui.github.io` 
2. In GitHub Pages Settings die Domain eintragen
3. HTTPS aktivieren

## Nächste Schritte

Sobald alles funktioniert:
1. Migration Banner für GitLab Version vorbereiten
2. GitLab CI/CD für Weiterleitung einrichten
3. Nutzer informieren