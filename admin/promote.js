// commands/admin/promote.js
module.exports = {
  name: 'promote',
  description: 'Promove um usuário a administrador.',
  async execute(message, args, bot) {
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('Por favor, mencione o usuário a ser promovido.');
    }

    // Lógica para promover o usuário
    bot.admins.push(user.id);
    message.reply(`${user.tag} foi promovido a administrador.`);
  }
};
