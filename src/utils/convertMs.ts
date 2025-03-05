export function convertirMillisecondes(millisecondes: number) {
  let secondes = Math.floor(millisecondes / 1000);
  const minutes = Math.floor(secondes / 60);
  secondes = secondes % 60;
  const secondesFormatees = String(secondes).padStart(2, '0'); 
    return `${minutes}:${secondesFormatees}`
}

