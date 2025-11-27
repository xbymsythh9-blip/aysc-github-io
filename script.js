// 产品数据
const products = [
    { id: 1, title: "高级VPN访问", description: "无限带宽，无日志政策，全球服务器网络。", price: "$99.99" },
    { id: 2, title: "渗透测试工具包", description: "专业级安全评估工具集合，定期更新。", price: "$699.99" },
    { id: 3, title: "匿名通信协议", description: "端到端加密通信系统，防止监控和追踪。", price: "$9999.99" },
    { id: 4, title: "数据恢复套件", description: "高级数据恢复工具，支持多种文件系统。", price: "$99.99" },
    { id: 5, title: "工具与服务", description: "网站 / 系统渗透测试，数据删除 / 修改，社交媒体账号劫持。", price: "$999.99" },
    { id: 6, title: "棋牌工具破解", description: "透视、智能识别牌型、胜率分析、防检测技术。", price: "$99.99" }
];

// 动态创建产品列表
function renderProducts() {
    const container = document.getElementById('products-container');
    
    // 如果你在根目录下有 images 文件夹，可以这样引用
    // const imagePath = 'images/'; 

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product';
        // productCard.onclick = () => openPaymentModal(product); // 为产品添加点击事件
        
        productCard.innerHTML = `
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p class="price">价格: ${product.price}</p>
        `;
        container.appendChild(productCard);
    });
}

// 启动矩阵背景
function createMatrixBackground() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const container = document.getElementById('matrixBg');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    container.appendChild(canvas);

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 33);

    // 响应窗口大小变化
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// 模态框交互函数
function openPaymentModal(product) {
    // 这里可以根据 product 参数显示不同商品的信息
    // document.getElementById('modalProductTitle').innerText = product.title;
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'block';
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'none';
}

function copyPaymentAddress() {
    const addressText = document.getElementById('paymentAddressDisplay').innerText;
    navigator.clipboard.writeText(addressText).then(() => {
        alert('支付地址已复制到剪贴板！');
    }).catch(err => {
        console.error('复制失败:', err);
        // 备用复制方法（对于不兼容 API 的浏览器）
        const textArea = document.createElement("textarea");
        textArea.value = addressText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('支付地址已复制到剪贴板！');
    });
}

// 页面加载完成后执行所有初始化函数
window.onload = function() {
    renderProducts();  // 先渲染产品列表
    createMatrixBackground(); // 再创建矩阵背景
};

// 点击模态框外部也可以关闭它
window.onclick = function(event) {
    const modal = document.getElementById('paymentModal');
    if (event.target == modal) {
        closePaymentModal();
    }
}
