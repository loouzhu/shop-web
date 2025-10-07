document.addEventListener('DOMContentLoaded', function() {
  // 渲染购物车
  renderCart();
});

// 渲染购物车
function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const goodsList = document.querySelector('.goodsList');

  if (cartItems.length === 0) {
    goodsList.innerHTML = `
      <div class="empty-cart">
        <h3>购物车为空</h3>
        <p>快去添加一些商品吧！</p>
        <a href="./index.html" class="btn btn-primary">去购物</a>
      </div>
    `;
    return;
  }
  
  let totalPrice = 0;
  const cartHTML = `
    ${cartItems.map((item, index) => {
      const itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;
      return `
        <li class="good-item">
          <div class="info" style="width: 40%;">
            <img src="${item.image}" alt="${item.title}">
            <span class="name">${item.title}</span>
          </div>
          <div class="rest">
            <span class="price">¥${item.price}</span>
            <div class="counts">
              <button class="reduce decrease-btn" data-index="${index}">-</button>
              <span class="count">${item.quantity}</span>
              <button class="add increase-btn" data-index="${index}">+</button>
            </div>
            <span class="total">¥${itemTotal.toFixed(2)}</span>
            <button class="delete remove-btn" data-index="${index}">删除商品</button>
          </div>
        </li>
      `;
    }).join('')}
    <div class="cart-summary">
      <div class="total-price">
        <h4>总计: ¥${totalPrice.toFixed(2)}</h4>
      </div>
      <div class="cart-actions">
        <button class="btn btn-secondary" id="continue-shopping">继续购物</button>
        <button class="btn btn-primary" id="checkout">结算</button>
        <button class="btn btn-outline-danger" id="clear-cart">清空购物车</button>
      </div>
    </div>
  `;
  
  goodsList.innerHTML = cartHTML;
  
  // 绑定事件
  bindCartEvents();
}

// 绑定购物车事件
function bindCartEvents() {
  // 增加数量
  document.querySelectorAll('.increase-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'));
      updateQuantity(index, 1);
    });
  });
  
  // 减少数量
  document.querySelectorAll('.decrease-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'));
      updateQuantity(index, -1);
    });
  });
  
  // 删除商品
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'));
      removeItem(index);
    });
  });
  
  // 继续购物
  document.getElementById('continue-shopping').addEventListener('click', function() {
    window.location.href = './index.html';
  });
  
  // 清空购物车
  document.getElementById('clear-cart').addEventListener('click', function() {
    if (confirm('确定要清空购物车吗？')) {
      localStorage.removeItem('cartItems');
      renderCart();
    }
  });
  
  // 结算
  document.getElementById('checkout').addEventListener('click', function() {
    alert('结算功能开发中...');
  });
}

// 更新商品数量
function updateQuantity(index, change) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
  if (cartItems[index]) {
    cartItems[index].quantity += change;
    
    // 如果数量为0，移除商品
    if (cartItems[index].quantity <= 0) {
      cartItems.splice(index, 1);
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
  }
}

// 移除商品
function removeItem(index) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
  if (confirm('确定要删除这个商品吗？')) {
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
  }
}