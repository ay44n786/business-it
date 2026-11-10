/* =========================================================
   restaurant.js - Problem-Solving Page (Ember & Oak)
   1. "Open now" status from the opening hours
   2. Menu filter by dietary type
   3. Form: switch fields for booking / feedback / loyalty
   4. Form: validation with clear error messages
   5. Form: build the email and open the visitor's email app
   ========================================================= */

"use strict";

const RESTAURANT_EMAIL = "bookings@emberandoak.example";

/* ---------- 1. Open now status ---------- */
// Opening hours by day number (0 = Sunday). null means closed.
const OPENING_HOURS = {
  0: { open: 12, close: 21 },
  1: null,
  2: { open: 12, close: 22 },
  3: { open: 12, close: 22 },
  4: { open: 12, close: 22 },
  5: { open: 12, close: 23 },
  6: { open: 12, close: 23 }
};

function updateOpenStatus() {
  const status = document.getElementById("open-status");
  if (!status) {
    return;
  }

  const now = new Date();
  const today = OPENING_HOURS[now.getDay()];
  const hour = now.getHours() + now.getMinutes() / 60;

  status.classList.remove("is-open", "is-closed");

  if (today && hour >= today.open && hour < today.close) {
    status.textContent = "Open now until " + today.close + ":00";
    status.classList.add("is-open");
  } else if (today && hour < today.open) {
    status.textContent = "Closed now, opens today at " + today.open + ":00";
    status.classList.add("is-closed");
  } else {
    status.textContent = "Closed now, see opening hours below";
    status.classList.add("is-closed");
  }
}

/* ---------- 2. Menu filter ---------- */
function setupMenuFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".menu-item");
  const count = document.getElementById("filter-count");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.dataset.filter;
      let shown = 0;

      // Highlight the chosen button
      buttons.forEach(function (other) {
        const active = other === button;
        other.classList.toggle("is-active", active);
        other.setAttribute("aria-pressed", String(active));
      });

      // Show items whose tags include the filter
      items.forEach(function (item) {
        const tags = item.dataset.tags.split(" ");
        const match = filter === "all" || tags.includes(filter);
        item.hidden = !match;
        if (match) {
          shown += 1;
        }
      });

      count.textContent = "Showing " + shown + (shown === 1 ? " dish" : " dishes");
    });
  });
}

/* ---------- 3. Switch form fields by enquiry type ---------- */
function getEnquiryType(form) {
  return form.querySelector("input[name='type']:checked").value;
}

function updateFormFields(form) {
  const type = getEnquiryType(form);
  const bookingFields = document.getElementById("booking-fields");
  const feedbackFields = document.getElementById("feedback-fields");
  const messageLabel = document.getElementById("message-label");

  bookingFields.hidden = type !== "booking";
  feedbackFields.hidden = type !== "feedback";

  // The message box means something different for each type
  if (type === "booking") {
    messageLabel.innerHTML = "Special requests <span class=\"optional\">(optional)</span>";
  } else if (type === "feedback") {
    messageLabel.textContent = "Your feedback";
  } else {
    messageLabel.innerHTML = "Birthday or anything we should know <span class=\"optional\">(optional)</span>";
  }
}

/* ---------- 4. Validation ---------- */
function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + "-error");
  if (error) {
    error.textContent = message;
  }
  if (input) {
    input.classList.toggle("is-invalid", message !== "");
    input.setAttribute("aria-invalid", message !== "" ? "true" : "false");
    if (message !== "") {
      input.setAttribute("aria-describedby", fieldId + "-error");
    }
  }
}

function todayAsInputValue() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return now.getFullYear() + "-" + month + "-" + day;
}

