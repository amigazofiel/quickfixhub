---
title: "How to Fix Discord Stuck on 'Checking for Updates' Loop (Windows 11 & Mac)"
description: "Fix Discord stuck on the 'Checking for updates' or grey screen loop in 30 seconds. Kill zombie Discord.exe processes, clear %appdata% cache, and bypass proxy locks."
date: "2026-11-06"
updatedAt: "2026-11-07"
category: "Apps & Software"
tags: ["Discord Update Loop", "Discord Fix", "Windows 11", "macOS", "App Troubleshooting"]
errorCode: "Checking for Updates Loop"
osVersion: "Windows 10/11 & macOS"
readTime: "2 min read"
difficulty: "Easy"
quickFix:
  summary: "Discord gets stuck on 'Checking for updates' when a zombie background Discord.exe process locks the Update.exe installer file, or when corrupted cache files in %appdata%\\discord block the patch download."
  steps:
    - "Open Command Prompt or Run (Win + R) and force-close all hidden Discord processes using taskkill."
    - "Delete the Cache, Code Cache, and GPUCache folders inside %appdata%\\discord."
    - "Launch Update.exe directly as Administrator from %localappdata%\\Discord."
  command: "taskkill /F /IM discord.exe /T && start \"\" \"%localappdata%\\Discord\\Update.exe\" --processStart Discord.exe"
  commandLabel: "Windows CMD: Force Kill & Relaunch Discord Updater"
faqs:
  - question: "Why is Discord stuck on Checking for Updates even when my internet works?"
    answer: "Discord's Squirrel updater (Update.exe) cannot overwrite files if a silent background Discord.exe process is still running from a previous session, or if a Windows proxy setting intercepts the TLS handshake."
  - question: "Does deleting the %appdata%\\discord\\Cache folder log me out?"
    answer: "No. Deleting only the Cache, Code Cache, and GPUCache folders preserves your login token, keybinds, and voice settings."
---

## Method 1: Kill Hidden Discord Processes & Relaunch Updater (1-Click Command)

Closing the Discord window does not always terminate all six background `Discord.exe` subprocesses.

1. Press **Win + R** to open the Run dialog, type `cmd`, and press **Ctrl + Shift + Enter** to open **Command Prompt as Administrator**.
2. Copy and run this single command to terminate all zombie processes, flush DNS, and start the updater cleanly:

```bat
taskkill /F /IM discord.exe /T & ipconfig /flushdns & start "" "%localappdata%\Discord\Update.exe" --processStart Discord.exe
```

## Method 2: Clear Corrupted Discord Cache in `%appdata%`

If the updater still spins indefinitely, clear the three corrupted Chromium cache folders inside Discord's roaming profile.

1. Make sure Discord is closed (`taskkill /F /IM discord.exe /T`).
2. Open **PowerShell** or **Command Prompt** and run:

```bat
rmdir /s /q "%appdata%\discord\Cache"
rmdir /s /q "%appdata%\discord\Code Cache"
rmdir /s /q "%appdata%\discord\GPUCache"
```

3. Right-click your Discord desktop shortcut and select **Run as administrator**.

## Method 3: Disable Windows LAN Proxy Override

VPNs and network optimizers often leave a dead local proxy toggled on, which blocks Discord's update server while normal web browsers bypass it.

1. Press **Win + R**, type `inetcpl.cpl`, and press **Enter** to open **Internet Properties**.
2. Click the **Connections** tab → click **LAN settings** at the bottom.
3. Check **Automatically detect settings** and **uncheck** *Use a proxy server for your LAN*.
4. Click **OK** and launch Discord.
