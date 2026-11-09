---
title: "How to Fix Mac Spotlight Search Not Finding Files (Rebuild Index)"
description: "Troubleshoot macOS Spotlight search issues by rebuilding the mdutil index. This guide provides step-by-step instructions for macOS Sequoia & Sonoma to restore full search functionality."
date: "2026-11-09"
updatedAt: "2026-11-09"
category: "macOS"
tags: ["macOS", "Spotlight", "Search Fix", "mdutil", "Troubleshooting"]
errorCode: "Spotlight Index Corrupted"
osVersion: "macOS Sequoia & Sonoma"
readTime: "3 min read"
difficulty: "Easy"
quickFix:
  summary: "Spotlight search failures often stem from a corrupted or incomplete index, preventing macOS from accurately cataloging files. Rebuilding the Spotlight index with the `mdutil` command forces a complete re-scan of your drive, resolving most search inaccuracies."
  steps:
    - "Open Terminal from Applications > Utilities."
    - "Execute the provided command to erase and re-enable the Spotlight index."
    - "Allow macOS to rebuild the index in the background (may take time)."
  command: "sudo mdutil -E /; sudo mdutil -i on /"
  commandLabel: "macOS Terminal: Rebuild Spotlight Index"
faqs:
  - question: "How long does it take to rebuild the Spotlight index on a Mac?"
    answer: "Rebuilding the Spotlight index can take from a few minutes to several hours, depending on your Mac's speed, the size of your hard drive, and the number of files. It runs in the background and is complete when the Spotlight menu bar icon no longer shows a small dot."
  - question: "How can I check the status of the Spotlight index rebuild?"
    answer: "To check the Spotlight index status, open **Terminal** and type `mdutil -s /` then press Enter. Look for \"Indexing enabled.\" and \"Indexing is running.\" or \"Indexing is disabled.\" A small dot inside the Spotlight magnifying glass icon in the menu bar also indicates active indexing."
  - question: "What does `mdutil -E /` do?"
    answer: "The `mdutil -E /` command in Terminal erases the existing Spotlight index for the root volume (`/`) of your Mac. This effectively clears any corrupted index data, forcing macOS to create a completely new index from scratch when indexing is re-enabled."
  - question: "Will rebuilding the Spotlight index delete my files or data?"
    answer: "No, rebuilding the Spotlight index will not delete any of your files or data. It only recreates the database that Spotlight uses to locate files on your Mac. Your actual files remain untouched and safe during this process."
---

## Method 1: Verify Spotlight Preferences

1.  Open **System Settings** (or **System Preferences** on older macOS).
2.  Navigate to **Siri & Spotlight**.
3.  Ensure that desired search categories (e.g., **Applications**, **Documents**, **Folders**) are checked under "Search Results."
4.  Click **Spotlight Privacy** (or **Privacy** tab).
5.  Review the list of locations excluded from Spotlight searches. If your missing files' parent folder is listed, select it and click the **-** (minus) button to remove it.

## Method 2: Restart Spotlight Process

1.  Open **Activity Monitor** from **Applications > Utilities**.
2.  In the search bar, type `Spotlight` or `SystemUIServer`.
3.  Select the `Spotlight` or `SystemUIServer` process (if found).
4.  Click the **X** button in the toolbar to **Quit** the process, then select **Force Quit**. macOS will automatically restart the process.

## Method 3: Rebuild the Spotlight Index via Terminal

This is the most effective method for resolving corrupted Spotlight indexes.

1.  Open **Terminal** from **Applications > Utilities**.
2.  To disable and erase the existing Spotlight index for your primary drive (represented by `/`), enter the following command and press **Enter**:
    ```bash
sudo mdutil -E /
    ```
    You will be prompted to enter your administrator password. Type it (characters will not appear) and press **Enter**.
3.  To re-enable Spotlight indexing for your primary drive, enter the following command and press **Enter**:
    ```bash
sudo mdutil -i on /
    ```
4.  Spotlight will now begin rebuilding its index in the background. This process can take anywhere from a few minutes to several hours, depending on the size of your drive and the number of files. You can monitor its status by checking the Spotlight icon in the menu bar (a small dot inside the magnifying glass indicates indexing is active).
5.  To check the current indexing status at any time, use:
    ```bash
mdutil -s /
    ```
    Look for "Indexing enabled." and "Indexing is running." or "Indexing is disabled."

## Method 4: Run Disk Utility First Aid

While less common for direct Spotlight issues, disk errors can sometimes interfere with indexing.

1.  Open **Disk Utility** from **Applications > Utilities**.
2.  In the sidebar, select your primary Macintosh HD volume (usually named "Macintosh HD").
3.  Click the **First Aid** button in the toolbar.
4.  Click **Run** when prompted to confirm.
5.  Allow Disk Utility to check for and repair any disk errors. This process may require restarting your Mac.
