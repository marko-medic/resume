import { cvData } from "./cvData";
import "../scss/style.scss";

const mainOl = document.querySelector("#cvList");
const mainFooter = document.querySelector(".main-footer") as Element;
const aboutSection = mainFooter.querySelector("section.about") as Element;
const closeIcons = mainFooter.querySelectorAll(".close-icon");

interface CV {
  name: string;
  skils: string[];
  github: string;
  email: string;
  codepen: string;
  aboutMe(): void | Function;
  contactMe(): void | Function;
  getResume(): void | Function;
  [index: string]: string | string[] | Function;
}

function aboutMe() {
  return toggleVisibility(aboutSection);
}

function contactMe() {
  location.href =
    "mailto:marko.medic59@gmail.com?subject=Your title&body=Your message";
}

function getResume() {
  window.open(
    "https://drive.google.com/u/0/uc?id=1n_5Zlz1NVtOFiq7Xh94i6UWiiihhojAi&export=download"
  );
}

function toggleVisibility(currentElement: Element) {
  if (currentElement.classList.contains("invisible")) {
    currentElement.classList.remove("invisible");
    currentElement.parentElement?.classList.remove("hidden");
  } else {
    currentElement.classList.add("invisible");
    currentElement.parentElement?.classList.add("hidden");
  }
}

function getNewCV(passedData: any) {
  const newObject = { ...passedData } as CV;
  newObject.getResume = getResume;
  newObject.aboutMe = aboutMe;
  newObject.contactMe = contactMe;
  for (let propName in newObject) {
    appendData(propName, newObject);
  }
  return newObject;
}

const newData = getNewCV(cvData);
createLastListElement();

function appendData(propName: string, passedData: CV) {
  const liElement = document.createElement("li");
  const leftDiv = document.createElement("div");
  leftDiv.classList.add("divForName");
  leftDiv.textContent = String(propName) + ":";
  // razmak
  const rightDiv = document.createElement("div");
  rightDiv.classList.add("divForValue");
  const textForDiv = getTextValue(liElement, passedData, propName);
  rightDiv.innerHTML = textForDiv;
  liElement.appendChild(leftDiv);
  liElement.appendChild(rightDiv);
  if (mainOl instanceof Element) {
    mainOl.appendChild(liElement);
  } else {
    console.warn(`${mainOl} is not element`);
  }
}

function getTextValue(
  currentListEl: HTMLLIElement,
  passedData: CV,
  passedName: string
) {
  const currentValue = passedData[passedName];
  if (typeof currentValue == "string") {
    if (currentValue.startsWith("https") || currentValue.startsWith("www")) {
      return `<a target="_blank" href=${currentValue}>"${currentValue}",</a>`;
    }
    return `"${currentValue},"`;
  } else if (Array.isArray(currentValue)) {
    currentListEl.classList.add("arrayClass");
    const arrWithStrings: string[] = currentValue.map(skil => ` "${skil}"`);
    return `[${arrWithStrings}],`;
  } else if (typeof currentValue == "function") {
    currentListEl.style.cursor = "pointer";
    currentListEl.classList.add("functionClass");
    if (passedName === "aboutMe") {
      currentListEl.addEventListener("click", function() {
        passedData.aboutMe();
      });
    } else if (passedName === "contactMe") {
      currentListEl.addEventListener("click", function() {
        passedData.contactMe();
      });
    } else if (passedName === "getResume") {
      currentListEl.addEventListener("click", function() {
        passedData.getResume();
      });
    }
    return `{...},`;
  } else {
    return `"${String(currentValue)}",`;
  }
}

function createLastListElement() {
  const lastLiElement = document.createElement("li");
  const spanElement = document.createElement("span");
  spanElement.textContent = "};";
  spanElement.classList.add("colored");
  lastLiElement.appendChild(spanElement);
  mainOl!.appendChild(lastLiElement);
}

const hideElement = (e: Event) => {
  const elem = e.target as HTMLElement;
  elem.parentElement?.classList.add("invisible");
  mainFooter.classList.contains("hidden")
    ? mainFooter.classList.remove("hidden")
    : mainFooter.classList.add("hidden");
};

closeIcons?.forEach(closeIcon =>
  closeIcon.addEventListener("click", e => hideElement(e))
);
