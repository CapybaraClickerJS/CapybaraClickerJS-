let money = 0;
let perClick = 1;
let perSecond = 0;
let multiplier = 1;

let rebirths = 0;
let rebirthCost = 100000;

const upgrades = [
  { type: "click", value: 1, price: 10 },
  { type: "click", value: 5, price: 100 },
  { type: "click", value: 50, price: 5000 },
  { type: "click", value: 500, price: 100000 },

  { type: "second", value: 1, price: 50 },
  { type: "second", value: 5, price: 500 },
  { type: "second", value: 50, price: 25000 },
  { type: "second", value: 500, price: 500000 }
];

const moneyEl = document.getElementById("money");
const perClickEl = document.getElementById("perClick");
const perSecondEl = document.getElementById("perSecond");
const multEl = document.getElementById("mult");
const rebirthsEl = document.getElementById("rebirths");
const shopEl = document.getElementById("shop");

function format(n) {
  const u = ["", "K", "M", "B", "T", "QA", "QI"];
  let i = 0;
  while (n >= 1000 && i < u.length - 1) {
    n /= 1000;
    i++;
  }
  return n.toFixed(2).replace(".00", "") + u[i];
}

function updateUI() {
  moneyEl.textContent = format(money);
  perClickEl.textContent = format(perClick * multiplier);
  perSecondEl.textContent = format(perSecond * multiplier);
  multEl.textContent = multiplier.toFixed(1);
  rebirthsEl.textContent = rebirths;
}

document.getElementById("clickBtn").onclick = function () {
  money += perClick * multiplier;
  updateUI();
};

function buyUpgrade(i) {
  const u = upgrades[i];
  if (money >= u.price) {
    money -= u.price;
    if (u.type === "click") perClick += u.value;
    if (u.type === "second") perSecond += u.value;
    u.price *= 2;
    renderShop();
    updateUI();
  }
}

function renderShop() {
  shopEl.innerHTML = "<h3>🛒 Loja</h3>";
  upgrades.forEach((u, i) => {
    const b = document.createElement("button");
    b.textContent =
      (u.type === "click"
        ? "+" + u.value + " Clique"
        : "+" + u.value + " /s")
      + " | R$ " + format(u.price);
    b.onclick = function () {
      buyUpgrade(i);
    };
    shopEl.appendChild(b);
  });
}

setInterval(function () {
  money += perSecond * multiplier;
  updateUI();
}, 1000);

document.getElementById("shopBtn").onclick = function () {
  shopEl.classList.toggle("hidden");
};

document.getElementById("rebirthBtn").onclick = function () {
  if (money >= rebirthCost) {
    money = 0;
    perClick = 2;
    perSecond = 2;
    multiplier *= 2;
    rebirths++;
    rebirthCost *= 100;
    updateUI();
    alert("REBIRTH " + rebirths);
  } else {
    alert("Rebirth custa R$ " + format(rebirthCost));
  }
};

renderShop();
updateUI(); 
