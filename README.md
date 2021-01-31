# meeting-room-reservation

Prérequis:
- installer php
- installer Symfony
- installer node
- installer composer

Initialisation de l'API (dossier : api-meeting-room-reservation)

Changer le lien vers la base de données (DATABASE_URL) dans le fichier .env dans la racine du projet

Commandes:
- composer install
- php bin/console doctrine:database:create
- php bin/console make:migration
- php bin/console doctrine:migration:migrate
- php bin/console doctrine:fixtures:load
- symfony serve

Initialisation du Front Angular (dossier : front-meeting-room-reservation)

Commandes:
- npm install
- ng serve

Identifiant de l'utilisateur Administrateur:
- Identifiant: admin@mail.fr
- Mot de passe : password
