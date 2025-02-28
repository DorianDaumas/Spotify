export function convertirDuree(duration_ms: number) {
    const secondes = Math.floor(duration_ms / 1000);
    const minutes = Math.floor(secondes / 60);
    const secondesRestantes = secondes % 60;
  
    return secondesRestantes === 0 ? `${minutes} min` : `${minutes} min ${secondesRestantes}s` ;
  }