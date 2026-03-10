---
title: Settings
description: How to customize your insult experience with content filtering, insult packs, and pack weighting.
---

The **Settings** page lets you personalize how (de)Motivator works. All settings require a PorkyProductionsID account and are synced across your devices automatically.

Settings are organized into three sections: **Content Settings**, **Insult Pool Settings**, and **Profile Settings Data**.

---

## Content Settings

These settings control what kind of insults you see across the entire app — on the home page, in the Insult Browser, and everywhere else.

### Profanity

A toggle that controls whether insults containing strong language and mature content are included. This is **off by default**. Enabling it will show a warning, and it unlocks the Profane insult pack for selection in the Insult Pool section below.

### Length Limit

A number field that sets the **maximum number of words** an insult can have. Any insult longer than this limit is filtered out. Set it to **0** (the default) for unlimited length. The maximum value is 100 words.

This is useful if you prefer punchy one-liners over longer insults.

---

## Insult Pool Settings

This section controls which insult packs are in your active rotation and how they're weighted relative to each other.

### Insult Packs

The app comes with several themed packs of insults. Each pack can be individually toggled on or off:

| Pack | Description | Contains Profanity? |
| ---- | ----------- | ------------------- |
| **Original** | The core collection of general-purpose insults. | No |
| **Profane** | Strong language and mature content. Requires the Profanity toggle to be enabled. | Yes |
| **Halloween 🎃** | Seasonal insults themed around ghosts, monsters, and trick-or-treating. | No |
| **Christmas 🎄** | Seasonal insults themed around the holidays. | No |

At least one pack must remain enabled at all times. If you try to disable the last remaining pack, the app will stop you.

Packs marked as explicit (like Profane) are automatically hidden and disabled when the Profanity toggle is off.

### Pack Weighting

By default, insults are pulled evenly from all enabled packs. If you want more control, enable **Pack Weighting** to assign a percentage weight to each pack.

For example, you might set Original to 70% and Halloween to 30%, meaning roughly 7 out of every 10 insults will come from the Original pack. Weights are normalized to always total 100% — if your numbers don't add up perfectly, the app adjusts them for you.

Use the **Reset Weightings** button to go back to an even distribution across all enabled packs.

---

## Profile Settings Data

At the bottom of the Settings page you'll find two options:

- **Save Settings** — Manually saves your current settings to the server. Settings are normally saved automatically when you change them, but this button is there if you want to be sure.
- **Download Settings** — Exports your current settings as a JSON file. This can be useful as a backup or if you're curious about the raw data behind your configuration.