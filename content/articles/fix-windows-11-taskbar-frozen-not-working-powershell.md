---
title: "How to Fix Windows 11 Taskbar & Start Menu Frozen or Not Working"
description: "Unfreeze the Windows 11 Taskbar and Start Menu instantly. Restart explorer.exe, re-register ShellExperienceHost via PowerShell, and clear IrisService corruption."
date: "2026-11-06"
updatedAt: "2026-11-07"
category: "Windows"
tags: ["Windows 11 Taskbar", "Start Menu Not Working", "explorer.exe", "PowerShell Fix", "ShellExperienceHost"]
errorCode: "ShellExperienceHost / explorer.exe Hang"
osVersion: "Windows 11 (22H2, 23H2, 24H2) & Windows 10"
readTime: "3 min read"
difficulty: "Easy"
quickFix:
  summary: "When the Windows 11 Taskbar or Start Menu stops responding to clicks, either the Windows Explorer shell (explorer.exe) hung or the UWP Start Menu package (ShellExperienceHost) has a corrupted Appx manifest."
  steps:
    - "Press Ctrl + Shift + Esc to open Task Manager, or press Win + R to open Run."
    - "Run the instant explorer.exe restart command below to reload the taskbar without rebooting your PC."
    - "If the Start button still won't open, re-register all Windows 11 Shell packages in PowerShell (Admin)."
  command: "taskkill /f /im explorer.exe && start explorer.exe"
  commandLabel: "Instant CMD / Run Fix: Restart Windows Explorer Shell"
faqs:
  - question: "Does restarting explorer.exe close my open apps or unsaved documents?"
    answer: "No. Restarting explorer.exe only closes open File Explorer folders and reloads the desktop taskbar and system tray. Your web browser, games, and Word/Excel documents remain open."
  - question: "Why did my Windows 11 taskbar disappear or freeze after an update?"
    answer: "Cumulative updates occasionally corrupt the registry cache for IrisService (Windows Spotlight/Widgets) or leave a mismatched Appx manifest in StartMenuExperienceHost."
---

## Method 1: Instant Taskbar Reload via Command Prompt (`explorer.exe`)

Before rebooting your PC and losing your workflow, force-reload the Windows shell process in 2 seconds.

1. Press **Ctrl + Shift + Esc** to open **Task Manager**.
2. Click **Run new task** at the top, type `cmd`, check **Create this task with administrative privileges**, and click **OK**.
3. Copy and paste this command and press **Enter**:

```bat
taskkill /f /im explorer.exe && taskkill /f /im StartMenuExperienceHost.exe && start explorer.exe
```

## Method 2: Re-Register Windows 11 Taskbar & Start Menu Packages in PowerShell

If restarting `explorer.exe` does not bring back the Start Menu, Windows Search, or System Tray icons, re-register the system XAML packages.

1. Open **Task Manager (Ctrl + Shift + Esc)** → **Run new task**.
2. Type `powershell`, check **Create this task with administrative privileges**, and click **OK**.
3. Copy and run this PowerShell command:

```powershell
Get-AppXPackage -AllUsers | Foreach {Add-AppxPackage -DisableDevelopmentMode -Register "$($_.InstallLocation)\AppXManifest.xml" -ErrorAction SilentlyContinue}
```

4. Wait roughly 30–45 seconds for the yellow deployment progress bars at the top of PowerShell to finish, then restart your PC.

## Method 3: Clear Corrupted `IrisService` Registry Key (Windows 11 Bug Fix)

Microsoft confirmed a known issue where a corrupted `IrisService` registry entry freezes the entire Windows 11 taskbar on login.

1. Open **Command Prompt (Admin)** and run:

```bat
reg delete HKCU\Software\Microsoft\Windows\CurrentVersion\IrisService /f && shutdown -r -t 0
```

2. Your computer will immediately reboot and rebuild a clean taskbar configuration.
