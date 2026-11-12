---
title: "How to Fix MacBook Wi-Fi Connected No Internet on macOS Sequoia & Sonoma"
description: "Resolve MacBook Wi-Fi connected but no internet issues on macOS Sequoia & Sonoma. Troubleshoot self-assigned IP addresses and DNS timeouts with expert steps."
date: "2026-11-12"
updatedAt: "2026-11-12"
category: "macOS"
tags: ["macOS", "Wi-Fi No Internet", "MacBook Fix", "DNS Timeout", "Self-Assigned IP"]
errorCode: "Self-Assigned IP / DNS Timeout"
osVersion: "macOS Sequoia 15 & Sonoma 14"
readTime: "3 min read"
difficulty: "Easy"
quickFix:
  summary: "MacBook Wi-Fi connected but no internet typically results from a self-assigned IP address (169.254.x.x) or a DNS resolution failure. This indicates the MacBook isn't receiving a valid IP from the router or cannot translate domain names into IP addresses."
  steps:
    - "Renew DHCP Lease in Network Settings."
    - "Flush DNS Cache via Terminal."
    - "Restart Wi-Fi and your network router."
  command: "sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder"
  commandLabel: "macOS Terminal: Flush DNS & Restart mDNS"
faqs:
  - question: "Why does my MacBook say Wi-Fi is connected but no internet?"
    answer: "This often indicates a self-assigned IP address (169.254.x.x) or a DNS resolution failure, meaning your MacBook isn't getting a valid IP from the router or can't translate domain names."
  - question: "How do I fix a self-assigned IP on my MacBook?"
    answer: "To fix a self-assigned IP, go to **System Settings > Network > Wi-Fi**, click **Details...** next to your network, then **TCP/IP**, and click **Renew DHCP Lease**."
  - question: "What does flushing DNS cache do on macOS?"
    answer: "Flushing the DNS cache clears outdated or corrupted DNS records stored locally, forcing your MacBook to request fresh DNS information, which can resolve internet connectivity issues."
  - question: "Should I restart my router if my MacBook has no internet?"
    answer: "Yes, restarting your router is a crucial troubleshooting step as it can resolve temporary glitches with its DHCP server, Wi-Fi module, or internal routing tables, often restoring internet access."
---

## Method 1: Renew DHCP Lease and Verify IP Configuration

A self-assigned IP address (starting with 169.254.x.x) is a primary indicator of a DHCP lease failure. Renewing the lease forces your MacBook to request a new IP address from the router.

1.  Open **System Settings**. You can do this by clicking the **Apple menu** in the top-left corner and selecting **System Settings**, or by clicking the **System Settings icon** in your Dock.
2.  In the sidebar, click **Network**.
3.  Select **Wi-Fi** from the list of network services on the right.
4.  Click the **Details...** button next to your connected Wi-Fi network.
5.  In the pop-up window, select the **TCP/IP** tab.
6.  Click **Renew DHCP Lease**. Confirm any prompts.
7.  After renewing, verify your IP address. It should now be in the range of your router (e.g., 192.168.1.x or 10.0.1.x).
    ```bash
    ifconfig en0 | grep "inet "
    ```
    Look for an "inet" address that is not 169.254.x.x.

## Method 2: Flush DNS Cache and Restart mDNSResponder

Outdated or corrupted DNS cache entries can prevent your MacBook from resolving domain names, leading to a "connected, no internet" state. Flushing the cache forces new lookups.

1.  Open **Terminal**. You can find it in **Applications > Utilities > Terminal**, or by searching for "Terminal" using **Spotlight (Cmd + Spacebar)**.
2.  Execute the following command to flush the DNS cache and restart the mDNSResponder service:
    ```bash
    sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
    ```
    You will be prompted to enter your administrator password. Type it and press **Enter** (the characters will not appear as you type).
3.  After the command completes, test your internet connectivity by opening a web browser and visiting a known website.

## Method 3: Remove and Re-add Wi-Fi Network

This action clears all stored network preferences for a specific Wi-Fi network, including passwords and custom DNS settings, allowing for a fresh connection attempt.

1.  Open **System Settings > Network > Wi-Fi**.
2.  Click the **Details...** button next to your problematic Wi-Fi network.
3.  In the pop-up window, click **Forget This Network...** at the bottom-left. Confirm your choice.
4.  Turn Wi-Fi off and then back on using the toggle in **System Settings > Network > Wi-Fi**.
5.  Select your Wi-Fi network from the list and re-enter the password when prompted.

## Method 4: Reset Network Settings (Location) and Router Restart

Sometimes, a corrupted network configuration profile on your MacBook can cause persistent issues. Resetting the network location creates a clean slate. Additionally, restarting your router clears its internal cache and reinitializes its services.

1.  **Reset Network Location (Advanced Users):**
    *   Open **Finder**.
    *   From the menu bar, click **Go > Go to Folder...** (or press **Shift + Cmd + G**).
    *   Type `/Library/Preferences/SystemConfiguration/` and press **Enter**.
    *   Locate and move the following files to your Desktop (do NOT delete them immediately, just move them as a backup):
        *   `com.apple.airport.preferences.plist`
        *   `com.apple.network.eapolclient.configuration.plist`
        *   `com.apple.wifi.message-tracer.plist`
        *   `NetworkInterfaces.plist`
        *   `preferences.plist`
    *   Restart your MacBook. The system will recreate these files with default settings.
2.  **Restart Router and MacBook:**
    *   Unplug your Wi-Fi router and modem (if separate) from the power outlet.
    *   Wait for at least 30 seconds.
    *   Plug the modem back in and wait for it to fully boot (all indicator lights stable).
    *   Plug the router back in and wait for it to fully boot.
    *   Restart your MacBook by clicking the **Apple menu > Restart...**.
    *   Once both devices are fully restarted, attempt to connect to your Wi-Fi network.
