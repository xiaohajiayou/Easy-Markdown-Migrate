<div align="center" style="font-size: 1em;"><h1><strong>Easy Markdown Migrate</strong></h1></div>  
<div align="center" ><h5><strong>中文</strong> | <a href="https://gitee.com/lilhah/easy-markdown-migrate"><strong>Gitee</strong></a><h5></div>     
<p align="center" >  
  <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square" alt="Description">  
  <img src="https://img.shields.io/github/license/xiaohajiayou/Easy-Markdown-Migrate" alt="Description">  
  <img src="https://img.shields.io/visual-studio-marketplace/stars/Hacode.easy-markdown-migrate?color=%23FFA500" alt="Description">  
</p>  



**Easy Markdown Migrate** is a plugin designed for `Markdown` file migration, achieving binding between files and the images behind their links, helping users to upload、download、move, delete, copy, and paste files or content easily, making local management and image bed backup simpler.


Project Introduction
---------------

With this plugin, users only need to focus on writing documents. The plugin will automatically recognize the image links in the files and match them with the underlying images, achieving quick classification and movement of files and images. You simply need to use the shortcut keys for `Migrate Markdown File` or `Copy With Images`, `Paste With Images`, `Copy to clipboard`, to move files and images to the desired location, greatly improving document management efficiency.

In addition, Easy Markdown Migrate also provides functions such as image bed upload and image download. You only need to use shortcut keys for `Upload and Release` or `Upload Select Url`, `Update Origin File`, `Download Images`, to publish the current document (automatically upload, update links, generate origin backup), partial upload (upload selected images, update links), and backup update (download all images of the published version, update origin backup links). These operations can help developers publish local files as blog posts; they can also achieve network image backup. All these operations automatically maintain the relationship between images and files, ensuring the correctness of image links.

Our goal is to make `Markdown` document management not only efficient but also more beginner-friendly. Even beginners who have never used `Markdown` can put all files and images in the root directory and then use Easy Markdown Migrate to achieve reliable migration management.


Main Features  
---------------

- **Local Migration**:  
  1. When you need to move a specified file, it supports one-click `migration` of md files and their affiliated images to the target location.     
  2. When you need to move specified content (including `image URLs`), it supports one-click `copy/cut/paste`.
  3. When you need to move specified images (to other software), it supports one-click `copy to clipboard`.       
  4. When you need to delete a specified file, it supports one-click `discard` of md files and their affiliated images to the `.recycle` folder.     
  5. When you need to delete specified content (including `image URLs`), it supports one-click `deletion` of content and moves affiliated images to the `.recycle/images` folder.     


- **Image Bed Migration**:  
  1. When you need to publish a specified file as a blog post, it supports one-click publishing, uploading images to the image bed, where `url` is replaced with the image bed link, and generates an `origin` version of the local file.
  2. When you need to update published content, it supports one-click partial upload, uploading selected images to the image bed, and automatically updating links     
  2. When you need to back up network resources, it supports one-click update backup, backing up the latest published content, automatically downloading all image resources, keeping resource management local.     


- **Image Management**:  
  1. When you need to check the image status, there is no need to open a renderer; it supports one-click `analysis` of the current image resources.    
  2. When you need to move affiliated images to a specified file only, it supports one-click `migration` of affiliated images to the target location.       
  3. When you need to convert the image `URL` format, it supports one-click relative/absolute path `conversion`.       


How to Install
---------------

You can download **Easy Markdown Migrate** by searching within VSCode (later, new feature preview versions will be released on github, and stable versions will be synchronized to gitee, please give me a star, follow not lost~), install the plugin to use all local management features.   
![alt text](https://s2.loli.net/2024/12/09/FubaJ91Ior5H7Xt.png)     
If you need to use image bed upload, complete the [image bed configuration](https://gitee.com/lilhah/easy-markdown-migrate/wikis/Home) to use.     


How to Use
---------------

**The plugin provides two ways to use: menu and common shortcut keys, as follows:**    
After opening a Markdown file, right-click on the edit page to display the menu as   follows:       
![alt text](https://s2.loli.net/2024/12/20/wFGAuzDdTgkKfYV.png)    
Function descriptions are as follows:    
- Analyze the image links of the current file:  `Analyze Image Links`  
  - Shortcut key: `Ctrl` + `Shift` + `A`   

- Move the current file and images to another directory (automatically update image links): `Migrate Markdown File`  
  - Shortcut key: `Ctrl` + `Shift` + `M`  

![alt text](https://s2.loli.net/2024/12/09/P9XEhwRUTyn1biJ.gif)           
- Copy/cut selected content (including images) in the current file to another directory's file:  
  - Copy selected content: `Copy With Images`    
    - Shortcut key: `Ctrl` + `Shift` + `C`   
  - Cut selected content: `Cut With Images`    
    - Shortcut key: `Ctrl` + `Shift` + `X` 
  - Delete selected content: `Delete With Images`    
    - Shortcut key: `Ctrl` + `Shift` + `D`    
  - Paste previously selected content: `Paste With Images`    
    - Shortcut key: `Ctrl` + `Shift` + `V`   
  - Copy images to clipboard: `Copy to clipboard`    
    - Shortcut key: `Ctrl` + `alt` + `C`  

+ Publish final version of the document --> Upload images to image bed (automatically generate origin backup): `Upload and Release`      
+ Update content of published document --> Upload partial images (only upload，no origin backup ): `Upload Select Url`    
+ Backup the latest published document's content --> Download all images (automatically update origin backup content): `Update Origin File`  
- Select image links in the file to move images to another directory (automatically update links): `Move Select Images`  
- Insert images from the local directory and convert to relative paths with one click: `Absolute<->Relative`    
+ Delete the current file to discard files and images to the trash (automatically update links): `Drop File to Trash`    


For specific usage methods and detailed usage cases, please refer to the plugin usage document:  
- [Github](https://github.com/xiaohajiayou/Easy-Markdown-Migrate/wiki)     
- [Gitee](https://gitee.com/lilhah/easy-markdown-migrate/wikis/Home)     


**Customize Shortcut Keys:** If you need to change these shortcut keys, you can customize them in the VSCode shortcut key settings.  
*   Open VSCode settings (`Ctrl` + `,` or `Cmd` + `,`).  
*   Search for "Keyboard Shortcuts".  
*   Find the `easy-markdown-migrate.deleteImage` command.  
*   Click the shortcut key field, then press the new shortcut key combination you wish to set.  

**Note:**  

*   All shortcut keys are effective when the editor text field has focus (`editorTextFocus`).  
*   Before performing copy, cut, or paste operations, please ensure you have selected the content you need to operate on. 
*   Copied and cut content is temporarily stored in the current VSCode editor and cannot be pasted across VSCode windows  
*   File migration operations will move files and images, please ensure the target location is correct to avoid data confusion.  
*   **The plugin does not delete resources, deleted content is in the `.recycle` file at the project root path**.  



This plugin aims to reduce the cost of writing documents and also make the process of writing essays more relaxed. Whether you are a beginner who is learning or a developer who wants to improve management efficiency, Easy Markdown Migrate is your ideal choice.


Repository Address  
---------------

https://github.com/xiaohajiayou/Easy-Markdown-Migrate      
Welcome aboard! Feedback on issues and contributions are both greatly appreciated. If this plugin meets your needs, please give it a star . Thank you very much!    