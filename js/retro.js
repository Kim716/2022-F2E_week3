"use strict";
const GAME_STATE = Object.freeze({
  DescribeGameRule1: "DescribeGameRule1",
  PlayGame: "PlayGame",
  AnswerWrong: "AnswerWrong",
  AnswerCorrect: "AnswerCorrect",
});

const model = {
  correctAns: "positive",

  userAns: [],

  doUserAnswer: function (question) {
    return document.querySelector(`input[name='${question}']:checked`);
  },

  getUserAns: function (...questions) {
    // 先清空上一次送出答案抓取到的值
    this.userAns.length = 0;

    questions.forEach((question) => {
      this.userAns.push(
        document.querySelector(`input[name='${question}']:checked`).value
      );
    });
  },

  isAnswerCorrect: function () {
    return this.userAns.every((ans) => ans === this.correctAns);
  },
};

const view = {
  description1: document.querySelector(".description-1"),

  playView: document.querySelector(".Retro-mission"),

  continueBtns: document.querySelectorAll(".continue-btn"),

  // 遊戲結果 modal
  failHint: document.querySelector(".fail-hint"),

  correctHint: document.querySelector(".correct-hint"),

  notFinishedHint: document.querySelector(".not-finished-hint"),

  toggleRemove: function (target) {
    target.classList.toggle("remove");
  },
};

const controller = {
  currentState: GAME_STATE.DescribeGameRule1,

  dispatchContinueBtn: function (e) {
    switch (controller.currentState) {
      // --- 說明階段 --- //
      case GAME_STATE.DescribeGameRule1:
        view.toggleRemove(view.description1);
        view.toggleRemove(view.playView);
        controller.currentState = GAME_STATE.PlayGame;
        break;
      // --- 遊玩階段 --- //
      case GAME_STATE.PlayGame:
        controller.currentState = GAME_STATE.AnswerWrong;

        // 預防 user 沒寫答案就送出
        if (!model.doUserAnswer("Q1") || !model.doUserAnswer("Q2")) {
          view.toggleRemove(view.notFinishedHint);
          break;
        }

        model.getUserAns("Q1", "Q2");

        // 正確
        if (model.isAnswerCorrect()) {
          view.toggleRemove(view.correctHint);
          controller.currentState = GAME_STATE.AnswerCorrect;
          break;
        }
        // 答錯
        view.toggleRemove(view.failHint);
        break;
      //  --- 答錯，關閉 modal 才能繼續 --- //
      case GAME_STATE.AnswerWrong:
        // 不管是 fail or not-finished 能關
        view.toggleRemove(e.target.parentElement.parentElement);
        controller.currentState = GAME_STATE.PlayGame;
        break;
      // --- 答對，跳轉下一關 --- //
      case GAME_STATE.AnswerCorrect:
        window.location.assign("../html/develop.html");
        break;
    }
  },
};

// --- EVENT LISTENER --- //
// EL-1 綁定所有continue-btn
view.continueBtns.forEach((btn) => {
  btn.addEventListener("click", controller.dispatchContinueBtn);
});
