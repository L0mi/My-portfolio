const DEFAULT_URL = "https://example.com";
const form = document.querySelector("#generator");
const input = document.querySelector("#link");
const error = document.querySelector("#link-error");
const status = document.querySelector("#status");
const qrContainer = document.querySelector("#qr-code");
const barcode = document.querySelector("#barcode");
const barcodeText = document.querySelector("#barcode-text");
const sizeInput = document.querySelector("#size");
const sizeOutput = document.querySelector("#size-output");
const inkInput = document.querySelector("#ink");
const paperInput = document.querySelector("#paper");
const inkValue = document.querySelector("#ink-value");
const paperValue = document.querySelector("#paper-value");
let generatedUrl = DEFAULT_URL;

function normalizeUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) throw new Error("Paste a link to get started.");
  const withProtocol = /^[a-z][a-z\d+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const parsed = new URL(withProtocol);
  if (!/^https?:$/.test(parsed.protocol)) throw new Error("Please use an http or https link.");
  return parsed.toString();
}

function renderCodes(message = "") {
  const size = Number(sizeInput.value);
  const dark = inkInput.value;
  const light = paperInput.value;
  qrContainer.replaceChildren();
  new QRCode(qrContainer, { text: generatedUrl, width: size, height: size, colorDark: dark, colorLight: light, correctLevel: QRCode.CorrectLevel.H });
  qrContainer.setAttribute("aria-label", `QR code for ${generatedUrl}`);
  JsBarcode(barcode, generatedUrl, { format: "CODE128", lineColor: dark, background: light, width: 2, height: 92, margin: 18, displayValue: false });
  barcode.setAttribute("aria-label", `Barcode for ${generatedUrl}`);
  barcodeText.textContent = generatedUrl;
  sizeOutput.textContent = `${size}px`;
  inkValue.textContent = dark.toUpperCase();
  paperValue.textContent = light.toUpperCase();
  status.textContent = message;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    generatedUrl = normalizeUrl(input.value);
    error.hidden = true;
    error.textContent = "";
    input.removeAttribute("aria-invalid");
    renderCodes("Codes generated and ready to download.");
  } catch (cause) {
    error.textContent = cause instanceof Error ? cause.message : "That link is not valid.";
    error.hidden = false;
    input.setAttribute("aria-invalid", "true");
    input.focus();
  }
});

[sizeInput, inkInput, paperInput].forEach((control) => control.addEventListener("input", () => renderCodes("Code appearance updated.")));

document.querySelector("#copy-link").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(generatedUrl);
    status.textContent = "Link copied to clipboard.";
  } catch {
    status.textContent = "Copy is unavailable here. Select the link in the input field to copy it.";
    input.select();
  }
});

document.querySelector("#download-qr").addEventListener("click", () => {
  const canvas = qrContainer.querySelector("canvas");
  const image = qrContainer.querySelector("img");
  const link = document.createElement("a");
  link.download = "link-qr-code.png";
  link.href = canvas?.toDataURL("image/png") || image?.src || "";
  link.click();
  status.textContent = "QR code downloaded as a PNG file.";
});

document.querySelector("#download-barcode").addEventListener("click", () => {
  const source = new XMLSerializer().serializeToString(barcode);
  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "link-barcode.svg";
  link.href = objectUrl;
  link.click();
  URL.revokeObjectURL(objectUrl);
  status.textContent = "Barcode downloaded as an SVG file.";
});

document.querySelector("#year").textContent = new Date().getFullYear();

window.addEventListener("load", () => {
  if (window.QRCode && window.JsBarcode) renderCodes();
  else status.textContent = "The code generator could not load. Check your internet connection and refresh the page.";
});
