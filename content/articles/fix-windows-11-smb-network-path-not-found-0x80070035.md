---
title: "How to Fix Error 0x80070035 'Network Path Not Found' on Windows 11"
description: "Resolve Windows 11 error 0x80070035 'The Network Path Was Not Found' with expert methods. Troubleshoot network discovery, firewall, and SMB settings for seamless file sharing."
date: "2026-11-23"
updatedAt: "2026-11-23"
category: "Windows"
tags: ["Windows 11", "0x80070035", "Network Path Not Found", "File Sharing", "Troubleshooting"]
errorCode: "0x80070035"
osVersion: "Windows 11 (24H2/23H2)"
readTime: "3 min read"
difficulty: "Easy"
quickFix:
  summary: "Error 0x80070035 indicates a network connectivity or configuration issue preventing access to a shared resource. This is often resolved by enabling network discovery, adjusting firewall rules, or ensuring SMB 1.0/CIFS support."
  steps:
    - "Enable Network Discovery and File Sharing."
    - "Verify Windows Defender Firewall rules for sharing."
    - "Ensure SMB 1.0/CIFS Client is installed."
  command: "netsh advfirewall firewall set rule group=\"Network Discovery\" new enable=yes"
  commandLabel: "Windows Admin CMD: Enable Network Discovery Firewall Rules"
faqs:
  - question: "Why does error 0x80070035 occur on Windows 11?"
    answer: "Error 0x80070035 typically occurs when Windows cannot find a specified network resource due to disabled network discovery, incorrect firewall settings, missing SMB 1.0/CIFS client, or DNS resolution issues preventing network path access."
  - question: "How do I enable Network Discovery on Windows 11?"
    answer: "To enable Network Discovery, navigate to **Settings > Network & internet > Advanced network settings > More network adapter options**. Right-click your active adapter, select **Properties**, and ensure 'File and Printer Sharing for Microsoft Networks' is checked. Then, in **Advanced sharing settings**, turn on Network Discovery and File and printer sharing for your current profile."
  - question: "Is SMB 1.0/CIFS required for network sharing on Windows 11?"
    answer: "While SMB 1.0/CIFS is an older protocol, it may be required to connect to legacy network devices, older Windows versions, or specific network-attached storage (NAS) devices that do not support newer SMB 2.0 or 3.0 protocols."
  - question: "What role does Windows Defender Firewall play in error 0x80070035?"
    answer: "The Windows Defender Firewall can block necessary network communication for file sharing. If rules for 'File and Printer Sharing' or 'Network Discovery' are disabled or restricted, it can prevent Windows from locating or accessing network paths, directly leading to error 0x80070035."
---

## Method 1: Verify Network Discovery and File Sharing Settings

Error 0x80070035 frequently stems from network discovery or file sharing being disabled. Ensure these core network functionalities are active.

1.  Open **Settings** by pressing `Win + I`.
2.  Navigate to **Network & internet > Advanced network settings**.
3.  Scroll down and click on **More network adapter options**. This opens the Network Connections window.
4.  Right-click on your active network adapter (e.g., **Ethernet** or **Wi-Fi**) and select **Properties**.
5.  Ensure that **File and Printer Sharing for Microsoft Networks** is checked. If not, check it and click **OK**.
6.  Return to **Settings > Network & internet**.
7.  Click on **Advanced sharing settings** (or search for "Advanced sharing settings" in the Start Menu).
8.  Expand the **Private** profile (current profile).
9.  Under **Network discovery**, select **Turn on network discovery** and **Turn on automatic setup of network connected devices**.
10. Under **File and printer sharing**, select **Turn on file and printer sharing**.
11. Expand the **All Networks** profile.
12. Under **Public folder sharing**, select **Turn on sharing so anyone with network access can read and write files in the Public folders**.
13. Under **Password protected sharing**, select **Turn off password protected sharing** (if you do not require credentials for network access).
14. Click **Save changes**. Restart your computer.

## Method 2: Configure Windows Defender Firewall

The Windows Defender Firewall can inadvertently block network communication required for file sharing. Adjust its settings to allow necessary traffic.

1.  Open **Start**, type `Windows Defender Firewall`, and select **Windows Defender Firewall with Advanced Security**.
2.  In the left pane, click **Allow an app or feature through Windows Defender Firewall**.
3.  Click **Change settings** (requires administrator privileges).
4.  Scroll down and ensure that **File and Printer Sharing** is checked for both **Private** and **Public** networks (or your specific network type).
5.  Ensure **Network Discovery** is also checked for appropriate network types.
6.  Click **OK**.
7.  If the issue persists, temporarily disable the firewall for testing purposes (not recommended for long-term security).
    1.  Open **Start**, type `Windows Defender Firewall`, and select **Windows Defender Firewall**.
    2.  Click **Turn Windows Defender Firewall on or off** in the left pane.
    3.  Select **Turn off Windows Defender Firewall (not recommended)** for both **Private** and **Public** network settings.
    4.  Click **OK**.
    5.  Test network access. If it works, re-enable the firewall and investigate specific rules or consider resetting firewall settings.
    6.  To reset firewall rules to default:
        ```powershell
netsh advfirewall reset
        ```
        *Note: This command will reset all Windows Firewall rules to their default settings. You may need to reconfigure any custom rules.*

## Method 3: Enable SMB 1.0/CIFS File Sharing Support

Some older network devices or operating systems rely on the Server Message Block (SMB) 1.0/CIFS protocol. If you are connecting to such a device, enabling this feature is crucial.

1.  Open **Start**, type `Turn Windows features on or off`, and select the corresponding option.
2.  In the Windows Features dialog, scroll down and locate **SMB 1.0/CIFS File Sharing Support**.
3.  Expand it and ensure that **SMB 1.0/CIFS Client** is checked. While often not required, you may also check **SMB 1.0/CIFS Automatic Removal** and **SMB 1.0/CIFS Server** if you are sharing from this PC to older devices.
4.  Click **OK**.
5.  Windows will install the necessary components. You may be prompted to restart your computer.

## Method 4: Reset Network Components and Verify Services

Corrupted network configurations or stopped essential services can also lead to network path errors. Resetting network components and verifying service status can resolve these underlying issues.

1.  **Flush DNS and Reset Winsock:**
    1.  Open **Start**, type `cmd`, right-click **Command Prompt**, and select **Run as administrator**.
    2.  Execute the following commands one by one, pressing `Enter` after each:
        ```bat
ipconfig /flushdns
netsh winsock reset
netsh int ip reset
        ```
    3.  Restart your computer.
2.  **Verify Essential Services:**
    1.  Open **Start**, type `services.msc`, and press `Enter`.
    2.  Locate the following services and ensure their **Startup type** is set to **Automatic** and their **Status** is **Running**. If not, right-click, select **Properties**, change the startup type, and click **Start**.
        *   **Function Discovery Resource Publication**
        *   **SSDP Discovery**
        *   **UPnP Device Host**
        *   **Workstation**
        *   **Server** (if sharing resources from this PC)
    3.  Restart your computer after making changes.
3.  **Update Network Adapter Drivers:**
    1.  Open **Start**, type `Device Manager`, and press `Enter`.
    2.  Expand **Network adapters**.
    3.  Right-click on your active network adapter and select **Update driver**.
    4.  Choose **Search automatically for drivers**. If no new drivers are found, visit your PC manufacturer's website or the network adapter manufacturer's website to download the latest Windows 11 drivers.
    5.  Install any updated drivers and restart your computer.