// Returns true when every field is valid
function validateForm(form) {
  const type = getEnquiryType(form);
  const name = form.elements["name"].value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const message = form.message.value.trim();
  let valid = true;

  // Clear old errors first
  ["name", "email", "phone", "date", "time", "guests", "message", "consent"].forEach(function (id) {
    showError(id, "");
  });

  if (name.length < 2) {
    showError("name", "Please enter your full name.");
    valid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showError("email", "Please enter a valid email, like name@example.com.");
    valid = false;
  }

  // Phone is optional, but if given it should look like a UK number
  if (phone !== "" && !/^[0-9+()\s-]{10,16}$/.test(phone)) {
    showError("phone", "Please enter a valid phone number or leave it blank.");
    valid = false;
  }

  if (type === "booking") {
    const date = form.date.value;
    const guests = Number(form.guests.value);

    if (date === "") {
      showError("date", "Please pick a date.");
      valid = false;
    } else if (date < todayAsInputValue()) {
      showError("date", "That date has passed.");
      valid = false;
    } else if (new Date(date + "T12:00:00").getDay() === 1) {
      showError("date", "We're closed on Mondays.");
      valid = false;
    }

    if (form.time.value === "") {
      showError("time", "Please pick a time.");
      valid = false;
    }

    if (!Number.isInteger(guests) || guests < 1 || guests > 12) {
      showError("guests", "1 to 12 guests. For bigger groups, please call.");
      valid = false;
    }
  }

  if (type === "feedback" && message.length < 10) {
    showError("message", "Please tell us a bit more (at least 10 characters).");
    valid = false;
  }

  if (!form.consent.checked) {
    showError("consent", "Please tick to agree so we can reply to you.");
    valid = false;
  }

  return valid;
}

/* ---------- 5. Build the email ---------- */
function buildEmail(form) {
  const type = getEnquiryType(form);
  const name = form.elements["name"].value.trim();
  const lines = [];
  let subject = "";

  lines.push("Hello Ember & Oak,");
  lines.push("");

  if (type === "booking") {
    const niceDate = new Date(form.date.value + "T12:00:00").toLocaleDateString("en-GB", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    });
    subject = "Table booking request: " + niceDate + " at " + form.time.value;
    lines.push("I'd like to book a table.");
    lines.push("");
    lines.push("Date: " + niceDate);
    lines.push("Time: " + form.time.value);
    lines.push("Guests: " + form.guests.value);
  } else if (type === "feedback") {
    subject = "Customer feedback from " + name;
    lines.push("I'd like to leave some feedback.");
    lines.push("");
    lines.push("Rating: " + form.rating.value + " out of 5");
  } else {
    subject = "Loyalty Club sign-up: " + name;
    lines.push("Please sign me up to the Loyalty Club.");
  }

  if (form.message.value.trim() !== "") {
    lines.push("");
    lines.push(type === "feedback" ? "Feedback:" : "Notes:");
    lines.push(form.message.value.trim());
  }

  lines.push("");
  lines.push("Name: " + name);
  lines.push("Email: " + form.email.value.trim());
  if (form.phone.value.trim() !== "") {
    lines.push("Phone: " + form.phone.value.trim());
  }
  lines.push("");
  lines.push("I agree to Ember & Oak using these details to reply to me.");

  return { subject: subject, body: lines.join("\n") };
}

function setupEnquiryForm() {
  const form = document.getElementById("enquiry-form");
  if (!form) {
    return;
  }

  const preview = document.getElementById("email-preview");
  const previewText = document.getElementById("preview-text");
  const previewLink = document.getElementById("preview-link");
  const message = document.getElementById("message");
  const charCount = document.getElementById("char-count");

  // No booking dates in the past
  form.date.min = todayAsInputValue();

  // Change fields when the enquiry type changes
  form.querySelectorAll("input[name='type']").forEach(function (radio) {
    radio.addEventListener("change", function () {
      updateFormFields(form);
      preview.hidden = true;
    });
  });

  // Live character counter
  message.addEventListener("input", function () {
    charCount.textContent = message.value.length + " / 500";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm(form)) {
      // Move focus to the first problem so keyboard users find it
      const firstInvalid = form.querySelector(".is-invalid");
      if (firstInvalid) {
        firstInvalid.focus();
      }
      preview.hidden = true;
      return;
    }

    const email = buildEmail(form);
    const mailto = "mailto:" + RESTAURANT_EMAIL +
      "?subject=" + encodeURIComponent(email.subject) +
      "&body=" + encodeURIComponent(email.body);

    // Show the preview, then open the email app
    previewText.textContent = "Subject: " + email.subject + "\n\n" + email.body;
    previewLink.href = mailto;
    preview.hidden = false;
    window.location.href = mailto;
  });

  updateFormFields(form);
}

/* ---------- Start ---------- */
document.addEventListener("DOMContentLoaded", function () {
  updateOpenStatus();
  setupMenuFilter();
  setupEnquiryForm();
});
