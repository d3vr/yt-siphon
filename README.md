<p align="center">
  <img width="460" src="src/icons/logo.png" alt="YT Siphon Logo">
</p>

# YT Siphon
This is a browser extensoin / add-on to redirect YouTube URLs to alternative frontends. 

This extension adds the following functionality:
- If you have a YouTube video page opened and press `Alt+J` (can be changed in your browser settings), it opens the video page in the configured frontend.
- If you're browsing YouTube and you `Shift+Click` on a video, it opens the video page in the configured frontend in a new tab.

## Motivation
YouTube started cracking down on Ad Blocker usage, so this is my workaround.

![Ad Blocker Not Allowed](screenshots/adblocker-notallowed.jpg)
![Ad Blocker TOS](screenshots/adblocker-tos.png)
![Ad Blocker Counter](screenshots/adblocker-counter.png)

## Installation

### Mozilla Add-Ons site
[Get the add-on from addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/yt-siphon/)

### Manual
1. Download the `.xpi` addon file from the [Releases page](https://github.com/d3vr/yt-siphon/releases/)
2. Go to `about:addons`
3. Click the gear icon and select `Install Add-on From File`

### Cloned repo
1. Clone the repository or download as zip
2. Go to `about:debugging`
3. Click on `This Firefox`
4. Then `Load Temporary Add-on`
5. Select `manifest.json` in the `src/` directory from the cloned repo.


## Configuration
1. Visit YouTube then click the Add-Ons icon to open the panel and click the gear icon next to `YT Siphon`
2. Select `Always Allow on www.youtube.com`
3. ...
4. Profit?

You can change the default configured alternative frontend (`piped.video`) from the options page. You can click the extension's icon to access the options page.

## Credit
- GPT-4 and [Phind](https://www.phind.com/) helped a lot while creating this add-on.
- DALL-E 3 created the logo / icon.

## License
[MIT](https://www.tldrlegal.com/license/mit-license)
