"use strict";

const GAME_STATE = Object.freeze({
  DescribeGameRule: "DescribeGameRule",
  PlayGame: "PlayGame",
  AnswerWrong: "AnswerWrong",
  AnswerCorrect: "AnswerCorrect",
});

const model = {
  userName: localStorage.getItem("userName"),

  userOrder: [],

  correctOrder: ["1", "2", "3", "4"],

  updateUserOrder: function (order) {
    this.userOrder.length = 0;
    this.userOrder.push(...order);
    console.log(this.userOrder);
  },

  isAnswerCorrect: function () {
    return this.userOrder.join("") === this.correctOrder.join("");
  },
};

const view = {
  descriptionDOM: document.querySelector(".description"),

  personInChargeDOM: document.querySelector(".description-guy"),

  startBtn: document.querySelector(".start-btn"),

  playView: document.querySelector(".PO-mission"),

  finishBtn: document.querySelector(".finish-btn"),

  userNameDOM: document.querySelector(".userName"),

  // --- modal --- //
  failHint: document.querySelector(".fail-hint"),

  correctHint: document.querySelector(".correct-hint"),

  okBtn: document.querySelector(".ok-btn"),

  thanksBtn: document.querySelector(".thanks-btn"),

  // --- 設定拖移的兩區 --- //
  dragZoneDOM: document.querySelector(".drag-here"),

  dropZoneDOM: document.querySelector(".drop-here"),

  toggleRemove: function (target) {
    target.classList.toggle("remove");
  },

  removeEmptySpace: function () {
    if (document.querySelector(".empty-space")) {
      document.querySelector(".empty-space").remove();
    }
  },
};

const controller = {
  currentState: GAME_STATE.DescribeGameRule,

  dispatchGameAction: function (e) {
    // 會被監聽器呼叫，所以 this 的指向不會是 controller
    switch (controller.currentState) {
      // 說明階段
      case GAME_STATE.DescribeGameRule:
        view.toggleRemove(view.descriptionDOM);
        view.toggleRemove(view.personInChargeDOM);
        view.toggleRemove(view.playView);
        controller.currentState = GAME_STATE.PlayGame;
        break;
      // 玩遊戲拖移完畢，點擊送出確認對錯，跳出相應提示
      case GAME_STATE.PlayGame:
        // 答對
        if (model.isAnswerCorrect()) {
          view.toggleRemove(view.correctHint);
          controller.currentState = GAME_STATE.AnswerCorrect;
          return;
        }
        // 答錯
        view.toggleRemove(view.failHint);
        controller.currentState = GAME_STATE.AnswerWrong;
        break;
      // 成功時，可以跳轉下一關
      case GAME_STATE.AnswerCorrect:
        window.location.assign("./sprint.html");
        break;
      // 失敗時，關閉 modal 繼續遊戲
      case GAME_STATE.AnswerWrong:
        view.toggleRemove(view.failHint);
        controller.currentState = GAME_STATE.PlayGame;
        break;
    }
  },
};

const dragZone = Sortable.create(view.dragZoneDOM, {
  group: "backlogList",
  animation: 150,

  // 放入dropZone後
  onEnd: function (e) {
    console.log(e);
  },
});

const dropZone = Sortable.create(view.dropZoneDOM, {
  group: "backlogList",
  animation: 150,
  filter: ".ignore-elements",

  onSort: function (e) {
    view.removeEmptySpace();
    e.item.classList.add("static");

    let order = dropZone.toArray();
    model.updateUserOrder(order);
  },
});

// --- EVENT LISTENER --- //
// EL-1
view.startBtn.addEventListener("click", controller.dispatchGameAction);

// EL-2
view.finishBtn.addEventListener("click", controller.dispatchGameAction);

// EL-3
view.okBtn.addEventListener("click", controller.dispatchGameAction);

// EL-4
view.thanksBtn.addEventListener("click", controller.dispatchGameAction);

// Render
view.userNameDOM.textContent = model.userName;
