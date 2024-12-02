Easy Markdown Migrate
====

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com) ![](https://camo.githubusercontent.com/bc6f05c412ba8cdde130fedab361781310a9707d4162a1745ffab4da4c9a7ac4/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f58506f65742f706963783f7374796c653d666c6174266c6f676f3d676974687562)

本工具在移动文件或内容时，自动迁移图片并维护两者之间的链接关系，提供本地管理的迁移方案和图床管理的备份方案。
* * *
亮点
---------------
- 本地管理、图片迁移、自动链接
- 图床上传、图片下载、可靠备份
- 操作简单、文档完善、持续维护
- 代码开源、实现简单、欢迎贡献

如何安装
---------------
通过[插件市场](https://marketplace.visualstudio.com/vscode)或vscode内搜索的方式，安装插件即可使用本地管理所有功能。如需要使用图床上传，完成图床配置即可使用。

如何使用
---------------
打开Markdown文件后，在编辑页面右键出现菜单如下：![alt text](https://raw.githubusercontent.com/xiaohajiayou/imagesBed/main/test/test/m45wih2m.png)

  具体功能适用场景如下：  
- 分析当前文件的图片链接:  `Analyze Image Links`  
- 移动当前文件和图片 --> 另外的目录（自动更新图片链接） :  `migrate file`  
- 剪切当前文件内选中内容（包括图片） --> 另外的目录下的文件内 :   
  - 剪切所选择的内容:  `Crop Select content`  
  - 粘贴之前选择的内容:  `Paste Select content`  
+ 上传本地图片 --> 图床（自动生成图床版文件） ：`Upload images`  
+ 下载远程图片 --> 本地备份 （自动更新为本地图片链接）：`Download images`  
- 选择文件内图片链接 --> 移动图片到另外的目录（自动更新链接） ：`Move Select Images`  
- 插入本地目录下的图片 --> 一键转换为相对路径 ：`Absolute<->Relative`  
+ 选择文件内的图片链接 --> 丢弃图片到垃圾桶（自动清除链接） ：`Delete Select Images`  
+ 删除当前文件 --> 丢弃文件与图片到垃圾桶（自动更新链接） ：`Drop File to Trash`  

仓库地址
---------------
https://github.com/xiaohajiayou/Easy-Markdown-Migrate


**使用愉快!**