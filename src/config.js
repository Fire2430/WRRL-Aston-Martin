require('dotenv').config();

module.exports = {
    client: {
        token: process.env.token, // ← Your bot token (.env IS RECOMMENDED)
        id: '1179514288239558717' // ← Your bot ID
    },
    modmail: {
        guildId: '1179507537121390643', // ← Your server ID
        categoryId: '1179527596472549486', // ← The modmail category ID
        staffRoles: ['1179508390150553690', '1179508606283030618'], // ← The modmail staff roles IDs
        mentionStaffRolesOnNewMail: true // ← Mention staff roles when there is a new mail?
    },
    logs: {
        webhookURL: process.env.webhook // ← The logging webhook URL (OPTIONAL) (.env IS RECOMMENDED)
    }
};