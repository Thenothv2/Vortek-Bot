// commands/admin/rules/video.js
module.exports = {
  name: 'video',
  description: 'Ativa ou desativa o envio de vídeos no grupo.',
  async execute(message, args, bot) {
    if (args[0] === '1') {
      bot.rules.videos = true;
      message.reply('A regra de envio de vídeos foi ativada.');
    } else if (args[0] === '0') {
      bot.rules.videos = false;
      message.reply('A regra de envio de vídeos foi desativada.');
    } else {
      message.reply('Por favor, use 1 para ativar ou 0 para desativar a regra de vídeos.');
    }
  }
};
