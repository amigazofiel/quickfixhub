---
title: "How to Fix ERR_CONNECTION_TIMED_OUT in Chrome (Windows 11/Mac)"
description: "Resolve ERR_CONNECTION_TIMED_OUT in Google Chrome on Windows 11, Windows 10, and macOS. This guide provides actionable steps to fix network, DNS, and browser configuration issues."
date: "2026-11-08"
updatedAt: "2026-11-08"
category: "Windows"
tags: ["Chrome", "ERR_CONNECTION_TIMED_OUT", "Network Error", "Windows 11", "macOS", "Troubleshooting", "DNS"]
errorCode: "ERR_CONNECTION_TIMED_OUT"
osVersion: "Windows 11/10 & macOS"
readTime: "3 min read"
difficulty: "Easy"
quickFix:
  summary: "ERR_CONNECTION_TIMED_OUT indicates the browser failed to establish a connection within the allotted time, often due to network issues, DNS problems, or firewall blocks. Resetting network settings and flushing DNS typically resolves this by clearing stale configurations."
  steps:
    - "Verify active internet connection and restart your router/modem."
    - "Flush DNS cache and reset network adapters via Command Prompt/Terminal."
    - "Disable any active proxy settings or VPN connections."
  command: "ipconfig /flushdns && netsh winsock reset && netsh int ip reset"
  commandLabel: "Windows Admin CMD: Reset Network & DNS"
faqs:
  - question: "What specifically causes ERR_CONNECTION_TIMED_OUT?"
    answer: "ERR_CONNECTION_TIMED_OUT occurs when Google Chrome cannot establish a connection to a server within a specified timeframe. Common causes include unstable internet, incorrect DNS settings, firewall blocks, proxy server issues, or corrupted browser data."
  - question: "How do I flush DNS cache on Windows 11 to fix connection errors?"
    answer: "To flush DNS on Windows 11, open Command Prompt as an administrator, then type `ipconfig /flushdns` and press Enter. This clears outdated DNS records that might be causing connection issues."
  - question: "Can a firewall or antivirus block Chrome and cause a timeout error?"
    answer: "Yes, a firewall (like Windows Defender Firewall) or third-party antivirus software can incorrectly block Chrome's access to the internet, leading to an ERR_CONNECTION_TIMED_OUT error. Temporarily disabling them for testing can help diagnose the issue."
  - question: "How do I disable proxy settings in Chrome on Windows or Mac?"
    answer: "In Chrome, go to **Settings > System > Open your computer's proxy settings**. This opens your OS-level proxy configuration. On Windows, toggle 'Use a proxy server' to Off. On macOS, navigate to **System Settings > Network > Details... > Proxies** and uncheck all proxy protocols."
---

## Method 1: Verify Network Connectivity and Restart Equipment

ERR_CONNECTION_TIMED_OUT often stems from a fundamental network issue. Ensure your internet connection is active and stable.

1.  **Check Internet Connection**: Open other websites or applications to confirm general internet access. If other sites also fail to load, the issue is likely with your network.
2.  **Restart Router and Modem**: Power cycle your network hardware.
    *   Unplug your router and modem from the power outlet.
    *   Wait for at least 30 seconds.
    *   Plug the modem back in and wait for it to fully boot (indicator lights stable).
    *   Plug the router back in and wait for it to fully boot.
3.  **Test with Different Browser/Device**: Attempt to access the problematic website from a different browser (e.g., Edge, Firefox, Safari) or another device connected to the same network. This helps isolate if the issue is Chrome-specific or network-wide.

## Method 2: Flush DNS Cache and Reset Network Configuration

Stale DNS entries or corrupted network settings can prevent Chrome from establishing a connection.

### For Windows 11/10:

1.  **Open Command Prompt as Administrator**:
    *   Type `cmd` into the Windows search bar.
    *   Right-click **Command Prompt** and select **Run as administrator**.
