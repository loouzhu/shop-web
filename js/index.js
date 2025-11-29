let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let goodsData = []


document.addEventListener('DOMContentLoaded', function () {
  lazyLoading()
  checkLoginStatus();
  setupLogout();
  // 渲染banner左侧商品区域
  const goodsListLeft = [
    "水果",
    "肉类",
    "电器",
    "家具",
    "牛奶",
    "手机",
    "服装",
    "水产",
  ];
  let str = "";
  goodsListLeft.map((item) => {
    str += `
          <li><a href="#"><span>${item}</span><span class="iconfont icon-a-arrow-right-bold"><span></a></li>
        `;
  });
  document.getElementById("left").innerHTML = str;
  // 渲染banner右侧的产品标签
  const goodsListRight = [
    ["电子产品", "服装鞋帽", "家居用品", "美妆个护"],
    ["食品饮料", "图书文具", "运动户外", "母婴玩具"],
    ["数码配件", "家用电器", "珠宝首饰", "汽车用品"],
    ["健康保健", "宠物用品", "办公设备", "礼品鲜花"],
    ["体育用品", "旅行箱包", "厨房用品", "手表眼镜"],
    ["家具家装", "手机通讯", "电脑配件", "音像制品"],
    ["游戏玩具", "乐器音响", "摄影器材", "收藏品"]
  ];
  const ulRight = document.querySelector(".container .right ul");
  goodsListRight.map((linkGroup, index) => {
    const li = document.createElement("li");
    linkGroup.forEach((linkText, aIndex) => {
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = linkText;
      li.appendChild(a);
    });
    ulRight.append(li);
  });
  // 从API获取商品

  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      goodsData = data;
      renderGoods(goodsData)
    });
})

// 渲染商品列表
function renderGoods(goodsData) {
  if (goodsData.length === 0) {
    alert('没有找到相应商品')
    return;
  }
  document.querySelector('.showAllGoods').innerHTML = `
    <ul class="allGoods">
    ${goodsData.map((product, index) =>
    `
      <li>
        <div class='goodCard' data-index="${index}">
          <img data-src="${product.image}" alt="${product.title}" class="goodImage">
          <p class="goodTitle">${product.title}</p>
          <p class="goodDiscription">${product.description}</p>
          <p class="goodPrice">￥${product.price}</p>
          <div class="goodRating">
            <span class='goodStar'>${product.rating.rate} 分<span>
            <span class='goodCount'>${product.rating.count}条评价<span>
          </div>
          <div class="addToCart" data-index='${index}'>加入购物车</div>
        </div>
      </li>
      `
  ).join('')}
    </ul>
  `

  // 使用事件委托处理所有点击
  document.querySelector('.showAllGoods').addEventListener('click', function (e) {
    const target = e.target;
    const cartBtn = target.closest('.addToCart');

    if (cartBtn) {
      // 点击"加入购物车"按钮
      const currentIndex = parseInt(cartBtn.getAttribute('data-index'));
      addToCart(currentIndex);
    }
  });

  // 添加到购物车函数
  function addToCart(productIndex) {
    const product = goodsData[productIndex];

    // 检查商品是否已在购物车中
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        ...product,
        quantity: 1
      });
    }

    // 保存到本地存储
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // 更新UI反馈
    showAddToCartFeedback(productIndex);
  }

  // 显示添加成功的反馈
  function showAddToCartFeedback(productIndex) {
    const cartBtn = document.querySelector(`.addToCart[data-index="${productIndex}"]`);
    const originalText = cartBtn.innerHTML;

    cartBtn.innerHTML = '✓ 已添加';
    cartBtn.style.backgroundColor = '#28a745';

    setTimeout(() => {
      cartBtn.innerHTML = originalText;
      cartBtn.style.backgroundColor = '';
    }, 1500);
  }

  observeNewImgs();
}

// 实现图片懒加载
// 创建全局观察器
let imgObserver = null
function lazyLoading() {
  imgObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        changeName(entry)
      }
    })
  })
  observeInitialImages();
}

// 将data-src改回src
function changeName(entry) {
  const img = entry.target ? entry.target : entry
  img.src = img.getAttribute('data-src')
  imgObserver.unobserve(img)
}

// 观察初始加载的图片
function observeInitialImages() {
  const initialImgs = document.querySelectorAll('img')
  initialImgs.forEach(initialImg => {
    imgObserver.observe(initialImg)
  })
}
// 观察JS动态加载的新图片
function observeNewImgs() {
  const newImgs = document.querySelectorAll('img[data-src]')
  newImgs.forEach(newImg => {
    imgObserver.observe(newImg)
  })
}

function checkLoginStatus() {
  const loginLink = document.querySelector('header .right li:first-child a');
  const logoutLink = document.getElementById('logoutLink');
  const username = localStorage.getItem('username');

  if (username) {
    // 用户已登录
    loginLink.textContent = `${username}`;
    loginLink.href = "./userCenter.html";
    if (logoutLink) {
      logoutLink.style.display = 'block';
    }
  } else {
    // 用户未登录
    loginLink.textContent = '请先登录';
    loginLink.href = "./login.html";
    if (logoutLink) {
      logoutLink.style.display = 'none';  // 未登录时隐藏退出登录按钮
    }
  }
}

// 退出登录
function setupLogout() {
  const logoutLink = document.getElementById('logoutLink');
  if (logoutLink) {
    logoutLink.addEventListener('click', function (e) {
      e.preventDefault();
      // 清除本地存储的用户信息
      localStorage.removeItem('username');
      // 更新UI
      checkLoginStatus();
      // 提示用户
      alert('已退出登录');
      window.location.reload();
    });
  }
}