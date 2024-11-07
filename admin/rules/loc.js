// commands/admin/rules/loc.js
module.exports = {
  name: 'loc',
  description: 'Ativa ou desativa o envio de localizações no grupo.',
  async execute(message, args, bot) {
    if (args[0] === '1') {
      bot.rules.localizacoes = true;
      message.reply('A regra de envio de localizações foi ativada.');
    } else if (args[0] === '0') {
      bot.rules.localizacoes = false;
      message.reply('A regra de envio de localizações foi desativada.');
    } else {
      message.reply('Por favor, use 1 para ativar ou 0 para desativar a regra de localizações.');
    }
  }
};
