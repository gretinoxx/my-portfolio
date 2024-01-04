function calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
}) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}

const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentThemeSetting = calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
});

const button = document.querySelector("[data-theme-toggle]");
const buttonImg = document.getElementById("buttonImg");

button.addEventListener("click", () => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  // update the img and the aria-label
  const newCta =
    newTheme === "dark" ? "Change to light theme" : "Change to dark theme";
  src =
    newTheme === "dark"
      ? "./img/day-and-night-icon-dark.svg"
      : "./img/day-and-night-icon-light.svg";
  buttonImg.setAttribute("src", src);
  button.setAttribute("aria-label", newCta);

  // update theme attribute on HTML to switch theme in CSS
  document.querySelector("html").setAttribute("data-theme", newTheme);

  // update in local storage
  localStorage.setItem("theme", newTheme);

  // update the currentThemeSetting in memory
  currentThemeSetting = newTheme;
});
