const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@adiwajshing/baileys');
const { Boom } = require('@adiwajshing/baileys');
const fs = require('fs');
const path = require('path');
const pino = require('pino');
const logger = pino({ level: 'info' });

const sessionPath = './sessions';

// Função para conectar ao WhatsApp
async function connectToWhatsapp() {
  let sock;
  try {
    // Carrega credenciais salvas ou inicia nova sessão
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const { version, isLatest } = await fetchLatestBaileysVersion();

    // Cria o socket do WhatsApp
    sock = makeWASocket({
      version,
      printQRInTerminal: true,
      auth: state,
      logger,
    });

    // Salva as credenciais atualizadas
    sock.ev.on('creds.update', saveCreds);

    // Lidar com eventos de conexão e desconexão
    sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        console.log('QR Code gerado:', qr);
      }

      // Verificar se a conexão foi fechada
      if (connection === 'close') {
        // Verificar se o motivo da desconexão é diferente de logout
        const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
        console.log('Conexão encerrada. Tentando reconectar...', shouldReconnect);

        // Reconectar se necessário
        if (shouldReconnect) {
          connectToWhatsapp();
        } else {
          console.error('Erro crítico. Não é possível reconectar.');
        }
      } else if (connection === 'open') {
        console.log('Conexão estabelecida com o WhatsApp!');
      }
    });

    // Lidar com eventos de mensagens recebidas
    sock.ev.on('messages.upsert', async (m) => {
      const message = m.messages[0];
      console.log('Mensagem recebida:', message);

      // Ignorar mensagens enviadas pelo próprio bot
      if (message.key.fromMe) {
        return;
      }

      // Extrair informações da mensagem
      const { text, sender } = message;

      // Processar mensagens de texto
      if (text) {
        // Verificar se a mensagem é um comando
        if (text.startsWith('!')) {
          // Processar comandos
          handleCommand(text, sock, sender);
        } else {
          // Processar mensagens normais
          handleMessage(text, sock, sender);
        }
      }
    });

    return sock;
  } catch (error) {
    console.error('Erro ao conectar ao WhatsApp:', error.message);
  }
}

// Função para processar comandos
async function handleCommand(command, sock, sender) {
  // Dividir o comando em partes
  const parts = command.split(' ');
  const cmd = parts[0].slice(1); // Remover o '!' do início

  switch (cmd) {
    case 'oi':
      await sock.sendMessage(sender, { text: 'Olá!' });
      break;
    case 'ping':
      await sock.sendMessage(sender, { text: 'Pong!' });
      break;
    // Adicionar outros comandos aqui...
    default:
      await sock.sendMessage(sender, { text: 'Comando inválido!' });
      break;
  }
}

// Função para processar mensagens normais
async function handleMessage(message, sock, sender) {
  // Processar mensagens normais
  await sock.sendMessage(sender, { text: `Você disse: ${message}` });
}

// Função principal
async function main() {
  try {
    const sock = await connectToWhatsapp();
    console.log('Bot conectado com sucesso!');
  } catch (error) {
    console.error('Erro no módulo principal:', error.message);
  }
}

main();
