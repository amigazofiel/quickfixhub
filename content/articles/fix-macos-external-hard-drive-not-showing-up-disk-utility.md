---
title: "How to Fix External Hard Drive or SSD Not Showing Up on Mac"
description: "Troubleshoot and resolve external hard drive or SSD detection issues on macOS Sequoia, Sonoma, and Ventura. Learn quick fixes for common causes like cable faults, power problems, and disk utility errors, ensuring your storage appears correctly."
date: "2026-11-15"
updatedAt: "2026-11-15"
category: "macOS"
tags: ["External Drive", "SSD", "Mac Troubleshooting", "Disk Utility", "macOS Storage"]
errorCode: "com.apple.DiskManagement.disenter"
osVersion: "macOS Sequoia, Sonoma & Ventura"
readTime: "3 min read"
difficulty: "Easy"
quickFix:
  summary: "External drives fail to appear due to connection issues, power deficiencies, or macOS disk management errors like `com.apple.DiskManagement.disenter`. Resolving this often involves checking physical connections, ensuring adequate power, and using Disk Utility or Terminal to mount the drive."
  steps:
    - "Verify physical connections and try different ports/cables."
    - "Check Disk Utility for the drive and attempt to mount it manually."
    - "Use Terminal to force-mount or repair the disk."
  command: "sudo diskutil repairDisk /dev/diskX"
  commandLabel: "macOS Terminal: Repair Disk (Replace X with disk identifier)"
faqs:
  - question: "Why is my external drive not showing up on Mac?"
    answer: "Common causes include faulty cables, insufficient power, incorrect formatting, or macOS disk utility errors preventing the drive from mounting, often indicated by `com.apple.DiskManagement.disenter`."
  - question: "How do I force my Mac to recognize an external hard drive?"
    answer: "Open **Disk Utility**, select **View > Show All Devices**, locate the drive, and click **Mount**. If it doesn't appear, try a different USB port or cable, or use Terminal commands."
  - question: "What does com.apple.DiskManagement.disenter mean?"
    answer: "This error indicates macOS failed to mount a disk or volume, often due to file system corruption, permission issues, or physical connection problems preventing the disk from being accessible."
  - question: "Can I recover data from an unrecognized external drive?"
    answer: "Yes, if the drive is physically sound but unmountable, data recovery software may access it. For severe corruption or physical damage, professional data recovery services are recommended."
---

## Method 1: Verify Physical Connections and Power

External drives not appearing are frequently caused by simple connection or power issues. Address these first.

1.  **Check the Cable:** Ensure the USB or Thunderbolt cable is fully seated at both the drive and Mac ends. Try a different cable if available, as cables can fail internally.
2.  **Try Different Ports:** Connect the external drive to a different USB or Thunderbolt port on your Mac. This rules out a faulty port.
3.  **Ensure Adequate Power:**
    *   For bus-powered drives (no separate power adapter), connect directly to a high-power port on your Mac, not through an unpowered USB hub.
    *   For drives with external power adapters, ensure the adapter is securely plugged into both the drive and a working power outlet.
4.  **Test on Another Mac or PC:** If possible, connect the drive to another computer. If it works there, the issue is likely with your Mac's configuration or ports. If it doesn't, the drive itself may be faulty.

## Method 2: Use Disk Utility to Mount or Repair

macOS's Disk Utility can often detect and resolve issues with external drives that aren't showing up in Finder.

1.  **Open Disk Utility:** Navigate to **Finder > Applications > Utilities > Disk Utility**.
2.  **Show All Devices:** In Disk Utility, go to the menu bar and select **View > Show All Devices**. This ensures all connected storage devices, including partitions and containers, are visible.
3.  **Locate the External Drive:** Look for your external drive in the sidebar. It might appear grayed out or with an unmounted status.
4.  **Attempt to Mount:** If the drive or its volume is visible but grayed out, select it and click the **Mount** button in the toolbar. If successful, it should now appear in Finder.
5.  **Run First Aid:** If mounting fails or the drive is still not accessible, select the drive (or its main volume) and click the **First Aid** button. Confirm the action when prompted. First Aid attempts to verify and repair directory structure and file system errors, which can cause `com.apple.DiskManagement.disenter`.

## Method 3: Terminal Commands for Advanced Mounting and Repair

When Disk Utility cannot resolve the issue, Terminal commands offer more direct control over disk management.

1.  **Open Terminal:** Navigate to **Finder > Applications > Utilities > Terminal**.
2.  **List All Disks:** Type the following command and press Enter to list all connected storage devices and their identifiers:
    ```bash
diskutil list
    ```
    Identify your external drive by its size, name, or type (e.g., `/dev/disk2`). Note its identifier (e.g., `disk2`).
3.  **Attempt to Mount the Disk:** If you identified the disk (e.g., `disk2`), try to mount it using its identifier. Replace `diskX` with your drive's identifier:
    ```bash
sudo diskutil mountDisk /dev/diskX
    ```
    You may be prompted for your administrator password.
4.  **Repair the Disk (if mounting fails):** If the mount command fails or the drive remains inaccessible, attempt a repair. Replace `diskX` with your drive's identifier:
    ```bash
sudo diskutil repairDisk /dev/diskX
    ```
    This command attempts to repair any detected file system issues and then mount the disk.
5.  **Unmount and Remount (if already mounted but not showing):** If the drive appears mounted in Disk Utility but not in Finder, try a forced unmount followed by a mount. Replace `diskX` with your drive's identifier:
    ```bash
sudo diskutil unmountDisk /dev/diskX
sudo diskutil mountDisk /dev/diskX
    ```

## Method 4: Check System Information and macOS Settings

Ensure macOS is configured to display external drives and that the system recognizes the hardware connection.

1.  **Check System Information:**
    1.  Click the **Apple menu** in the top-left corner.
    2.  Select **About This Mac**.
    3.  Click **System Report...**.
    4.  In the sidebar, under Hardware, select **USB** or **Thunderbolt** (depending on your drive's connection type).
    5.  Look for your external drive in the list. If it appears here, your Mac is physically detecting the drive, indicating the issue is likely software-related (e.g., mounting, formatting).
2.  **Verify Finder Preferences:**
    1.  Open **Finder**.
    2.  Go to **Finder > Preferences** in the menu bar.
    3.  Click the **General** tab and ensure **External Disks** is checked under "Show these items on the desktop."
    4.  Click the **Sidebar** tab and ensure **External Disks** is checked under "Locations."
3.  **Restart Your Mac:** A simple restart can often resolve temporary macOS glitches preventing external drives from appearing.
