interface ColorCount {
  [key: string]: number;
}

export function getImageGradient(imageUrl: string, callback: (gradient: string) => void) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
      const colorCounts: ColorCount = {};

      // Analyser les pixels par pas de 4 (RGBA)
      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const hexColor = rgbToHex(r, g, b);

        colorCounts[hexColor] = (colorCounts[hexColor] || 0) + 1;
      }

      // Trier les couleurs par fréquence et prendre les 3 plus dominantes
      const dominantColors = Object.entries(colorCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([color]) => color);

      // Créer le dégradé
      
      const gradient = `linear-gradient(0deg, 
        #121212 0%,
        ${dominantColors[1]} 50%,
        ${dominantColors[2]} 100%
      )`;

      callback(gradient);
    }
  };

  img.src = imageUrl;
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b]
    .map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');
}