async function analizarCostos() {
  const alquiler = document.getElementById('alquiler').value;
  const sueldos = document.getElementById('sueldos').value;
  const servicios = document.getElementById('servicios').value;

const prompt = `Actúa como un asesor financiero experto en cafeterías ubicadas en Quito, Ecuador.

Te presento los costos fijos mensuales de una cafetería:
- Alquiler mensual: $${alquiler}
- Sueldos del personal: $${sueldos}
- Servicios básicos (agua, luz, internet, etc.): $${servicios}

Tu tarea es:
Dar 3 recomendaciones concretas y aplicables para reducir o hacer más eficientes estos costos.
 Para cada recomendación, incluye:
- "prioridad": Alta / Media / Baja
- "aspecto": A qué se refiere (ej. alquiler, sueldos, etc.)
- "ahorro": Estimado aproximado en dólares
- "explicacion": Explicación breve y clara (1 o 2 frases), como si hablaras con un emprendedor que recién empieza en Quito.
- "descripcion:" Debe ser una explicacion un poco mas profunda pero mas larga con la finalidad que de un mejor entendimiento de la explicacion

La respuesta debe estar en formato JSON, como un **array de objetos**, así:

[
  {
    "prioridad": "Alta",
    "aspecto": "Alquiler",
    "ahorro": "150",
    "explicacion": "Negocia una reducción de renta con el arrendador.",
    "descripcion": "Al renegociar tu contrato de arriendo o buscar un local con menor costo en la misma zona, puedes reducir significativamente uno de tus mayores gastos mensuales. Considera compartir el espacio con otro emprendimiento."
  },
  ...
]`;


  document.getElementById("respuesta").innerHTML = "⏳ Consultando IA...";

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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",
        "HTTP-Referer": "https://tusitio.com",
        "X-Title": "AnalisisCostosFijos"
      },
      body: JSON.stringify({
        model: "mistralai/mixtral-8x7b-instruct",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5
      })
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Respuesta inválida de la IA.");
    }

    // Limpiamos la cadena en caso de que venga como string JSON
    let recomendaciones = content;

    // Intenta parsear directamente
    try {
      recomendaciones = JSON.parse(content);
    } catch (e) {
      // Si viene con markdown o código, intenta extraer entre ```json ``` o ``` 
      const match = content.match(/```(?:json)?([\s\S]*?)```/);
      if (match) {
        recomendaciones = JSON.parse(match[1].trim());
      } else {
        throw new Error("No se pudo extraer JSON correctamente.");
      }
    }

    // Generar las tarjetas dinámicamente
    renderizarRecomendaciones(recomendaciones);
  } catch (error) {
    console.error("Error al consultar IA:", error);
    document.getElementById("respuesta").innerHTML = "❌ Error al conectar con la IA.";
  }
}

function renderizarRecomendaciones(data) {
  const contenedor = document.getElementById("respuesta");
  contenedor.innerHTML = "<p><strong>Recomendaciones con IA</strong></p>";
console.log(data)
  data.forEach((reco, index) => {
    const prioridadClase = reco.prioridad.toLowerCase(); // alta, media, baja

    const cardHTML = `
      <div class="card">
        <h3><span class="icon">📌</span> ${reco.aspecto}</h3>
        <div class="info">${reco.explicacion}</div>
        <div class="tags">
          <div class="prioridad ${prioridadClase}">Prioridad ${reco.prioridad}</div>
          <div class="ahorro">Ahorra ${reco.ahorro} US$/mes</div>
        </div>
        <button class="btn-toggle" onclick="toggleDetalle(this)">Saber Más</button>
        <div class="detalle">${reco.descripcion}</div>
      </div>
    `;

    contenedor.innerHTML += cardHTML;
  });
}

function toggleDetalle(btn) {
  const detalle = btn.nextElementSibling;
  if (detalle.style.display === "none" || detalle.style.display === "") {
    detalle.style.display = "block";
    btn.textContent = "Ocultar";
  } else {
    detalle.style.display = "none";
    btn.textContent = "Saber Más";
  }
}
