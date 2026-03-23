# Descriptif du projet

Porteur de projet : Nantes universités

Sujet : Paroles d'experts: Centralization des travaux et actualités des chercheurs sous un format interactive

Nom d'équipe : Paroles d'experts

Participants :

- EDNA : Emma VANTHOURNOUT, Manon TEILLET, Adrien DOZIAS

- Polytech : Ampère Titus DJAGA, Aya ELLOUBAB, Roua BEN YAHIA, Mohamed REBAI, Ahmat HASSAN

## Instructions de déploiement

Si votre projet nécessite des instructions spécifiques pour son déploiement, merci d'ajouter des explications ici.

## Frontend (React + Vite + TailwindCSS)

Le frontend React se trouve dans le dossier `frontend/`. Le build est généré dans `public/` et servi par le serveur Express.

### Prérequis

- Node.js >= 18
- npm

### Développement local

```bash
# Installer les dépendances
cd frontend
npm install

# Lancer le serveur de développement Vite (hot-reload)
npm run dev
# L'app est accessible sur http://localhost:5173/nantesuniversite/
```

> Note : en mode `dev`, le serveur Vite tourne indépendamment du serveur Express. Pour tester l'intégration complète avec l'API, lancez aussi le serveur principal (voir ci-dessous) et buildez le frontend.

### Build de production

```bash
cd frontend
npm run build
# Les fichiers sont générés dans ../public/
```

Le dossier `public/` est ensuite servi automatiquement par le serveur Express (`server.js`).

### Lancer le serveur Express (depuis la racine du projet Hyblab2026)

```bash
# Depuis la racine du monorepo (Hyblab2026/)
npm install   # si pas encore fait
npm start     # ou node server.js selon la configuration
# L'app est accessible sur http://localhost:8080/nantesuniversite/
```
