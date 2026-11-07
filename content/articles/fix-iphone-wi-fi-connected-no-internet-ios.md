---
title: "How to Fix iPhone 'Wi-Fi Connected But No Internet' on iOS 18 & iOS 17"
description: "Fix iPhone connected to Wi-Fi with 'No Internet Connection' in under 60 seconds. Disable Private Wi-Fi Address glitches, renew DHCP lease, and set manual DNS."
date: "2026-11-04"
updatedAt: "2026-11-07"
category: "iOS"
tags: ["iPhone Wi-Fi Fix", "iOS 18", "No Internet Connection", "DHCP Lease", "Apple iOS"]
errorCode: "No Internet Connection (Wi-Fi)"
osVersion: "iOS 18, iOS 17 & iPadOS"
readTime: "3 min read"
difficulty: "Easy"
quickFix:
  summary: "When your iPhone connects to Wi-Fi but says 'No Internet Connection' while other devices work fine, iOS is holding an expired router IP lease or a conflicting Private Wi-Fi MAC rotation. Renewing the lease and switching DNS to 1.1.1.1 fixes it without erasing your saved passwords."
  steps:
    - "Go to Settings > Wi-Fi and tap the blue (i) icon next to your connected Wi-Fi network."
    - "Tap 'Private Wi-Fi Address' and switch it from Rotating to 'Fixed' (or Off), then tap 'Renew Lease'."
    - "Scroll down to 'Configure DNS', switch to Manual, and add 1.1.1.1 and 8.8.8.8."
faqs:
  - question: "Why does my iPhone say No Internet Connection on Wi-Fi when my laptop works?"
    answer: "iOS 17 and iOS 18 use 'Private Wi-Fi Address' (MAC randomization) and iCloud Private Relay. Many home routers and mesh systems fail to assign a valid gateway route when the iPhone rotates its MAC address."
  - question: "Does 'Reset Network Settings' on iPhone delete my photos or apps?"
    answer: "No. Reset Network Settings only clears saved Wi-Fi passwords, paired Bluetooth devices, and VPN profiles. None of your photos, messages, or apps are touched."
  - question: "Can a stuck VPN profile block iPhone Wi-Fi internet even when the VPN app is closed?"
    answer: "Yes. If 'Connect on Demand' is enabled in Settings > General > VPN & Device Management, iOS blocks all traffic if the VPN server fails to handshake."
---

## Method 1: Switch Private Wi-Fi Address to "Fixed" & Renew Lease

In iOS 18, Apple changed **Private Wi-Fi Address** to include a *Rotating* option that frequently breaks DHCP routing on Xfinity, Spectrum, AT&T, and mesh routers.

1. Open **Settings** > **Wi-Fi** on your iPhone.
2. Tap the blue **(i)** info button next to your active Wi-Fi network name.
3. Tap **Private Wi-Fi Address** and change it to **Fixed** (or toggle it **Off** on iOS 17).
4. Toggle **Limit IP Address Tracking** to **Off** temporarily.
5. Scroll down, tap **Renew Lease**, and confirm by tapping **Renew Lease** again.

## Method 2: Set Manual Cloudflare / Google DNS on iPhone

If your router's local DNS relay hangs, your iPhone will show full Wi-Fi bars with zero web browsing.

1. Go to **Settings** > **Wi-Fi** and tap the **(i)** icon next to your network.
2. Scroll to the bottom and tap **Configure DNS**.
3. Select **Manual**.
4. Delete the existing router entries (tap the red minus `-` icon) and tap **Add Server**:
   - Add `1.1.1.1`
   - Add `8.8.8.8`
5. Tap **Save** in the top-right corner.

## Method 3: Disable Stuck VPN "Connect on Demand" Profiles

A background VPN profile is the second most common cause of sudden internet loss on iOS.

1. Open **Settings** > **General** > **VPN & Device Management** > **VPN**.
2. Even if Status says *Not Connected*, tap the **(i)** icon next to any installed VPN profile (NordVPN, ExpressVPN, Cloudflare WARP, etc.).
3. Toggle **Connect on Demand** to **Off** (or tap **Delete VPN** to test).

## Method 4: Perform a Clean iOS Network Settings Reset

If none of the per-network settings resolve the conflict, flush the entire iOS network stack:

1. Open **Settings** > **General** > **Transfer or Reset iPhone**.
2. Tap **Reset** > **Reset Network Settings**.
3. Enter your iPhone passcode. Your iPhone will reboot and rebuild fresh Wi-Fi, cellular, and DNS tables.
