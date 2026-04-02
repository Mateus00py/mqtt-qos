import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("PUB QoS0: conectado");
  let i = 20;

  const t = setInterval(() => {
    client.publish("estufa/temp/ambiente", `${i}`, { qos: 0 });
    console.log("Sensor 1 enviou Temperatura:", i);
    i++;

    if (i === 30) {
      clearInterval(t);
      client.end();
    }
  }, 5000);
});
