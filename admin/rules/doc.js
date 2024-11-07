// commands/admin/rules/doc.js
module.exports = {
  name: 'doc',
  description: 'Ativa ou desativa o envio de documentos no grupo.',
  async execute(message, args, bot) {
    if (args[0] === '1') {
      // Ativa a regra
      bot.rules.documentos = true;
      message.reply('A regra de envio de documentos foi ativada.');
    } else if (args[0] === '0') {
      // Desativa a regra
      bot.rules.documentos = false;
      message.reply('A regra de envio de documentos foi desativada.');
    } else {
      message.reply('Por favor, use 1 para ativar ou 0 para desativar a regra de documentos.');
    }
  }
};
