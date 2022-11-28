"use strict";
const GAME_STATE = Object.freeze({
  DescribeGameRule: "DescribeGameRule",
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
  totalPointsDOM: document.querySelector(".total-points"),

  dragZoneDOM: document.querySelector(".drag-here"),

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
    console.log(1);
    zone.innerHTML = this.generateBacklogHTML();
  },
};

const controller = {
  currentState: GAME_STATE.PlayGame,

  dispatchGameAction: function (e) {
    switch (controller.currentState) {
      // 說明階段
      case GAME_STATE.DescribeGameRule:
        controller.currentState = GAME_STATE.AnswerCorrect;
        // 轉換遊戲畫面 render

        break;
      case GAME_STATE.PlayGame:
        break;
    }
  },
};

view.renderZone(view.dragZoneDOM);
