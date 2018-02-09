if (mw.config.get('wgNamespaceNumber') == 10 || mw.config.get('wgNamespaceNumber') == 828) {
	var path = mw.config.get('wgArticlePath');
	var node = document.createElement("span");
	node.id = "template-transclusion-count";
	node.style = "margin-left: 5px;";
	node.innerHTML = '<a href="' + path.replace('$1', 'Special:链入页面/' + mw.config.get('wgPageName') + '?hidelinks=1&hideredirs=1&limit=500') + '">使用量</a>：<a id="ttclink" href="https://tools.wmflabs.org/templatecount/index.php?lang=zh&namespace='+mw.config.get('wgNamespaceNumber')+'&name='+encodeURIComponent(mw.config.get('wgTitle'))+'">未取得</a>';
	document.getElementsByClassName("mw-indicators mw-body-content")[0].appendChild(node);
	$.ajax({
		type: 'GET',
		url: "https://sp.tnfsh.tn.edu.tw/xiplus/Xiplus-zhWP/Template-transclusion-count.php?namespace="+mw.config.get('wgNamespaceNumber')+"&title="+encodeURIComponent(mw.config.get('wgTitle')),
		success: function success(data) {
			data = JSON.parse(data);
			if (data.status) {
				ttclink.innerHTML = data.result;
			} else {
				if (data.result == "fetch") {
					ttclink.innerHTML = "抓取錯誤2";
				} else if (data.result == "match") {
					ttclink.innerHTML = "分析錯誤";
				} else {
					ttclink.innerHTML = "未知錯誤";
				}
			}
		},
		error: function error(e) {
			ttclink.innerHTML = "抓取錯誤1";
		}
	});
}
