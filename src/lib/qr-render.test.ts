import { describe, expect, test } from "bun:test";
import { qrRenderOptions } from "./qr-render";

describe("Cabana QR generation", () => {
  test("uses the requested navy ink", () => {
    expect(qrRenderOptions(512, "#222b60", "#ffffff").color.dark).toBe("#222b60");
  });
  test("uses high error correction for centered logos", () => {
    expect(qrRenderOptions(512, "#222b60", "#ffffff").errorCorrectionLevel).toBe("H");
  });
});