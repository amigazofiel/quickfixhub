---
title: "How to Fix Wi-Fi Icon & Option Missing in Windows 11/10"
description: "Resolve the missing Wi-Fi icon and option in Windows 11/10. This guide addresses common causes like driver issues and disabled adapters, providing step-by-step fixes for WLAN AutoConfig errors."
date: "2026-11-14"
updatedAt: "2026-11-14"
category: "Windows"
tags: ["Windows 11", "Wi-Fi Missing", "Network Adapter", "WLAN AutoConfig", "Driver Issues"]
errorCode: "WLAN AutoConfig / Code 10"
osVersion: "Windows 11 & Windows 10"
readTime: "3 min read"
difficulty: "Easy"
quickFix:
  summary: "The Wi-Fi icon and option disappear due to disabled network adapters, corrupted drivers, or stopped WLAN AutoConfig service. Re-enabling the adapter, reinstalling drivers, or restarting the service typically resolves this."
  steps:
    - "Check Device Manager; enable the Wi-Fi adapter if disabled."
    - "Update or reinstall your Wi-Fi adapter driver."
    - "Restart the 'WLAN AutoConfig' service via Services.msc."
  command: "netsh winsock reset && netsh int ip reset && ipconfig /release && ipconfig /renew && ipconfig /flushdns"
  commandLabel: "Windows Admin CMD: Reset Network"
faqs:
  - question: "Why is my Wi-Fi option completely missing in Windows 11?"
    answer: "The Wi-Fi option is typically missing due to a disabled network adapter, corrupted or outdated Wi-Fi drivers, or the WLAN AutoConfig service being stopped."
  - question: "How do I get my Wi-Fi icon back on the taskbar?"
    answer: "To restore the Wi-Fi icon, ensure your Wi-Fi adapter is enabled in Device Manager, restart the WLAN AutoConfig service, and check **Settings > Network & Internet > Wi-Fi** for the toggle."
  - question: "What is WLAN AutoConfig and why is it important?"
    answer: "WLAN AutoConfig is a Windows service that discovers, connects to, and manages wireless local area network (WLAN) connections. If stopped, Wi-Fi functionality will be unavailable."
  - question: "Can a Windows update cause the Wi-Fi option to disappear?"
    answer: "Yes, sometimes Windows updates can introduce driver incompatibilities or service conflicts that lead to the Wi-Fi option disappearing. Reinstalling drivers or rolling back updates can resolve this."
---

## Method 1: Check and Enable Wi-Fi Adapter in Device Manager

Often, the Wi-Fi adapter might be disabled, causing the option to vanish. Re-enabling it is the first step.

1.  Right-click the **Start** button and select **Device Manager**.
2.  In Device Manager, expand **Network adapters**.
3.  Locate your Wi-Fi adapter (it might have "Wireless" or "WLAN" in its name, e.g., "Intel(R) Dual Band Wireless-AC").
4.  If you see a down arrow icon next to it, it means the adapter is disabled. Right-click it and select **Enable device**.
5.  If your Wi-Fi adapter is not listed or has a yellow exclamation mark, right-click **Network adapters** and select **Scan for hardware changes**.

## Method 2: Update or Reinstall Wi-Fi Drivers

Outdated or corrupted drivers are a primary cause of missing Wi-Fi functionality.

1.  Right-click the **Start** button and select **Device Manager**.
2.  Expand **Network adapters**.
3.  Right-click your Wi-Fi adapter and select **Update driver**.
4.  Choose **Search automatically for drivers**. Follow the prompts.
5.  If Windows reports the best driver is already installed, or if the issue persists, right-click the Wi-Fi adapter again and select **Uninstall device**.
6.  In the confirmation dialog, check **Attempt to remove the driver for this device** (if available) and click **Uninstall**.
7.  **Restart your PC**. Windows will typically reinstall a generic driver automatically upon reboot.
8.  If the issue persists, visit your PC manufacturer's official website (e.g., Dell, HP, Lenovo) or the Wi-Fi adapter manufacturer's website (e.g., Intel, Realtek) to download and install the latest Windows 11/10 compatible driver for your specific model.

## Method 3: Restart WLAN AutoConfig Service

The WLAN AutoConfig service manages wireless connections. If it's stopped or misconfigured, Wi-Fi will not function.

1.  Press **Windows key + R** to open the Run dialog.
2.  Type `services.msc` and press **Enter**.
3.  In the Services window, scroll down and locate **WLAN AutoConfig**.
4.  Right-click **WLAN AutoConfig** and select **Properties**.
5.  Ensure the **Startup type** is set to **Automatic**.
6.  Check the **Service status**. If it's "Stopped", click **Start**. If it's "Running", click **Stop** then **Start** to restart the service.
7.  Click **Apply** then **OK**.
8.  Close the Services window and check if the Wi-Fi option has returned.

## Method 4: Perform a Network Reset

A comprehensive network reset can resolve underlying network configuration issues that prevent Wi-Fi from appearing.

1.  Open **Settings** (**Windows key + I**).
2.  Navigate to **Network & Internet**.
3.  Scroll down and click on **Advanced network settings**.
4.  Under "More settings," click **Network reset**.
5.  Click **Reset now** and confirm your action.
6.  **Restart your PC** after the reset completes.
7.  Alternatively, you can perform a network reset using Command Prompt (Admin):
    1.  Right-click the **Start** button and select **Terminal (Admin)** or **Command Prompt (Admin)**.
    2.  Execute the following commands one by one, pressing **Enter** after each:
    ```cmd
netsh winsock reset
netsh int ip reset
ipconfig /release
ipconfig /renew
ipconfig /flushdns
    ```
    3.  **Restart your PC** after running all commands.
