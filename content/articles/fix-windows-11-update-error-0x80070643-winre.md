---
title: "How to Fix Windows Update Error 0x80070643: WinRE Partition Too Small"
description: "Resolve Windows Update Error 0x80070643 on Windows 10/11 caused by an undersized WinRE partition. Learn to resize the recovery partition using Diskpart for successful updates."
date: "2026-11-21"
updatedAt: "2026-11-21"
category: "Windows"
tags: ["Windows Update", "Error 0x80070643", "WinRE", "Recovery Partition", "Diskpart", "Windows 11", "Windows 10"]
errorCode: "0x80070643"
osVersion: "Windows 11 & Windows 10"
readTime: "4 min read"
difficulty: "Easy"
quickFix:
  summary: "Error 0x80070643 occurs when the Windows Recovery Environment (WinRE) partition lacks sufficient space for the update. The fastest resolution involves temporarily disabling WinRE, extending the partition by recreating it, and re-enabling it."
  steps:
    - "Disable WinRE to free the partition for modification."
    - "Shrink the main OS partition, then delete and recreate the WinRE partition with increased space."
    - "Re-enable WinRE and retry the Windows Update process."
  command: ""
  commandLabel: "Quick Terminal / CMD Fix"
faqs:
  - question: "What causes Windows Update Error 0x80070643?"
    answer: "Error 0x80070643 typically occurs because the Windows Recovery Environment (WinRE) partition is too small to accommodate the necessary update files or processes, preventing the update from completing."
  - question: "Is it safe to resize the WinRE partition?"
    answer: "Yes, resizing the WinRE partition is safe when following precise Diskpart commands. Incorrect steps can lead to data loss or system instability, so proceed with caution and ensure you have a backup."
  - question: "How much space does the WinRE partition need for updates?"
    answer: "Microsoft recommends the WinRE partition have at least 250MB of free space. After resizing, aim for a total WinRE partition size of at least 750MB to 1GB to ensure sufficient room for future updates."
  - question: "What if there's no unallocated space for the WinRE partition?"
    answer: "If there's no unallocated space, you must shrink an adjacent partition, typically your main OS (C:) drive, to create the necessary free space immediately before where the WinRE partition will be recreated."
---

## Method 1: Verify WinRE Status and Disk Configuration

Before making changes, confirm the current state of your Windows Recovery Environment (WinRE) and identify your disk partitions.

1.  Open **Command Prompt** as an administrator. Search for `cmd`, right-click **Command Prompt**, and select **Run as administrator**.
2.  Check WinRE status by typing the following command and pressing **Enter**:

    ```bat
    reagentc /info
    ```

    Note the "Windows RE location" and "Windows RE status." If the status is "Disabled," you can skip Method 2, step 1.
3.  Open **Diskpart** by typing `diskpart` and pressing **Enter**.
4.  List all disks by typing `list disk` and pressing **Enter**.
5.  Select your primary system disk (usually Disk 0) by typing `select disk <DiskNumber>` (e.g., `select disk 0`) and pressing **Enter**.
6.  List partitions on the selected disk by typing `list partition` and pressing **Enter**.

    Identify your main OS partition (e.g., Primary, often the largest) and the Recovery partition (Type: Recovery, often smaller). Note their **Partition #** and **Size**.
7.  Type `exit` and press **Enter** to close Diskpart for now.

## Method 2: Disable WinRE and Create Unallocated Space

To resize the WinRE partition, it must first be disabled, and sufficient unallocated space must be available immediately before it.

1.  **Disable WinRE:** In the elevated Command Prompt, type the following command and press **Enter**:

    ```bat
    reagentc /disable
    ```

    A successful message will confirm WinRE is disabled.
2.  **Shrink the OS Partition (if needed):** If there isn't at least 250MB of unallocated space directly before your WinRE partition, you must create it. This typically involves shrinking your main OS partition.

    a.  Re-open **Diskpart** by typing `diskpart` in the Command Prompt and pressing **Enter**.
    b.  Select your primary system disk again: `select disk <DiskNumber>` (e.g., `select disk 0`).
    c.  List partitions: `list partition`.
    d.  Identify your main OS partition (e.g., Partition 3, Type: Primary). Select it: `select partition <OS_Partition_Number>` (e.g., `select partition 3`).
    e.  Shrink the partition to create 250MB of unallocated space. Type the following and press **Enter**:

        ```bat
        shrink desired=250 minimum=250
        ```

        This creates 250MB of unallocated space. If you need more, increase `desired` and `minimum` (e.g., `desired=500 minimum=500`).

## Method 3: Recreate and Extend the WinRE Partition

Now, you will delete the old WinRE partition and create a new, larger one in the newly available unallocated space.

1.  **Delete the existing WinRE partition:**

    a.  In Diskpart, list partitions again: `list partition`.
    b.  Identify your Recovery partition (e.g., Partition 4, Type: Recovery). Select it: `select partition <WinRE_Partition_Number>` (e.g., `select partition 4`).
    c.  Delete the partition: `delete partition override`.

    *Warning: Ensure you select the correct WinRE partition. Deleting the wrong partition can lead to data loss.*

2.  **Create a new, larger WinRE partition:**

    a.  List partitions again: `list partition`. You should see the unallocated space.
    b.  Create the new WinRE partition. The command varies slightly based on your disk's partition style (GPT or MBR). Most modern systems use GPT.

        *   **For GPT disks:**

            ```bat
            create partition primary id=de94bba4-06d1-4d40-a16a-bfd50179d6ac
            gpt attributes=0x8000000000000001
            ```

        *   **For MBR disks:**

            ```bat
            create partition primary id=27
            ```

    c.  Format the new partition: `format quick fs=ntfs label="Windows RE tools"`.

3.  Type `exit` and press **Enter** to close Diskpart.

## Method 4: Re-enable WinRE and Retry Windows Update

With the WinRE partition successfully resized, re-enable it and proceed with your Windows Update.

1.  **Re-enable WinRE:** In the elevated Command Prompt, type the following command and press **Enter**:

    ```bat
    reagentc /enable
    ```

    A successful message will confirm WinRE is enabled.
2.  **Verify WinRE status:** Confirm WinRE is now enabled and correctly configured:

    ```bat
    reagentc /info
    ```

    Ensure "Windows RE status" shows "Enabled."
3.  **Retry Windows Update:**

    a.  Go to **Settings > Windows Update** (Windows 11) or **Settings > Update & Security > Windows Update** (Windows 10).
    b.  Click **Check for updates** and attempt to install the problematic update again.
