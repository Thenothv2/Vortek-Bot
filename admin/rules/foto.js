// commands/admin/rules/foto.js
module.exports = {
  name: 'foto',
  description: 'Ativa ou desativa o envio de fotos no grupo.',
  async execute(message, args, bot) {
    if (args[0] === '1') {
      bot.rules.fotos = true;
      message.reply('A regra de envio de fotos foi ativada.');
    } else if (args[0] === '0') {
      bot.rules.fotos = false;
      message.reply('A regra de envio de fotos foi desativada.');
    } else {
      message.reply('Por favor, use 1 para ativar ou 0 para desativar a regra de fotos.');
    }
  }
};
