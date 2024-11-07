// commands/admin/rules/ctt.js
module.exports = {
  name: 'ctt',
  description: 'Ativa ou desativa o envio de contatos no grupo.',
  async execute(message, args, bot) {
    if (args[0] === '1') {
      bot.rules.contatos = true;
      message.reply('A regra de envio de contatos foi ativada.');
    } else if (args[0] === '0') {
      bot.rules.contatos = false;
      message.reply('A regra de envio de contatos foi desativada.');
    } else {
      message.reply('Por favor, use 1 para ativar ou 0 para desativar a regra de contatos.');
    }
  }
};
