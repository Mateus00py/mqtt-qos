import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("PUB QoS1: conectado");
  let i = 0;

  const t = setInterval(() => {
    client.publish("estufa/agua/nivel", `msg ${i} (QoS1)`, { qos: 1 });
    console.log("Sensor 2 enviou nível de reservatório:", i);
    i++;

    if (i === 10) {
      clearInterval(t);
      client.end();
    }
  }, 30000);
});
