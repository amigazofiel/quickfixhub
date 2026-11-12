---
title: "How to Fix SYSTEM_THREAD_EXCEPTION_NOT_HANDLED BSOD on Windows 11"
description: "Resolve SYSTEM_THREAD_EXCEPTION_NOT_HANDLED BSOD on Windows 11 & 10. Learn to update drivers, repair system files, and troubleshoot hardware issues with this expert guide."
date: "2026-11-12"
updatedAt: "2026-11-12"
category: "Windows"
tags: ["Windows 11", "BSOD", "Troubleshooting", "Drivers", "System Error"]
errorCode: "SYSTEM_THREAD_EXCEPTION_NOT_HANDLED"
osVersion: "Windows 11 & Windows 10"
readTime: "3 min read"
difficulty: "Easy"
quickFix:
  summary: "This BSOD often stems from outdated or corrupted device drivers, particularly graphics drivers, or system file corruption. The fastest resolution involves booting into Safe Mode to update or roll back problematic drivers and repair system files."
  steps:
    - "Boot into Windows Safe Mode to access the system."
    - "Update or roll back recently installed or problematic device drivers."
    - "Run System File Checker (SFC) and DISM commands to repair system integrity."
  command: "sfc /scannow & DISM /Online /Cleanup-Image /RestoreHealth"
  commandLabel: "Windows Admin CMD: Repair System Files"
faqs:
  - question: "What causes SYSTEM_THREAD_EXCEPTION_NOT_HANDLED BSOD?"
    answer: "The SYSTEM_THREAD_EXCEPTION_NOT_HANDLED error is primarily caused by corrupted or outdated device drivers (especially graphics drivers), faulty hardware (RAM, hard drive), or damaged system files. Software conflicts or recent Windows updates can also trigger it."
  - question: "How do I fix SYSTEM_THREAD_EXCEPTION_NOT_HANDLED in Safe Mode?"
    answer: "In Safe Mode, first update or roll back any recently installed or problematic drivers via Device Manager. Then, open Command Prompt as administrator and run `sfc /scannow` followed by `DISM /Online /Cleanup-Image /RestoreHealth` to repair system files."
  - question: "Can outdated drivers cause SYSTEM_THREAD_EXCEPTION_NOT_HANDLED?"
    answer: "Yes, outdated or incompatible device drivers are a leading cause of the SYSTEM_THREAD_EXCEPTION_NOT_HANDLED BSOD. Graphics drivers (e.g., NVIDIA's nvlddmkm.sys) are particularly common culprits, but network or chipset drivers can also be responsible."
  - question: "What is SYSTEM_THREAD_EXCEPTION_NOT_HANDLED (nvlddmkm.sys)?"
    answer: "When SYSTEM_THREAD_EXCEPTION_NOT_HANDLED is accompanied by 'nvlddmkm.sys', it specifically indicates an issue with your NVIDIA graphics driver. This often requires updating, reinstalling, or rolling back the NVIDIA driver to a stable version."
---

## Method 1: Update or Roll Back Device Drivers

Outdated, corrupted, or incompatible device drivers are the most frequent cause of the SYSTEM_THREAD_EXCEPTION_NOT_HANDLED BSOD. Graphics drivers (e.g., NVIDIA, AMD, Intel) are common culprits. You may need to boot into Safe Mode to perform these steps.

