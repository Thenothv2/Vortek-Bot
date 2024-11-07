const fs = require('fs');
const { prefix } = require('../config.json');
const antifakeStatusPath = './data/antifakeStatus.json';
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

module.exports = {
  name: 'antifake',
  description: 'Ativa ou desativa a verificação de números brasileiros.',
  async execute(message, args) {
    // Verificando se o usuário é o dono ou administrador
    if (!message.member.hasPermission('ADMINISTRATOR')) {
      return message.reply("Você não tem permissão para usar esse comando.");
    }

    // Carregar o status atual da regra antifake
    let status = JSON.parse(fs.readFileSync(antifakeStatusPath));

    if (args[0] === '1') {
      // Ativa a verificação antifake
      status.status = 1;
      fs.writeFileSync(antifakeStatusPath, JSON.stringify(status));
      message.reply('A verificação antifake foi ativada. Números não brasileiros serão removidos.');
    } else if (args[0] === '0') {
      // Desativa a verificação antifake
      status.status = 0;
      fs.writeFileSync(antifakeStatusPath, JSON.stringify(status));
      message.reply('A verificação antifake foi desativada. Números não brasileiros não serão mais removidos.');
    } else {
      message.reply(`Use ${prefix}antifake 1 para ativar ou ${prefix}antifake 0 para desativar.`);
    }
  },
  
  async handleNewMember(member) {
    // Verificando se a regra antifake está ativada
    let status = JSON.parse(fs.readFileSync(antifakeStatusPath));
    if (status.status === 1) {
      // Verificando se o número é brasileiro
      let phoneNumber = phoneUtil.parseAndKeepRawInput(member.user.phone);
      let isValidNumber = phoneUtil.isValidNumber(phoneNumber);
      let regionCode = phoneUtil.getRegionCodeForNumber(phoneNumber);

      if (isValidNumber && regionCode !== 'BR') {
        // Se o número não for brasileiro, bane o usuário
        await member.kick('Número não brasileiro detectado');
        member.send('Você foi removido por tentar entrar com um número que não é brasileiro.');
      }
    }
  }
};
