"use strict";

function changeStage1() {
  const wholePage = document.querySelector("body");
  const opening1 = document.querySelector(".opening-page-1");
  const opening2 = document.querySelector(".opening-page-2");

  wholePage.addEventListener(
    "click",
    () => {
      opening1.classList.add("remove");
      opening2.classList.remove("remove");
      setTimeout(changeStage2, 3000);
    },
    { once: true }
  );
}

function changeStage2() {
  document.querySelector(".talking").classList.add("remove");
  document.querySelector(".talking2").classList.remove("remove");
}
// 移除開場畫面
setTimeout(changeStage1, 2000);
