"use strict";
const GAME_STATE = Object.freeze({
  DescribeGameRule: "DescribeGameRule",
  PlayGame: "PlayGame",
  AnswerWrong: "AnswerWrong",
  AnswerCorrect: "AnswerCorrect",
});

const model = {};

const view = {
  descriptionDOM: document.querySelector(".description"),

  personInChargeDOM: document.querySelector(".description-guy"),

  startBtn: document.querySelector(".start-btn"),

  playView: document.querySelector(".PO-mission"),

  toggleRemove: function (target) {
    target.classList.toggle("remove");
  },
};

const controller = {
  currentState: GAME_STATE.DescribeGameRule,

  dispatchGameAction: function (e) {
    // 會被監聽器呼叫，所以 this 的指向不會是 controller
    switch (controller.currentState) {
      case GAME_STATE.DescribeGameRule:
        view.toggleRemove(view.descriptionDOM);
        view.toggleRemove(view.personInChargeDOM);
        view.toggleRemove(view.playView);
        controller.currentState = GAME_STATE.PlayGame;
        break;
      case GAME_STATE.PlayGame:
        break;
    }
  },
};

// --- EVENT LISTENER --- //
// EL-1
view.startBtn.addEventListener("click", controller.dispatchGameAction);

// 聽完說明按按鈕跳畫面開始遊戲
// 拖拉放置、換位置
// 按下按鈕確認有沒有正確（data-set的數字順序）
// 有正確就跳出好棒棒提示，按下上面按鈕會跳下一頁
// 錯誤就跳另一個提示，按下按鈕會關閉提示畫面
