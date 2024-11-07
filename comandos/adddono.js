module.exports = {
  name: "adddono",
  execute(message, args) {
    const { prefix, donos, maxDonos } = require('../config/config.json');
    const numeroNovoDono = args[0];
    
    if (donos.length >= maxDonos) {
      return message.reply("O número máximo de donos foi atingido!");
    }

    if (!numeroNovoDono) {
      return message.reply("Você precisa fornecer o número do novo dono.");
    }

    donos.push(numeroNovoDono);
    message.reply(`O número ${numeroNovoDono} foi adicionado como novo dono.`);
  }
};
