---
title: "How to Fix Spotify \"Can't Play the Current Track\" on Windows & Mac"
description: "Resolve Spotify's \"Can't Play the Current Track\" error on Windows 10/11 and macOS. This guide provides direct steps to clear cache, verify audio settings, and troubleshoot network issues for uninterrupted music."
date: "2026-11-16"
updatedAt: "2026-11-16"
category: "Apps & Software"
tags: ["Spotify", "Troubleshooting", "Windows", "macOS", "Audio", "Playback Error", "Streaming"]
errorCode: "Spotify Error Code 4 / Audio Output"
osVersion: "Windows 11/10 & macOS"
readTime: "3 min read"
difficulty: "Easy"
quickFix:
  summary: "Spotify's \"Can't Play the Current Track\" error frequently results from corrupted local cache files or an incorrectly configured audio output device. Clearing the application cache and confirming your system's audio settings are the fastest ways to restore playback functionality."
  steps:
    - "Clear Spotify's local cache files."
    - "Verify the correct audio output device is selected."
    - "Restart Spotify and your computer."
  command: "ipconfig /flushdns && netsh winsock reset && netsh int ip reset"
  commandLabel: "Windows Admin CMD: Reset Network Configuration"
faqs:
  - question: "Why does Spotify say \"Can't play the current track\"?"
    answer: "This error typically indicates corrupted local cache files, an incorrect audio output device selection, network connectivity issues, or temporary Spotify application glitches preventing track playback."
  - question: "How do I clear Spotify cache on Windows?"
    answer: "On Windows, close Spotify, then navigate to `%appdata%\\Spotify\\Users\\` and delete the `spotify_xxxx-user` folder, and also delete the `Storage` folder in `%localappdata%\\Spotify`."
  - question: "How do I fix Spotify audio output issues on Mac?"
    answer: "On macOS, ensure the correct output device is selected in **System Settings > Sound > Output**. Also, check Spotify's in-app **Settings > Audio Quality** and consider restarting your Mac."
  - question: "Does reinstalling Spotify fix playback errors?"
    answer: "Yes, a clean reinstallation of Spotify can often resolve persistent playback errors by removing corrupted application files and ensuring you have the latest, uncorrupted version of the app."
---

## Method 1: Clear Spotify Cache and Local Files

The most common cause for playback issues is a corrupted local cache. Clearing these files forces Spotify to re-download track data.

1.  **Close Spotify Completely:** Ensure the Spotify application is fully closed, including from the system tray (Windows) or menu bar (macOS).

2.  **Clear Cache on Windows:**
    *   Press **Windows Key + R**, type `%appdata%`, and press **Enter**.
    *   Navigate to the `Spotify` folder, then `Users`.
    *   Delete the folder named `spotify_xxxx-user` (where `xxxx` is a string of characters).
    *   Press **Windows Key + R**, type `%localappdata%`, and press **Enter**.
    *   Navigate to the `Spotify` folder.
    *   Delete the `Storage` folder.
    *   Restart Spotify.

3.  **Clear Cache on macOS:**
    *   Open **Finder**, click **Go** in the menu bar, then select **Go to Folder...**.
    *   Type `~/Library/Application Support/Spotify/PersistentCache` and press **Enter**.
    *   Delete all contents within this `PersistentCache` folder.
    *   Repeat the **Go to Folder...** step, type `~/Library/Caches/com.spotify.client` and press **Enter**.
    *   Delete all contents within this `com.spotify.client` folder.
    *   Restart Spotify.

## Method 2: Verify Audio Output Device and Settings

Incorrect audio device selection or conflicting settings can prevent Spotify from playing tracks.

1.  **Check Spotify's In-App Output (If Available):**
    *   Open Spotify and play a track.
    *   Look for a speaker icon or output selector (often near the volume control) and ensure the correct output device is selected.

2.  **Verify System Audio Output (Windows):**
    *   Right-click the **speaker icon** in the taskbar and select **Sound settings**.
    *   Under **Output**, ensure your desired playback device (e.g., headphones, speakers) is selected.
    *   Click on your output device, then scroll down to **Advanced** or **Additional device properties**.
    *   Go to the **Advanced** tab and uncheck "Allow applications to take exclusive control of this device" to disable Exclusive Mode. Click **Apply** then **OK**.

3.  **Verify System Audio Output (macOS):**
    *   Go to **System Settings > Sound > Output**.
    *   Select your preferred audio output device (e.g., internal speakers, external headphones).
    *   Ensure the volume slider is not at zero and "Mute" is not checked.

4.  **Update Audio Drivers (Windows):**
    *   Press **Windows Key + X** and select **Device Manager**.
    *   Expand **Sound, video and game controllers**.
    *   Right-click your audio device (e.g., Realtek High Definition Audio) and select **Update driver**.
    *   Choose "Search automatically for drivers." If no update is found, visit your computer manufacturer's website for the latest drivers.

## Method 3: Troubleshoot Network and Firewall

Streaming issues can often be traced back to network connectivity or firewall restrictions.

1.  **Restart Your Router/Modem:** Power cycle your network equipment by unplugging it for 30 seconds, then plugging it back in. Wait for it to fully restart.

2.  **Flush DNS Cache & Reset Network (Windows):**
    *   Press **Windows Key + S**, type `cmd`, right-click **Command Prompt**, and select **Run as administrator**.
    *   Execute the following commands one by one, pressing **Enter** after each:
        ```bat
ipconfig /flushdns
netsh winsock reset
netsh int ip reset
        ```
    *   Restart your computer after running these commands.

3.  **Flush DNS Cache (macOS):**
    *   Open **Terminal** from **Applications > Utilities**.
    *   Execute the following command:
        ```bash
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
        ```
    *   You may be prompted for your administrator password.

4.  **Check Firewall/Antivirus Settings:**
    *   Ensure your firewall (Windows Defender Firewall or third-party) and antivirus software are not blocking Spotify.
    *   Temporarily disable them to test if Spotify works. If it does, add Spotify as an exception.
    *   **Windows Firewall:** **Settings > Privacy & security > Windows Security > Firewall & network protection > Allow an app through firewall**. Ensure Spotify is checked for both Private and Public networks.

## Method 4: Reinstall Spotify and Update System

If previous steps haven't resolved the issue, a clean reinstallation or system update may be necessary.

1.  **Perform a Clean Reinstallation of Spotify:**
    *   **Windows:**
        1.  Open **Settings > Apps > Installed apps** (or **Apps & features** on Windows 10).
        2.  Find **Spotify**, click the **three dots** (or select it), and choose **Uninstall**.
        3.  After uninstalling, manually delete any remaining Spotify folders from `%appdata%` and `%localappdata%` as described in Method 1.
        4.  Download and install the latest version of Spotify from the official website (spotify.com/download).
    *   **macOS:**
        1.  Drag the **Spotify** application from your **Applications** folder to the **Trash**.
        2.  Empty the Trash.
        3.  Manually delete any remaining Spotify cache/support files as described in Method 1.
        4.  Download and install the latest version of Spotify from the official website (spotify.com/download).

2.  **Update Your Operating System:**
    *   **Windows:** Go to **Settings > Windows Update** and click **Check for updates**. Install any available updates.
    *   **macOS:** Go to **System Settings > General > Software Update** and install any available updates.

3.  **Check for Spotify Server Status:**
    *   Occasionally, the issue might be on Spotify's end. Visit [downdetector.com/status/spotify](https://downdetector.com/status/spotify/) or Spotify's official social media channels to check for widespread outages.
