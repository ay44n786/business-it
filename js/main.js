/* =========================================================
   main.js - shared behaviour for all five pages
   1. Mobile navigation toggle
   2. Cookie consent notice
   3. Footer year
   4. Copy email button (Contact page)
   ========================================================= */

"use strict";

/* ---------- 1. Mobile navigation toggle ---------- */
function setupNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "Close" : "Menu";
  });

  // Close the menu with the Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
      toggle.focus();
    }
  });
}

/* ---------- 2. Cookie consent notice ---------- */
const COOKIE_KEY = "cookieChoice";

// Reading localStorage can fail in private browsing, so wrap it
function getCookieChoice() {
  try {
    return localStorage.getItem(COOKIE_KEY);
  } catch (error) {
    return null;
  }
}

function saveCookieChoice(choice) {
  try {
    localStorage.setItem(COOKIE_KEY, choice);
  } catch (error) {
    // Storage blocked: the banner just shows again next visit
  }
}

function setupCookieBanner() {
  const banner = document.getElementById("cookie-banner");
  if (!banner) {
    return;
  }

  // Only show the banner if the visitor hasn't chosen yet
  if (!getCookieChoice()) {
    banner.hidden = false;
  }

  banner.querySelectorAll("[data-cookie]").forEach(function (button) {
    button.addEventListener("click", function () {
      saveCookieChoice(button.dataset.cookie);
      banner.hidden = true;
    });
  });

  // "Change my cookie choice" button on the privacy section
  const resetButton = document.getElementById("reset-cookies");
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      try {
        localStorage.removeItem(COOKIE_KEY);
      } catch (error) {
        // ignore
      }
      banner.hidden = false;
    });
  }
}

/* ---------- 3. Footer year ---------- */
function setFooterYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }
}

/* ---------- 4. Copy email button ---------- */
function setupCopyEmail() {
  const button = document.getElementById("copy-email");
  const status = document.getElementById("copy-status");
  if (!button || !status) {
    return;
  }

  button.addEventListener("click", function () {
    const email = button.dataset.email;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email)
        .then(function () {
          status.textContent = "Copied: " + email;
        })
        .catch(function () {
          status.textContent = "Couldn't copy. The address is " + email;
        });
    } else {
      status.textContent = "The address is " + email;
    }
  });
}

/* ---------- Run everything once the page has loaded ---------- */
document.addEventListener("DOMContentLoaded", function () {
  setupNavToggle();
  setupCookieBanner();
  setFooterYear();
  setupCopyEmail();
});
