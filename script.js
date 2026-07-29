const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  });
});

const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
    panels.forEach((panel) => {
      panel.hidden = panel.id !== tab.getAttribute("aria-controls");
    });
  });
});

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get("name") || "";
  const email = form.get("email") || "";
  const message = form.get("message") || "";
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
  window.location.href = `mailto:lamuelchristopheroreyes@gmail.com?subject=${subject}&body=${body}`;
});

const phoneDialog = document.querySelector("#dialekto-preview");
const openPhoneButton = document.querySelector("[data-open-phone]");
const closePhoneButton = document.querySelector("[data-close-phone]");
const phoneDevice = document.querySelector(".phone-device");
const phoneStage = document.querySelector(".phone-stage");

const syncPhoneSize = () => {
  const isCompact = window.innerWidth <= 680;
  const horizontalGutter = isCompact ? 20 : 32;
  const verticalSpace = isCompact ? 100 : 158;
  const availableWidth = Math.max(1, window.innerWidth - horizontalGutter);
  const availableHeight = Math.max(1, window.innerHeight - verticalSpace);
  const scale = Math.min(1, availableWidth / 413, availableHeight / 885);

  phoneDevice.style.setProperty("--phone-scale", scale);
  phoneStage.style.setProperty("--phone-stage-width", `${413 * scale}px`);
  phoneStage.style.setProperty("--phone-stage-height", `${885 * scale}px`);
};

const openPhonePreview = () => {
  syncPhoneSize();
  if (typeof phoneDialog.showModal === "function") {
    phoneDialog.showModal();
  } else {
    phoneDialog.setAttribute("open", "");
  }
  document.body.classList.add("phone-preview-open");
  closePhoneButton.focus();
};

const closePhonePreview = () => {
  if (typeof phoneDialog.close === "function") {
    phoneDialog.close();
  } else {
    phoneDialog.removeAttribute("open");
  }
  document.body.classList.remove("phone-preview-open");
  openPhoneButton.focus();
};

openPhoneButton.addEventListener("click", openPhonePreview);
closePhoneButton.addEventListener("click", closePhonePreview);

phoneDialog.addEventListener("click", (event) => {
  if (event.target === phoneDialog) {
    closePhonePreview();
  }
});

phoneDialog.addEventListener("close", () => {
  document.body.classList.remove("phone-preview-open");
});

window.addEventListener("resize", syncPhoneSize);

const converterDialog = document.querySelector("#stealurlink-preview");
const openConverterButton = document.querySelector("[data-open-converter]");
const closeConverterButton = document.querySelector("[data-close-converter]");
const demoFormatButtons = [...document.querySelectorAll("[data-demo-format]")];
const demoQuality = document.querySelector("#steal-demo-quality");
const demoForm = document.querySelector("#steal-demo-form");
const demoStatus = document.querySelector(".steal-demo-status");

const demoChoices = {
  mp3: [["128", "128 kbps · Smaller"], ["192", "192 kbps · Balanced"], ["256", "256 kbps · High"], ["320", "320 kbps · Best"]],
  mp4: [["360", "360p · Compact"], ["480", "480p · Standard"], ["720", "720p · HD"], ["1080", "1080p · Full HD"]]
};

const setDemoFormat = (format) => {
  demoFormatButtons.forEach((button) => button.classList.toggle("active", button.dataset.demoFormat === format));
  demoQuality.innerHTML = demoChoices[format].map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
  demoQuality.value = format === "mp3" ? "192" : "720";
};

demoFormatButtons.forEach((button) => button.addEventListener("click", () => setDemoFormat(button.dataset.demoFormat)));
setDemoFormat("mp3");

const openConverterPreview = () => {
  if (typeof converterDialog.showModal === "function") converterDialog.showModal();
  else converterDialog.setAttribute("open", "");
  document.body.classList.add("phone-preview-open");
  closeConverterButton.focus();
};

const closeConverterPreview = () => {
  if (typeof converterDialog.close === "function") converterDialog.close();
  else converterDialog.removeAttribute("open");
  document.body.classList.remove("phone-preview-open");
  openConverterButton.focus();
};

openConverterButton.addEventListener("click", openConverterPreview);
closeConverterButton.addEventListener("click", closeConverterPreview);
converterDialog.addEventListener("click", (event) => {
  if (event.target === converterDialog) closeConverterPreview();
});
converterDialog.addEventListener("close", () => document.body.classList.remove("phone-preview-open"));

demoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  demoStatus.classList.remove("demo-complete");
  demoStatus.querySelector("strong").textContent = "Previewing the conversion flow…";
  demoStatus.querySelector("span").textContent = "No video is downloaded from this portfolio demo.";
  requestAnimationFrame(() => demoStatus.classList.add("demo-complete"));
  window.setTimeout(() => {
    demoStatus.querySelector("strong").textContent = "Interface preview complete";
    demoStatus.querySelector("span").textContent = "Launch the real local app to convert permitted content.";
  }, 650);
});
