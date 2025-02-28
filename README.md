# Clone de Spotify en React, RTK Query et Typescript

Ce projet à pour but de faire un clone de Spotify pour tester le Framework React et son écosystème (Redux RTK) avec typescript.
J'ai éssayé de respecter les bonnes pratiques avec un typage fort via Typescript, des tests avec vitest et une architecture clair et lisible. 
## (Le projet n'est pas fini et donc en cours de progression, il reste des choses a améliorés)

# IMPORTANT
Spotify ne permet plus les écoutes courtes (30 secondes) quand on a pas un abonnement premium, ce qui signifie que sans abonnement on ne peux plus écouter de musique... Les autres fonctionnalitées marchent cependant sans abonnement premium (Recherche, affichages des playlists / Artistes / Albums etc... Seulement le l'écoute n'est pas possible)

### Techno utilisées
- React
- React Router
- Redux & Redux Tool Kit & Query
- Vite
- Eslint
- Typescript
- Framer-motion (animations js)
- react-spotify-web-playback (player)

### Architectures
  - Layout (contient le dashboard principale en 4 parties voir plus bas la partie structure)
    - Pages (contient les pages principales à affichées dans le dashboard)
      - Components (composant réutilisable ou unique affichés dans les différentes pages)
  - Redux (contient les slices, state management et les appels api)
    - Services (les RTK Query des appels api à Spotify)
    - Slices (Contient les slices RTK et les interfaces Typescripts correspondantes)
    - Stores (contient le store Redux)
  - Utils (script qui permet de facilités des taches : convertisseur de date, detecter les couleurs d'une image pour pouvoir afficher un dégradé dans les headers etc)
  
- #### Structure
  - L'application est en 4 parties principales :
    - 1 Un Header avec un historique de navigation, une search bar, et avatar avec la photo de profil de l'user et la possibilité d'aller sur son profil et/ou de se logout.
    - 2 Une sidebar à gauche "Bibliothèque" qui affiche les albums / playlists / titres likées par l'user avec possibilité de pouvoir plier / déplier celle-ci pour avoir plus d'info et un mini filtre une fois déplier.
    - 3 Un footer qui contient le player (à noter qu'il y a un 2eme Footer contenant les infos de spotify comme les liens utiles, réseaux sociaux etc inclus dans chaque page de l'application en bas comme sur spotify original).
    - 4 La Page à affichée


## Fonctionnalitées

### Connexion & Auth & route

- Connexion OAuth2 -> Spotify via la page /Login avec les ressources necessaires (client_id etc) et scopes spotify (https://developer.spotify.com/documentation/web-api/concepts/scopes).
- Redirection vers une route "loading callback" pour récuperer le token & refreshToken renvoyé par spotify dans l'url (stockage dans le localStorage).
- Les routes sont protégées via le router (si pas connecté -> redirect vers la route /Login)
- Reload automatiquement la page quand le Token expire pour refresh le Token (le Token a une durée de 1H) et relance les endpoints qui ont était affecté par l'expiration du token
- Simple deconnexion en faisant un clear des token et redirect vers la page /Login


### Fonctionnalitées

- #### Page d'accueil
  -  Header avec des suggestions de tracks basé sur vos artists les plus écoutés (avec animation du background au hover des tracks)
  -  Affichage des tops artistes du mois suivant vos écoutes
  -  Affichage des playlists populaires de spotify (enfaite c'est un tricks que j'ai du faire via l'api car Spotify ne provide plus d'endpoints pour avoir les artits / playlist et albums populaires....... Mais ça marche quand même !)
  -  Affichage des Artistes populaires de spotify (pareil j'ai du m'adapter et trouver les artistes les plus stream de Spotify)
  -  Affichages des derniers sorties d'album (cette fois si c'est bon l'endpoints n'est pas depcrecated)
  -  Possibilité d'écouter dirrectement les artistes, albums, tracks ou playlist via un hover sur ces derniers
  -  Pouvoir cliquer sur les images ou nom d'artistes, albums, playlists, tracks pour se rendre dirrectement sur leur pages correspondantes.
  -  Afficher une page dédié contenant l'entiereté des differentes section au click sur les lien "Tout afficher" à droite des sections.

- #### Sidebar Bibliothèque
  - Menu dépliant qui permet d'afficher les albums, playlist et tracks likés par l'user. L'état du menu est fermé de base, quand le menu est fermé on vois seulement les images des différents item likés.
    Dans l'état ouvert on y vois aussi les noms et le type
  - Un mini filtre qui permet d'afficher soit uniquement les albums, soit les playlist liké par l'user ( par défaut tout est affichés )
  - Au click sur un item il redirige directement sur sa page correspondante.

- #### Player
  - Le player est une library tierce (https://github.com/gilbarbara/react-spotify-web-playback/tree/main). Je compte créer mon propre player celui-ci ne me convient pas mais sa sera sur une v2
  - Ajout d'un button au player pour afficher une fille d'attente existant lorsque on écoutes quelque chose
    - La fille d'attente affiche le morceaux qui est écouter actuellement
    - Des suggestions d'autres morceaux via l'api de spotify
    - Chaques suggestions est cliquables et permet de rediriger vers sa page correspondante

- #### Pages Profil
  - Affiche la page profil de l'user
    - Affiche le header avec les info de l'user
    - Affiche une section sur les artistes les plus écoutées de l'user
    - Affiche une section sur les playlist de l'user

- #### Recherche
  - La recherche se lance quand l'user écrit quelque chose (avec un délai de .5s lorsque l'user termine d'ecrire pour eviter les surcharge d'appels api)
  - Le meilleur résultat de la recherche s'affiche avec :
    - L'artistes, la plyalist ou l'album qui corresponds
    - Les tracks les plus populaires qui correspondent
    - Une suggestions d'artistes
    - Une suggestions d'albums
    - Une suggestions de playlists
   (chaques elements est cliquable est permet la redirection vers la page qui lui correspond ou l'écoute direct au hover)

- #### Pages Artistes
  - Affiche la page de l'artiste
    - Affiche le details et des information sur l'artist dans le header ( nom, nombres de followers etc )
    - Affiches les tracks les plus populaires
    - Affiche la discographie de l'artiste avec des filtres ( Albums / single EP & Playlists / Compilation )
   (chaques elements est cliquable est permet la redirection vers la page qui lui correspond ou l'écoute direct au hover)
    

- #### Pages Albums
  - Affiche la page de l'album
    - Affiche le header avec les info sur l'album
    - un button permetant d'ecouter l'album
    - un deuxieme button permettant de sauvgarder ou supprimer l'album dans sa Bibliothèque ( Sidebar Bibliothèque )
    - Affiche un tableau avec les informations sur les titres de l'albums et la possibilité de choisir quel track écoutés.

- #### Pages Tracks
  - Affiche la page de la Track
    - Affiche le header avec les info sur la track
    - un button permetant d'ecouter la track
    - un deuxieme button permettant de sauvgarder ou supprimer l'album dans sa Bibliothèque ( Sidebar Bibliothèque )
    - Affiches les Lyrics correspondant ( si l'api les trouvents ).
    - Affiches le ou les artistes qui on contribué a la track.
    - Affiches les titres similaires

- #### Pages Playlists
  - Affiche la page de la playlist
    - Affiche le header avec les info sur la playlist
    - un button permetant d'ecouter la playlist
    - un deuxieme button permettant de sauvgarder ou supprimer la playlist dans sa Bibliothèque ( Sidebar Bibliothèque )
    - Affiche un tableau avec les informations sur les titres de la playlist et la possibilité de choisir quel track écoutés.

## Choses à prévoir pour une v2
  - Créer mon propre player
  - Travailler plus le responsive
  - Améliorations diverses
