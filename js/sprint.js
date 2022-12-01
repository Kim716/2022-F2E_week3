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
    { content: "前台職缺列表（職缺詳細內容、點選可發送應徵意願）", score: 4 },
    { content: "應徵者的線上履歷編輯器", score: 13 },
    { content: "會員系統（登入、註冊、權限管理）", score: 7 },
    { content: "後台職缺管理功能（資訊上架、下架、顯示應徵者資料）", score: 7 },
  ],

  sprintPoints: [],

  totalPoints: 0,

  minPoints: 13,

  maxPoints: 20,

  getSprintPoints: function () {
    const points = dropZone.toArray();
    const numberPoints = points.map((point) => parseInt(point, 10));
    return numberPoints;
  },

  updateModelSprintPoints: function () {
    model.sprintPoints = [];
    model.sprintPoints.push(...model.getSprintPoints());
  },

  updateModelTotalPoints: function () {
    model.totalPoints = 0;
    model.sprintPoints.forEach((point) => (model.totalPoints += point));
    console.log(model.totalPoints);
  },
};

const view = {
  description1: document.querySelector(".description-1"),

  description2: document.querySelector(".description-2"),

  description3: document.querySelector(".description-3"),

  description4: document.querySelector(".description-4"),

  description5: document.querySelector(".description-5"),

  playView: document.querySelector(".Sprint-mission"),

  continueBtns: document.querySelectorAll(".continue-btn"),

  backBtns: document.querySelectorAll(".back-btn"),

  totalPointsDOM: document.querySelector(".total-points"),

  dragZoneDOM: document.querySelector(".drag-here"),

  dropZoneDOM: document.querySelector(".drop-here"),

  // 遊戲結果 modal
  tooLessHint: document.querySelector(".too-less-hint"),

  tooMuchHint: document.querySelector(".too-much-hint"),

  correctHint: document.querySelector(".correct-hint"),

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

  generateEmptySpaceHTML: function () {
    const rawHTML = `<div class="empty-space ignore-elements"></div>`;

    return rawHTML;
  },

  renderZone: function (zone) {
    zone.innerHTML = this.generateBacklogHTML();
  },

  renderTotalPoints: function () {
    model.updateModelSprintPoints();
    model.updateModelTotalPoints();
    view.totalPointsDOM.textContent = model.totalPoints;
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

        controller.currentState = GAME_STATE.PlayGame;
        break;
      // --- 遊玩階段 --- //
      case GAME_STATE.PlayGame:
        // 判斷，先統一進入錯誤階段，如果正確最後會改
        controller.currentState = GAME_STATE.AnswerWrong;

        if (model.totalPoints > model.maxPoints) {
          // 太多 modal
          view.toggleRemove(view.tooMuchHint);
          return;
        } else if (model.totalPoints <= model.minPoints) {
          // 太少 modal
          view.toggleRemove(view.tooLessHint);
          return;
        }
        //過關 modal
        view.toggleRemove(view.correctHint);
        controller.currentState = GAME_STATE.AnswerCorrect;
        break;
      //  --- 答錯，關閉 modal 才能繼續 --- //
      case GAME_STATE.AnswerWrong:
        controller.currentState = GAME_STATE.PlayGame;

        if (e.target.matches(".add-more")) {
          view.toggleRemove(view.tooLessHint);
          return;
        }

        view.toggleRemove(view.tooMuchHint);
        break;
      // --- 答對，跳轉下一關 --- //
      case GAME_STATE.AnswerCorrect:
        window.location.assign("../html/scrum.html");
        break;
    }
  },

  // --- 狀態、畫面跳回前一頁 --- //
  dispatchBackBtn: function (e) {
    switch (controller.currentState) {
      case GAME_STATE.DescribeGameRule2:
        // 跳回第一頁
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

const dropZone = Sortable.create(view.dropZoneDOM, {
  group: "backlogList",
  animation: 150,
  dataIdAttr: "data-points",

  onEnd(e) {
    view.renderTotalPoints();
  },

  onAdd: function (e) {
    view.renderTotalPoints();
  },
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

view.renderZone(view.dragZoneDOM);
