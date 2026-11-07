---
title: "How to Fix 'App Is Damaged and Can't Be Opened' on Mac (Sonoma & Sequoia)"
description: "Fix the macOS 'is damaged and can't be opened. You should move it to the Trash' error in 30 seconds by clearing the Gatekeeper quarantine attribute in Terminal."
date: "2026-11-03"
updatedAt: "2026-11-07"
category: "macOS"
tags: ["macOS Sequoia", "macOS Sonoma", "Gatekeeper", "xattr command", "Mac App Damaged"]
errorCode: "com.apple.quarantine"
osVersion: "macOS Sequoia 15, Sonoma 14, Ventura 13 (M1/M2/M3/M4 & Intel)"
readTime: "2 min read"
difficulty: "Easy"
quickFix:
  summary: "The app is rarely actually damaged. macOS Gatekeeper flags apps downloaded outside the Mac App Store with a quarantine extended attribute (com.apple.quarantine). Removing that flag with xattr -cr in Terminal makes the app open immediately."
  steps:
    - "Move the downloaded app into your /Applications folder first."
    - "Open Terminal (Cmd + Space -> type Terminal)."
    - "Run sudo xattr -cr /Applications/YourAppName.app (or drag the app icon into Terminal after typing xattr -cr )."
  command: "sudo xattr -cr /Applications/AppName.app"
  commandLabel: "macOS Terminal: Remove Gatekeeper Quarantine Flag"
faqs:
  - question: "Why does my Mac say an app is damaged when I just downloaded it?"
    answer: "Apple's Gatekeeper security system attaches a com.apple.quarantine flag to files downloaded via Safari or Chrome. If the developer's notarization certificate expired or the app is open-source, macOS displays 'App is damaged' instead of a standard certificate notice."
  - question: "What does the xattr -cr command do on macOS?"
    answer: "xattr stands for Extended Attributes. The -c flag clears all extended attributes (including com.apple.quarantine) and the -r flag applies it recursively to every file inside the .app bundle without altering the program code."
  - question: "Does disabling Gatekeeper put my Mac at risk?"
    answer: "Using xattr -cr on a single trusted app is much safer than disabling Gatekeeper globally because it only whitelists that specific application while keeping Gatekeeper active for all future downloads."
---

## Method 1: Clear the Quarantine Attribute for a Single App (Safest & Fastest)

Instead of turning off macOS security globally, remove the `com.apple.quarantine` flag only on the specific app you want to open.

1. Make sure you have dragged the application into your **Applications** folder in Finder.
2. Press **Cmd + Space**, type `Terminal`, and press **Return**.
3. Type the following command **with a trailing space at the end** (do not press Return yet):

```bash
sudo xattr -cr 
```

4. Open your **Applications** folder in Finder and **drag and drop the problem app icon directly into the Terminal window**. Terminal will automatically fill in the exact path (for example, `/Applications/Blender.app`), looking like this:

```bash
sudo xattr -cr /Applications/YourAppName.app
```

5. Press **Return**, enter your Mac login password, and press **Return** again.
6. Launch the app—it will now open immediately without the "Move to Trash" prompt.

## Method 2: Allow the App in macOS Privacy & Security Settings

On macOS Sequoia (15) and Sonoma (14), Apple relocated the manual override button inside System Settings.

1. Try to open the app once so the warning dialog appears, then click **Done** or **Cancel** (do **not** click Move to Trash).
2. Open **System Settings** (Apple menu  > **System Settings**).
3. Click **Privacy & Security** in the left sidebar and scroll down to the **Security** section.
4. Look for the message *"&lt;App Name&gt; was blocked to protect your Mac"* and click **Open Anyway**.
5. Authenticate with **Touch ID** or your Mac password.

## Method 3: Re-Sign Ad-Hoc Apple Silicon Apps (For M1 / M2 / M3 / M4 Macs)

On Apple Silicon Macs, modified or unsigned universal binaries also require an ad-hoc local code signature after clearing `xattr`.

1. Open **Terminal** and run both commands (replace `/Applications/YourAppName.app` with your app path):

```bash
sudo xattr -cr /Applications/YourAppName.app
sudo codesign --force --deep --sign - /Applications/YourAppName.app
```

2. Once Terminal outputs `replacing existing signature`, open the application normally.
