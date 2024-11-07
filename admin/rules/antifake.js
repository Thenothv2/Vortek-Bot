// commands/admin/rules/antifake.js
module.exports = {
  name: 'antifake',
  description: 'Ativa ou desativa a regra de banir números não brasileiros.',
  async execute(message, args, bot) {
    if (args[0] === '1') {
      bot.rules.antifake = true;
      message.reply('A regra de antifake foi ativada.');
    } else if (args[0] === '0') {
      bot.rules.antifake = false;
      message.reply('A regra de antifake foi desativada.');
    } else {
      message.reply('Por favor, use 1 para ativar ou 0 para desativar a regra de antifake.');
    }
  }
};
