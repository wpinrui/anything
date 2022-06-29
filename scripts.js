// Alert
const alert = document.querySelector("#alert");
const alertContent = document.querySelector("#alert-content");

function setAlert(text, timeout = 5000) {
    alertContent.textContent = text;
    show(alert);
    setTimeout(() => unsetAlert(), timeout);
}

function unsetAlert() {
    hide(alert);
}

// Navigation

const navLinks = document.querySelectorAll(".nav-item");
const menuToggle = document.getElementById("anything-navbar");
const bsCollapse = new bootstrap.Collapse(menuToggle);
navLinks.forEach((l) => {
    l.addEventListener("click", () => {
        if (window.innerWidth < 768) {
            bsCollapse.toggle();
        }
    });
});

function navigateNumber() {
    showSection(Sections.number);
}

function navigateString() {
    showSection(Sections.string);
}

function navigateDice() {
    showSection(Sections.dice);
}

// Number

const numberMinInput = document.querySelector("#min-input");
const numberMaxInput = document.querySelector("#max-input");
const numberResult = document.querySelector("#number-result");
const numberResultDiv = document.querySelector("#number-result-div");
const numberPopoverTrigger = document.querySelector(
    "#number-copy-to-clipboard"
);
const numberPopover = new bootstrap.Popover(numberPopoverTrigger);

numberMinInput.addEventListener("change", () => {
    localStorage.setItem("numberMinInput", numberMinInput.value);
});
numberMaxInput.addEventListener("change", () => {
    localStorage.setItem("numberMaxInput", numberMaxInput.value);
});

