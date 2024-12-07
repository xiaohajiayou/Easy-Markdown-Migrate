
<div align="center" style="font-size: 1em;"><h1><strong>Easy Markdown Migrate</strong></h1></div>
<div align="center" ><h5><a href="https://github.com/xiaohajiayou/Easy-Markdown-Migrate/blob/main/README.md"><strong>中文</strong> </a>| <strong>English</strong><h5></div>   

<p align="center" style="margin-top: 10px;">
  <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com" alt="Description">
  <img src="https://img.shields.io/github/license/xiaohajiayou/Easy-Markdown-Migrate" alt="Description">
  <img src="https://img.shields.io/visual-studio-marketplace/stars/Hacode.easy-markdown-migrate?color=%23FFA500%20" alt="Description">
</p>

**Easy Markdown Migrate** is a plugin designed for Markdown file migration, achieving binding between files and the images behind their links, helping users easily move, delete, copy, and paste files or content, making local management and image bed backup simpler.  

### Project Introduction  

With this plugin, users only need to focus on writing documents. The plugin will automatically recognize the image links in the files and match them with the underlying images, achieving quick classification and movement of files and images. You simply need to use the shortcut keys for `migrate file` or `Copy With Content`, `Paste With Content` to move files and images to the desired location, greatly improving document management efficiency.  

In addition, Easy Markdown Migrate also provides functions such as image bed upload, image download, image movement, and image deletion. These functions can help developers publish local files as blog posts; they can also achieve network image backup. All these operations automatically maintain the relationship between images and files, ensuring the correctness of image links.  

Our goal is to make Markdown document management not only efficient but also more beginner-friendly. Even beginners who have never used Markdown can put all files and images in the root directory and then use Easy Markdown Migrate to achieve reliable migration management.  

### Main Features  

*   **Local Migration**:  
    
    1.  When you need to move a specified file, it supports one-click `migration` of md files and their affiliated images to the target location.  
    2.  When you need to move specified content (including `image URLs`), it supports one-click `copy/cut/paste`.  
    3.  When you need to delete a specified file, it supports one-click `discard` of md files and their affiliated images to the `.recycle` folder.  
    4.  When you need to delete specified content (including `image URLs`), it supports one-click `deletion` of content and moves affiliated images to the `.recycle/images` folder.  
*   **Image Bed Migration**:  
    
    1.  When you need to publish a specified file as a blog post, it supports one-click upload of images to the image bed and generates an `online` version of the file, where the `url` is replaced with the image bed link.    
    2.  When you need to back up network resources, it supports one-click download of images to the `./images` folder and automatically replaces them with local links.  
*   **Image Management**:
    1.  When you need to check the image status, there is no need to open a renderer; it supports one-click `analysis` of the current image resources.  
    2.  When you need to move affiliated images to a specified file only, it supports one-click `migration` of affiliated images to the target location.  
    3.  When you need to convert the image `URL` format, it supports one-click relative/absolute path `conversion`.   

### How to Install

Through the [Plugin Marketplace](https://marketplace.visualstudio.com/vscode) or by searching within VSCode, install the plugin to use all local management features.     
![alt text](https://raw.githubusercontent.com/xiaohajiayou/imagesBed/main/test/en_migrate-read-me/image-13.png)  
If you need to use image bed upload, complete the [image bed configuration](https://github.com/xiaohajiayou/Easy-Markdown-Migrate/wiki) to use.    

### How to Use

**The plugin provides two ways to use: menu and common shortcut keys, as follows:** After opening a Markdown file, right-click on the edit page to display the menu as follows:   

![alt text](https://raw.githubusercontent.com/xiaohajiayou/imagesBed/main/test/easy-markdown-migrate/image-14.png)  
Function descriptions are as follows:  

*   Analyze the image links of the current file: `Analyze Image Links`  
    
    *   Shortcut key: `Ctrl` + `Shift` + `A`
    
![alt text](https://raw.githubusercontent.com/xiaohajiayou/imagesBed/main/test/easy-markdown-migrate/analyse.gif)       
    
*   Move the current file and images to another directory (automatically update image links): `Migrate Markdown File`  
    
    *   Shortcut key: `Ctrl` + `Shift` + `M`  
    
![alt text](https://raw.githubusercontent.com/xiaohajiayou/imagesBed/main/test/easy-markdown-migrate/migrate.gif)    
    
*   Copy/cut selected content (including images) in the current file to another directory's file:  
    
    *   Copy selected content: `Copy With Content`  
        *   Shortcut key: `Ctrl` + `Shift` + `C`  
    *   Cut selected content: `Cut With Content`  
        *   Shortcut key: `Ctrl` + `Shift` + `X`  
    *   Paste previously selected content: `Paste With Content`  
        *   Shortcut key: `Ctrl` + `Shift` + `V`  
    
![alt text](https://raw.githubusercontent.com/xiaohajiayou/imagesBed/main/test/easy-markdown-migrate/copy.gif)    
    

*   Upload local images to the image bed (automatically generate an image bed version file): `Upload Images`  
*   Download remote images to local backup (automatically update to local image links): `Download Images`  

*   Select image links in the file to move images to another directory (automatically update links): `Move Select Images`  
*   Insert images from the local directory and convert to relative paths with one click: `Absolute<->Relative`  

*   Select image links in the file to discard images to the trash (automatically clear links): `Delete With Images`  
*   Delete the current file to discard files and images to the trash (automatically update links): `Drop File to Trash`  

For specific usage methods and detailed usage cases, please refer to the [plugin usage document](https://github.com/xiaohajiayou/Easy-Markdown-Migrate/wiki).  

* * *

**Customize Shortcut Keys:** If you need to change these shortcut keys, you can customize them in the VSCode shortcut key settings.  

*   Open VSCode settings (`Ctrl` + `,` or `Cmd` + `,`).
*   Search for "Keyboard Shortcuts".
*   Find the `easy-markdown-migrate.deleteImage` command.
*   Click the shortcut key field, then press the new shortcut key combination you wish to set.

**Note:**

*   All shortcut keys are effective when the editor text field has focus (`editorTextFocus`).
*   Before performing copy, cut, or paste operations, please ensure you have selected the content you need to operate on.
*   Copied and cut content is temporarily stored in the current VSCode editor and cannot be pasted across VSCode windows.
*   File migration operations will move files and images, please ensure the target location is correct to avoid data confusion.
*   **The plugin does not delete resources, deleted content is in the `.recycle` file at the project root path**.

* * *

This plugin aims to reduce the cost of writing documents and also make the process of writing essays more relaxed. Whether you are a beginner who is learning or a developer who wants to improve management efficiency, Easy Markdown Migrate is your ideal choice.

### Repository Address

https://github.com/xiaohajiayou/Easy-Markdown-Migrate    
Welcome to use it! Feedback and contributions are very welcome. If this plugin solves your needs, please help to star it, thank you very much!  