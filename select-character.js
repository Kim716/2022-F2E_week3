"use strict";

// --- MVC --- //
const model = {
  saveThingInLocal: function (name, thing) {
    localStorage.setItem(name, thing);
  },
};

const view = {
  characterPanel: document.querySelector(".characters"),

  nameForm: document.querySelector("#create-form"),

  alertModal: document.querySelector(".hint-modal"),

  okBtn: document.querySelector(".ok-btn"),

  // 點擊顯示人物圖片
  clickToShow: function (character, i) {
    character.classList.add(`show${i}`);
  },

  // 把傳進來的人物圖片陣列轉為 unshow
  removeShow: function (...characters) {
    characters.forEach((character, i) => {
      character.classList.remove(`show${i + 1}`);
    });
  },

  // 顯示、關閉提示modal
  toggleModal: function () {
    view.alertModal.classList.toggle("remove");
  },
};
const controller = {};

// --- EVENT LISTENER --- //
// EL-1
view.characterPanel.addEventListener("click", (e) => {
  const gender = Number(e.target.dataset.id);
  const characters = document.querySelectorAll(".characters div");
  const imgURL = window.getComputedStyle(e.target).backgroundImage.slice(5, -2);

  // 先取消原本有顯示的（直接取消所有）
  view.removeShow(...characters);
  // 把指定的show出來
  view.clickToShow(e.target, gender);
  // 儲存角色圖片
  model.saveThingInLocal("avatar", imgURL);
});

// El-2
view.nameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.querySelector("#name-input").value;

  // 如果沒有輸入東西，或者空白，跳出提示
  if (nameInput.trim().length === 0) {
    view.toggleModal();
    return;
  }

  // 將名字存在 local storage
  model.saveThingInLocal("userName", nameInput);

  // 跳轉頁面
  window.location.assign("./PO.html");
});

// EL-3 modal 的按鈕只有關掉功能
view.okBtn.addEventListener("click", view.toggleModal);
