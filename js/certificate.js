"use strict";

// --- DOM --- //
const continueBtn = document.querySelector(".continue-btn");

const description = document.querySelector(".description-1");

const certificateView = document.querySelector(".certificate-container");

// --- FUNCTION --- //
function toggleRemove(target) {
  target.classList.toggle("remove");
}

// --- EVENTLISTENER --- //
continueBtn.addEventListener("click", (e) => {
  toggleRemove(description);
  toggleRemove(certificateView);
});
// 按下一頁看證書
// 抓名字、圖片
// 渲染證書
// 截圖
// 回首頁
