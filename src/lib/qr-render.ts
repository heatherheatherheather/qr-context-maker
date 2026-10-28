import QRCode from "qrcode";
import cabanaLogo from "@/assets/cabana-logo.png.asset.json";

export function qrRenderOptions(width: number, dark: string, light: string) {
  return { width, margin: 4, errorCorrectionLevel: "H" as const, color: { dark, light } };
}

export function qrColors() {
  const styles = getComputedStyle(document.documentElement);
  return {
    dark: styles.getPropertyValue("--qr-ink").trim(),
    light: styles.getPropertyValue("--qr-paper").trim(),
    caption: styles.getPropertyValue("--qr-caption").trim(),
  };
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  const image = new Image();
  image.crossOrigin = "anonymous";
  const loaded = new Promise<HTMLImageElement>((resolve, reject) => {
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to load the Cabana logo."));
  });
  image.src = src;
  return loaded;
}

export async function renderQr(url: string, includeLogo: boolean, width: number) {
  const colors = qrColors();
  const canvas = document.createElement("canvas");
  await QRCode.toCanvas(canvas, url, qrRenderOptions(width, colors.dark, colors.light));
  if (includeLogo) {
    const logo = await loadImage(cabanaLogo.url);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Unable to render QR code.");
    const logoWidth = width * 0.26;
    const logoHeight = logoWidth * logo.naturalHeight / logo.naturalWidth;
    const gap = width * 0.012;
    const x = (width - logoWidth) / 2;
    const y = (width - logoHeight) / 2;
    context.fillStyle = colors.light;
    context.fillRect(x - gap, y - gap, logoWidth + gap * 2, logoHeight + gap * 2);
    context.drawImage(logo, x, y, logoWidth, logoHeight);
  }
  return canvas.toDataURL("image/png");
}