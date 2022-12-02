"use strict";
// --- DATA --- //
const userImg = localStorage.getItem("avatar");
const userName = localStorage.getItem("userName");

// --- DOM --- //
const continueBtn = document.querySelector(".continue-btn");

const description = document.querySelector(".description-1");

const certificateView = document.querySelector(".certificate-container");

const certificate = document.querySelector(".certificate");

// --- FUNCTION --- //
function toggleRemove(target) {
  target.classList.toggle("remove");
}

function getDateArr(date) {
  const dd = date.slice(8, 10);
  const mm = date.slice(5, 7);
  const yyyy = date.slice(0, 4);

  const yearROC = yyyy - 1911;

  return [yearROC, mm, dd];
}

function renderCertificate(name) {
  const [yearROC, mm, dd] = getDateArr(new Date().toJSON());

  let rawHTML = `
    <div class="certificate-border">
      <img src="../assets/image/image 4.png" alt="" class="logo" />
      <div class="avatar"></div>
      <h2 class="title">結業證書</h2>
      <p class="words">
        ${name} 君<br />
        於 ${yearROC} 年 ${mm} 月 ${dd} 日參加六角學院<br />
        Scrum 新手培訓營，經測驗合格，特發給結業證書以資證明。
      </p>
      <p class="principle">
        校長<img src="../assets/image/廖洧杰.png" alt="" />
      </p>
      <p class="company">六角學院波利馬資訊科技有限公司</p>
      <p class="date">中華民國 ${yearROC} 年 ${mm} 月 ${dd} 日</p>
    </div>
  `;

  certificate.innerHTML = rawHTML;
}

function renderAvatar(img) {
  const avatar = document.querySelector(".avatar");
  avatar.style.backgroundImage = `url('${img}')`;
}

// --- EVENTLISTENER --- //
continueBtn.addEventListener("click", (e) => {
  toggleRemove(description);
  toggleRemove(certificateView);
});

// --- EXECUTE --- //
// 渲染證書
renderCertificate(userName);
renderAvatar(userImg);
// 截圖
// 回首頁
