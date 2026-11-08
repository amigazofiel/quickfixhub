---
title: "How to Fix Bluetooth Missing or Not Turning On in Windows 11"
description: "Resolve Windows 11 Bluetooth issues: fix missing toggle, 'Code 43' errors, and devices not connecting. This guide covers driver updates, service checks, and system diagnostics for 23H2/24H2."
date: "2026-11-08"
updatedAt: "2026-11-08"
category: "Windows"
tags: ["Bluetooth", "Windows 11", "Troubleshooting", "Drivers", "Connectivity"]
errorCode: "Code 43 / Bluetooth Toggle Missing"
osVersion: "Windows 11 (23H2/24H2)"
readTime: "3 min read"
difficulty: "Easy"
quickFix:
  summary: "Bluetooth missing or not turning on in Windows 11 is often due to corrupted drivers, disabled services, or hardware issues. Reinstalling the Bluetooth driver and ensuring the Bluetooth Support Service is running typically resolves these problems quickly."
  steps:
    - "Restart Bluetooth Support Service via services.msc."
    - "Uninstall and reinstall the Bluetooth device driver in Device Manager."
    - "Run the built-in Bluetooth troubleshooter from Windows Settings."
  command: "Get-Service -Name \"bthserv\" | Restart-Service -Force"
  commandLabel: "Windows Admin PowerShell: Restart Bluetooth Service"
faqs:
  - question: "Why is my Bluetooth toggle missing in Windows 11?"
    answer: "The Bluetooth toggle is often missing due to a disabled Bluetooth adapter, corrupted drivers, or the Bluetooth Support Service not running. Driver issues are a primary cause."
  - question: "How do I reinstall Bluetooth drivers in Windows 11?"
    answer: "Open **Device Manager**, expand **Bluetooth**, right-click your adapter, select **Uninstall device**, then restart your PC. Windows will automatically reinstall the driver upon reboot."
  - question: "What does 'Code 43' mean for a Bluetooth device?"
    answer: "'Code 43' indicates a hardware issue or driver problem preventing the device from working correctly. Reinstalling drivers, updating firmware, or checking hardware connections can resolve it."
  - question: "How do I check if Bluetooth services are running in Windows 11?"
    answer: "Press **Win + R**, type `services.msc`, and press **Enter**. Locate the \"Bluetooth Support Service\" and ensure its status is \"Running\" and its startup type is \"Automatic\"."
---

## Method 1: Restart Bluetooth Services and Run Troubleshooter
This method addresses common software glitches and service interruptions that can cause Bluetooth to disappear or fail to turn on.

1.  **Restart Bluetooth Support Service:**
    *   Press **Win + R** to open the Run dialog.
    *   Type `services.msc` and press **Enter**.
    *   In the Services window, locate **Bluetooth Support Service**.
    *   Right-click on it and select **Restart**. If it's not running, select **Start**.
    *   Double-click the service, set **Startup type** to **Automatic**, then click **Apply** and **OK**.

2.  **Run the Bluetooth Troubleshooter:**
    *   Open **Settings** (**Win + I**).
    *   Navigate to **System > Troubleshoot > Other troubleshooters**.
    *   Locate **Bluetooth** and click **Run**.
    *   Follow the on-screen prompts to complete the troubleshooting process.

## Method 2: Reinstall or Update Bluetooth Drivers
Corrupted, outdated, or incorrect Bluetooth drivers are a frequent cause of functionality issues, including the missing toggle or 'Code 43' errors.

1.  **Uninstall and Reinstall Bluetooth Driver:**
    *   Press **Win + X** and select **Device Manager**.
    *   Expand the **Bluetooth** section.
    *   Right-click on your Bluetooth adapter (e.g., "Intel(R) Wireless Bluetooth(R)") and select **Uninstall device**.
    *   If prompted, check **Attempt to remove the driver for this device** and click **Uninstall**.
    *   Restart your PC. Windows will automatically attempt to reinstall the driver upon reboot.

2.  **Update Bluetooth Driver:**
    *   In **Device Manager**, expand **Bluetooth**.
    *   Right-click your Bluetooth adapter and select **Update driver**.
    *   Choose **Search automatically for updated driver software**.
    *   If no new driver is found, select **Browse my computer for drivers**, then **Let me pick from a list of available drivers on my computer**. Try an older compatible driver if available.
    *   Alternatively, visit your PC manufacturer's website or the Bluetooth adapter manufacturer's website to download the latest Windows 11 driver.

## Method 3: Adjust Power Management Settings
Incorrect power management settings can sometimes disable the Bluetooth adapter to save power, leading to it being unavailable.

1.  **Disable USB Selective Suspend:**
    *   Press **Win + R**, type `powercfg.cpl`, and press **Enter**.
    *   Click **Change plan settings** next to your active power plan.
    *   Click **Change advanced power settings**.
    *   Expand **USB settings** > **USB selective suspend setting**.
    *   Set both **On battery** and **Plugged in** to **Disabled**. Click **Apply** and **OK**.

2.  **Prevent Bluetooth Device from Turning Off to Save Power:**
    *   Press **Win + X** and select **Device Manager**.
    *   Expand **Bluetooth**.
    *   Right-click your Bluetooth adapter and select **Properties**.
    *   Go to the **Power Management** tab.
    *   Uncheck **Allow the computer to turn off this device to save power**.
    *   Click **OK**.
    *   Repeat this for any **Universal Serial Bus controllers** under the **Universal Serial Bus controllers** section that might be related to Bluetooth.

## Method 4: System Integrity Check and BIOS/UEFI Update
Underlying system file corruption or outdated firmware can also manifest as hardware functionality issues.

1.  **Run System File Checker (SFC) and Deployment Image Servicing and Management (DISM) Scans:**
    *   Press **Win + S**, type `cmd`, right-click **Command Prompt**, and select **Run as administrator**.
    *   Type the following commands, pressing **Enter** after each:
        ```bat
sfc /scannow
        ```
    *   After SFC completes, run these DISM commands:
        ```bat
DISM /Online /Cleanup-Image /CheckHealth
DISM /Online /Cleanup-Image /ScanHealth
DISM /Online /Cleanup-Image /RestoreHealth
        ```
    *   Restart your PC after the scans are complete.

2.  **Update BIOS/UEFI Firmware (Advanced):**
    *   This step is for advanced users and should be performed with caution. An incorrect BIOS/UEFI update can render your system unbootable.
    *   Visit your PC manufacturer's official support website.
    *   Locate the support page for your specific computer model.
    *   Download the latest BIOS/UEFI firmware update and follow the manufacturer's instructions precisely. Ensure your laptop is plugged into power during the entire process.
