# GitLab zu GitHub Migration - Schritte

## 1. Auf GitLab vorbereiten

### Repository-Einstellungen:
1. Gehen Sie zu **Settings > General**
2. Ändern Sie die **Project description** zu:
   ```
   ⚠️ UMGEZOGEN zu https://github.com/IhrGitHubUsername/narcocalc | Anästhesie-Rechner (PWA)
   ```

### Repository archivieren (optional):
1. **Settings > General > Advanced**
2. **Archive project** - verhindert neue Issues/MRs, aber hält alles lesbar

## 2. GitHub Repository erstellen

```bash
# Lokales Repository klonen (falls noch nicht vorhanden)
git clone https://gitlab.com/peuqui/narcocalc.git
cd narcocalc

# GitHub als neues Remote hinzufügen
git remote add github https://github.com/IhrGitHubUsername/narcocalc.git

# Alle Branches und Tags zu GitHub pushen
git push github --all
git push github --tags

# GitHub als Standard-Remote setzen
git remote set-url origin https://github.com/IhrGitHubUsername/narcocalc.git
```

## 3. GitLab CI/CD für Weiterleitung einrichten

1. Ersetzen Sie `.gitlab-ci.yml` mit der Redirect-Version
2. Committen und pushen:
   ```bash
   git add .gitlab-ci.yml
   git commit -m "Add redirect to GitHub"
   git push gitlab main
   ```

## 4. README aktualisieren

```bash
# README mit Umzugshinweis ersetzen
cp GITLAB_REDIRECT_README.md README.md
git add README.md
git commit -m "Update README with migration notice"
git push gitlab main
```

## 5. GitHub Actions einrichten

Erstellen Sie `.github/workflows/deploy.yml` für GitHub Pages:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 6. Wichtige URLs aktualisieren

- GitLab: https://peuqui.gitlab.io/narcocalc (zeigt Weiterleitung)
- GitHub: https://IhrGitHubUsername.github.io/narcocalc (neue URL)

## 7. Community informieren

- GitLab Issues mit Hinweis auf GitHub
- README Badge aktualisieren
- Dokumentation Links anpassen