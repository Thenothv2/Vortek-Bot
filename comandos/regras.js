module.exports = {
  name: "regras",
  execute(message, args) {
    const regrasAtivas = {
      doc: 1, 
      video: 1, 
      foto: 1, 
      audio: 1, 
      loc: 1, 
      ctt: 1
    };

    const tipoDeRegra = args[0];
    const acao = args[1];

    if (!tipoDeRegra || !["doc", "video", "foto", "audio", "loc", "ctt"].includes(tipoDeRegra) || ![0, 1].includes(parseInt(acao))) {
      return message.reply("Uso correto: !regras <tipo> <0 ou 1>");
    }

    regrasAtivas[tipoDeRegra] = parseInt(acao);

    message.reply(`A regra de ${tipoDeRegra} foi ${acao === "1" ? "ativada" : "desativada"}.`);
  }
};
