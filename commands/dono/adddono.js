// commands/dono/adddono.js
module.exports = {
  name: 'adddono',
  description: 'Adiciona um novo dono manualmente.',
  async execute(message, args, bot) {
    const newOwner = args[0];
    if (bot.owners.length >= 5) {
      return message.reply('O número máximo de donos foi atingido!');
    }

    if (!newOwner) {
      return message.reply('Por favor, forneça o número do novo dono.');
    }

    bot.owners.push(newOwner);
    message.reply(`O número ${newOwner} foi adicionado como dono.`);
  }
};
