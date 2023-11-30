const { eventshandler, db, webhookClient } = require("..");

module.exports = new eventshandler.event({
    event: 'ready',
    once: true,
    run: async (client) => {
        console.log('Ready!');

        async function pickPresence () {
            const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: statusArray[option].content,
                            type: statusArray[option].type,

                        },
                    
                    ],

                    status: statusArray[option].status
                })
            } catch (error) {
                console.error(error);
            }
        }
    },
});