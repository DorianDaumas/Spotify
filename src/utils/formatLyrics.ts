export function formatText(text: string) {
  // 2. Supprimer les espaces multiples et les espaces au début et à la fin de chaque ligne
  let formattedText = text.split('\n').map(line => line.trim().replace(/\s+/g, " ")).join('\n');

  // 3. Supprimer les virgules en fin de phrase (si nécessaire)
  formattedText = formattedText.replace(/,\s*$/gm, "");

  // 5. Mettre la première lettre de chaque phrase en majuscule
  formattedText = formattedText.replace(/(^\w|\.\s+\w)/gm, m => m.toUpperCase());
  
  return formattedText;
}
  