function generateRandomNumber(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function numberIncrementMin() {
    numberMinInput.value = Number(numberMinInput.value) + 1;
    localStorage.setItem("numberMinInput", numberMinInput.value);
}

function numberDecrementMin() {
    numberMinInput.value = Number(numberMinInput.value) - 1;
    localStorage.setItem("numberMinInput", numberMinInput.value);
}

function numberIncrementMax() {
    numberMaxInput.value = Number(numberMaxInput.value) + 1;
    localStorage.setItem("numberMaxInput", numberMaxInput.value);
}

function numberDecrementMax() {
    numberMaxInput.value = Number(numberMaxInput.value) - 1;
    localStorage.setItem("numberMaxInput", numberMaxInput.value);
}

function numberGenerate() {
    if (numberMaxInput.value < numberMinInput.value) {
        setAlert("Error: Maximum number is less than minimum number.");
        return;
    }
    show(numberResultDiv);
    numberResult.textContent = generateRandomNumber(
        Number(numberMinInput.value),
        Number(numberMaxInput.value)
    );
}

function numberCopyToClipboard() {
    navigator.clipboard.writeText(numberResult.textContent);
    setTimeout(() => numberPopover.hide(), 2000);
}

// String
const stringCountInput = document.querySelector("#string-count-input");
const stringLengthInput = document.querySelector("#string-len-input");
const stringCheckDigits = document.querySelector("#string-check-digits");
const stringCheckLowercase = document.querySelector("#string-check-lowercase");
const stringCheckUppercase = document.querySelector("#string-check-uppercase");
const stringResultDiv = document.querySelector("#string-result-div");
const stringResult = document.querySelector("#string-result");

stringCountInput.addEventListener("change", () => {
    localStorage.setItem("stringCountInput", stringCountInput.value);
});

stringLengthInput.addEventListener("change", () => {
    localStorage.setItem("stringLengthInput", stringLengthInput.value);
});

stringCheckDigits.addEventListener("change", () => {
    localStorage.setItem(
        "stringCheckDigits",
        stringCheckDigits.checked ? "true" : "false"
    );
});

stringCheckLowercase.addEventListener("change", () => {
    localStorage.setItem(
        "stringCheckLowercase",
        stringCheckLowercase.checked ? "true" : "false"
    );
});

stringCheckUppercase.addEventListener("change", () => {
    localStorage.setItem(
        "stringCheckUppercase",
        stringCheckUppercase.checked ? "true" : "false"
    );
});

const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digitChars = "0123456789";

function generateRandomStrings(chars) {
    let result = "";
    for (let strings = 0; strings < stringCountInput.value; strings++) {
        for (let i = 0; i < stringLengthInput.value; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        result += "\n";
    }
    return result;
}

function stringIncrementCount() {
    if (stringCountInput.value === "" || stringCountInput.value < 1) {
        stringCountInput.value = 1;
        localStorage.setItem("stringCountInput", stringCountInput.value);
        return;
    }
    stringCountInput.value = Number(stringCountInput.value) + 1;
    localStorage.setItem("stringCountInput", stringCountInput.value);
}

function stringDecrementCount() {
    if (stringCountInput.value === "" || stringCountInput.value < 1) {
        stringCountInput.value = 1;
        localStorage.setItem("stringCountInput", stringCountInput.value);
        return;
    }
    if (Number(stringCountInput.value) <= 1) {
        return;
    }
    stringCountInput.value = Number(stringCountInput.value) - 1;
    localStorage.setItem("stringCountInput", stringCountInput.value);
}

function stringIncrementLength() {
    if (stringLengthInput.value === "" || stringLengthInput.value < 1) {
        stringLengthInput.value = 1;
        localStorage.setItem("stringCountInput", stringLengthInput.value);
        return;
    }
    stringLengthInput.value = Number(stringLengthInput.value) + 1;
    localStorage.setItem("stringLengthInput", stringLengthInput.value);
}

function stringDecrementLength() {
    if (stringLengthInput.value === "" || stringLengthInput.value < 1) {
        stringLengthInput.value = 1;
        localStorage.setItem("stringCountInput", stringLengthInput.value);
        return;
    }
    if (Number(stringLengthInput.value) <= 1) {
        return;
    }
    stringLengthInput.value = Number(stringLengthInput.value) - 1;
    localStorage.setItem("stringLengthInput", stringLengthInput.value);
}

function stringGenerate() {
    let chars = "";
    if (stringCheckDigits.checked) {
        chars += digitChars;
    }
    if (stringCheckLowercase.checked) {
        chars += lowercaseChars;
    }
    if (stringCheckUppercase.checked) {
        chars += uppercaseChars;
    }
    if (chars.length === 0) {
        setAlert(
            "Error: No characters (digits, lowercase or uppercase) selected."
        );
        return;
    }
    if (!stringCountInput.value || Number(stringCountInput.value) < 1) {
        stringIncrementCount();
    }
    if (!stringLengthInput || Number(stringLengthInput.value) < 1) {
        stringIncrementLength();
    }
    show(stringResultDiv);
    stringResult.textContent = generateRandomStrings(chars);
}

function stringExport() {
    // Source: https://stackoverflow.com/questions/22347756/how-to-export-a-string-to-a-file-in-html-phonegap
    var pom = document.createElement("a");
    pom.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + stringResult.textContent
    );
    pom.setAttribute("download", "strings.txt");
    pom.click();
}

// Dice
const diceCountInput = document.querySelector("#dice-count-input");
const diceResultDiv = document.querySelector("#dice-result-div");
const diceResult = document.querySelector("#dice-result");
let savedDiceResults = "";

diceCountInput.addEventListener("change", () => {
    localStorage.setItem("diceCountInput", diceCountInput.value);
});

function diceIncrementCount() {
    if (diceCountInput.value === "" || diceCountInput.value < 1) {
        diceCountInput.value = 1;
        localStorage.setItem("diceCountInput", diceCountInput.value);
        return;
    }
    diceCountInput.value = Number(diceCountInput.value) + 1;
    localStorage.setItem("diceCountInput", diceCountInput.value);
}

function diceDecrementCount() {
    if (diceCountInput.value === "" || diceCountInput.value < 1) {
        diceCountInput.value = 1;
        localStorage.setItem("diceCountInput", diceCountInput.value);
        return;
    }
    if (diceCountInput.value <= 1) {
        return;
    }
    diceCountInput.value = Number(diceCountInput.value) - 1;
    localStorage.setItem("diceCountInput", diceCountInput.value);
}

function chooseClass(number) {
    return number === 1
        ? "fa-dice-one"
        : number === 2
        ? "fa-dice-two"
        : number === 3
        ? "fa-dice-three"
        : number === 4
        ? "fa-dice-four"
        : number === 5
        ? "fa-dice-five"
        : "fa-dice-six";
}

function diceRoll() {
    show(diceResultDiv);
    diceResult.innerHTML = "";
    savedDiceResults = "";
    if (diceCountInput.value < 1) {
        setAlert("Error: You must roll at least one dice.");
        return;
    }
    for (let i = 0; i < diceCountInput.value; i++) {
        const result = generateRandomNumber(1, 6);
        savedDiceResults += `${result}\n`;
        if (i < 600) {
            // Don't draw too many die
            elem = document.createElement("div");
            elem.classList.add("col-lg-2");
            elem.classList.add("col-md-3");
            elem.classList.add("col-4");
            dice = document.createElement("i");
            dice.classList.add("fa-solid");
            dice.classList.add("fa-3x");
            dice.classList.add("dice-image");
            dice.classList.add(chooseClass(result));
            elem.appendChild(dice);
            diceResult.appendChild(elem);
        } else {
            setAlert(
                "Only the first 600 die are shown. You can view the rest in .txt format by downloading the output.",
                7000
            );
        }
    }
}

function diceExport() {
    var pom = document.createElement("a");
    pom.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + savedDiceResults
    );
    pom.setAttribute("download", "dice.txt");
    pom.click();
}

