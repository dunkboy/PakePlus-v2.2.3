window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug

// 保存原始 window.open 方法
const originalOpen = window.open;

// 需要放过的页面 URL（完全匹配或部分匹配均可，按需修改）
const ALLOWED_URLS = [
    'http://222.209.92.139:8001/dist/#/screen/screenDashboard',
    'https://another-domain.com/allow'
];

// 判断 URL 是否需要放过
function shouldAllowOpen(url) {
    return ALLOWED_URLS.some(allowed => url === allowed);
}

const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

// 修改后的 window.open
window.open = function (url, target, features) {
    console.log('open', url, target, features);
    if (shouldAllowOpen(url)) {
        // 放行，使用原生 window.open 打开新窗口
        return originalOpen.call(window, url, target, features);
    } else {
        // 否则依然在当前窗口打开
        location.href = url;
    }
};

document.addEventListener('click', hookClick, { capture: true });