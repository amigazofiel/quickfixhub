---
title: "How to Fix WSL2 WslRegisterDistribution Failed With Error 0x80370102"
description: "Resolve WSL2 WslRegisterDistribution failed with error 0x80370102 on Windows 10/11. Enable Virtual Machine Platform, Hyper-V, and update WSL to restore Linux distributions."
date: "2026-11-22"
updatedAt: "2026-11-22"
category: "Windows"
tags: ["WSL2", "Windows Subsystem for Linux", "Error 0x80370102", "Virtualization", "Windows 11", "Windows 10"]
errorCode: "0x80370102"
osVersion: "Windows 11 & Windows 10"
readTime: "3 min read"
difficulty: "Easy"
quickFix:
  summary: "Error 0x80370102 indicates that WSL2 cannot start due to disabled or improperly configured virtualization features. This is typically caused by the Virtual Machine Platform or Hyper-V not being enabled in Windows features or BIOS/UEFI."
  steps:
    - "Enable Virtual Machine Platform and Windows Subsystem for Linux via Windows Features."
    - "Verify CPU virtualization (VT-x/AMD-V) is enabled in your system's BIOS/UEFI settings."
    - "Update WSL to the latest version and restart your computer."
  command: "dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart && dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart && wsl --update"
  commandLabel: "Windows Admin CMD: Enable WSL Features"
faqs:
  - question: "What does error 0x80370102 mean for WSL2?"
    answer: "Error 0x80370102 indicates that WSL2 cannot start because a required virtualization feature, such as Virtual Machine Platform or Hyper-V, is disabled or not properly configured on your Windows system or in your BIOS/UEFI settings."
  - question: "How do I enable virtualization for WSL2 on Windows 11/10?"
    answer: "To enable virtualization for WSL2, open \"Turn Windows features on or off,\" then check \"Virtual Machine Platform\" and \"Windows Subsystem for Linux.\" Additionally, ensure CPU virtualization (VT-x/AMD-V) is enabled in your computer's BIOS/UEFI settings."
  - question: "Is Hyper-V required for WSL2?"
    answer: "No, Hyper-V is not strictly required for WSL2. WSL2 primarily relies on the \"Virtual Machine Platform\" feature. However, enabling Hyper-V can sometimes resolve related issues and is often enabled alongside Virtual Machine Platform."
  - question: "What to do if wsl --update fails?"
    answer: "If `wsl --update` fails, ensure you are running the command in an elevated (administrator) Command Prompt or PowerShell. Also, verify your internet connection and that Windows Update services are functioning correctly. If the issue persists, try reinstalling the WSL kernel manually."
---

## Method 1: Enable Required Windows Features

Error 0x80370102 frequently occurs because essential virtualization components are not enabled in Windows.

1.  Open the **Start Menu**, type "turn windows features on or off", and select the matching result.
2.  In the Windows Features dialog, ensure the following options are checked:
    *   **Virtual Machine Platform**
    *   **Windows Subsystem for Linux**
    *   **Hyper-V** (If available on your Windows edition; not strictly required for WSL2 but often helps resolve related issues.)
3.  Click **OK** and restart your computer if prompted.

Alternatively, you can enable these features using PowerShell with administrative privileges:

```powershell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
# Optional: Enable Hyper-V if your Windows edition supports it
dism.exe /online /enable-feature /featurename:HypervisorPlatform /all /norestart
```

After running the commands, restart your computer.

## Method 2: Confirm BIOS/UEFI Virtualization

Even with Windows features enabled, WSL2 requires CPU virtualization to be active in your system's firmware (BIOS/UEFI).

1.  Restart your computer and enter your BIOS/UEFI settings. The key to press varies by manufacturer (commonly **F2**, **Del**, **F10**, or **F12** during startup).
2.  Navigate to the **CPU Configuration**, **Processor**, or **Virtualization** section.
3.  Locate settings like **Intel VT-x**, **Intel Virtualization Technology**, **AMD-V**, or **SVM Mode**.
4.  Ensure this setting is **Enabled**.
5.  Save changes and exit BIOS/UEFI. Your computer will restart.

## Method 3: Update WSL and Restart Services

An outdated WSL installation or lingering processes can sometimes cause this error. Updating WSL ensures you have the latest fixes.

1.  Open **Command Prompt** or **PowerShell** as an administrator.
2.  Update WSL to the latest version:

    ```powershell
wsl --update
    ```

3.  Once the update is complete, shut down all running WSL distributions to clear any hung states:

    ```powershell
wsl --shutdown
    ```

4.  Restart your computer to ensure all changes take effect and services are properly initialized.
