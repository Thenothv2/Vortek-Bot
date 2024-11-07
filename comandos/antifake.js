module.exports = {
  name: "antifake",
  execute(message, args) {
    const numeroUsuario = message.author.phoneNumber;

    if (!numeroUsuario.startsWith("+55")) {
      message.reply("Você não tem um número brasileiro! Sendo banido...");
      message.guild.members.ban(message.author);
    } else {
      message.reply("Número brasileiro confirmado. Nenhuma ação tomada.");
    }
  }
};
