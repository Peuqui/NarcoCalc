# GitLab Weiterleitungs-Setup

## Schnellanleitung für GitLab Pages Weiterleitung

### Option 1: Über GitLab Web-Interface

1. Gehen Sie zu: https://gitlab.com/peuqui/narcocalc
2. Klicken Sie auf "+" → "New file"
3. Dateiname: `public/index.html`
4. Kopieren Sie den kompletten Inhalt von `gitlab-redirect/index.html` 
5. Commit Message: "Add redirect to GitHub"
6. Commit to main branch

### Option 2: Lokales GitLab Repository

Falls Sie noch ein lokales GitLab Repository haben:

```bash
cd /pfad/zu/gitlab/narcocalc
cp -r /pfad/zu/github/NarcoCalc/gitlab-redirect/* .
git add .
git commit -m "Add redirect page to GitHub"
git push origin main
```

### Option 3: Minimale HTML-Weiterleitung

Wenn Sie nur eine einfache Weiterleitung wollen, erstellen Sie auf GitLab eine Datei `public/index.html` mit:

```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=https://peuqui.github.io/NarcoCalc">
    <title>NarcoCalc - Umgezogen zu GitHub</title>
</head>
<body>
    <p>NarcoCalc ist umgezogen. Sie werden weitergeleitet zu <a href="https://peuqui.github.io/NarcoCalc">https://peuqui.github.io/NarcoCalc</a></p>
</body>
</html>
```

## Was passiert dann?

- GitLab Pages wird automatisch die Seite deployen
- Besucher von https://peuqui.gitlab.io/narcocalc werden automatisch weitergeleitet
- Die schöne Version (gitlab-redirect/index.html) zeigt einen 5-Sekunden-Countdown
- Die minimale Version leitet sofort weiter

## Dateien zum Hochladen

Die Dateien befinden sich im `gitlab-redirect/` Ordner:
- `index.html` - Die Weiterleitungsseite
- `.gitlab-ci.yml` - GitLab CI Konfiguration (optional, GitLab erkennt public/ automatisch)