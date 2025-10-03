// 获取用户数据(模拟的初始数据)
    const creator = 'abc'
    axios({
      url: 'http://hmajax.itheima.net/api/settings',
      method: 'GET',
      params: {
        creator
      }
    }).then(res => {
      const userObj = res.data.data
      //console.log(userObj)
      //Object.keys()可以拿到一个对象里面所有的属性名并放在数组里面返回
      Object.keys(userObj).map(key => {
        if (key === 'avatar') document.querySelector('.prew').src = userObj[key]
        else if (key === 'desc') document.querySelector('.desc').value = userObj[key]
        else if (key === 'email') document.querySelector('.email').value = userObj[key]
        else if (key === 'gender') {
          const gender = document.querySelectorAll('.gender')
          //console.log(gender)
          const gNum = userObj[key]
          //console.log(gNum)
          gender[gNum].checked = true
        }
        else document.querySelector('.nickname').value = userObj[key]
      })
    })

    // 修改用户头像
    document.querySelector('.upload').addEventListener('change', (e) => {
      const fd = new FormData()
      fd.append('avater', e.target.files[0])
      fd.append('creator', 'abc')
      axios({
        url: 'http://hmajax.itheima.net/api/avatar',
        method: "PUT",
        data: fd,
      }).then(res => {
        const imgUrl = res.data.data.avatar
        document.querySelector('.prew').src = imgUrl
      })
    })

    // 修改用户信息
    document.querySelector('.submit').addEventListener('click', () => {
      // 收集表单信息
      const userForm = document.querySelector('.user-form')
      const userData = serialize(userForm, { hash: true, empty: true })
      userData.creator = creator
      userData.gender = parseInt(userData.gender)
      //console.log(userData)
      axios({
        url: 'https://hmajax.itheima.net/api/settings',
        method: "PUT",
        data: userData
      }).then(res => {
        console.log('修改成功', userData)
        //弹窗提示修改成功
        const modalBox = document.querySelector('.toast')
        const modal = new bootstrap.Toast(modalBox)
        modal.show()
      })
    })