1.  **Boot into Safe Mode (if necessary):** If Windows fails to start normally, it may automatically enter the Windows Recovery Environment. From there, navigate to **Troubleshoot > Advanced options > Startup Settings > Restart**. After restart, press **4** or **F4** for Enable Safe Mode.
2.  **Open Device Manager:** Right-click the **Start** button and select **Device Manager**.
3.  **Identify problematic drivers:** Look for any devices with a yellow exclamation mark. Expand categories like **Display adapters**, **Sound, video and game controllers**, and **Network adapters**.
4.  **Update Driver:** Right-click the suspected driver (e.g., your graphics card) and select **Update driver**. Choose **Search automatically for drivers**.
5.  **Roll Back Driver (if update fails or causes issues):** If the issue started after a recent driver update, right-click the driver, select **Properties**, go to the **Driver** tab, and click **Roll Back Driver** if available. Confirm your choice.
6.  **Uninstall and Reinstall Driver:** If rolling back isn't an option or doesn't work, right-click the driver, select **Uninstall device**, and check the box **Attempt to remove the driver for this device**. Restart your PC; Windows will try to reinstall a generic driver, or you can manually download the latest stable driver from the manufacturer's website.

## Method 2: Repair Corrupted System Files

Corrupted system files can lead to various BSODs, including SYSTEM_THREAD_EXCEPTION_NOT_HANDLED. Use the System File Checker (SFC) and Deployment Image Servicing and Management (DISM) tools to repair them.

1.  **Open Command Prompt as Administrator:** Right-click the **Start** button and select **Terminal (Admin)** or **Windows PowerShell (Admin)**.
2.  **Run SFC scan:** Type the following command and press **Enter**:
    ```bat
sfc /scannow
    ```
    Allow the scan to complete. It will attempt to find and repair corrupted system files.
3.  **Run DISM commands:** If SFC reports issues it couldn't fix, or if the problem persists, run these DISM commands sequentially. These commands repair the Windows image, which SFC relies on.
    ```bat
DISM /Online /Cleanup-Image /CheckHealth
DISM /Online /Cleanup-Image /ScanHealth
DISM /Online /Cleanup-Image /RestoreHealth
    ```
    Each command may take several minutes to complete. Restart your PC after running these commands.

## Method 3: Check for Windows Updates and Driver Updates

Keeping your operating system and drivers up-to-date is crucial for system stability and can resolve known bugs that cause BSODs.

1.  **Check for Windows Updates:** Go to **Settings > Windows Update**. Click **Check for updates** and install any available updates. Restart your PC if prompted.
2.  **Check for Optional Updates (including drivers):** In **Settings > Windows Update**, click **Advanced options**, then **Optional updates**. Review and install any available driver updates.
3.  **Manually Update Drivers:** Visit the support website of your PC manufacturer (Dell, HP, Lenovo, etc.) or component manufacturers (NVIDIA, AMD, Intel) to download the absolute latest drivers for your specific model, especially for graphics, chipset, and network adapters.

## Method 4: Perform a Clean Boot or Test RAM

If the issue persists, it might be due to a software conflict or faulty hardware.

1.  **Perform a Clean Boot:** A clean boot starts Windows with a minimal set of drivers and startup programs, helping to isolate software conflicts.
    *   Press **Windows key + R**, type `msconfig`, and press **Enter**.
    *   Go to the **Services** tab, check **Hide all Microsoft services**, then click **Disable all**.
    *   Go to the **Startup** tab, click **Open Task Manager**. Disable all startup items in Task Manager.
    *   Close Task Manager, click **OK** in System Configuration, and **Restart**.
    *   If the BSOD doesn't occur, re-enable services and startup items one by one to find the culprit.
2.  **Run Windows Memory Diagnostic:** Faulty RAM can cause SYSTEM_THREAD_EXCEPTION_NOT_HANDLED. This tool checks your RAM for errors.
    *   Press **Windows key + R**, type `mdsched.exe`, and press **Enter**.
    *   Choose **Restart now and check for problems (recommended)**.
    *   Your PC will restart and run a memory test. If errors are found, you may need to replace your RAM modules.
3.  **Check Disk Health:** A failing hard drive or SSD can also cause system instability.
    *   Open **Terminal (Admin)** or **Windows PowerShell (Admin)**.
    *   Type `chkdsk /f /r` and press **Enter**. You'll be prompted to schedule the check on the next restart. Type `Y` and press **Enter**, then restart your PC.
