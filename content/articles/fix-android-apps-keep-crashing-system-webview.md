---
title: "How to Fix Android Apps Keep Crashing or Closing Immediately (Samsung & Pixel)"
description: "Stop Android apps from crashing on launch. Repair corrupted Android System WebView updates, clear Google Play Services cache, and fix storage permission glitches."
date: "2026-11-05"
updatedAt: "2026-11-07"
category: "Android"
tags: ["Android App Crashing", "Android System WebView", "Samsung Galaxy", "Google Pixel", "Play Services"]
errorCode: "App Keeps Stopping"
osVersion: "Android 15, Android 14 & One UI 6/7"
readTime: "3 min read"
difficulty: "Easy"
quickFix:
  summary: "When multiple Android apps (like Gmail, Banking apps, Chrome, or Amazon) suddenly crash on startup with 'App keeps stopping', a faulty Android System WebView or Google Play Services cache update is almost always the cause."
  steps:
    - "Open Settings > Apps > See all apps and search for 'Android System WebView'."
    - "Tap the 3-dot menu (top-right) and select 'Uninstall updates', or update it directly in the Google Play Store."
    - "Clear the cache (not storage) for both 'Google Play Services' and the crashing app, then restart your phone."
faqs:
  - question: "What is Android System WebView and why does it make apps crash?"
    answer: "Android System WebView is a core system component powered by Chrome that allows Android apps to display web content inside the app. When a buggy WebView build rolls out or its shader cache corrupts, every app relying on it crashes immediately on launch."
  - question: "Will uninstalling updates on Android System WebView break my phone?"
    answer: "No. Uninstalling updates simply reverts WebView to the stable factory version built into your Android OS image. You can then safely update it to the latest patched build via Google Play."
  - question: "What is the difference between Clear Cache and Clear Storage on Android?"
    answer: "Clear Cache removes temporary compiled files without logging you out. Clear Storage (or Clear Data) resets the app to a fresh install state and requires you to sign back in."
---

## Method 1: Update or Roll Back Android System WebView

If multiple apps started crashing at the exact same time on your Samsung Galaxy, Google Pixel, or Motorola phone, fix `Android System WebView` first.

1. Open the **Google Play Store** app, tap your profile icon (top-right), and select **Manage apps & device** > **Updates available**.
2. If **Android System WebView** and **Google Chrome** appear in the list, tap **Update** on both.
3. **If they are already updated and apps still crash:**
   - Open your phone's **Settings** > **Apps** (or **All apps**).
   - Tap the search icon and type `WebView`.
   - Select **Android System WebView**.
   - Tap the **three-dot menu (⋮)** in the top-right corner and tap **Uninstall updates** > **OK**.
   - Restart your phone.

## Method 2: Clear Cache for the Crashing App & Google Play Services

Corrupted shader caches after an Android OS update frequently cause immediate crashes.

1. Open **Settings** > **Apps**.
2. Select the app that keeps stopping.
3. Tap **Force stop** (bottom-right), then go to **Storage & cache**.
4. Tap **Clear cache** (do **not** tap Clear storage yet so you keep your login session).
5. Go back to the **Apps** list, select **Google Play services** > **Storage & cache**, and tap **Clear cache**.

## Method 3: Disable "Suspend Execution for Cached Apps" (Developer Options Fix)

On Android 14 and Android 15, aggressive background freezer rules can crash apps when switching between tasks.

1. Open **Settings** > **System** > **Developer options** (if enabled).
2. Scroll down to the **Apps** section and locate **Suspend execution for cached apps**.
3. Set it to **Device default** (or **Disabled**) and reboot your device.
