function Rem() {
	var docEl = document.documentElement,
		oSize = docEl.clientWidth / 7.5; //如果是640设计稿，则/6.4

	if (oSize > 100) {
		oSize = 100; //  限制rem值   750 / 7.5 =100
	}

	docEl.style.fontSize = oSize + 'px';
}
window.addEventListener('resize', Rem, false);
Rem();



