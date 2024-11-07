module.exports = {
  name: "ban",
  execute(message, args) {
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      return message.reply("Você não tem permissão para banir usuários!");
    }

    const usuarioBanido = message.mentions.users.first();

    if (!usuarioBanido) {
      return message.reply("Você precisa mencionar um usuário para banir.");
    }

    const member = message.guild.members.cache.get(usuarioBanido.id);

    if (member) {
      member.ban()
        .then(() => {
          message.reply(`O usuário ${usuarioBanido.tag} foi banido.`);
        })
        .catch(err => {
          message.reply("Não foi possível banir esse usuário.");
          console.error(err);
        });
    }
  }
};
