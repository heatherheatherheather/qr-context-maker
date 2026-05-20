import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "QR Code Generator" },
      { name: "description", content: "Generate QR codes from URLs with captions for context." },
    ],
  }),
});

function Index() {
  const [url, setUrl] = useState("https://lovable.dev");
  const [caption, setCaption] = useState("My website");
  const [dataUrl, setDataUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const value = url.trim() || " ";
    QRCode.toDataURL(value, { width: 512, margin: 2, errorCorrectionLevel: "M" }).then(setDataUrl);
  }, [url]);

  const handleDownload = async () => {
    const size = 512;
    const padding = 32;
    const captionText = caption.trim();
    const lineHeight = 24;
    const lines = captionText ? wrapText(captionText, 40) : [];
    const captionHeight = lines.length ? lines.length * lineHeight + padding : 0;

    const canvas = document.createElement("canvas");
    canvas.width = size + padding * 2;
    canvas.height = size + padding * 2 + captionHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.src = dataUrl;
    await new Promise((r) => (img.onload = r));
    ctx.drawImage(img, padding, padding, size, size);

    if (lines.length) {
      ctx.fillStyle = "#000000";
      ctx.font = "500 18px ui-sans-serif, system-ui, sans-serif";
      ctx.textAlign = "center";
      lines.forEach((line, i) => {
        ctx.fillText(line, canvas.width / 2, size + padding * 2 + (i + 1) * lineHeight - 4);
      });
    }

    const link = document.createElement("a");
    link.download = `${(captionText || "qr-code").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">QR Code Generator</h1>
          <p className="mt-2 text-muted-foreground">
            Enter a URL, add a label for context, and download your QR code.
          </p>
        </header>

        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-6">
            {dataUrl ? (
              <img src={dataUrl} alt="Generated QR code" className="h-64 w-64" />
            ) : (
              <div className="h-64 w-64 animate-pulse rounded bg-muted" />
            )}
            {caption.trim() && (
              <p className="max-w-sm text-center text-base font-medium text-foreground">
                {caption}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="caption">Caption / Context</Label>
            <Textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What is this QR code for?"
              rows={2}
            />
          </div>

          <Button onClick={handleDownload} className="w-full" disabled={!dataUrl}>
            Download PNG
          </Button>
        </Card>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </main>
  );
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > maxChars) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (current) lines.push(current);
  return lines;
}
