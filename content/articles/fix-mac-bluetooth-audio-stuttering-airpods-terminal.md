---
title: "How to Fix AirPods & Bluetooth Audio Stuttering on Mac (Sonoma/Sequoia)"
description: "Resolve AirPods and Bluetooth audio stuttering or dropouts on macOS Sonoma and Sequoia. This guide provides direct, actionable steps to fix common `bluetoothd` audio issues."
date: "2026-11-18"
updatedAt: "2026-11-18"
category: "macOS"
tags: ["AirPods", "Bluetooth", "macOS Sonoma", "macOS Sequoia", "Audio Fix"]
errorCode: "bluetoothd Audio Drop"
osVersion: "macOS Sonoma & Sequoia"
readTime: "3 min read"
difficulty: "Easy"
quickFix:
  summary: "Bluetooth audio stuttering on Mac often stems from interference, outdated caches, or a misbehaving `bluetoothd` daemon. Resetting the Bluetooth module and clearing related caches quickly resolves most intermittent audio dropouts."
  steps:
    - "Reset Bluetooth Module via Shift+Option+Bluetooth icon."
    - "Disconnect and re-pair your AirPods/Bluetooth device."
    - "Remove physical interference sources near your Mac."
  command: "sudo pkill bluetoothd"
  commandLabel: "macOS Terminal: Reset Bluetooth Daemon"
faqs:
  - question: "Why do my AirPods keep cutting out on my Mac?"
    answer: "AirPods often cut out due to wireless interference (Wi-Fi, other Bluetooth devices), outdated Bluetooth caches, or a temporarily overloaded Bluetooth module on your Mac."
  - question: "How do I stop my Mac Bluetooth from stuttering?"
    answer: "To stop Mac Bluetooth stuttering, try resetting the Bluetooth module, disconnecting and reconnecting your device, or removing nearby wireless interference sources like other 2.4GHz devices."
  - question: "Does macOS Sonoma have Bluetooth issues?"
    answer: "Some users report Bluetooth connectivity or audio stuttering issues on macOS Sonoma. These are often resolved by resetting the Bluetooth module, clearing caches, or ensuring macOS is fully updated."
  - question: "How do I reset my Mac's Bluetooth module?"
    answer: "Reset your Mac's Bluetooth module by holding **Shift + Option** while clicking the Bluetooth icon in the menu bar, then selecting **Reset the Bluetooth Module**."
---

## Method 1: Reset the Bluetooth Module

Bluetooth audio issues often stem from the `bluetoothd` daemon or the Bluetooth controller entering an unstable state. A full reset can clear these transient issues.

1.  Hold the **Shift** and **Option** keys simultaneously.
2.  Click the **Bluetooth icon** in your Mac's menu bar.
3.  From the expanded menu, select **Reset the Bluetooth Module**.
4.  Confirm by clicking **OK** or **Reset** in the prompt.
5.  Restart your Mac for a complete refresh of the Bluetooth stack.

## Method 2: Clear Bluetooth Preference Files and Caches

Corrupted or outdated preference files and cached data can lead to erratic Bluetooth behavior and audio dropouts. Clearing these forces macOS to regenerate them.

1.  Open **Finder**.
2.  From the menu bar, click **Go > Go to Folder...** (or press **Shift + Command + G**).
3.  Type `/Library/Preferences/` and press **Return**.
4.  Locate and drag any files starting with `com.apple.Bluetooth` (e.g., `com.apple.Bluetooth.plist`) to the Trash. You may need to authenticate with your administrator password.
5.  Repeat step 2, but type `~/Library/Preferences/` (note the tilde `~` for your user library). Drag any `com.apple.Bluetooth` files found here to the Trash.
6.  Repeat step 2, but type `~/Library/Caches/` and delete any folders or files related to Bluetooth or audio (e.g., `com.apple.BluetoothAudioAgent`).
7.  Empty the Trash.
8.  Restart your Mac. You will need to re-pair your Bluetooth devices after this process.

## Method 3: Check for Interference and Update macOS

Physical interference from other wireless devices or an outdated macOS version with known Bluetooth bugs can cause audio issues.

1.  **Reduce Interference**:
    *   Move closer to your Mac to improve signal strength.
    *   Ensure no other 2.4GHz devices (Wi-Fi routers, microwaves, cordless phones) are directly between your Mac and your AirPods/Bluetooth device.
    *   Temporarily disable Wi-Fi on your Mac to test if it's a Wi-Fi conflict (re-enable after testing).
    *   Disconnect other active Bluetooth devices from your Mac to reduce bandwidth contention.
2.  **Update macOS**:
    *   Go to **System Settings > General > Software Update**.
    *   Install any available macOS updates. Updates frequently include Bluetooth driver fixes and performance improvements.

## Method 4: Reset SMC and NVRAM/PRAM (Intel Macs) or Power Cycle (Apple Silicon Macs)

Low-level system settings stored in the System Management Controller (SMC) and Non-Volatile Random-Access Memory (NVRAM/PRAM) can impact hardware functionality, including Bluetooth. Resetting them can resolve persistent glitches. For Apple Silicon Macs, a simple power cycle often achieves similar results.

1.  **For Intel Macs (SMC & NVRAM)**:
    *   **Reset SMC**:
        1.  Shut down your Mac.
        2.  Unplug the power adapter.
        3.  Wait 15 seconds.
        4.  Plug the power adapter back in.
        5.  Wait 5 seconds, then press the power button to turn on your Mac.
    *   **Reset NVRAM/PRAM**:
        1.  Shut down your Mac.
        2.  Turn on your Mac and immediately press and hold **Option + Command + P + R**.
        3.  Keep holding until your Mac restarts and you hear the startup sound a second time, or the Apple logo appears and disappears a second time.
2.  **For Apple Silicon Macs (Power Cycle)**:
    *   Shut down your Mac completely (**Apple menu > Shut Down**).
    *   Wait at least 30 seconds.
    *   Press the power button to turn on your Mac.
