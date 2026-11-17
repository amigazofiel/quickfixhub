---
title: "How to Fix High RAM & Memory Usage (80%+) on Idle in Windows 11/10"
description: "Resolve excessive RAM and memory usage (80%+) on idle in Windows 11 and 10. This guide targets SysMain and non-paged pool leaks, providing direct, actionable fixes."
date: "2026-11-17"
updatedAt: "2026-11-17"
category: "Windows"
tags: ["Windows 11", "Windows 10", "High RAM Usage", "Memory Leak", "SysMain"]
errorCode: "SysMain / Non-Paged Pool Leak"
osVersion: "Windows 11 & Windows 10"
readTime: "3 min read"
difficulty: "Easy"
quickFix:
  summary: "High idle RAM usage often stems from the SysMain service aggressively caching data or a non-paged pool memory leak caused by faulty drivers. Disabling SysMain and updating drivers are the fastest solutions to mitigate this issue."
  steps:
    - "Disable the SysMain (Superfetch) service."
    - "Update all critical device drivers."
    - "Utilize PoolMon to identify specific non-paged pool leaks."
  command: "sc config \"SysMain\" start=disabled & sc stop \"SysMain\""
  commandLabel: "Windows Admin CMD: Disable SysMain"
faqs:
  - question: "Why is my RAM usage so high on idle in Windows 11?"
    answer: "High idle RAM usage in Windows 11 is often caused by the SysMain service preloading applications, or by a memory leak originating from outdated or corrupt device drivers, particularly affecting the non-paged pool."
  - question: "How do I check for a memory leak in Windows 11?"
    answer: "To check for a memory leak, first use Task Manager to identify processes with unusually high memory consumption. For more advanced non-paged pool leaks, use Microsoft's PoolMon tool to pinpoint specific driver tags consuming excessive memory."
  - question: "Is it safe to disable SysMain (Superfetch) in Windows 11?"
    answer: "Yes, disabling the SysMain (Superfetch) service is generally safe. While it aims to improve application launch times by preloading data, its benefits are often negligible on modern systems with SSDs and can contribute to high idle RAM usage."
  - question: "What is a non-paged pool leak in Windows?"
    answer: "A non-paged pool leak occurs when a kernel-mode driver or component allocates memory that cannot be swapped to disk (non-paged) and fails to release it after use. This leads to a continuous increase in memory consumption, eventually impacting system performance."
---

## Method 1: Disable SysMain (Superfetch) Service

The SysMain service (formerly Superfetch) preloads frequently used applications and data into RAM to speed up access. While beneficial for traditional hard drives, it can cause high idle RAM usage on systems with SSDs, often without significant performance gains.

1.  Open the Services application by typing **Services** into the Windows Search bar and selecting the best match.
2.  Scroll down and locate **SysMain** in the list of services.
3.  Right-click **SysMain** and select **Properties**.
4.  In the Properties window, set the **Startup type** to **Disabled**.
5.  If the service is currently running, click the **Stop** button.
6.  Click **Apply**, then **OK**.
7.  Alternatively, you can disable and stop SysMain via an elevated Command Prompt:

    1.  Type **cmd** into the Windows Search bar.
    2.  Right-click **Command Prompt** and select **Run as administrator**.
    3.  Execute the following command:

    ```bat
sc config "SysMain" start=disabled & sc stop "SysMain"
    ```

## Method 2: Update Device Drivers

Outdated, corrupt, or incompatible device drivers are a common cause of memory leaks, particularly non-paged pool leaks. These leaks occur when a driver fails to release memory it has allocated, leading to continuous consumption.

1.  Open **Device Manager** by right-clicking the **Start** button and selecting **Device Manager**.
2.  Expand categories such as **Display adapters**, **Network adapters**, **Sound, video and game controllers**, and **Storage controllers**.
3.  Right-click on each device within these critical categories and select **Update driver**.
4.  Choose **Search automatically for drivers**.
5.  If Windows does not find a newer driver, visit your computer manufacturer's website or the website of the specific component manufacturer (e.g., NVIDIA, AMD, Intel, Realtek) to download and install the latest drivers manually.
6.  Restart your PC after updating drivers.

## Method 3: Identify and Address Non-Paged Pool Leaks with PoolMon

For persistent memory leaks that Task Manager cannot pinpoint to a specific application, a non-paged pool leak caused by a faulty driver is likely. Microsoft's PoolMon (Pool Monitor) tool can help identify which driver tag is consuming excessive non-paged pool memory.

1.  Download the **Windows Driver Kit (WDK)** or **Windows SDK** from Microsoft's official website. PoolMon is included within these kits, typically found in the `C:\Program Files (x86)\Windows Kits\10\Tools\x64` directory (path may vary).
2.  Navigate to the directory containing `poolmon.exe` in File Explorer.
3.  Run **poolmon.exe** as an administrator.
4.  In the PoolMon window, press **P** to sort by Pool Type (Non-paged), then press **B** to sort by Bytes (highest consumption).
5.  Identify the top entries with significantly high byte counts. Note down the **Tag** associated with these entries (e.g., 'Ndif', 'CMgr').
6.  To identify the driver associated with a specific tag, open an elevated Command Prompt and execute:

    ```bat
findstr /s <TAG> %SystemRoot%\System32\drivers\*.sys
    ```

    Replace `<TAG>` with the tag you identified (e.g., `Ndif`). This command searches for the tag within driver files.
7.  Once the problematic driver is identified, either update it (Method 2), roll back to a previous version, or uninstall it if it's non-essential or known to be problematic.

## Method 4: Adjust Virtual Memory (Paging File)

While not a direct fix for memory leaks, optimizing virtual memory settings can help Windows manage overall system performance when physical RAM is constrained. This ensures the system has enough space to offload less active memory pages to the hard drive.

1.  Type **Adjust the appearance and performance of Windows** into the Windows Search bar and select the best match.
2.  In the Performance Options window, go to the **Advanced** tab.
3.  Under the **Virtual memory** section, click **Change...**.
4.  Uncheck **Automatically manage paging file size for all drives**.
5.  Select your system drive (usually C:).
6.  Choose **Custom size**.
7.  For **Initial size (MB)**, enter a value equal to your physical RAM (e.g., 16GB RAM = 16384 MB).
8.  For **Maximum size (MB)**, enter a value 1.5 to 2 times your physical RAM (e.g., 16GB RAM = 24576 MB to 32768 MB).
9.  Click **Set**, then **OK** on all open windows.
10. Restart your computer for the changes to take effect.
