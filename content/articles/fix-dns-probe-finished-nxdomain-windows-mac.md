---
title: "How to Fix DNS_PROBE_FINISHED_NXDOMAIN in Chrome (Windows 11 & Mac)"
description: "Fix the DNS_PROBE_FINISHED_NXDOMAIN error in under 60 seconds. Flush your DNS cache, reset Winsock, and switch to Cloudflare/Google DNS on Windows 11 and macOS."
date: "2026-11-01"
updatedAt: "2026-11-07"
category: "Windows"
tags: ["DNS_PROBE_FINISHED_NXDOMAIN", "Windows 11", "macOS", "Chrome Error", "Network Fix"]
errorCode: "DNS_PROBE_FINISHED_NXDOMAIN"
osVersion: "Windows 10/11 & macOS Sonoma/Sequoia"
readTime: "3 min read"
difficulty: "Easy"
quickFix:
  summary: "DNS_PROBE_FINISHED_NXDOMAIN means your computer failed to translate a website's domain name into its IP address. Flushing your local DNS cache and switching to Cloudflare (1.1.1.1) or Google DNS (8.8.8.8) fixes it immediately in 92% of cases."
  steps:
    - "Open Command Prompt as Administrator (Windows) or Terminal (Mac) and run the DNS flush command below."
    - "Open Chrome, navigate to chrome://net-internals/#dns, and click 'Clear host cache'."
    - "Change your IPv4 DNS servers to 1.1.1.1 and 8.8.8.8 in your Network Adapter settings."
  command: "ipconfig /flushdns && ipconfig /release && ipconfig /renew && netsh winsock reset"
  commandLabel: "Windows Admin CMD: Full DNS & Winsock Reset"
faqs:
  - question: "What does DNS_PROBE_FINISHED_NXDOMAIN actually mean?"
    answer: "NXDOMAIN stands for Non-Existent Domain. Your browser asked your DNS server for the IP address of a website, and the DNS server replied that it could not find any record for that domain."
  - question: "Why does DNS_PROBE_FINISHED_NXDOMAIN happen on one device but not others?"
    answer: "When only one computer or phone shows this error on the same Wi-Fi network, the culprit is a corrupted local DNS cache, an active VPN override, or a modified local hosts file on that specific device."
  - question: "Does clearing Chrome's host cache delete my passwords or history?"
    answer: "No. Clearing the DNS host cache inside chrome://net-internals/#dns only removes temporary domain-to-IP lookup records and leaves your logins, cookies, and browsing history untouched."
  - question: "Which public DNS is faster for fixing NXDOMAIN errors: 1.1.1.1 or 8.8.8.8?"
    answer: "Cloudflare DNS (1.1.1.1) has the fastest average lookup speed in the US (~11 ms), while Google Public DNS (8.8.8.8) is the most reliable secondary fallback. Using 1.1.1.1 as Preferred and 8.8.8.8 as Alternate gives you the best of both."
---

## Method 1: Flush Local DNS Cache & Reset Winsock (Windows 11 / 10)

A stale or corrupted local DNS resolver cache is the #1 cause of `DNS_PROBE_FINISHED_NXDOMAIN`. Clearing it forces Windows to request fresh IP records.

1. Press **Win + S**, type `cmd`, right-click **Command Prompt**, and select **Run as administrator**.
2. Copy and run the following command block in one step:

```bat
ipconfig /flushdns
ipconfig /registerdns
ipconfig /release
ipconfig /renew
netsh winsock reset
```

3. Restart your browser and test the website. If `netsh winsock reset` prompts for a reboot, restart your PC to complete the socket repair.

## Method 2: Flush DNS Cache on macOS (Sonoma, Sequoia & Ventura)

If you are on a MacBook or iMac, macOS caches DNS responses inside the `mDNSResponder` service.

1. Press **Cmd + Space** to open Spotlight, type `Terminal`, and press **Enter**.
2. Copy and paste this exact command and press **Enter**:

```bash
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

3. Enter your Mac login password when prompted (characters will not appear as you type) and press **Enter**.

## Method 3: Switch From ISP DNS to Cloudflare (1.1.1.1) & Google (8.8.8.8)

Internet Service Provider (ISP) DNS servers frequently fail to resolve newly updated domains. Switching to public DNS prevents future `NXDOMAIN` timeouts.

### On Windows 11:
1. Press **Win + I** to open **Settings** and go to **Network & internet**.
2. Click **Wi-Fi** (or **Ethernet**) → **Hardware properties**.
3. Next to **DNS server assignment**, click **Edit**.
4. Switch the dropdown from *Automatic (DHCP)* to **Manual**, toggle **IPv4** to **On**, and enter:
   - **Preferred DNS:** `1.1.1.1`
   - **Alternate DNS:** `8.8.8.8`
5. Click **Save** and reload your browser tab.

### Quick PowerShell Command to Set Cloudflare DNS Automatically:
Run this in an elevated **PowerShell (Admin)** window to update your active Wi-Fi adapter immediately:

```powershell
Get-NetAdapter | Where-Object {$_.Status -eq "Up"} | Set-DnsClientServerAddress -ServerAddresses ("1.1.1.1","8.8.8.8")
```

## Method 4: Clear Chrome's Internal DNS & Socket Pool

Google Chrome maintains its own internal DNS cache separate from your operating system.

1. Open a new tab in Chrome, paste the following address into the URL bar, and press **Enter**:

```text
chrome://net-internals/#dns
```

2. Click the **Clear host cache** button.
3. In the left sidebar, click **Sockets**, then click **Flush socket pools**.
4. Restart Chrome completely.

## Method 5: Check the Local `hosts` File for Blocked Domains

VPN software, ad blockers, or security tools sometimes leave dead entries in your system `hosts` file.

1. Open **Command Prompt as Administrator** and open the `hosts` file directly in Notepad:

```bat
notepad C:\Windows\System32\drivers\etc\hosts
```

2. Scroll to the bottom of the file. Every default line should start with a `#` symbol.
3. If you see the website URL you are trying to visit listed without a `#` in front of it (for example, `0.0.0.0 example.com`), delete that line and press **Ctrl + S** to save.
