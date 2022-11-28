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
  backlogArr: [
    { content: "前台職缺列表（職缺詳細內容、點選可發送應徵意願）", score: 5 },
    { content: "應徵者的線上履歷編輯器", score: 13 },
    { content: "會員系統（登入、註冊、權限管理）", score: 8 },
    { content: "後台職缺管理功能（資訊上架、下架、顯示應徵者資料）", score: 8 },
  ],

  totalPoints: [],
};

const view = {
  description1: document.querySelector(".description-1"),

  description2: document.querySelector(".description-2"),

  description3: document.querySelector(".description-3"),

  description4: document.querySelector(".description-4"),

  description5: document.querySelector(".description-5"),

  continueBtns: document.querySelectorAll(".continue-btn"),

  totalPointsDOM: document.querySelector(".total-points"),

  dragZoneDOM: document.querySelector(".drag-here"),

  toggleRemove: function (target) {
    target.classList.toggle("remove");
  },

  generateBacklogHTML: function () {
    let rawHTML = "";

    model.backlogArr.forEach((backlog) => {
      rawHTML += `<div class="productBacklog" data-points="${backlog.score}">
              <p>${backlog.content}</p>
              <div class="point-avatar">${backlog.score}</div>
            </div>`;
    });

    return rawHTML;
  },

  renderZone: function (zone) {
    zone.innerHTML = this.generateBacklogHTML();
  },
};

const controller = {
  currentState: GAME_STATE.DescribeGameRule1,

  dispatchGameAction: function (e) {
    switch (controller.currentState) {
      // 說明階段
      case GAME_STATE.DescribeGameRule1:
        // 顯示第二段說明
        view.toggleRemove(view.description1);
        view.toggleRemove(view.description2);

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
        controller.currentState = GAME_STATE.AnswerCorrect;
        break;
      // 遊玩階段
      case GAME_STATE.PlayGame:
        break;
    }
  },
};

// --- EVENT LISTENER --- //
// EL-1 綁定所有continue-btn
view.continueBtns.forEach((btn) => {
  btn.addEventListener("click", controller.dispatchGameAction);
});

view.renderZone(view.dragZoneDOM);
