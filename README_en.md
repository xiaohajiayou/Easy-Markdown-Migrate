<div align="center" style="font-size: 1em;"><h1><strong>Easy Markdown Migrate</strong></h1></div>
<div align="center" ><h5><a href="https://github.com/xiaohajiayou/Easy-Markdown-Migrate/blob/dev/README.md"><strong>中文</strong> </a>| <strong>English</strong><h5></div>   

<p align="center" style="margin-top: 10px;">
  <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com" alt="Description">
  <img src="https://img.shields.io/github/license/xiaohajiayou/Easy-Markdown-Migrate" alt="Description">
  <img src="https://img.shields.io/visual-studio-marketplace/stars/Hacode.easy-markdown-migrate?color=%23FFA500%20" alt="Description">
</p>


**Easy Markdown Migrate** is a plugin designed for migrating `Markdown` files, linking files with the images referenced within them, and assisting users in easily moving, deleting, copying, and pasting files or content, simplifying local management and image hosting backups.  

**Project Overview**  
--------------------  

With this plugin, users can focus on writing documents while the plugin automatically identifies image links in the files and matches them with the corresponding images, enabling quick sorting of files and images within the same directory. Simply click on the menu options `Migrate File` or `Copy Select Content`, `Paste Select Content` to migrate files and images to the desired location, achieving seamless migration of files and images, greatly improving the efficiency of document management.  

In addition, Easy Markdown Migrate also provides features such as image hosting upload, image download, image move, and image delete. These features can help developers who are used to local management to publish blog image hosting version backups; it can also facilitate developers who prefer image hosting management to download remote images to local for maintenance and local backup. These operations automatically maintain the relationship between images and files, ensuring the correctness of image links.  

Our goal is to make `Markdown` document management not only efficient but also user-friendly. Even beginners who have never used `Markdown` can simply place all files and images in the root directory and use `Easy Markdown Migrate` to achieve reliable migration management.  

**How to Install**  
------------------

Install the plugin via the [Extension Marketplace](https://marketplace.visualstudio.com/vscode) or search within VSCode to use all local management features. If you need to use image hosting upload, complete the [image hosting configuration](https://github.com/xiaohajiayou/Easy-Markdown-Migrate/wiki/Easy%E2%80%90Markdown%E2%80%90Migrate-document)to use.  

**How to Use**  
--------------

**Menu Usage Guide:** After opening a Markdown file, a context menu will appear when you right-click in the editing area as follows: ![alt text](https://raw.githubusercontent.com/xiaohajiayou/imagesBed/main/test/easy-markdown-migrate_how_to_use/m4777wb8.png)  
 
The specific features apply to the following scenarios:  

*   Analyze the image links in the current file: `Analyze Image Links`  
*   Move the current file and images to another directory (automatically update image links): `Migrate Markdown File`
*   Copy/Cut the selected content (including images) in the current file to another file in a different directory:
    *   Copy the selected content: `Copy With Content`  
    *   Cut the selected content: `Cut With Content`  
    *   Paste the previously selected content: `Paste With Content`  
*   Upload local images to an image hosting service (automatically generate a file version on the image hosting service): `Upload Images`  
*   Download remote images to local for backup (automatically update to local image links): `Download Images`
*   Select an image link in the file to move the image to another directory (automatically update the link): `Move Select Images`  
*   Insert an image from a local directory and automatically convert it to a relative path: `Absolute<->Relative`
*   Select an image link in the file to delete the image to the trash (automatically remove the link): `Delete With Images`  
*   Delete the current file to discard the file and images to the trash (automatically update the links): `Drop File to Trash`  

**Keyboard Shortcuts Guide** Below are the keyboard shortcuts for common functions in the Easy Markdown Migrate plugin, helping you to perform common operations quickly:  

*   Analyze Image Links
    *   Windows/Linux: `Ctrl` + `Shift` + `A`  
    *   macOS: `Cmd` + `Shift` + `A`  
*   Migrate Markdown File
    *   Windows/Linux: `Ctrl` + `Shift` + `M`
    *   macOS: `Cmd` + `Shift` + `M`
*   Copy Select Content
    *   Windows/Linux: `Ctrl` + `Shift` + `C`
    *   macOS: `Cmd` + `Shift` + `C`
*   Cut Select Content
    *   Windows/Linux: `Ctrl` + `Shift` + `X`
    *   macOS: `Cmd` + `Shift` + `X`
*   Paste Select Content
    *   Windows/Linux: `Ctrl` + `Shift` + `V`
    *   macOS: `Cmd` + `Shift` + `V`

**Prerequisites for Use:** All shortcuts are effective when the editor text area is in focus (`editorTextFocus`).

**Customize Shortcuts:** If you need to change these shortcuts, you can customize them in VSCode's keyboard shortcut settings.

*   Open VSCode settings (`Ctrl` + `,` or `Cmd` + `,`).
*   Search for "Keyboard Shortcuts".
*   Find the `easy-markdown-migrate.deleteImage` command.
*   Click on the shortcut field and press the new key combination you wish to set.

**Note:**

*   Ensure you have selected the content you want to operate on before performing copy, cut, or paste actions.
*   The migrate file operation will move files and images; make sure the target location is correct to avoid data confusion.
*   The plugin does not delete resources; deleted content is stored in the project root path `.recycle` directory.

This plugin aims to reduce the cost of writing documents and make the process of writing casual documents more relaxed. Whether you are a beginner learning or a developer looking to improve management efficiency, Easy Markdown Migrate is an ideal choice for you.

**Repository Address**
----------------------

[https://github.com/xiaohajiayou/Easy-Markdown-Migrate](https://github.com/xiaohajiayou/Easy-Markdown-Migrate)    
Welcome to use it! Feedback through issues and contributions are both very welcome.  