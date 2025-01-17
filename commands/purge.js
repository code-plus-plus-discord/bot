const utils = require("../data/utils");

module.exports = {
    name: 'purge',
    description: 'Deletes messages.',
    guildOnly: true,
    execute(message, args) {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            const amount = parseInt(args[0]) + 1;
            if (isNaN(amount)) {
                message.channel.send(utils.createError('That doesn\'t seem to be a valid number!'));
            } else if (amount <= 1 || amount > 100) {
                message.channel.send(utils.createError('You need to input a number between `1` and `99`!'));
            } else {
                message.channel.bulkDelete(amount, true).catch(err => {
                    message.channel.send(utils.createError(`Error:\n\`${err}\``));
                });
            }
        } else {
            message.channel.send(utils.createWarning("You need to have the `MANAGE_MESSAGES` permission!"));
        }
    },
};