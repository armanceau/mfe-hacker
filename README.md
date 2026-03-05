# HackerTerminal MFE

Un micro-frontend **Terminal Hacker** pour NeonCity.  
Ce terminal est **l’émetteur principal des commandes** de la ville, via un EventBus partagé entre les micro-frontends.

## Fonctionnalités

- Terminal style années 80 avec texte vert et fond noir.
- Supporte les commandes :
  - `storm`, `storm max`, `blackout`, `riot`, `drones`, `love`, `reset`, `help`
- Affiche l’historique des commandes et le feedback utilisateur.
- Émet les événements sur le **EventBus global** (`hacker:command`) avec le payload `{command, level}`.

## Utilisation

1. Lancer le projet :
```bash
npm install
npm start
