module.exports = {
  name: "sair",
  execute(message) {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply("Você não tem permissão para remover o bot do grupo.");
    }

    message.reply("O bot está saindo do grupo.");
    // Lógica para remover o bot (depende de um sistema externo)
  }
};
