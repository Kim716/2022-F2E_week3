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

const model = {};

const view = {
  description1: document.querySelector(".description-1"),

  description2: document.querySelector(".description-2"),

  description3: document.querySelector(".description-3"),

  description4: document.querySelector(".description-4"),

  description5: document.querySelector(".description-5"),

  descriptionGuy2: document.querySelector(".description-guy-2"),

  playView: document.querySelector(".Scrum-mission"),

  continueBtns: document.querySelectorAll(".continue-btn"),

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
      // // --- 遊玩階段 --- //
      // case GAME_STATE.PlayGame:
      //   // 判斷，先統一進入錯誤階段，如果正確最後會改
      //   controller.currentState = GAME_STATE.AnswerWrong;

      //   if (model.totalPoints > model.maxPoints) {
      //     // 太多 modal
      //     view.toggleRemove(view.tooMuchHint);
      //     return;
      //   } else if (model.totalPoints <= model.minPoints) {
      //     // 太少 modal
      //     view.toggleRemove(view.tooLessHint);
      //     return;
      //   }
      //   //過關 modal
      //   view.toggleRemove(view.correctHint);
      //   controller.currentState = GAME_STATE.AnswerCorrect;
      //   break;
      // //  --- 答錯，關閉 modal 才能繼續 --- //
      // case GAME_STATE.AnswerWrong:
      //   controller.currentState = GAME_STATE.PlayGame;

      //   if (e.target.matches(".add-more")) {
      //     view.toggleRemove(view.tooLessHint);
      //     return;
      //   }

      //   view.toggleRemove(view.tooMuchHint);
      //   break;
      // // --- 答對，跳轉下一關 --- //
      // case GAME_STATE.AnswerCorrect:
      //   window.location.assign("../html/develop.html");
      //   break;
    }
  },
};

// --- EVENT LISTENER --- //
// EL-1 綁定所有continue-btn
view.continueBtns.forEach((btn) => {
  btn.addEventListener("click", controller.dispatchContinueBtn);
});
