"use strict";

// --- FUNCTION --- //
// FN-1
function readyToChangeStage() {
  const wholePage = document.querySelector("body");

  wholePage.addEventListener(
    "click",
    () => {
      changeStage1();
      setTimeout(changeStage2, 3000);
    },
    { once: true }
  );
}

// FN-2
function changeStage1() {
  const opening1 = document.querySelector(".opening-page-1");
  const opening2 = document.querySelector(".opening-page-2");

  opening1.classList.add("remove");
  opening2.classList.remove("remove");
}

// FN-3
function changeStage2() {
  document.querySelector(".talking").classList.add("remove");
  document.querySelector(".talking2").classList.remove("remove");
}

// --- EVENT LISTENER --- //
document.querySelector(".start-btn").addEventListener("click", () => {
  window.location.assign("./select-character.html");
});

// --- EXECUTE --- //
// 開場畫面兩秒後可以點擊轉場
setTimeout(readyToChangeStage, 2000);
