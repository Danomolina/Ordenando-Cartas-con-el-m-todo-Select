/* eslint-disable */
import "bootstrap";
import "./style.css";

const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
];
const suits = ["&diams;", "&spades;", "&hearts;", "&clubs;"];

function generateRandomNumber() {
  let numbers = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];
  let indexNumbers = Math.floor(Math.random() * numbers.length);
  return numbers[indexNumbers];
}

function generateRandomSuit() {
  let suit = ["&diams;", "&spades;", "&hearts;", "&clubs;"];
  let indexSuit = Math.floor(Math.random() * suit.length);
  return suit[indexSuit];
}

function generateRandomCard() {
  const value = values[Math.floor(Math.random() * values.length)];
  const suit = suits[Math.floor(Math.random() * suits.length)];
  return { value, suit };
}

function generateRandomCards(count) {
  const cards = [];
  for (let i = 0; i < count; i++) {
    cards.push(generateRandomCard());
  }
  return cards;
}

function renderCards(cards, container) {
  container.innerHTML = "";
  cards.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.className = `card ${
      card.suit.includes("hearts") || card.suit.includes("diams")
        ? "red"
        : "black"
    }`;
    cardElement.innerHTML = `<span class="top-suit">${card.suit}</span>
                              <span class="number">${card.value}</span>
                              <span class="bottom-suit">${card.suit}</span>`;
    container.appendChild(cardElement);
  });
}

const selectSort = arr => {
  let min = 0;
  const log = [];
  while (min < arr.length - 1) {
    for (let i = min + 1; i < arr.length; i++) {
      if (values.indexOf(arr[min].value) > values.indexOf(arr[i].value)) {
        let aux = arr[min];
        arr[min] = arr[i];
        arr[i] = aux;
      }
    }
    log.push([...arr]);
    min++;
  }
  return log;
};

function renderLog(log, container) {
  container.innerHTML = "";
  log.forEach((state, index) => {
    const stateElement = document.createElement("div");
    stateElement.className = "state";
    const title = document.createElement("h3");
    title.textContent = `Step ${index}`;
    stateElement.appendChild(title);
    const cardRow = document.createElement("div");
    cardRow.className = "card-row";
    state.forEach(card => {
      const cardElement = document.createElement("div");
      cardElement.className = `card ${
        card.suit.includes("hearts") || card.suit.includes("diams")
          ? "red"
          : "black"
      }`;
      cardElement.innerHTML = `<span class="top-suit">${card.suit}</span>
                                <span class="number">${card.value}</span>
                                <span class="bottom-suit">${card.suit}</span>`;
      cardRow.appendChild(cardElement);
    });
    stateElement.appendChild(cardRow);
    container.appendChild(stateElement);
  });
}

document.getElementById("drawButton").addEventListener("click", () => {
  const count = parseInt(document.getElementById("cardCount").value);
  if (isNaN(count) || count < 1) return;
  const cards = generateRandomCards(count);
  renderCards(cards, document.getElementById("cardContainer"));
  document.getElementById("sortButton").dataset.cards = JSON.stringify(cards);
});

document.getElementById("sortButton").addEventListener("click", () => {
  const cards = JSON.parse(document.getElementById("sortButton").dataset.cards);
  const log = selectSort(cards);
  renderLog(log, document.getElementById("logContainer"));
});