2.  **Execute Network Reset Commands**: Type the following commands one by one, pressing `Enter` after each:
    ```bat
ipconfig /flushdns
netsh winsock reset
netsh int ip reset
ipconfig /release
ipconfig /renew
    ```
3.  **Restart Your Computer**: After executing the commands, restart your Windows machine for changes to take effect.

### For macOS:

1.  **Open Terminal**:
    *   Go to **Finder > Applications > Utilities > Terminal**.
2.  **Execute DNS Flush Command**: Type the following command and press `Enter`. You may be prompted for your administrator password.
    ```bash
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
    ```
3.  **Restart Your Mac**: Restart your macOS device to ensure all network services are refreshed.

## Method 3: Disable Proxy Settings and VPN

Incorrectly configured proxy servers or VPN connections can route traffic improperly, leading to connection timeouts.

### For Google Chrome:

1.  **Access Proxy Settings**:
    *   Open Chrome and go to **Settings** (three-dot menu in the top-right).
    *   Scroll down and click **System** on the left pane.
    *   Click **Open your computer's proxy settings**. This will open your OS-level proxy configuration.

### For Windows 11/10:

1.  **Disable Proxy Server**:
    *   In the **Proxy** settings window (opened from Chrome or via **Settings > Network & Internet > Proxy**).
    *   Under **Manual proxy setup**, ensure **Use a proxy server** is toggled **Off**.
    *   Under **Automatic proxy setup**, ensure **Automatically detect settings** is toggled **On** and **Use setup script** is toggled **Off**, unless you specifically require a proxy script.

### For macOS:

1.  **Disable Proxy Server**:
    *   Go to **System Settings > Network**.
    *   Select your active network connection (e.g., Wi-Fi, Ethernet) and click **Details...** or **Advanced...**.
    *   Go to the **Proxies** tab.
    *   Ensure all proxy protocols (Web Proxy (HTTP), Secure Web Proxy (HTTPS), SOCKS Proxy) are **unchecked**, unless required by your network administrator. Click **OK** or **Apply**.

2.  **Disable VPN (if active)**: If you are using a VPN, temporarily disable it and try accessing the website. VPNs can sometimes interfere with network connections.

## Method 4: Check Firewall/Antivirus and Chrome Configuration

Security software or specific Chrome settings can sometimes block connections.

### For Windows 11/10:

1.  **Check Windows Defender Firewall**:
    *   Type `Windows Defender Firewall` into the Windows search bar and open it.
    *   Click **Allow an app or feature through Windows Defender Firewall**.
    *   Ensure **Google Chrome** is listed and both **Private** and **Public** boxes are checked. If not, click **Change settings**, then **Allow another app...** to add Chrome.
2.  **Temporarily Disable Antivirus**: If you use a third-party antivirus, temporarily disable it and retest. Remember to re-enable it immediately after testing.

### For macOS:

1.  **Check macOS Firewall**:
    *   Go to **System Settings > Network > Firewall**.
    *   Ensure the firewall is not blocking Chrome or incoming connections unnecessarily. If you recently installed new security software, it might be interfering.
2.  **Temporarily Disable Antivirus**: If you use a third-party antivirus, temporarily disable it and retest. Remember to re-enable it immediately after testing.

### For Google Chrome:

1.  **Clear Browser Data**: Corrupted cache or cookies can cause issues.
    *   Open Chrome, go to **Settings > Privacy and security > Clear browsing data**.
    *   Select **All time** for the time range.
    *   Check **Cached images and files** and **Cookies and other site data**.
    *   Click **Clear data**.
2.  **Reset Chrome Settings**: This will revert Chrome to its default state without deleting bookmarks or passwords.
    *   Open Chrome, go to **Settings > Reset settings**.
    *   Click **Restore settings to their original defaults**.
    *   Click **Reset settings** to confirm.
3.  **Disable Chrome Extensions**: Malicious or buggy extensions can interfere with network requests.
    *   Open Chrome, type `chrome://extensions` in the address bar and press `Enter`.
    *   Toggle off extensions one by one, testing after each, to identify a culprit.