// Main

const Sections = Object.freeze({
    number: { element: document.querySelector("#number"), name: "number" },
    string: { element: document.querySelector("#string"), name: "string" },
    dice: { element: document.querySelector("#dice"), name: "dice" },
});

function initSections() {
    initNumber();
    initString();
    initDice();
    // TODO: init other sections
}

function initNumber() {
    const storedMin = localStorage.getItem("numberMinInput");
    if (!storedMin) {
        numberMinInput.value = 1;
        numberMaxInput.value = 100;
        localStorage.setItem("numberMinInput", "1");
        localStorage.setItem("numberMaxInput", "100");
    } else {
        const storedMax = localStorage.getItem("numberMaxInput");
        numberMinInput.value = storedMin;
        numberMaxInput.value = storedMax;
    }
}

function initString() {
    const storedCount = localStorage.getItem("stringCountInput");
    if (!storedCount) {
        stringCountInput.value = 1;
        stringLengthInput.value = 10;
        stringCheckDigits.checked = true;
        stringCheckLowercase.checked = true;
        stringCheckUppercase.checked = true;
        localStorage.setItem("stringCountInput", "1");
        localStorage.setItem("stringLengthInput", "10");
        localStorage.setItem("stringCheckDigits", "true");
        localStorage.setItem("stringCheckLowercase", "true");
        localStorage.setItem("stringCheckUppercase", "true");
    } else {
        const storedLength = localStorage.getItem("stringLengthInput");
        const storedCheckDigits =
            localStorage.getItem("stringCheckDigits") === "true" ? true : false;
        const storedCheckLowercase =
            localStorage.getItem("stringCheckLowercase") === "true"
                ? true
                : false;
        const storedCheckUppercase =
            localStorage.getItem("stringCheckUppercase") === "true"
                ? true
                : false;
        stringCountInput.value = storedCount;
        stringLengthInput.value = storedLength;
        stringCheckDigits.checked = storedCheckDigits;
        stringCheckLowercase.checked = storedCheckLowercase;
        stringCheckUppercase.checked = storedCheckUppercase;
    }
}

function initDice() {
    const storedCount = localStorage.getItem("diceCountInput");
    if (!storedCount) {
        diceCountInput.value = 1;
        localStorage.setItem("diceCountInput", "1");
    } else {
        diceCountInput.value = storedCount;
    }
}

function showSection(section) {
    if (!section) {
        section = Sections.number;
    }
    const numberOfSections = Object.values(Sections).length;
    for (let i = 0; i < numberOfSections; i++) {
        hide(Object.values(Sections)[i].element);
    }
    show(section.element);
    localStorage.setItem("section", section.name);
}

function hide(elem) {
    elem.classList.add("hidden");
}

function show(elem) {
    elem.classList.remove("hidden");
}

initSections();
showSection(Sections[localStorage.getItem("section")]);
