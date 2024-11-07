module.exports = {
  name: "entrar",
  execute(message, args) {
    const linkGrupo = args[0];
    
    if (!linkGrupo) {
      return message.reply("Você precisa fornecer um link de convite para o grupo.");
    }

    // Lógica para adicionar o bot ao grupo (isso depende de um sistema externo)
    message.reply(`O bot está entrando no grupo com o link: ${linkGrupo}`);
  }
};
