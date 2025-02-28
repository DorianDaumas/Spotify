export function afficherDuree(timestamp: string) {
    const date = new Date(timestamp); // Convertit le timestamp en objet Date
    const maintenant = new Date(); // Date et heure actuelles
    const duree = maintenant.getTime() - date.getTime(); // Différence en millisecondes
  
    const minute = 60 * 1000;
    const heure = 60 * minute;
    const jour = 24 * heure;
    const mois = 30.42 * jour; // Approximation
    const annee = 365.25 * jour; // Approximation
  
    if (duree < minute) {
      return "à l'instant"; // Ou une autre valeur pour "maintenant"
    } else if (duree < heure) {
      const minutes = Math.round(duree / minute);
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else if (duree < jour) {
      const heures = Math.round(duree / heure);
      return `${heures} heure${heures > 1 ? 's' : ''}`;
    } else if (duree < mois) {
      const jours = Math.round(duree / jour);
      return `${jours} jour${jours > 1 ? 's' : ''}`;
    } else if (duree < annee) {
      const month = Math.round(duree / mois);
      return `${month} mois`;
    } else {
      const annees = Math.round(duree / annee);
      return `${annees} an${annees > 1 ? 's' : ''}`;
    }
  }