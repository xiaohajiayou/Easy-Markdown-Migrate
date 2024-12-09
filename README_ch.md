<div align="center" style="font-size: 1em;"><h1><strong>Easy Markdown Migrate</strong></h1></div>  
<div align="center" ><h5><strong>英文</strong> | <a href="https://github.com/xiaohajiayou/Easy-Markdown-Migrate"><strong>Github</strong></a><h5></div>   
<p align="center" >  
  <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com" alt="Description">  
  <img src="https://img.shields.io/github/license/xiaohajiayou/Easy-Markdown-Migrate" alt="Description">  
  <img src="https://img.shields.io/visual-studio-marketplace/stars/Hacode.easy-markdown-migrate?color=%23FFA500%20" alt="Description">  
</p>  



  



**Easy Markdown Migrate** 是一个针对`Markdown`文件迁移而设计的插件，实现文件与链接背后的图片绑定，帮助用户轻松地移动、删除、复制、粘贴文件或内容，让本地管理和图床备份变得更简单。


项目简介
---------------
通过这个插件，用户只需专注于撰写文档，插件会自动识别文件中的图片链接，并将其与背后图片匹配，实现文件与图片的快速分类和移动。您只需要简单的通过快捷键使用`migrate file` 或`Copy With Content`、`Paste With Content` ，即可将文件与图片迁移到你所需的位置，极大地提高了文档管理的效率。

此外，Easy Markdown Migrate 还提供了图床上传、图片下载、图片移动、图片删除等功能，这些内容可以帮助开发者将本地文件发布为博客；也可以实现网络图片备份。这些操作都自动维护图片与文件的关系，保证图片链接的正确性。

我们的目标是让`Markdown`文档管理不仅高效，而且更加小白友好。即使是从未使用过`Markdown`的新手，甚至可以将所有文件和图片放在根目录，然后通过`Easy Markdown Migrate`实现可靠的迁移管理。  

主要特性  
---------------
- 本地迁移：  
1、当需要移动指定文件时，支持一键`迁移`md文件及其附属图片至目标位置。     
2、当需要移动指定内容（包含`图片URL`）时，支持一键`复制/剪切/粘贴`。     
3、当需要删除指定文件时，支持一键`丢弃`md文件及其附属图片至`.recycle`文件夹。     
4、当需要删除指定内容（包含`图片URL`）时，支持一键`删除`内容，并移动附属图片到`.recycle/images`文件夹。     



- 图床迁移：  
1、当需要发布指定文件为博客时，支持一键上传图片到图床，并生成`online`版副本文件，其中`url`被替换为图床链接。     
2、当需要备份网络资源时，支持一键下载图片到`./images`文件夹，并自动替换为本地链接。     

- 图片管理：  
1、当需要查看图片情况时，无需打开渲染器，支持一键`分析`当前图片资源。    
2、当需要仅移动附属图片到指定文件时，支持一键`迁移`附属图片至目标位置。       
3、当需要转换图片`URL`格式时，支持一键相对/绝对路径`转换`。       



如何安装
---------------
通过vscode内搜索**Easy Markdown Migrate**即可下载（后续会在github发布新Feature的预研版本，稳定版本同步到gitee，请给我一个star吧，关注不迷路哦~），安装插件即可使用本地管理所有功能。   
![alt text](https://s2.loli.net/2024/12/09/FubaJ91Ior5H7Xt.png)  
如需要使用图床上传，完成[图床配置](https://gitee.com/lilhah/easy-markdown-migrate/wikis/Home)即可使用。  


如何使用
---------------
**本插件提供菜单和常用快捷键两种使用方式，具体如下：**    
打开Markdown文件后，在编辑页面右键出现菜单如下：![alt text](https://s2.loli.net/2024/12/09/YiRJwI6VTue5gbC.png)  
功能描述如下：    
- 分析当前文件的图片链接:  `Analyze Image Links`  
  - 快捷键：`Ctrl` + `Shift` + `A`   
  
![alt text](https://s2.loli.net/2024/12/09/LYmVUzAJj4vc87k.gif)    
- 移动当前文件和图片 --> 另外的目录（自动更新图片链接） :  `Migrate Markdown File`  
  - 快捷键：`Ctrl` + `Shift` + `M`  
  
![alt text](https://s2.loli.net/2024/12/09/P9XEhwRUTyn1biJ.gif)        
- 复制/剪切当前文件内选中内容（包括图片） --> 另外的目录下的文件内 :  
  - 复制所选择的内容:  `Copy With Content`    
    - 快捷键：`Ctrl` + `Shift` + `C`   
  - 剪切所选择的内容:  `Cut With Content`    
    - 快捷键：`Ctrl` + `Shift` + `X`   
  - 粘贴之前选择的内容:  `Paste With Content`    
    - 快捷键：`Ctrl` + `Shift` + `V`   

+ 上传本地图片 --> 图床（自动生成图床版文件） ：`Upload Images`    
+ 下载远程图片 --> 本地备份 （自动更新为本地图片链接）：`Download Images`    
- 选择文件内图片链接 --> 移动图片到另外的目录（自动更新链接） ：`Move Select Images`  
- 插入本地目录下的图片 --> 一键转换为相对路径 ：`Absolute<->Relative`    
+ 选择文件内的图片链接 --> 丢弃图片到垃圾桶（自动清除链接） ：`Delete With Images`  
+ 删除当前文件 --> 丢弃文件与图片到垃圾桶（自动更新链接） ：`Drop File to Trash`    

具体使用方法及详细使用案例，请参考插件使用文档：  
- [Github](https://github.com/xiaohajiayou/Easy-Markdown-Migrate/wiki)  
- [Gitee](https://gitee.com/lilhah/easy-markdown-migrate/wikis/Home)  



* * *



**自定义快捷键：** 如果您需要更改这些快捷键，可以在VSCode的快捷键设置中进行自定义。  
*   打开VSCode设置（`Ctrl` + `,` 或 `Cmd` + `,`）。  
*   搜索“Keyboard Shortcuts”。  
*   找到 `easy-markdown-migrate.deleteImage` 命令。  
*   点击快捷键字段，然后按下您希望设置的新快捷键组合。  

**注意：**  

*   所有快捷键均在编辑器文本域有焦点时有效（`editorTextFocus`）。  
*   在执行复制、剪切或粘贴操作前，请确保您已经选中了需要操作的内容。 
*   复制剪切内容暂存于当前vscode编辑器中，无法跨vscode window执行粘贴操作  
*   迁移文件操作会移动文件和图片，请确保目标位置正确，以避免数据混乱。  
*   **插件不会删除资源，删除内容都在项目根路径`.recycle`文件中**。  

* * *

这个插件旨在减少撰写文档的成本，同时也让撰写随笔文档的过程更加轻松。无论您是正在学习的新手还是希望提高管理效率的开发者，Easy Markdown Migrate 都是您的理想选择。  




仓库地址  
---------------
https://github.com/xiaohajiayou/Easy-Markdown-Migrate  
欢迎使用！issue 反馈和contribute 贡献都非常欢迎。如果该插件解决了您的需求，请帮忙点上一个star，十分感谢！  
