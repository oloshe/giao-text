#giao-text
小程序文本输入组件,高度自定义，可拓展性。
##代码片段示例
[github @oloshe/giao-text](https://github.com/oloshe/giao-text)
#快速
##安装
```shell
npm install giao-text
```

#API
##Props
参数|说明|类型|默认值
-|-|-|-
string-set|字符集|String|-
separator|分隔符，用于分割stringSet|String|''
columns|列数，每行的最大按钮个数|Number|6
distinct|是否去重|Boolean|false
clearable|是否显示清除按钮|Boolean|false
type|可设置为任意原生类型, 如 number idcard textarea digit|String|'text'
password|是否是密码类型|Boolean|false
maxlength|最大长度，设置为-1为不限|Number|-1
random|按钮是否随机分配位置（在每次输入框获取焦点时）|Boolean|false
control-keep|按钮面板是否保持显示|Boolean|false
hoverStayTime|按钮点击态持续时间|Number|100
collapse-label|收起按钮显示文本|String|'收起'
collapse-slot|使用收起按钮slot时需设置此属性|Boolean|false
scroll|是否为滚动显示（单行）|Boolean|false
placeholder|输入框为空时占位符|String|-
placeholder-style|指定 placeholder 的样式|String|-
placeholder-class|指定 placeholder 的样式类|String|-
disabled|是否禁用|Boolean|false

输入框参考[微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/input.html)

##Events
事件|说明|返回参数
-|-|-
bind:change|内容改变事件|value = event.detail
bind:input|输入框输入事件，点击按钮不触发|value = event.detail
bind:focus|输入框获取焦点事件|-
bind:blur|输入框失去焦点事件|-
bind:confirm|点击完成按钮时触发|value = event.detail.value
bind:keyboardheightchange|键盘高度发生变化的时候触发此事件|-

