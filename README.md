# Clone de Spotify en React, RTK Query et Typescript

Ce projet à pour but de faire un clone de Spotify pour tester le Framework React et son écosystème (Redux RTK) avec typescript.
J'ai éssayé de respecter les bonnes pratiques avec un typage fort via Typescript, des tests avec vitest et une architecture clair et lisible. 
## (C'est une v1, il reste des choses à améliorer)

# IMPORTANT

Pour faire fonctionner le projet :
- npm install
- il faudra créer une "application" via le Dashboard de spotify avec votre compte pour pouvoir récuperer le client_id, la secret_key et définir la Redirect URI
PS: la Redirect URI /callback ex: http://localhost:5174/callback (/callback est important c'est une route qui permet l'authentification et la sauvegarde des tokens etc )
  tout est éxpliqué ici ça prend 1 minute (la partie "Create an app" ) :
#### https://developer.spotify.com/documentation/web-api/tutorials/getting-started ####

une fois vos informations récupéré, vous pouvez créer un fichier .env pour y mettre le client_id, la redirect_uri etc
Dans l'application les noms des variables sont déjà défini dans le composant [/Login](../master/src/pages/login.tsx) :
```
    const CLIENT_ID = import.meta.env.VITE_CLIENT_ID 
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI
    const AUTH_ENDPOINT = import.meta.env.VITE_AUTH_ENDPOINT
    const SCOPE = [
        'streaming',
        'user-read-email',
        'user-read-private',
        'user-library-read',
        'user-library-modify',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing',
        'user-top-read',
        'playlist-modify-public',
        'playlist-modify-private',
    ]
```
Spotify utilise des scopes pour pouvoir utiliser leur api, les scopes sont nécessaires pour faire fonctionner le projet.
Les scopes sont déjà défini dans l'app mais pour plus d'info -> https://developer.spotify.com/documentation/web-api/concepts/scopes

## Info 
Spotify ne permet plus les écoutes courtes (30 secondes) quand on a pas d'abonnement premium, ce qui signifie que sans abonnement on ne peux plus écouter de musique... 
Les autres fonctionnalitées fonctionnes sans abonnement premium (Recherche, affichages des playlists / Artistes / Albums etc... Seulement l'écoute n'est plus possible)

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
    - 1 (orange) Un Header avec un historique de navigation, une search bar, et avatar avec la photo de profil de l'user et la possibilité d'aller sur son profil et/ou de se logout.
    - 2 (bleue) Une sidebar à gauche "Bibliothèque" qui affiche les albums / playlists / titres likées par l'user avec possibilité de pouvoir plier / déplier celle-ci pour avoir plus d'info et un mini filtre une fois déplier.
    - 3 (violet) Un footer qui contient le player (à noter qu'il y a un 2eme Footer contenant les infos de spotify comme les liens utiles, réseaux sociaux etc inclus dans chaque page de l'application en bas comme sur spotify original).
    - 4 (vert) La Page à affichée
    <img src='https://github.com/user-attachments/assets/28993007-147c-42d4-bb61-408c03de0861' height="250px">
      
## Fonctionnalitées

### Connexion & Auth & route

