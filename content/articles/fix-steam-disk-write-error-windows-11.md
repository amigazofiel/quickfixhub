---
title: "How to Fix Steam 'Disk Write Error' When Downloading or Updating Games"
description: "Fix the Steam Disk Write Error on Windows 11 and Windows 10. Clear the Steam downloading temp folder, remove read-only drive attributes with DiskPart, and verify library permissions."
date: "2026-11-07"
updatedAt: "2026-11-07"
category: "Apps & Software"
tags: ["Steam Disk Write Error", "Steam Troubleshooting", "Windows 11", "DiskPart", "PC Gaming Fix"]
errorCode: "Steam Disk Write Error"
osVersion: "Windows 11, Windows 10 & SteamOS"
readTime: "3 min read"
difficulty: "Easy"
quickFix:
  summary: "Steam throws a 'Disk Write Error' when it is blocked from writing patch files into steamapps\\downloading—usually because of a stuck 0-byte corrupted file, a read-only folder flag, or Windows DefenderControlled Folder Access."
  steps:
    - "Close Steam completely, then delete the contents of C:\\Program Files (x86)\\Steam\\steamapps\\downloading."
    - "Open Steam > Settings > Downloads and click 'Clear Download Cache'."
    - "Run Command Prompt as Administrator and clear any Read-Only attributes on your Steam library folder."
  command: "attrib -r -s \"C:\\Program Files (x86)\\Steam\\steamapps\\*.*\" /S /D"
  commandLabel: "Admin CMD: Remove Read-Only Lock From Steam Library"
faqs:
  - question: "Does a Steam Disk Write Error mean my SSD or hard drive is dying?"
    answer: "Usually no. Over 85% of Steam Disk Write Errors are caused by locked temporary files in the steamapps\\downloading directory or Windows UAC permissions rather than physical SSD failure."
  - question: "Does clearing the Steam Download Cache delete my installed games?"
    answer: "No. Clearing the download cache only removes unfinished temporary patch files and requires you to sign back into your Steam account."
---

## Method 1: Clear Locked Files in `steamapps\downloading` & `temp`

When a game patch is interrupted, Steam often leaves a locked 0-KB file inside the `downloading` directory that triggers a `Disk Write Error` on every retry.

1. Exit Steam completely (**Steam** menu > **Exit**).
2. Open **Command Prompt as Administrator** and run the following commands (adjust the path if your Steam library is on drive `D:` or `E:`):

```bat
attrib -r -s "C:\Program Files (x86)\Steam\steamapps\*.*" /S /D
rmdir /s /q "C:\Program Files (x86)\Steam\steamapps\downloading"
rmdir /s /q "C:\Program Files (x86)\Steam\steamapps\temp"
```

3. Right-click your **Steam** shortcut, select **Run as administrator**, and resume the game update.

## Method 2: Repair Steam Library Folder inside Steam Storage Manager

Steam includes a built-in permission repair tool hidden inside its Storage Settings.

1. Open **Steam** → click **Steam** (top-left) → **Settings**.
2. Click **Storage** in the left sidebar.
3. Select the drive where the game is installed, click the **three-dot menu (...) ** on the right, and click **Repair Folder**.
4. Confirm the UAC Administrator prompt and wait for Steam to verify write permissions across all subdirectories.

## Method 3: Clear Drive Read-Only Flag via `DiskPart` (For External or Secondary SSDs)

If your games are stored on a secondary NVMe/SATA SSD (`D:` or `E:`), Windows may have mounted the volume with a read-only attribute after an unexpected shutdown.

1. Open **Command Prompt as Administrator**.
2. Type `diskpart` and press **Enter**, then check your drive status:

```bat
list volume
select volume D
attributes disk clear readonly
attributes volume clear readonly
exit
```

*(Replace `D` with the drive letter of your game library drive).*
