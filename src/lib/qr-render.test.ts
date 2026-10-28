import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { qrRenderOptions } from "./qr-render";

describe("Cabana QR generation", () => {
  test("uses the requested navy ink", () => {
    assert.equal(qrRenderOptions(512, "#222b60", "#ffffff").color.dark, "#222b60");
  });
  test("uses high error correction for centered logos", () => {
    assert.equal(qrRenderOptions(512, "#222b60", "#ffffff").errorCorrectionLevel, "H");
  });
});