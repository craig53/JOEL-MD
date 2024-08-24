const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTU9wdjBYZDlNOUJES296TzREMGxaeXQyZzkxSitPRkhtcWhvZDZYWXJsRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoielMzUEtzWnZBYiszdmF2ZmFZdTZpajA2a05ZRVFWNkZMYkxLS0VsNnBsYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXTzV3RC9XR0ZoWXhOdXRmRHoveXR4bTFVbUtCSC9VeVNRMXNqdHdQRFg4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYnhHdnJxWjBQNmtnUjM1bFNlWWlSRUNDd3FKVHNYZTJLbHhySCsrY1I4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndPU281cXFOM1A0SWdObENNRzQrWi9PSXl0WUZpaHlMQXhWSU1LcXROM289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklTTjBadHdsbDlXRTZRdEdxRzBOelVOVXlWaHZmMjQ2YXFOUDlWbGVhZzQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUsxZVBJNGx2Qk8wdVJBc1hEWnhPQmF0cjNVaGZleU5Mc0FsbTlLSW9sMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRTAxVExqWTlENmx0MFhhYVhrWU5mNHRhNHhmZGRGUzEzcXhzRTJ6bFZYQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJwS01nVGowL0wyc0VjaU5tOUNXL3lmcGpHZ0R4Rm9vTWJPbEg3VlBEY2s2cjArdG1iRkVZUjd3OUJBWTk5bVNhZmM2bTdSOFlXRVVtbUswV0JjZWpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMwLCJhZHZTZWNyZXRLZXkiOiIwWFVkY0ovb1AyT0J2UXhoN2FmUXhhd0F0WEJHQUJDR081KysrS1g0TFVRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJiWUJSYUlEZ1NaSzdOaUcyaVlQbTRRIiwicGhvbmVJZCI6Ijk0Y2U2MGQwLTM0NzMtNGYzNC05YzlhLTVhYmQ5ZDdhYzNhYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRZDNacnNaNnhDbmorNEwxa2gxK0duME9kSzA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiemw2Y3VETGluQmU4aWY5eUVTWXdhWkozcVFnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjE5Q1dYSFREIiwibWUiOnsiaWQiOiIyNjM3MTQyNTQxMTU6NEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTFNvNHZrQkVQcXRxYllHR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiM3JFNFVXNjE0VHo0dWc5aHlxajBvTTYrTHBDZWZZbGxCWVNNNks0QnJIVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiUnhVSldYL0hZVDN3UjJhZldMcGxHb0R5TjlKeXBLUnVjdk1rK0p1VTZ1cldoS3NSZmhkKzNVMEZrYXpSeFNuL1VWUzZrVmxnOG1PRFlSWXdFVG1aQlE9PSIsImRldmljZVNpZ25hdHVyZSI6IkZhMXRpRFRHR1o0M1IwbmM1cHdaMTZOTHFWNXRlbkpKdkJ4UkNLeWlZRHBHay9yalFpT09pT2RXQWgyZm45M2ptQko1MWVJeE84YTdEWklBdlRvYWpnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzE0MjU0MTE1OjRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZDZ4T0ZGdXRlRTgrTG9QWWNxbzlLRE92aTZRbm4ySlpRV0VqT2l1QWF4MSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNDUzNjU4MywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMVFAifQ==",
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "joel_it",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255714595078",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'joel bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/7fad220f8082eaff5eb1d.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '1',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   DB: process.env.DB || 'postgres://neoverse:pomrleUMXwlmlpIcW2oFJmMX0CXzaFkf@dpg-combonun7f5s73d7uoog-a.oregon-postgres.render.com/neoverse_wz98',
                  /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
