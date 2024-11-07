// commands/admin/rebaixar.js
module.exports = {
  name: 'rebaixar',
  description: 'Rebaixa um administrador para membro comum.',
  async execute(message, args, bot) {
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('Por favor, mencione o usuário a ser rebaixado.');
    }

    // Lógica para rebaixar o usuário
    const index = bot.admins.indexOf(user.id);
    if (index !== -1) {
      bot.admins.splice(index, 1);
      message.reply(`${user.tag} foi rebaixado para membro comum.`);
    } else {
      message.reply(`${user.tag} não é um administrador.`);
    }
  }
};
