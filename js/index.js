document.addEventListener('DOMContentLoaded', function () {
      lazyLoading()
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
      let goodsData = []
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
  document.querySelector('.showAllGoods').addEventListener('click', function(e) {
    const target = e.target;
    const cartBtn = target.closest('.addToCart');
    
    if (cartBtn && !cartBtn.querySelector('.count')) {
      // 点击"加入购物车"按钮
      const currentIndex = parseInt(cartBtn.getAttribute('data-index'));
      cartBtn.innerHTML = `
        <div class="count">
          <div class="left" data-index="${currentIndex}">-</div>
          <div class="middle">1</div>
          <div class="right" data-index="${currentIndex}">+</div>
        </div>
      `;
    } else if (target.classList.contains('left')) {
      // 点击减号按钮
      const currentIndex = parseInt(target.getAttribute('data-index'));
      const cartBtn = target.closest('.addToCart');
      const middleDisplay = cartBtn.querySelector('.middle');
      let currentCount = parseInt(middleDisplay.textContent);
      
      if (currentCount <= 1) {
        cartBtn.innerHTML = '加入购物车';
      } else {
        currentCount--;
        middleDisplay.textContent = currentCount;
      }
    } else if (target.classList.contains('right')) {
      // 点击加号按钮
      const currentIndex = parseInt(target.getAttribute('data-index'));
      const cartBtn = target.closest('.addToCart');
      const middleDisplay = cartBtn.querySelector('.middle');
      let currentCount = parseInt(middleDisplay.textContent);
      
      currentCount++;
      middleDisplay.textContent = currentCount;
    }
    });
  
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