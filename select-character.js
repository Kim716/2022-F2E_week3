"use strict";
const model = {
  saveImgInLocal: function (img) {
    localStorage.setItem("avatar", img);
  },
};

const view = {
  characterPanel: document.querySelector(".characters"),

  clickToShow: function (character, i) {
    character.classList.add(`show${i}`);
  },

  removeShow: function (...characters) {
    characters.forEach((character, i) => {
      character.classList.remove(`show${i + 1}`);
    });
  },
};
const controller = {};

view.characterPanel.addEventListener("click", (e) => {
  const gender = Number(e.target.dataset.id);
  const characters = document.querySelectorAll(".characters div");
  const imgURL = window.getComputedStyle(e.target).backgroundImage.slice(5, -2);

  // 先取消原本有顯示的（直接取消所有）
  view.removeShow(...characters);
  // 把指定的show出來
  view.clickToShow(e.target, gender);
  // 儲存角色圖片
  model.saveImgInLocal(imgURL);
});

// 按下送出，儲存名字，跳到下一頁
// 如果名字為空，跳出 modal 提示
// modal 的按鈕只有關掉功能
