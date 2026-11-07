---
title: "How to Fix Windows Update Error 0x80070005 (Access Denied) on Windows 11/10"
description: "Resolve Windows Update Error 0x80070005 (E_ACCESSDENIED) fast. Reset SoftwareDistribution permissions, repair corrupted system files with DISM/SFC, and unblock updates."
date: "2026-11-02"
updatedAt: "2026-11-07"
category: "Windows"
tags: ["0x80070005", "Windows Update", "Windows 11", "Access Denied", "PowerShell Fix"]
errorCode: "0x80070005"
osVersion: "Windows 11 (23H2/24H2) & Windows 10"
readTime: "4 min read"
difficulty: "Easy"
quickFix:
  summary: "Error 0x80070005 translates to E_ACCESSDENIED—meaning Windows Update lacks permission to write files into the SoftwareDistribution folder or a third-party antivirus locked a system file. Resetting update services and running SFC/DISM resolves it."
  steps:
    - "Open Command Prompt as Administrator (Win + X -> Terminal Admin)."
    - "Run the Windows Update service reset and SoftwareDistribution rename script below."
    - "Run sfc /scannow to repair locked or corrupted system permissions, then reboot."
  command: "net stop wuauserv && net stop bits && ren C:\\Windows\\SoftwareDistribution SoftwareDistribution.old && net start wuauserv && net start bits"
  commandLabel: "Admin CMD: Reset Windows Update Cache & Services"
faqs:
  - question: "What causes Windows Error Code 0x80070005?"
    answer: "Error 0x80070005 (Access Is Denied) occurs when the Windows Update service is blocked from modifying system files due to corrupted file permissions in C:\\Windows\\SoftwareDistribution, a standard non-admin user account, or an aggressive third-party antivirus."
  - question: "Is it safe to rename or delete the SoftwareDistribution folder?"
    answer: "Yes. C:\\Windows\\SoftwareDistribution only stores temporary downloaded update packages. Renaming it to SoftwareDistribution.old forces Windows to build a clean folder with default administrator permissions."
  - question: "Why does 0x80070005 also appear in Microsoft Store app downloads?"
    answer: "Microsoft Store uses the exact same Windows Update background services (wuauserv and UsoSvc) and the AppData\\Local\\Packages folder. Running wsreset.exe and resetting update services fixes both."
---

## Method 1: Reset Windows Update Services & Clear SoftwareDistribution

When `C:\Windows\SoftwareDistribution` has locked permissions, Windows Update fails with `0x80070005`. Rebuilding this folder restores full `SYSTEM` write access.

1. Right-click the **Start** button and select **Terminal (Admin)** or **Command Prompt (Admin)**.
2. Copy and execute these commands in order:

```bat
net stop wuauserv
net stop cryptSvc
net stop bits
net stop msiserver
ren C:\Windows\SoftwareDistribution SoftwareDistribution.old
ren C:\Windows\System32\catroot2 catroot2.old
net start wuauserv
net start cryptSvc
net start bits
net start msiserver
```

3. Open **Settings (Win + I) > Windows Update** and click **Check for updates**.

## Method 2: Repair System Permissions & Corrupted Files with DISM and SFC

If a core Windows servicing component has broken ACL permissions, the Deployment Image Servicing and Management (`DISM`) tool and System File Checker (`SFC`) will restore the default security descriptors.

1. In your **Administrator Terminal / Command Prompt**, run:

```bat
DISM.exe /Online /Cleanup-image /Restorehealth && sfc /scannow
```

2. Wait for both scans to reach `100%`.
3. Restart your PC and run Windows Update again.

## Method 3: Grant Full Control to AppData & Temp Folders

Sometimes the current user profile lacks write access to `%TEMP%` or `AppData`, triggering `0x80070005` during update extraction.

1. Open **Command Prompt as Administrator**.
2. Run the `icacls` ownership and permission repair command on your local profile folder:

```bat
takeown /F "%USERPROFILE%\AppData\Local\Temp" /R /D Y
icacls "%USERPROFILE%\AppData\Local\Temp" /grant Administrators:F /T
```

## Method 4: Temporarily Pause Third-Party Antivirus File Shields

Third-party real-time shields (such as Avast, McAfee, Norton, or Kaspersky) frequently lock `.dll` files inside `C:\Windows\WinSxS` during cumulative updates.

1. Right-click your third-party antivirus icon in the system tray (bottom-right taskbar).
2. Select **Pause Protection for 15 minutes** (Windows Security / Defender will automatically remain active as a fallback).
3. Run the Windows Update installation and restart your PC.
