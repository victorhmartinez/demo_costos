async function analizarCostos() {

document.getElementById("respuesta").innerHTML = `
  <div class="text-gray-600 animate-pulse">⏳ Analizando costos con IA...</div>
`;
  // Obtener ubicación desde la sección de información
  const ubicacion = document.getElementById('cafe-location').value || "Zona no especificada";

  // Recopilar costos dinámicos
  const items = document.querySelectorAll('#cost-items-container .cost-item');
  let listaCostos = "";
  items.forEach(item => {
    const nombre = item.querySelector('.cost-name')?.value?.trim();
    const monto = item.querySelector('.cost-amount')?.value?.trim();
    if (nombre && monto) {
      listaCostos += `${nombre}: $${monto}\n`;
    }
  });

  const prompt = `Rol: Actúa como un asesor financiero de élite y analista de riesgos, especializado en la rentabilidad y optimización de costos para cafeterías en Quito, Ecuador. Tu análisis debe ser preciso, práctico y basado en datos del mercado local.
Contexto: Soy un emprendedor con una cafetería en Quito y necesito un diagnóstico financiero experto. Te proporcionaré la ubicación exacta y mi lista de costos fijos mensuales. Tu misión es auditar estos números, identificar puntos ciegos en mi presupuesto y alertarme sobre los riesgos operativos y financieros que estoy corriendo.
Información del Negocio:
Ubicación (Zona/Barrio en Quito):${ubicacion}
Costos Fijos Mensuales Identificados:
${listaCostos}
Tarea:
Basado en los costos y la ubicación proporcionada, realiza el siguiente diagnóstico en cuatro pasos:
Análisis Comparativo de Costos: Evalúa cada costo que te proporcioné. Compáralo con los rangos de mercado específicos para la zona de Quito indicada. Para el campo evaluacion, tu respuesta debe ser estrictamente "Dentro del rango" o "Fuera del rango". Toda la justificación, el análisis cualitativo y el porqué de la evaluación deben ir exclusivamente en el campo comentario_evaluacion.
Identificación de Costos Fijos Omitidos: Determina qué costos fijos críticos no están en la lista. Para cada uno, describe su importancia estratégica para la sostenibilidad del negocio.
Análisis de Riesgos por Omisión: Con base en los costos que faltan, detalla los riesgos específicos que la cafetería está corriendo. Para cada riesgo, indica su causa directa (el costo omitido) y el impacto potencial en la operación o finanzas del negocio.
Plan de Acción y Recomendaciones: Proporciona tres recomendaciones accionables y priorizadas. Cada recomendación debe ser una acción clara para mitigar un riesgo detectado o para optimizar un costo que evaluaste como "Fuera del rango".
Formato de Respuesta:
Tu respuesta debe ser únicamente un objeto JSON que siga estrictamente la siguiente estructura. No incluyas ningún texto introductorio, explicaciones o conclusiones fuera del formato JSON.

[
  "analisis_costos_recibidos": {
    "alquiler": {
      "valor_recibido": "$800",
      "rango_estimado_zona_especifica": "$900 - $1800 (para La Carolina)",
      "evaluacion": "Fuera del rango",
      "comentario_evaluacion": "El valor está por debajo del rango de mercado para La Carolina. Esto representa una ventaja competitiva significativa, pero es crucial asegurar que el contrato de arrendamiento sea estable a largo plazo."
    },
    "sueldos_personal": {
      "valor_recibido": "$1100",
      "rango_estimado_zona_especifica": "$1100 - $1800 (para 2 empleados)",
      "evaluacion": "Dentro del rango",
      "comentario_evaluacion": "El valor se encuentra en el límite inferior del rango para dos empleados, cumpliendo con los requisitos legales básicos. La eficiencia y la retención del personal son factores clave a monitorear con este presupuesto."
    },
    "servicios_basicos": {
      "valor_recibido": "$700",
      "rango_estimado_zona_especifica": "$250 - $500",
      "evaluacion": "Fuera del rango",
      "comentario_evaluacion": "El costo excede significativamente el límite superior del rango esperado. Esto es una señal de alerta máxima que apunta a una fuga de capital, probablemente por equipos muy ineficientes, una fuga de agua no detectada o una tarifa eléctrica incorrecta."
    }
  },
  "costos_fijos_omitidos_criticos": [
    {
      "costo": "Software de Punto de Venta (POS) y Contabilidad",
      "importancia": "Esencial para el control de inventario, gestión de ventas y cumplimiento obligatorio de la facturación electrónica con el SRI. Su ausencia causa ineficiencia y riesgo de multas."
    },
    {
      "costo": "Mantenimiento Preventivo de Equipos",
      "importancia": "Asegura la continuidad operativa del negocio. Previene gastos de reparación de emergencia que son hasta 10 veces más caros y evitan la pérdida de ventas por paradas inesperadas."
    }
  ],
  "riesgos_detectados": [
    {
      "riesgo": "Fuga de Capital Crítica y Descontrol Financiero",
      "causa_directa": "Costo de servicios básicos fuera de rango y ausencia de un sistema POS.",
      "impacto_potencial": "Pérdida mensual significativa de dinero por un problema no identificado. Sin un POS, es imposible rastrear ventas e inventario, lo que puede ocultar mermas o robos, llevando a un déficit financiero acelerado."
    },
    {
      "riesgo": "Parada Operativa Súbita y Pérdida de Ingresos",
      "causa_directa": "Ausencia de un presupuesto de mantenimiento preventivo.",
      "impacto_potencial": "Una falla en la máquina de espresso puede detener las ventas por días, generando pérdida de ingresos directos, daño a la reputación y costos de reparación de emergencia muy elevados."
    }
  ],
  "plan_de_accion_recomendado": [
    {
      "titulo": "Auditoría de Emergencia de Servicios Básicos",
      "descripcion": "Acción Inmediata: Realizar una revisión exhaustiva del consumo de electricidad y agua ya que su costo está 'Fuera del rango'. Contactar a la Empresa Eléctrica para verificar tarifas y al proveedor de internet para optimizar el plan. Es prioritario encontrar la causa del alto gasto para detener la fuga de dinero.",
      "prioridad": "Crítica"
    },
    {
      "titulo": "Implementar un Sistema de Control y Prevención",
      "descripcion": "Contratar un software de punto de venta (POS) para mitigar el riesgo de descontrol financiero. Asignar un 1.5% de las ventas a un fondo para mantenimiento preventivo y así reducir el riesgo de parada operativa.",
      "prioridad": "Alta"
    },
    {
      "titulo": "Aprovechar la Ventaja Competitiva del Alquiler",
      "descripcion": "Dado que el alquiler está 'Fuera del rango' (a su favor), intente negociar una extensión del contrato a largo plazo para asegurar esta ventaja. El ahorro mensual obtenido aquí puede ser redirigido para cubrir los costos omitidos, como el marketing o el seguro del negocio.",
      "prioridad": "Media"
    }
  ]
]`;
console.log(prompt);

  document.getElementById("respuesta").innerHTML = "⏳ Consultando IA...";

  try {

    const res = await fetch("http://localhost:4000/analizar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    console.log(data)
const content = data.respuesta

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
  console.log("Se va renderizar");
  const contenedor = document.getElementById("respuesta");
  contenedor.innerHTML = "";

  const analisis = data["analisis_costos_recibidos"];
  const omitidos = data["costos_fijos_omitidos_criticos"];
  const riesgos = data["riesgos_detectados"];
  const acciones = data["plan_de_accion_recomendado"];

  // 1. Análisis Comparativo de Costos
  contenedor.innerHTML += `
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-3">📊 Análisis Comparativo de Costos</h2>
      <div class="grid gap-4">
        ${Object.entries(analisis).map(([nombre, detalle]) => `
          <div class="bg-white p-4 rounded-lg shadow border">
            <h3 class="font-semibold text-blue-800">${nombre}</h3>
            <p><strong>Valor recibido:</strong> ${detalle.valor_recibido}</p>
            <p><strong>Rango estimado:</strong> ${detalle.rango_estimado_zona_especifica}</p>
            <p><strong>Evaluación:</strong> <span class="${detalle.evaluacion === 'Dentro del rango' ? 'text-green-600' : 'text-red-600'}">${detalle.evaluacion}</span></p>
            <p class="text-gray-700 text-sm mt-1"><strong>Comentario:</strong> ${detalle.comentario_evaluacion}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // 2. Costos Fijos Omitidos Críticos
  contenedor.innerHTML += `
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-3">⚠️ Costos Fijos Omitidos Críticos</h2>
      <ul class="space-y-3">
        ${omitidos.map(item => `
          <li class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p><strong>${item.costo}:</strong> ${item.importancia}</p>
          </li>
        `).join('')}
      </ul>
    </div>
  `;

  // 3. Riesgos Detectados
  contenedor.innerHTML += `
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-3">🚨 Riesgos Detectados</h2>
      <div class="space-y-4">
        ${riesgos.map(r => `
          <div class="bg-red-50 p-4 border-l-4 border-red-500 rounded">
            <h3 class="font-semibold text-red-800">${r.riesgo}</h3>
            <p><strong>Causa directa:</strong> ${r.causa_directa}</p>
            <p><strong>Impacto potencial:</strong> ${r.impacto_potencial}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // 4. Plan de Acción
  contenedor.innerHTML += `
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-3">✅ Plan de Acción Recomendado</h2>
      <div class="grid gap-4">
        ${acciones.map(a => `
          <div class="bg-green-50 border border-green-200 p-4 rounded-lg shadow">
            <h3 class="font-semibold text-green-800">📌 ${a.titulo}</h3>
            <p>${a.descripcion}</p>
            <div class="mt-2 text-sm text-gray-600"><strong>Prioridad:</strong> ${a.prioridad}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
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
