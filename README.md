# Growthly - Site Vitrine

Ce dépôt contient le code source du site vitrine pour Growthly, une agence de croissance digitale moderne et innovante.

## 🚀 Comment lancer le site

### Option 1 : Méthode simple (Navigateur local)

1. Clonez ce dépôt sur votre machine :
   ```bash
   git clone https://github.com/growthly-maker/growthly-site.git
   cd growthly-site
   ```

2. Ouvrez le fichier `index.html` directement dans votre navigateur :
   - Double-cliquez sur le fichier dans votre explorateur de fichiers
   - Ou faites glisser le fichier dans une fenêtre de navigateur ouverte

### Option 2 : Serveur de développement local

Pour un environnement de développement plus robuste (recommandé) :

1. Clonez ce dépôt sur votre machine :
   ```bash
   git clone https://github.com/growthly-maker/growthly-site.git
   cd growthly-site
   ```

2. Vous pouvez utiliser l'une des méthodes suivantes :

   **Avec Python** (si Python est installé) :
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   **Avec Node.js et http-server** (si Node.js est installé) :
   ```bash
   # Installer http-server globalement (si pas déjà fait)
   npm install -g http-server
   
   # Lancer le serveur
   http-server -p 8000
   ```
   
   **Avec VS Code et l'extension Live Server** :
   - Installez l'extension "Live Server" dans VS Code
   - Ouvrez le dossier du projet dans VS Code
   - Cliquez sur "Go Live" dans la barre d'état en bas à droite
   - Ou faites un clic droit sur `index.html` et sélectionnez "Open with Live Server"

3. Accédez au site dans votre navigateur à l'adresse suivante :
   ```
   http://localhost:8000
   ```

## 🔧 Développement

### Branches et workflow

Ce projet utilise un workflow basé sur des branches thématiques :

1. Chaque section du site a sa propre branche de développement
2. Travaillez sur la branche correspondant à la section que vous développez :
   ```bash
   git checkout feature/hero-section
   ```

3. Lorsque vous avez terminé les modifications :
   ```bash
   git add .
   git commit -m "Description de vos modifications"
   git push origin feature/nom-de-la-branche
   ```

4. Créez une pull request pour fusionner vos changements dans la branche `main`

### Issues GitHub

Des issues GitHub ont été créées pour chaque section du site. Consultez-les pour :
- Voir les tâches à réaliser
- Comprendre les spécifications de design
- Suivre les recommandations techniques

## 📁 Structure du Projet

- `index.html` - Page principale du site
- `css/style.css` - Styles globaux du site
- `js/script.js` - Fonctionnalités JavaScript du site
- `assets/` - Dossier contenant les ressources (images, fonts, icons)

## 🎨 Design & Fonctionnalités

- Design moderne et épuré suivant les tendances 2025/2026
- Site responsive adapté à tous les appareils
- Animations et interactions subtiles pour une expérience utilisateur optimale
- Structure sémantique pour un meilleur référencement

## 📑 Sections du Site

- Hero Banner
- Services
- Portfolio
- À propos
- Témoignages
- Contact

## 🎭 Palette de Couleurs

- Teal Muted (#5D859B) - Couleur principale
- Mustard (#FFCD3D) - Accent dynamique
- Bleu foncé (#2C3E50) - Texte principal
- Blanc cassé (#F8F9FA) - Arrière-plans
- Corail (#E74C3C) - Accents et actions

## 🔠 Typographie

- Titres: Playfair Display
- Corps de texte: Inter

## 🚧 Déploiement

Pour déployer le site en production, plusieurs options sont disponibles :

1. **GitHub Pages** :
   - Allez dans Settings > Pages
   - Configurez la source sur la branche `main`
   - Le site sera disponible à l'adresse `https://growthly-maker.github.io/growthly-site/`

2. **Netlify / Vercel** :
   - Connectez votre compte GitHub à Netlify ou Vercel
   - Importez ce dépôt
   - Le déploiement se fera automatiquement

3. **Hébergement traditionnel** :
   - Téléchargez les fichiers du site via FTP sur votre hébergement
   - Aucune configuration serveur particulière n'est requise (site statique)