<div align="center" style="font-size: 1em;"><h1><strong>Easy Markdown Migrate</strong></h1></div>  
<div align="center" ><h5><strong>中文</strong> | <a href="https://gitee.com/lilhah/easy-markdown-migrate"><strong>Gitee</strong></a><h5></div>     
<p align="center" >  
  <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square" alt="Description">  
  <img src="https://img.shields.io/github/license/xiaohajiayou/Easy-Markdown-Migrate" alt="Description">  
  <img src="https://img.shields.io/visual-studio-marketplace/stars/Hacode.easy-markdown-migrate?color=%23FFA500" alt="Description">  
</p>  



**Easy Markdown Migrate** is a plugin designed for `Markdown `file migration, binding files with their linked images, and assisting users in local management and image bed backup (easily `uploading, downloading, moving, deleting, copying, and pasting` images and text), making document writing and note organization simpler.  


Project Introduction
---------------
Imagine needing to move a document or a piece of content (including image links) from its current path. Do the images migrate with the document/content? Are the image links still `valid`? 
*   Currently, to solve this migration issue, images are often automatically uploaded to an image bed (including unused images). As resources accumulate, it becomes increasingly difficult to distinguish and separate them.
    
*   Image beds have capacity `limits and are unstable`, so they should only be used for backing up final versions, allowing for easy switching between image bed services. Before that, local management is necessary.
    
*   This plugin `matches image links in files with their underlying images`, enabling reliable migration management for documents, such as quick categorization, `movement, deletion, copying, and pasting`, all `locally`.
    
*   Users can simply `publish` and `back up` the final version with one click through the menu or shortcuts, turning local files into `blogs/documents` and completing image bed and local backups.
    
*   File management is `entirely local`, with the image bed only saving the final published version, saving image bed resources and making backups easy.


Main Features  
---------------

- **Local Migration**:  
  1. When you need to move a specified file, it supports one-click `migration` of md files and their affiliated images to the target location.     
  2. When you need to move specified content (including `image URLs`), it supports one-click `copy/cut/paste`.
  3. When you need to move specified images (to other software), it supports one-click `copy to clipboard`.       
  4. When you need to delete a specified file, it supports one-click `discard` of md files and their affiliated images to the `.recycle` folder.     
  5. When you need to delete specified content (including `image URLs`), it supports one-click `deletion` of content and moves affiliated images to the `.recycle/images` folder.     


+ **Image Bed Migration (only updates local backup for final versions)**:  
  1. When publishing a specified file as a blog, it supports one-click uploading of all images to the image bed (replacing links) and generating a same-name local backup (with the prefix "origin").
  2. When updating published content, it supports one-click partial uploading, only uploading selected images to the image bed (replacing links) without updating the local backup.
  3. After completing the update of the published document, it supports one-click updating of the local backup (discarding the previously managed local resources and automatically downloading the latest resources).


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

![alt text](https://s2.loli.net/2024/12/09/P9XEhwRUTyn1biJ.gif)   
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