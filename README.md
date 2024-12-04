<div align="center" style="font-size: 1em;"><h1><strong>Easy Markdown Migrate</strong></h1></div>  
<div align="center" ><h5><strong>中文</strong> | <a href="https://github.com/xiaohajiayou/Easy-Markdown-Migrate/blob/dev/README_en.md"><strong>English</strong></a><h5></div>   
<p align="center" >  
  <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com" alt="Description">  
  <img src="https://img.shields.io/github/license/xiaohajiayou/Easy-Markdown-Migrate" alt="Description">  
  <img src="https://img.shields.io/visual-studio-marketplace/stars/Hacode.easy-markdown-migrate?color=%23FFA500%20" alt="Description">  
</p>  



  



**Easy Markdown Migrate** 是一个针对`Markdown`文件迁移而设计的插件，实现文件与链接背后的图片绑定，帮助用户轻松地移动、删除、复制、粘贴文件或内容，让本地管理和图床备份变得更简单。



项目简介
---------------
通过这个插件，用户只需专注于撰写文档，插件会自动识别文件中的图片链接，并将其与背后图片匹配，可以实现同一级目录下文件与图片的快速分类。只需要简单的点击菜单选项`migrate file` 或`Copy Select content`、`Paste Select content` ，即可将文件与图片迁移到你所需的位置，实现文件与图片的无缝迁移，极大地提高了文档管理的效率。

此外，Easy Markdown Migrate 还提供了图床上传、图片下载、图片移动、图片删除等功能，这些内容可以帮助习惯本地管理的开发者发布博客所需的图床版本备份；也可以方便习惯图床管理的开发者，将远程图片下载到本地，维护本地备份。这些操作都自动维护图片与文件的关系，保证图片链接的正确性。

我们的目标是让`Markdown`文档管理不仅高效，而且更加小白友好。即使是从未使用过`Markdown`的新手，甚至可以将所有文件和图片放在根目录，然后通过`Easy Markdown Migrate`实现可靠的迁移管理。

如何安装
---------------
通过[插件市场](https://marketplace.visualstudio.com/vscode)或vscode内搜索的方式，安装插件即可使用本地管理所有功能。如需要使用图床上传，完成[图床配置](https://github.com/xiaohajiayou/Easy-Markdown-Migrate/wiki/Easy%E2%80%90Markdown%E2%80%90Migrate-document)即可使用。

如何使用
---------------
**本插件提供菜单和常用快捷键两种使用方式，具体如下：**
**菜单使用指南：**   
打开Markdown文件后，在编辑页面右键出现菜单如下：![alt text](https://raw.githubusercontent.com/xiaohajiayou/imagesBed/main/test/easy-markdown-migrate_how_to_use/m4777wb8.png)    

  具体功能适用场景如下：    
- 分析当前文件的图片链接:  `Analyze Image Links`  
- 移动当前文件和图片 --> 另外的目录（自动更新图片链接） :  `Migrate Markdown File`  
- 复制/剪切当前文件内选中内容（包括图片） --> 另外的目录下的文件内 : 
  - 复制所选择的内容:  `Copy With Content`  
  - 剪切所选择的内容:  `Cut With Content`  
  - 粘贴之前选择的内容:  `Paste With Content`  
+ 上传本地图片 --> 图床（自动生成图床版文件） ：`Upload Images`  
+ 下载远程图片 --> 本地备份 （自动更新为本地图片链接）：`Download Images`  
- 选择文件内图片链接 --> 移动图片到另外的目录（自动更新链接） ：`Move Select Images`  
- 插入本地目录下的图片 --> 一键转换为相对路径 ：`Absolute<->Relative`  
+ 选择文件内的图片链接 --> 丢弃图片到垃圾桶（自动清除链接） ：`Delete With Images`  
+ 删除当前文件 --> 丢弃文件与图片到垃圾桶（自动更新链接） ：`Drop File to Trash`  


* * *

**快捷键使用指南**  
以下是 Easy Markdown Migrate 插件中常用功能对应的快捷键，帮助您快速执行常用操作：  

- 分析图片链接（Analyze Image Links）
  *   Windows/Linux: `Ctrl` + `Shift` + `A`
  *   macOS: `Cmd` + `Shift` + `A`  
- **功能描述：** 分析当前Markdown文件中的图片链接，为迁移操作做准备。


+ 迁移文件（Migrate Markdown File）
  *   Windows/Linux: `Ctrl` + `Shift` + `M`
  *   macOS: `Cmd` + `Shift` + `M`
+ **功能描述：** 迁移当前Markdown文件及其关联图片到新的位置，并自动更新图片链接。


- 复制选中内容（Copy Select Content）
  *   Windows/Linux: `Ctrl` + `Shift` + `C`
  *   macOS: `Cmd` + `Shift` + `C`
- **功能描述：** 复制Markdown文件中选中的内容，包括图片，到剪贴板。


+ 剪切选中内容（Cut Select Content）
  *   Windows/Linux: `Ctrl` + `Shift` + `X`
  *   macOS: `Cmd` + `Shift` + `X`
+ **功能描述：** 剪切Markdown文件中选中的内容，包括图片，到剪贴板，并从原始位置移除。


- 粘贴选中内容（Paste Select Content）
  *   Windows/Linux: `Ctrl` + `Shift` + `V`
  *   macOS: `Cmd` + `Shift` + `V`
- **功能描述：** 将剪贴板中的Markdown内容（包括图片）粘贴到当前文件的光标位置。

**使用前提：** 所有快捷键均在编辑器文本域有焦点时有效（`editorTextFocus`）。

**自定义快捷键：** 如果您需要更改这些快捷键，可以在VSCode的快捷键设置中进行自定义。
*   打开VSCode设置（`Ctrl` + `,` 或 `Cmd` + `,`）。
*   搜索“Keyboard Shortcuts”。
*   找到 `easy-markdown-migrate.deleteImage` 命令。
*   点击快捷键字段，然后按下您希望设置的新快捷键组合。

**注意：**

*   在执行复制、剪切或粘贴操作前，请确保您已经选中了需要操作的内容。
*   迁移文件操作会移动文件和图片，请确保目标位置正确，以避免数据混乱。
*   **插件不会删除资源，删除内容都在项目根路径`.recycle`文件中**。

通过这些快捷键，您可以更高效地管理Markdown文件及其关联的图片。如果您有任何疑问或建议，欢迎通过我们的插件页面提出。

* * *

这个插件旨在减少撰写文档的成本，同时也让撰写随笔文档的过程更加轻松。无论您是正在学习的新手还是希望提高管理效率的开发者，Easy Markdown Migrate 都是您的理想选择。




仓库地址
---------------
https://github.com/xiaohajiayou/Easy-Markdown-Migrate  
欢迎使用！issue 反馈和contribute 贡献都非常欢迎。
