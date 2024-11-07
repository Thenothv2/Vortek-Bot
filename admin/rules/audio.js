// commands/admin/rules/audio.js
module.exports = {
  name: 'audio',
  description: 'Ativa ou desativa o envio de áudios no grupo.',
  async execute(message, args, bot) {
    if (args[0] === '1') {
      bot.rules.audios = true;
      message.reply('A regra de envio de áudios foi ativada.');
    } else if (args[0] === '0') {
      bot.rules.audios = false;
      message.reply('A regra de envio de áudios foi desativada.');
    } else {
      message.reply('Por favor, use 1 para ativar ou 0 para desativar a regra de áudios.');
    }
  }
};
