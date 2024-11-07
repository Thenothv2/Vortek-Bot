module.exports = {
  name: "marcar",
  execute(message, args) {
    if (!args.length) {
      return message.reply("Você precisa fornecer uma mensagem para marcar todos.");
    }

    message.channel.send(`📢 Marcação do ADMIN (${message.author.tag}): ${args.join(" ")}`);
  }
};
