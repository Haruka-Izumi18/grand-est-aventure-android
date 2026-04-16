# Contexte

 Balad'indice est une application Android pour les quêtes et les promenades (en famille, en ville, dans la nature).

 ## Objectif

 Les utilisateurs accèdent à des aventures proches de leur position actuelle, puis résoudre des énigmes à des points géolocaliséset progressent dans des quêtes. Ensuite consulter l'historique de des aventures et des badges acquis sur la page du compte.

 ## Prérequis
 - Expo
 - Android studio
 - La base de données est déjà disponible sur la page d'admin.(Postgres, Prisma)
 - carte Leaflet 

 ## Architecture
 - Page accuil
 - Aventure[id]
 - Liste des adventures
 - Page utilisateur

 ### Accueil
  - Carte(Départs des aventures)
  - Inscription/Login
  - Menu vers les infomations(Liste des aventures, questions, contact)

 ### Aventure[id]
  - Carte(GPS)
  - Liste des énigmes(Pouvoir les voir une fois que l'utilisateur l'aura résolu)
  - Le badge(afficher après términé l'aventure)
  - Formulaire de commentaire

 ### Liste des aventures
  - Explication d'application
  - Liste des aventures

 ### Page utilisateur
  - Sa liste d'aventures, Sa collection des badges
  - Modification d'information

## Liste des fonctions
 - Inscription
 - Connextion
 - Déconnextion
 - GPS pour obtenir la position actuelle et des énigmes
