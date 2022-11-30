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

  // start, finish, ok, thanks btn 都是用做「continue」
  continueBtns: document.querySelectorAll(".continue-btn"),

  playView: document.querySelector(".PO-mission"),

  userNameDOM: document.querySelector(".userName"),

  // --- modal --- //
  failHint: document.querySelector(".fail-hint"),

  correctHint: document.querySelector(".correct-hint"),

  // --- 設定拖移的兩區 --- //
  dragZoneDOM: document.querySelector(".drag-here"),

  dropZoneDOM: document.querySelector(".drop-here"),

  toggleRemove: function (target) {
    target.classList.toggle("remove");
  },
};

const controller = {
  currentState: GAME_STATE.DescribeGameRule,

  dispatchContinueBtn: function (e) {
    // 會被監聽器呼叫，所以 this 的指向不會是 controller
    switch (controller.currentState) {
      // 說明階段
      case GAME_STATE.DescribeGameRule:
        view.toggleRemove(view.descriptionDOM);
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
        window.location.assign("../html/sprint.html");
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

  // 被拖回去的狀況
  onAdd: function (e) {
    e.item.classList.remove("static");
  },

  // TODO 在上面游移會有殘影
});

const dropZone = Sortable.create(view.dropZoneDOM, {
  group: "backlogList",
  animation: 150,
  filter: ".ignore-elements",

  onAdd: function (e) {
    e.item.classList.add("static");
  },

  onSort: function (e) {
    let order = dropZone.toArray();
    model.updateUserOrder(order);
  },
});

// --- EVENT LISTENER --- //
// EL-1 監聽所有 continue-btn，使用controller去控制行為
view.continueBtns.forEach((btn) => {
  btn.addEventListener("click", controller.dispatchContinueBtn);
});

// Render
view.userNameDOM.textContent = model.userName;
