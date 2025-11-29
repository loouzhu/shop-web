    const nameRule = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const loginForm = document.getElementById("loginForm");
    const loginBtn = document.getElementById('login-btn')
    const code = document.querySelector('.code')
    const codeBtn = document.getElementById('code-btn')
    const codeImg = document.querySelector('.code img')

    // header部分禁止“我的订单”“用户中心链接”
    document.getElementById("nav").addEventListener("click", function (e) {
      if (
        e.target.dataset.id === "userCenter" ||
        e.target.dataset.id === "myOrder"
      ) {
        e.preventDefault();
        //弹窗
        const modalBox = document.querySelector(".modal-box");
        const modal = new bootstrap.Modal(modalBox);
        modal.show();
      }
    });
    // 提交用户信息判断
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const tipText = document.getElementById("tipText");

      tipText.innerHTML = "";
      if (!nameRule.test(username)) {
        tipText.innerHTML = `
      <div class="alert alert-danger" role="alert">
        用户名最少8位，由英文和数字组成
      </div>
      `;
        return;
      }
      if (!passwordRule.test(password)) {
        tipText.innerHTML = `
      <div class="alert alert-danger" role="alert">
        密码最少6位
      </div>
      `;
        return;
      }
      localStorage.setItem('username',username)
      window.location.replace('./index.html')
    });

    // 切换二维码登录页面
    codeBtn.addEventListener('click', function () {
      //console.log(window.innerWidth)
      if (window.innerWidth <= 701) {
        const hideElements = document.querySelectorAll('#loginForm .close-item');
        if (codeBtn.innerHTML === '使用二维码登录') {
          // 切换到二维码登录 - 使用!important确保优先级
          hideElements.forEach(element => {
            element.setAttribute('style', 'display: none !important');
          });
          loginBtn.setAttribute('style', 'display: none !important');
          codeBtn.innerHTML = '返回账号密码登录';
          codeImg.style.display = 'block';
          code.style.display = 'block';
          code.style.width = 15 + 'rem'
          code.style.height = 15 + 'rem'
          codeImg.style.right = 15 + '%'
          codeImg.style.width = 15 + 'rem'
          codeImg.style.height = 15 + 'rem'
        } else {
          // 切换回账号密码登录 - 使用!important确保优先级
          hideElements.forEach(element => {
            element.setAttribute('style', 'display: block !important');
          });
          loginBtn.setAttribute('style', 'display: block !important');
          code.style.display = 'none';
          codeImg.style.display = 'none';
          codeBtn.innerHTML = '使用二维码登录';
        }
      }
    })