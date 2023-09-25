#!/bin/bash

# Step 1: Delete the "./out/assets" folder
rm -rf ./out/assets

# Step 2: Run "npm run build" command
npm run build

# Step 3: Insert the provided lines into "./out/index.html" starting at line 76
sed -i '54i\
<link rel="manifest" href="manifest.json">\
<script>\
    if ('\'serviceWorker'\'' in navigator) {\
        navigator.serviceWorker.register('"'"'service-worker.js'"'"');\
    }\
</script>\
\
<!--Below is everything apple requires for a PWA-->\
<!--https://www.npmjs.com/package/pwa-asset-generator?msclkid=5ab7eed7ac5911ec86542119351e2842 -->\
<link rel="apple-touch-icon" href="./icons/apple-icon-180.png">\
\
<meta name="apple-mobile-web-app-capable" content="yes">\
\
<link rel="apple-touch-startup-image" href="./icons/apple-splash-2048-2732.jpg" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">\
<link rel="apple-touch-startup-image" href="./icons/apple-splash-2732-2048.jpg" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)">\
<link rel="apple-touch-startup-image" href="./icons/apple-splash-1668-2388.jpg" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">\
<link rel="apple-touch-startup-image" href="./icons/apple-splash-2388-1668.jpg" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)">\
<link rel="apple-touch-startup-image" href="./icons/apple-splash-1536-2048.jpg" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">\
<link rel="apple-touch-startup-image" href="./icons/apple-splash-2048-1536.jpg" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)">\
<link rel="apple-touch-startup-image" href="./icons/apple-splash-1668-2224.jpg" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">\
<link rel="apple-touch-startup-image" href="./icons/apple-splash-2224-1668.jpg" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)">\
<link rel="apple-touch-startup-image" href="./icons/apple-splash-1620-2160.jpg" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">\
<link rel="apple-touch-startup-image" href="./icons/apple-splash-2160-1620.jpg" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)">\
' ./out/index.html

# Step 4: Print completion message
echo "Operations have completed."