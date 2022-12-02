"use strict";
const GAME_STATE = Object.freeze({
  DescribeGameRule1: "DescribeGameRule1",
  DescribeGameRule2: "DescribeGameRule2",
  DescribeGameRule3: "DescribeGameRule3",
  DescribeGameRule4: "DescribeGameRule4",
  DescribeGameRule5: "DescribeGameRule5",
  PlayGame: "PlayGame",
  AnswerWrong: "AnswerWrong",
  AnswerCorrect: "AnswerCorrect",
});

const model = {
  isAnswerCorrect: function () {
    return view.dropZoneDOMs.every((dropZoneDOM) => {
      return dropZoneDOM.dataset.id === dropZoneDOM.children[0].dataset.id;
    });
  },
};

const view = {
  description1: document.querySelector(".description-1"),

  description2: document.querySelector(".description-2"),

  description3: document.querySelector(".description-3"),

  description4: document.querySelector(".description-4"),

  description5: document.querySelector(".description-5"),

  descriptionGuy2: document.querySelector(".description-guy-2"),

  playView: document.querySelector(".Scrum-mission"),

  continueBtns: document.querySelectorAll(".continue-btn"),

  backBtns: document.querySelectorAll(".back-btn"),

  dragZoneDOM: document.querySelector(".drag-here"),

  dropZoneDOMs: [...document.querySelectorAll(".drop-here")],

  // 遊戲結果 modal
  failHint: document.querySelector(".fail-hint"),

  correctHint: document.querySelector(".correct-hint"),

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
        // 顯示第二段說明
        view.toggleRemove(view.description1);
        view.toggleRemove(view.description2);
        view.toggleRemove(view.descriptionGuy2);

        controller.currentState = GAME_STATE.DescribeGameRule2;
        break;
      case GAME_STATE.DescribeGameRule2:
        // 顯示第三段說明
        view.toggleRemove(view.description2);
        view.toggleRemove(view.description3);

        controller.currentState = GAME_STATE.DescribeGameRule3;
        break;
      case GAME_STATE.DescribeGameRule3:
        // 顯示第四段說明
        view.toggleRemove(view.description3);
        view.toggleRemove(view.description4);

        controller.currentState = GAME_STATE.DescribeGameRule4;
        break;
      case GAME_STATE.DescribeGameRule4:
        // 顯示第五段說明
        view.toggleRemove(view.description4);
        view.toggleRemove(view.description5);

        controller.currentState = GAME_STATE.DescribeGameRule5;
        break;
      case GAME_STATE.DescribeGameRule5:
        // 進入遊戲畫面
        view.toggleRemove(view.description5);
        view.toggleRemove(view.playView);
        view.toggleRemove(view.descriptionGuy2);

        controller.currentState = GAME_STATE.PlayGame;
        break;
      // --- 遊玩階段 --- //
      case GAME_STATE.PlayGame:
        if (model.isAnswerCorrect()) {
          // 正確
          view.toggleRemove(view.correctHint);
          controller.currentState = GAME_STATE.AnswerCorrect;
          break;
        }

        view.toggleRemove(view.failHint);
        controller.currentState = GAME_STATE.AnswerWrong;
        break;
      //  --- 答錯，關閉 modal 才能繼續 --- //
      case GAME_STATE.AnswerWrong:
        view.toggleRemove(view.failHint);
        controller.currentState = GAME_STATE.PlayGame;
        break;
      // --- 答對，跳轉下一關 --- //
      case GAME_STATE.AnswerCorrect:
        window.location.assign("../html/retro.html");
        break;
    }
  },

  // --- 狀態、畫面跳回前一頁 --- //
  dispatchBackBtn: function (e) {
    switch (controller.currentState) {
      case GAME_STATE.DescribeGameRule2:
        // 跳回第一頁
        view.toggleRemove(view.descriptionGuy2);
        view.toggleRemove(view.description2);
        view.toggleRemove(view.description1);

        controller.currentState = GAME_STATE.DescribeGameRule1;
        break;
      case GAME_STATE.DescribeGameRule3:
        // 跳回第2頁
        view.toggleRemove(view.description3);
        view.toggleRemove(view.description2);

        controller.currentState = GAME_STATE.DescribeGameRule2;
        break;
      case GAME_STATE.DescribeGameRule4:
        // 跳回第3頁
        view.toggleRemove(view.description4);
        view.toggleRemove(view.description3);

        controller.currentState = GAME_STATE.DescribeGameRule3;
        break;
      case GAME_STATE.DescribeGameRule5:
        // 跳回第4頁
        view.toggleRemove(view.description5);
        view.toggleRemove(view.description4);

        controller.currentState = GAME_STATE.DescribeGameRule4;
        break;
    }
  },
};

const dragZone = Sortable.create(view.dragZoneDOM, {
  group: "backlogList",
  animation: 150,
});

view.dropZoneDOMs.forEach((dropZoneDOM) => {
  const dropZone = Sortable.create(dropZoneDOM, {
    group: "backlogList",
    animation: 150,

    onChange: function (e) {
      if (dropZoneDOM.children.length > 1) {
        e.from.appendChild(dropZoneDOM.children[0]);
      }
    },
  });
});

// --- EVENT LISTENER --- //
// EL-1 綁定所有continue-btn
view.continueBtns.forEach((btn) => {
  btn.addEventListener("click", controller.dispatchContinueBtn);
});

// EL-2 綁定所有back-btn
view.backBtns.forEach((btn) => {
  btn.addEventListener("click", controller.dispatchBackBtn);
});
