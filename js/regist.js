const nameRule = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const registForm = document.getElementById("registForm");

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

    registForm.addEventListener("submit", function (e) {
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
      axios({
        url: "http://hmajax.itheima.net/api/register",
        // 指定请求方法
        method: "POST",
        // 提交数据
        data: {
          username,
          password,
        },
      })
        .then((result) => {
          // 成功处理
          console.log(result);
        })
        .catch((error) => {
          // 失败处理错误信息
          alert(error.response.data.message);
        });
    });