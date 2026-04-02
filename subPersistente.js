import mqtt from "mqtt";

// O uso de clientId fixo e clean: false cria uma "Sessão Persistente".
// Isso garante que se o SUB cair, o broker guarda a mensagem QoS 1/2 para ele.
const client = mqtt.connect("mqtt://localhost:1883", {
  clientId: "sub-qos2-incendio",
  clean: false // 🔥 ESSENCIAL
});

const recebidas = new Set();

client.on("connect", () => {
  console.log("SUB conectado");

  // Inscreve no tópico do sensor 3 com QoS 2
  client.subscribe("estufa/alerta/incendio", { qos: 2 }, () => {
    console.log("SUB inscrito no tópico 'estufa/alerta/incendio' com QoS 2");
  });
});

client.on("message", (topic, msg) => {
  const mensagem = msg.toString();

  // Verificação em código como "camada extra" de segurança, 
  // embora o QoS 2 já cuide de evitar duplicações de rede.
  if (recebidas.has(mensagem)) {
    console.log("❌ MENSAGEM DUPLICADA IGNORADA:", mensagem);
  } else {
    recebidas.add(mensagem);
    console.log("✅ RECEBIDA COM SUCESSO:", mensagem);
    console.log("💧 ATIVANDO SISTEMA DE EXTINÇÃO AUTOMÁTICA!");
  }
});