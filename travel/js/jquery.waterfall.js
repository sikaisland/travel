// 为 jq  添加一个 插件
$.fn.extend({
	waterfall:function(){
		var $_this = this;
		// 总宽度
		var totalWidth = $_this.width();
		// 子元素宽度
		var itemWidth = $_this.children('.inner').width();//---inner

		// 计算每一行 元素的个数,向下取整
		var colCount = Math.floor(totalWidth/itemWidth);

		// 计算间距
		var margin = Math.floor((totalWidth-itemWidth*colCount)/(colCount+1));

		
		// 准备 数组 用来 保存 上一行的绝对高度 
		var heightArr =[];
		for (var i = 0; i < colCount; i++) {//---第一行的默认高度--margin
			heightArr.push(margin);
		}

		// 设置 瀑布流中 子元素的 top 以及 left
		$_this.children('.inner').each(function (index,element) {//---childs--inner
			// 将dom 转化为 jq对象
			var $_item=$(element);
			
			// 计算 数组中的 高度的最小值
			// 假设 最小的索引为 0
			var minIndex = 0;
			// 假设 最小的 高度为 第一个元素
			var minHeight = heightArr[0];

			// 循环高度 数组 计算 最小的 索引值 以及 最小的高度值
			for (var i = 0; i < heightArr.length; i++) {
				if (minHeight>heightArr[i]) {
					// 保存最小值
					minHeight = heightArr[i];
					//保存最小的索引
					minIndex = i;
				}
			}
			// 到这 就有了 最小的值
			$_item.css({
				top:minHeight,
				left: margin+(margin+itemWidth)*minIndex,
			});
			
			//修改 高度 数组中 对应 索引的 高度值
			heightArr[minIndex] +=$_item.height()+margin;//---在高度最小的位置排图片，并计算排完之后的高度，放进数据，此时的高度值可能不是最小的，继续下次遍历。

		})

		// 找到 高度数组的 最大值 设置给 我们的 父容器 这里是 $_this 
		// 定义变量
		var maxHeight = heightArr[0];
		for (var i = 0; i < heightArr.length; i++) {
			if (heightArr[i]>maxHeight) {
				maxHeight = heightArr[i];
			}
		}
		
		//---子元素高度的最大值，就是父元素的高度。
		$_this.height(maxHeight);
//		console.log($_this.height());
	}
})