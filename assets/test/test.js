"use strict";

// const Sortable = require("sortablejs");

const listDOM = document.querySelector(".list");
const putDOM = document.querySelector(".put");

let totalScore = 0;
let totalScoreDOM = document.querySelector(".total-score");
totalScoreDOM.textContent = totalScore;

// let dragging = null;
// listDOM.addEventListener("dragstart", (e) => {
//   // console.log("dragstart");
//   dragging = e.target;
// });

// listDOM.addEventListener("dragend", (e) => {
//   // console.log("dragend");
// });

// putDOM.addEventListener("dragover", (e) => {
//   e.preventDefault();
//   putDOM.appendChild(dragging);
// });

const list = Sortable.create(listDOM, {
  group: "backLogList",
  sort: false,
  animation: 150,
  onEnd(event) {
    console.log(event.to);
    console.log(event.from);
    console.log(event.oldIndex);
    console.log(event.newIndex);
  },
});

const backlog = Sortable.create(putDOM, {
  group: "backLogList",
  sort: true,
  animation: 150,
  onEnd(event) {
    console.log(event.to);
    console.log(event.from);
    console.log(event.oldIndex);
    console.log(event.newIndex);
  },
  onChange: (e) => {
    let order = backlog.toArray();
    //取得 dataset
    console.log(order);
  },
});
