---
title: "How to Fix 'Aw, Snap! STATUS_ACCESS_VIOLATION' in Chrome & Edge"
description: "Resolve 'Aw, Snap! STATUS_ACCESS_VIOLATION' in Chrome & Edge on Windows 11/10 & macOS. This guide provides direct, actionable steps to fix browser crashes caused by memory access issues."
date: "2026-11-11"
updatedAt: "2026-11-11"
category: "Apps & Software"
tags: ["Chrome", "Edge", "STATUS_ACCESS_VIOLATION", "Browser Crash", "Windows macOS"]
errorCode: "STATUS_ACCESS_VIOLATION"
osVersion: "Windows 11/10 & macOS"
readTime: "3 min read"
difficulty: "Easy"
quickFix:
  summary: "STATUS_ACCESS_VIOLATION indicates a program attempted to access protected memory, often caused by faulty browser extensions, corrupted user profiles, or outdated system components. Resolving it typically involves disabling extensions, resetting browser settings, or ensuring system updates are current."
  steps:
    - "Disable all browser extensions."
    - "Reset browser settings to default."
    - "Update your operating system and browser."
  command: "sfc /scannow"
  commandLabel: "Windows Admin CMD: System File Checker"
faqs:
  - question: "What causes STATUS_ACCESS_VIOLATION in Chrome or Edge?"
    answer: "STATUS_ACCESS_VIOLATION typically results from browser extensions attempting to access restricted memory, corrupted browser profiles, outdated browser versions, or underlying system memory issues. Malware can also trigger this error."
  - question: "Does STATUS_ACCESS_VIOLATION indicate a virus on my computer?"
    answer: "Not necessarily. While malware can cause memory access violations, it is more commonly linked to faulty browser extensions, corrupted data, or system software conflicts. Running a full antivirus scan is recommended if other solutions fail."
  - question: "How can I prevent 'Aw, Snap! STATUS_ACCESS_VIOLATION' from reoccurring?"
    answer: "To prevent recurrence, regularly update your browser and operating system, use only reputable browser extensions, clear your browser's cache periodically, and ensure your system drivers are current. Avoid installing suspicious software."
  - question: "Can hardware issues cause STATUS_ACCESS_VIOLATION errors?"
    answer: "Yes, faulty RAM (Random Access Memory) or other hardware malfunctions can lead to STATUS_ACCESS_VIOLATION errors by causing programs to attempt accessing corrupted or unavailable memory addresses. Running a memory diagnostic tool can help identify such issues."
---

## Method 1: Disable Browser Extensions

Browser extensions are a frequent cause of `STATUS_ACCESS_VIOLATION` due to conflicts or memory mismanagement. Disable all extensions to isolate the issue.

1.  **For Google Chrome:**
    1.  Open Chrome and type `chrome://extensions` into the address bar, then press **Enter**.
    2.  Toggle off every extension. Alternatively, click **Remove** for any suspicious or rarely used extensions.
    3.  Restart Chrome and check if the error persists. If resolved, re-enable extensions one by one to identify the culprit.

2.  **For Microsoft Edge:**
    1.  Open Edge and type `edge://extensions` into the address bar, then press **Enter**.
    2.  Toggle off every extension.
    3.  Restart Edge and check if the error persists. If resolved, re-enable extensions one by one to identify the culprit.

## Method 2: Clear Browser Cache and Reset Settings

Corrupted cached data or misconfigured browser settings can lead to instability and memory access errors. Clearing these can resolve the issue.

1.  **For Google Chrome:**
    1.  Open Chrome, click the **three-dot menu** (**⋮**) > **More tools** > **Clear browsing data...**.
    2.  Set **Time range** to **All time**.
    3.  Check **Cookies and other site data** and **Cached images and files**.
    4.  Click **Clear data**.
    5.  Next, navigate to **Settings** > **Reset settings** > **Restore settings to their original defaults**.
    6.  Confirm by clicking **Reset settings**.

2.  **For Microsoft Edge:**
    1.  Open Edge, click the **three-dot menu** (**…**) > **Settings** > **Privacy, search, and services**.
    2.  Under **Clear browsing data**, click **Choose what to clear**.
    3.  Set **Time range** to **All time**.
    4.  Check **Cookies and other site data** and **Cached images and files**.
    5.  Click **Clear now**.
    6.  Next, navigate to **Settings** > **Reset settings** > **Restore settings to their default values**.
    7.  Confirm by clicking **Reset**.

## Method 3: Update Browser and Operating System

Outdated browser versions or operating system components can contain bugs that trigger `STATUS_ACCESS_VIOLATION`. Ensuring everything is current can provide a fix.

1.  **Update Google Chrome:**
    1.  Open Chrome, click the **three-dot menu** (**⋮**) > **Help** > **About Google Chrome**.
    2.  Chrome will automatically check for and install updates. Restart the browser if prompted.

2.  **Update Microsoft Edge:**
    1.  Open Edge, click the **three-dot menu** (**…**) > **Settings** > **About Microsoft Edge**.
    2.  Edge will automatically check for and install updates. Restart the browser if prompted.

3.  **Update Windows 11/10:**
    1.  Go to **Settings** > **Windows Update**.
    2.  Click **Check for updates** and install any available updates. Restart your PC.

4.  **Update macOS:**
    1.  Go to **Apple menu** () > **System Settings** (or **System Preferences** on older macOS versions) > **General** > **Software Update**.
    2.  Install any available updates. Restart your Mac.

## Method 4: Check System Files (Windows) or Reinstall Browser (macOS)

Underlying operating system corruption or a deeply corrupted browser installation can be the root cause.

1.  **For Windows 11/10: Run System File Checker (SFC) and DISM**
    1.  Open Command Prompt as an administrator: Search for `cmd`, right-click **Command Prompt**, and select **Run as administrator**.
    2.  Type `sfc /scannow` and press **Enter**. Allow the scan to complete.
    ```bat
sfc /scannow
    ```
    3.  If SFC finds issues it cannot fix, run the Deployment Image Servicing and Management (DISM) tool. Type the following commands, pressing **Enter** after each:
    ```bat
DISM /Online /Cleanup-Image /CheckHealth
DISM /Online /Cleanup-Image /ScanHealth
DISM /Online /Cleanup-Image /RestoreHealth
    ```
    4.  Restart your PC after the commands complete.

2.  **For macOS: Reinstall the Browser**
    1.  Close Chrome or Edge completely.
    2.  Open **Finder**, go to **Applications**.
    3.  Drag **Google Chrome** or **Microsoft Edge** to the **Trash**.
    4.  Empty the Trash.
    5.  Download the latest version of Chrome from [google.com/chrome](https://www.google.com/chrome) or Edge from [microsoft.com/edge](https://www.microsoft.com/edge) and reinstall.
