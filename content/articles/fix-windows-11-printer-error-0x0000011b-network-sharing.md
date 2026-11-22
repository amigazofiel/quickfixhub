---
title: "How to Fix Windows 11 Network Printer Error 0x0000011b"
description: "Resolve Windows 11 network printer error 0x0000011b (RpcAuthnLevelPrivacyEnabled) by disabling RPC authentication privacy. This guide provides quick, effective steps for Windows 10 & 11 users."
date: "2026-11-22"
updatedAt: "2026-11-22"
category: "Windows"
tags: ["Windows 11", "Printer Error", "0x0000011b", "Network Printing", "RpcAuthnLevelPrivacyEnabled"]
errorCode: "0x0000011b"
osVersion: "Windows 11 & Windows 10"
readTime: "3 min read"
difficulty: "Easy"
quickFix:
  summary: "Error 0x0000011b occurs due to a Windows security update (CVE-2021-1675) that enforces stricter RPC authentication for network printers. Disabling the `RpcAuthnLevelPrivacyEnabled` registry setting on the print server or client resolves this by allowing less strict authentication."
  steps:
    - "Open Registry Editor (regedit.exe)."
    - "Navigate to `HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Control\\Print`."
    - "Create or modify `RpcAuthnLevelPrivacyEnabled` DWORD (32-bit) value to `0`."
  command: "Set-ItemProperty -Path \"HKLM:\\System\\CurrentControlSet\\Control\\Print\" -Name \"RpcAuthnLevelPrivacyEnabled\" -Value 0 -Force"
  commandLabel: "Windows Admin PowerShell: Disable RPC Privacy"
faqs:
  - question: "What causes Windows network printer error 0x0000011b?"
    answer: "Error 0x0000011b is caused by a security update (CVE-2021-1675) that strengthens RPC authentication for network printers, preventing connections from clients that do not meet the new security requirements."
  - question: "Is disabling RpcAuthnLevelPrivacyEnabled safe?"
    answer: "Disabling `RpcAuthnLevelPrivacyEnabled` lowers the security level for RPC printer connections. While it fixes the error, it's a temporary workaround; ensure all systems are fully updated to mitigate PrintNightmare-related vulnerabilities."
  - question: "Does the 0x0000011b fix apply to Windows 10?"
    answer: "Yes, the 0x0000011b error and its associated fixes apply to both Windows 10 and Windows 11, as the underlying security update affects both operating systems."
  - question: "What if the 'Print' key or 'RpcAuthnLevelPrivacyEnabled' value is missing?"
    answer: "If the `Print` key is missing under `HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Control`, create it. If `RpcAuthnLevelPrivacyEnabled` is missing, create it as a new DWORD (32-bit) value and set its data to `0`."
---

## Method 1: Disable RpcAuthnLevelPrivacyEnabled via Registry Editor (GUI)

This method involves modifying a registry key directly using the graphical user interface, which is the most common approach.

1.  Open the **Run** dialog by pressing **Win + R**.
2.  Type `regedit` and press **Enter**. Click **Yes** if prompted by User Account Control.
3.  Navigate to the following path in the Registry Editor:
    ```text
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Print
    ```
4.  In the right-hand pane, look for a DWORD (32-bit) value named `RpcAuthnLevelPrivacyEnabled`.
    *   If it exists, double-click it and set its **Value data** to `0`.
    *   If it does not exist, right-click on an empty space in the right pane, select **New > DWORD (32-bit) Value**, name it `RpcAuthnLevelPrivacyEnabled`, then double-click it and set its **Value data** to `0`.
5.  Click **OK** and close the Registry Editor.
6.  Restart your computer for the changes to take effect.

## Method 2: Disable RpcAuthnLevelPrivacyEnabled via Command Prompt (Admin)

For users comfortable with the command line, this method provides a quick way to apply the registry change.

1.  Open **Command Prompt** as an administrator. Search for `cmd` in the Start menu, right-click **Command Prompt**, and select **Run as administrator**.
2.  Enter the following command and press **Enter**:
    ```bat
reg add "HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Print" /v RpcAuthnLevelPrivacyEnabled /t REG_DWORD /d 0 /f
    ```
    *   `/v RpcAuthnLevelPrivacyEnabled`: Specifies the value name.
    *   `/t REG_DWORD`: Specifies the data type as DWORD.
    *   `/d 0`: Sets the value data to `0`.
    *   `/f`: Forces the overwrite if the value already exists.
3.  You should see "The operation completed successfully." Close the Command Prompt.
4.  Restart your computer.

## Method 3: Disable RpcAuthnLevelPrivacyEnabled via PowerShell (Admin)

PowerShell offers a robust command-line interface for system administration, including registry modifications.

1.  Open **PowerShell** as an administrator. Search for `powershell` in the Start menu, right-click **Windows PowerShell**, and select **Run as administrator**.
2.  Enter the following command and press **Enter**:
    ```powershell
Set-ItemProperty -Path "HKLM:\System\CurrentControlSet\Control\Print" -Name "RpcAuthnLevelPrivacyEnabled" -Value 0 -Force
    ```
    *   `Set-ItemProperty`: Modifies the property of an item (in this case, a registry value).
    *   `-Path`: Specifies the registry path.
    *   `-Name`: Specifies the name of the registry value.
    *   `-Value 0`: Sets the value data to `0`.
    *   `-Force`: Creates the item or overwrites it if it already exists.
3.  Close PowerShell.
4.  Restart your computer.

## Method 4: Update All Systems and Printer Drivers

While the registry modification provides an immediate fix, the underlying cause is often related to outdated systems or drivers that do not fully comply with newer security protocols. Ensuring all components are up-to-date is crucial for long-term stability and security.

1.  **Update Windows:**
    *   Go to **Settings > Windows Update**.
    *   Click **Check for updates** and install any available updates. This ensures your system has the latest security patches and compatibility improvements.
2.  **Update Printer Drivers:**
    *   Visit your printer manufacturer's official website.
    *   Locate the support or drivers section for your specific printer model.
    *   Download and install the latest drivers compatible with Windows 11 or Windows 10.
3.  **Restart your computer** after installing updates.
