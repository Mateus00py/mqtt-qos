import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("PUB conectado");

  let nivelFumaca = 0;

  // Simula o sensor checando a fumaça a cada 1 segundo
  const simularSensor = setInterval(() => {
    nivelFumaca++;
    console.log(`Nível de fumaça detectado: ${nivelFumaca}`);

    // Quando a fumaça chega no nível 5, dispara o alerta
    if (nivelFumaca >= 5) {
      clearInterval(simularSensor); // Para o contador
      const msg = "ALERTA CRÍTICO: Incêndio Detectado na Estufa!";
      
      // Publicando com QoS 2 (Exatamente uma vez)
      client.publish("estufa/alerta/incendio", msg, { qos: 2 }, () => {
        console.log("PUB enviou de forma segura:", msg);
        client.end(); // Finaliza após o alerta ser confirmado
      });
    }
  }, 1000); 
});
