const axios = require('axios');

const API_URL = "https://graph.facebook.com/v17.0/704474666080348/messages";
const ACCESS_TOKEN = "EAA6LPWX7pwEBO5ZAWXZAt9LdV3wFH6fM26Rn3cbIiGmz27XtU1XO3Jkm98gvGNfV3oYThLw6vAqguONoJQ0diD8pIxe1PjYuiIsYYHC6sBZCBLuJJfC4ZAbZCzwZAygZChO2QHcVOUoVUbfvYZAx88dyWKWNTUk0Q293Oag2OGDP1OurZBiQ2wCoiTd3EEejFxwPcUAZDZD";

async function sendWhatsappTemplate(toNumber) {
  try {
    const response = await axios.post(
      API_URL,
      {
        messaging_product: "whatsapp",
        to: toNumber,
        type: "template",
        template: {
          name: "recordatorio_de_cita",
          language: { code: "es_MX" },
          components: [
            {
              type: "button",
              sub_type: "quick_reply",
              index: "0",
              parameters: [{ type: "payload", payload: "confirmar" }]
            },
            {
              type: "button",
              sub_type: "quick_reply",
              index: "1",
              parameters: [{ type: "payload", payload: "cancelar" }]
            },
            {
              type: "button",
              sub_type: "phone_number",
              index: "2",
              parameters: [{ type: "text", text: "5214612523315" }]
            }
          ]
        }
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ Enviado:", response.data);
  } catch (error) {
    console.error("❌ Error al enviar:", error.response?.data || error.message);
  }
}

module.exports = sendWhatsappTemplate;