- Connexion OAuth2 -> Spotify via la page /Login avec les ressources necessaires (client_id etc) et scopes spotify (https://developer.spotify.com/documentation/web-api/concepts/scopes).
- Redirection vers une route "loading callback" pour récuperer le token & refreshToken renvoyé par spotify dans l'url (stockage dans le localStorage).
- Les routes sont protégées via le router (si pas connecté -> redirect vers la route /Login)
- Reload automatiquement la page quand le Token expire pour refresh le Token (le Token a une durée de 1H) et relance les endpoints qui ont était affecté par l'expiration du token
- Simple deconnexion en faisant un clear des token et redirect vers la page /Login
    <img src='https://github.com/user-attachments/assets/c6e6a6a3-860d-482c-b21a-0b7e3cd19b0d' height="250px">


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
    <img src='https://github.com/user-attachments/assets/e808d3e5-d3c5-4c26-b7c8-7cbd12549663' height="250px">


- #### Sidebar Bibliothèque
  - Menu dépliant qui permet d'afficher les albums, playlist et tracks likés par l'user. L'état du menu est fermé de base, quand le menu est fermé on vois seulement les images des différents item likés.
    Dans l'état ouvert on y vois aussi les noms et le type
  - Un mini filtre qui permet d'afficher soit uniquement les albums, soit les playlist liké par l'user ( par défaut tout est affichés )
  - Au click sur un item il redirige directement sur sa page correspondante.    
    <img src='https://github.com/user-attachments/assets/3e8e4666-bec7-4a7e-ac77-c3a16c2772f1' height="250px">
    

- #### Player
  - Le player affiche la track qui est actuellement écouté, avec son image
  - Un slider pour régler le volume
  - Un slider pour afficher la timing de la track et pouvoir le changer en slidant
  - Un button qui permet de "shuffle" la fille d'attente
  - Un button play/pause et des buttons prev / next permetant de skip ou revenir a une précédente track
  - Un button repeat
  - Un button pour afficher une fille d'attente existant lorsque on écoutes quelque chose
    - La fille d'attente affiche le morceaux qui est écouté actuellement et les prochaines tracks
  - Un button pour afficher les parole de la chanson si c'est disponible via l'api
  ( un témoin lumineux vert est affiché si les fonctionnalitées son disponible )

  <div style={display: flex}>
        <img src='https://github.com/user-attachments/assets/493aabfc-2408-424a-aa80-0cf4ad8775ba' height="250px">
    <img src='https://github.com/user-attachments/assets/0320c590-dd53-4e21-9481-afd0480b8016' height="250px">

  </div>
    

- #### Pages Profil
  - Affiche la page profil de l'user
    - Affiche le header avec les info de l'user
    - Affiche une section sur les artistes les plus écoutées de l'user
    - Affiche une section sur les playlist de l'user
    <img src='https://github.com/user-attachments/assets/c57f5ca6-f62b-4387-ac97-5dca8976a69a' height="250px">
    

- #### Recherche
  - La recherche se lance quand l'user écrit quelque chose (avec un délai de .5s lorsque l'user termine d'ecrire pour eviter les surcharge d'appels api)
  - Le meilleur résultat de la recherche s'affiche avec :
    - L'artist, la playlist ou l'album qui corresponds
    - Ces tracks les plus populaires
    - Une suggestions d'artistes
    - Une suggestions d'albums
    - Une suggestions de playlists
   (chaques elements est cliquable est permet la redirection vers la page qui lui correspond ou l'écoute direct au hover)
    <img src='https://github.com/user-attachments/assets/a8c3cf4e-182b-448e-8728-2eee1f592a24' height="250px">


- #### Pages Artistes
  - Affiche la page de l'artiste
    - Affiche le details et des information sur l'artist dans le header ( nom, nombres de followers etc )
    - Affiches les tracks les plus populaires
    - Affiche la discographie de l'artiste avec des filtres ( Albums / single EP & Playlists / Compilation )
   (chaques elements est cliquable est permet la redirection vers la page qui lui correspond ou l'écoute direct au hover)
    <img src='https://github.com/user-attachments/assets/5339276d-4041-453a-b16f-5780dde0f4e1' height="250px">

    
- #### Pages Albums
  - Affiche la page de l'album
    - Affiche le header avec les info sur l'album
    - un button permetant d'ecouter l'album
    - un deuxieme button permettant de sauvgarder ou supprimer l'album dans sa Bibliothèque ( Sidebar Bibliothèque )
    - Affiche un tableau avec les informations sur les titres de l'albums et la possibilité de choisir quel track écoutés.
    <img src='https://github.com/user-attachments/assets/b9c67eb2-b6f5-49a3-a352-820bffd2dfe1' height="250px">


- #### Pages Tracks
  - Affiche la page de la Track
    - Affiche le header avec les info sur la track
    - un button permetant d'ecouter la track
    - un deuxieme button permettant de sauvgarder ou supprimer l'album dans sa Bibliothèque ( Sidebar Bibliothèque )
    - Affiches les Lyrics correspondant ( si l'api les trouvents ).
    - Affiches le ou les artistes qui on contribué a la track.
    - Affiches les titres similaires
    <img src='https://github.com/user-attachments/assets/8985f8f9-cdb6-41a6-a531-6b5eefd846df' height="250px">


- #### Pages Playlists
  - Affiche la page de la playlist
    - Affiche le header avec les info sur la playlist
    - un button permetant d'ecouter la playlist
    - un deuxieme button permettant de sauvgarder ou supprimer la playlist dans sa Bibliothèque ( Sidebar Bibliothèque )
    - Affiche un tableau avec les informations sur les titres de la playlist et la possibilité de choisir quel track écoutés.
    <img src='https://github.com/user-attachments/assets/6245a7b2-51e0-48ed-9a79-830da12cbed1' height="250px">

    
## Choses à prévoir pour une v2
  - Ajouter les test e2e et unitaire avec vitest
  - Pouvoir créer une playlist perso
  - s'abonner à d'autres utilisateurs
  - Amelioration diverse et meileur responsive
