const popoverTrigger = document.querySelector('[data-bs-toggle="popover"]');
const popover = new bootstrap.Popover(popoverTrigger);

// Navigation
function navigateNumber() {
    showSection(Sections.number);
}

// Number

const numberMinInput = document.querySelector("#min-input");
const numberMaxInput = document.querySelector("#max-input");
const numberResult = document.querySelector("#number-result");
const numberResultDiv = document.querySelector("#result-div");

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
    show(numberResultDiv);
    numberResult.textContent = generateRandomNumber(
        Number(numberMinInput.value),
        Number(numberMaxInput.value)
    );
}

function numberCopyToClipboard() {
    navigator.clipboard.writeText(numberResult.textContent);
    setTimeout(() => popover.hide(), 2000);
}

// Main

const Sections = Object.freeze({
    number: { element: document.querySelector("#number"), name: "number" },
});

function initSections() {
    initNumber();
    // TODO: init other sections
}

function initNumber() {
    const storedMin = localStorage.getItem("numberMinInput");
    if (!storedMin) {
        numberMinInput.value = 1;
        numberMaxInput.value = 100;
    } else {
        const storedMax = localStorage.getItem("numberMaxInput");
        numberMinInput.value = storedMin;
        numberMaxInput.value = storedMax;
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
