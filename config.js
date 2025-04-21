const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || "!",
    ownerName: process.env.OWNER_NAME || "coolstar",
    ownerNumber: process.env.OWNER_NUMBER || "2348086386147",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNks4cWYwWHFDSlZISHY4QXF6NUlBMXpCanVsQUNNTEFoUUFDM2RiRHNYaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQkJFK2FudU9IU2EwbnRzNGhQNkdFQVZSaXpkQkJJMzR1elZ1ajNLWnlqZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXSE4yTUpqM0xwckVyUzduakRYWDR6N3VGbmtVQ1Y5bFZJNUdSRkM2Wm5jPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYNi9nUjR3Y3JFd3pDRFkwV0xuMGhCemNsZGVMci9Fek90RGlybEJqeDB3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJFcHgzcUNwZkh3OUZxeHowOUIxMkNCUEQ1TVZjRlhzTithTmpjVWJNVnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imt0OEo5NHdVdTNuU0RSRlFCMUM1c056RkxIUndWSDdxSXVudGgyc1FtVGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0ZIVmpTNzVxNXRoUW5sNXplaVNmZGV5Ti9HeWJENEliZGNPa2NiT0xVcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaG1hdVNFeEtxemRRbEFIdFA2b0trQnZBYk10NlR2YnlLamdvRjN6aUwzND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhaVVlJTm84bElteWRoM29ISTRCWmtiQTZpeitNWGlvZ2FwZnYyZFpONCt4TmxYV0o5U1A5YVVEa3ZpWEN0RmY4Z2JLaEcrSEQ5b0FEZUJSOUNXWmhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjEsImFkdlNlY3JldEtleSI6IkNRQmNwcEdtUVVySUs2M2dGWmg3Y25qKzRpWDU4bU5mUXFKUEdqRFBMZm89IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjRDUDFNOTRCIiwibWUiOnsiaWQiOiIyMzQ4MDg2Mzg2MTQ3OjlAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxOTQxNTAyODg5MTI1MzE6OUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05ucHdKWURFT3U4bXNBR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlNhdTZacHRXcjk5cmRVQzVrRWdDR05MQ3pFb0JWbTY4Nm4weENlN2FHMVU9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkNWMzF4Z2Z4S21vakFCN3JGV2hPcmJqVFNHTktLV0poYWZGZkN2UXRHam94VFhaUm9XOE9xditYeFdKbGdhL0E5L2NNbzR4OFFFZG1kdFRWSzlUT0RnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJKYkN3M1NZZEhrVlZDV2dVZ2FUcVZ3YXN0SVpsYUx4bzRXVWQ0bitUWE40T3NUby9SbzBYZExVdjFNZU8wbWNCQ3NweHVaa2xXSmZkT1A0OFRJZUxoQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgwODYzODYxNDc6OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVbXJ1bWFiVnEvZmEzVkF1WkJJQWhqU3dzeEtBVlp1dk9wOU1RbnUyaHRWIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDUyNjQyNDksImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ3lkIn0=",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
