const questions = [
  {
    id: "b1_q1",
    type: "clave",
    text: "1. ¿Cómo visualiza tu situación actual?",
    options: [
      "Nada claro / Muy confuso.",
      "Poco claro / Incierto.",
      "Moderadamente claro / Neutro.",
      "Claro / Comprensible.",
      "Muy claro / Totalmente definido."
    ] },{
    id: "b1_q1_a1",
    type: "aleatoria",
    text: "2. ¿Cómo visualizas la situación o problema que estás viviendo?",
    options: [
      "Totalmente confusa, no logro entenderla.",
      "Bastante confusa, entiendo muy poco.",
      "Medianamente clara, con dudas.",
      "Clara en general, entiendo lo principal.",
      "Muy clara, sé exactamente lo que ocurre."
    ] },{
    id: "b1_q1_a2",
    type: "aleatoria",
    text: "3. ¿Lo que sientes en este momento es...?",
    options: [
      "Muy confuso e indescriptible.",
      "Poco claro, con malestar difuso.",
      "Medianamente claro a ratos.",
      "Claro y comprensible para mí.",
      "Muy claro y totalmente identificado."
    ] },{
    id: "b1_q1_a3",
    type: "aleatoria",
    text: "4. ¿Te sientes capaz de gestionar lo que estás pasando para sentirte mejor ahora?",
    options: [
      "Nada capaz, me siento sin control.",
      "Muy poco capaz, casi no puedo.",
      "Algo capaz, con esfuerzo.",
      "Bastante capaz, con algunos apoyos.",
      "Totalmente capaz y con estrategias claras."
    ] }, {
    id: "b1_q1_a4",
    type: "aleatoria",
    text: "5. ¿Tu forma de pensar crees que ha sido lo más difícil de manejar en este momento?",
    options: [
      "Sí, totalmente difícil y me sobrepasa.",
      "Sí, muy difícil de controlar.",
      "A veces difícil, otras manejable.",
      "Poco difícil, generalmente lo manejo.",
      "No, no es difícil de manejar."
    ] }, {
    id: "b1_q1_a5",
    type: "aleatoria",
    text: "6. ¿Hay algún pensamiento, idea o creencia que te haya ayudado antes en situaciones similares?",
    options: [
      "No, nunca he tenido ideas que me ayuden.",
      "Muy pocas y casi no funcionan.",
      "Algunas, con eficacia moderada.",
      "Varias que suelen ayudarme.",
      "Sí, varias y son muy efectivas para mí."
    ] },{
    id: "b1_q1_a6",
    type: "aleatoria",
    text: "7. ¿Ha podido hablar con alguna persona sobre lo que está pasando, hasta ahora?",
    options: [
      "No, me siento completamente aislado/a.",
      "Muy poco, con alguien lejano.",
      "Sí, con alguien pero de manera superficial.",
      "Sí, con alguien de confianza y me ayudó algo.",
      "Sí, con apoyo cercano y fue muy positivo."
    ] }, {
    id: "b1_q1_a7",
    type: "aleatoria",
    text: "8. ¿Cree que pensando de forma diferente que hasta ahora, podría sentirse un poco mejor?",
    options: [
      "No, nada cambiaría.",
      "Dudo que sirva.",
      "Tal vez, con ayuda.",
      "Sí, probablemente mejoraría.",
      "Sí, claramente me ayudaría bastante."
    ] }, {
    id: "b1_q1_a8",
    type: "aleatoria",
    text: "9. ¿Este situación o problema que le preocupa especialmente en este momento, es manejable para usted?",
    options: [
      "Nada manejable.",
      "Muy poco manejable.",
      "Medianamente manejable.",
      "Bastante manejable.",
      "Totalmente manejable."
    ] }, {
    id: "b1_q2",
    type: "clave",
    text: "10. ¿Qué siente?",
    options: [
      "Abrumado/a totalmente, sin control.",
      "Muy abrumado/a, me cuesta manejarlo.",
      "Medianamente abrumado/a, lo tolero a ratos.",
      "Algo abrumado/a, pero lo manejo.",
      "Tranquilo/a, con claridad emocional."
    ] }, {
    id: "b1_q2_a1",
    type: "aleatoria",
    text: "11. ¿Qué tan abrumado(a) se siente ahora?",
    options: [
      "Extremadamente abrumado/a.",
      "Muy abrumado/a.",
      "Moderadamente abrumado/a.",
      "Poco abrumado/a.",
      "Nada abrumado/a."
    ] },{
    id: "b1_q2_a2",
    type: "aleatoria",
    text: "12. ¿Qué tanto siente que puede manejar esta situación?",
    options: [
      "Nada, no puedo manejarla.",
      "Muy poco, me sobrepasa.",
      "A medias, con esfuerzo.",
      "Bastante, con algunos apoyos.",
      "Totalmente, tengo recursos suficientes."
    ] },{
    id: "b1_q2_a3",
    type: "aleatoria",
    text: "13. ¿Qué tan apoyado(a) se siente por otras personas?",
    options: [
      "Nada apoyado/a.",
      "Muy poco apoyado/a.",
      "Algo apoyado/a.",
      "Bastante apoyado/a.",
      "Muy apoyado/a por una red sólida."
    ] }, {
    id: "b1_q2_a4",
    type: "aleatoria",
    text: "14. ¿Qué tan clara tiene la idea de lo que necesita hacer a continuación?",
    options: [
      "Nada clara.",
      "Muy poco clara.",
      "Medianamente clara.",
      "Bastante clara.",
      "Totalmente clara y definida."
    ] }, {
    id: "b1_q2_a5",
    type: "aleatoria",
    text: "15. ¿Qué tan útil le resulta esta conversación hasta ahora?",
    options: [
      "Nada útil.",
      "Poco útil.",
      "Medianamente útil.",
      "Muy útil.",
      "Sumamente útil y orientadora."
    ] }, {
    id: "b1_q3",
    type: "clave",
    text: "16. ¿Qué necesita?",
    options: [
      "Ayuda urgente para no hacerme daño.",
      "Mucho apoyo; me siento en riesgo.",
      "Algo de apoyo; me siento inestable.",
      "Poco apoyo; puedo sostenerme.",
      "Estoy estable; no necesito apoyo adicional."
    ] },{
    id: "b1_q3_a1",
    type: "aleatoria",
    text: "17. ¿Ha tenido pensamientos de hacerse daño?",
    options: [
      "Sí, con plan definido.",
      "Sí, con intención.",
      "A veces, sin intención.",
      "Raramente, sin plan.",
      "No, en absoluto."
    ] }, {
    id: "b1_q3_a2",
    type: "aleatoria",
    text: "18. ¿Tiene una red de apoyo cercana (familiares, amigos)?",
    options: [
      "No tengo ninguna red.",
      "Muy limitada y poco disponible.",
      "Algunas personas, apoyo irregular.",
      "Buena red y disponible.",
      "Red sólida y confiable."
    ] },  {
    id: "b1_q3_a3",
    type: "aleatoria",
    text: "19. ¿Se siente en peligro en este momento?",
    options: [
      "Sí, peligro inminente.",
      "Sí, alto riesgo.",
      "Duda/posible riesgo moderado.",
      "No, riesgo bajo.",
      "No, me siento seguro/a."
    ]  }, {
    id: "b1_q3_a4",
    type: "aleatoria",
    text: "20. ¿Ha hablado con alguien sobre esta situación antes?",
    options: [
      "No, nunca.",
      "Muy poco, apenas lo mencioné.",
      "Sí, pero sin profundidad.",
      "Sí, con alguien de confianza.",
      "Sí, con apoyo profesional / cercano."
    ] }, {
    id: "b1_q3_a5",
    type: "aleatoria",
    text: "21. ¿Ha pasado por una situación similar anteriormente?",
    options: [
      "Sí, recientemente y fue peor.",
      "Sí, reciente y difícil.",
      "Sí, hace tiempo y fue moderado.",
      "Tal vez algo similar, manejable.",
      "No, nunca."
    ] },  {
    id: "b2_q1",
    type: "clave",
    text: "22. ¿Qué ocurrió? ¿Cómo se siente ahora?",
    options: [
      "Ocurrió algo muy grave; me siento desbordado/a.",
      "Ocurrió algo serio; me siento muy mal.",
      "Ocurrió algo importante; me afecta pero lo manejo a ratos.",
      "Ocurrió algo menor; me siento relativamente estable.",
      "No ocurrió nada grave; me siento tranquilo/a."
    ]  }, {
    id: "b2_q1_a1",
    type: "aleatoria",
    text: "23. ¿Para usted esta situación desencadenó un malestar emocional?",
    options: [
      "Sí, muy intenso e incapacitante.",
      "Sí, fuerte y difícil de manejar.",
      "Moderado, lo tolero a ratos.",
      "Leve y manejable.",
      "No generó malestar significativo."
    ]
  },
  {
    id: "b2_q1_a2",
    type: "aleatoria",
    text: "24. ¿La forma en que usted reaccionó en ese momento fue...?",
    options: [
      "Muy descontrolada e impulsiva.",
      "Bastante descontrolada.",
      "Neutral, con altibajos.",
      "Adecuada, pude controlarme.",
      "Muy adaptativa, con calma y claridad."
    ] }, {
    id: "b2_q1_a3",
    type: "aleatoria",
    text: "25. ¿Detectó usted señales previas que indicaran que esto podía ocurrir?",
    options: [
      "Sí, claras y las ignoré totalmente.",
      "Sí, algunas pero apenas las noté.",
      "Señales confusas / poco claras.",
      "Pocas señales, poco relevantes.",
      "No hubo señales previas perceptibles."
    ] }, {
    id: "b2_q2",
    type: "clave",
    text: "26. ¿Qué impacto tiene en su vida?",
    options: [
      "Impacto crítico, afecta todas las áreas.",
      "Impacto alto, afecta varias áreas importantes.",
      "Impacto moderado, afecta un área específica.",
      "Impacto bajo, apenas altera la rutina.",
      "Impacto nulo, no afecta mi vida."
    ] }, {
    id: "b2_q2_a1",
    type: "aleatoria",
    text: "27. ¿Cómo está afectando esta situación su rutina diaria?",
    options: [
      "La interrumpe por completo.",
      "Afecta la mayoría de actividades.",
      "Afecta algunas actividades.",
      "Afecta mínimamente.",
      "No afecta mi rutina."
    ] }, {
    id: "b2_q2_a2",
    type: "aleatoria",
    text: "28. ¿Las emociones (ira, tristeza, odio, asco) predominan en este momento?",
    options: [
      "Predominan muy intensamente.",
      "Predominan con frecuencia.",
      "Aparecen a ratos (moderadas).",
      "Pocas veces y leves.",
      "No predominan; están bajo control."
    ] }, {
    id: "b2_q2_a3",
    type: "aleatoria",
    text: "29. ¿Considera que tiene recursos personales o sociales con los que cuenta ahora?",
    options: [
      "No cuento con ningún recurso.",
      "Muy pocos recursos / apoyo limitado.",
      "Algunos recursos, insuficientes.",
      "Buenos recursos y apoyo disponible.",
      "Muchos recursos y red sólida."
    ] }, {
    id: "b2_q3",
    type: "clave",
    text: "30. ¿Qué riesgos enfrenta? ¿Qué necesita resolver ya?",
    options: [
      "Riesgos muy altos; urgencia inmediata.",
      "Riesgos altos; gran preocupación.",
      "Riesgos moderados; manejables con apoyo.",
      "Riesgos bajos; poca preocupación.",
      "Riesgos mínimos o inexistentes."
    ]
 },{
    id: "b2_q3_a1",
    type: "aleatoria",
    text: "31. ¿Las consecuencias que usted cree que puede tener esta situación si no se atiende pronto son…?",
    options: [
      "Muy graves e inmediatas.",
      "Graves y preocupantes.",
      "Moderadas pero manejables.",
      "Leves y poco preocupantes.",
      "Nulas o sin importancia real."
    ] }, {
    id: "b2_q3_a2",
    type: "aleatoria",
    text: "32. ¿Le preocupa mucho lo que pueda pasar en los próximos días frente a esta situación?",
    options: [
      "Me preocupa muchísimo, temo lo peor.",
      "Me preocupa bastante.",
      "Me preocupa moderadamente.",
      "Me preocupa poco.",
      "No me preocupa."
    ] }, {
    id: "b2_q3_a3",
    type: "aleatoria",
    text: "33. ¿Considera que tiene recursos o estrategias necesarias para sentirse más estable emocionalmente?",
    options: [
      "No tengo ninguna estrategia ni recurso.",
      "Muy pocas y poco efectivas.",
      "Algunas medianamente útiles.",
      "Varias que me ayudan bastante.",
      "Estrategias sólidas y efectivas."
    ] }, {
   id: "b3_q1",
    type: "clave",
    text: "34. ¿Qué ha intentado? ¿Qué podría intentar?",
    options: [
      "No he intentado nada; me siento bloqueado/a.",
      "Muy pocas cosas y casi no funcionaron.",
      "Algunas cosas, con resultados mixtos.",
      "Varias alternativas y algunas funcionaron.",
      "Estrategias efectivas con buenos resultados."
    ]  },  {
    id: "b3_q1_a1",
    type: "aleatoria",
    text: "35. ¿Qué estrategias ha usado antes en situaciones similares?",
    options: [
      "Ninguna; me siento sin recursos.",
      "Muy pocas y poco efectivas.",
      "Algunas con eficacia moderada.",
      "Varias útiles que ayudaron.",
      "Varias muy efectivas con buen resultado."
    ] }, {
    id: "b3_q1_a2",
    type: "aleatoria",
    text: "36. ¿Qué resultado obtuvo con lo que intentó?",
    options: [
      "Sin resultado o me hizo sentir peor.",
      "Funcionó muy poco.",
      "Ayudó de forma intermedia.",
      "Funcionó en gran parte.",
      "Funcionó muy bien y me sentí mejor."
    ] }, {
   id: "b3_q1_a3",
    type: "aleatoria",
    text: "37. ¿Qué aprendió de esas experiencias anteriores?",
    options: [
      "Nada útil.",
      "Muy poco y con dudas.",
      "Algunas cosas, no suficientes.",
      "Bastante y puedo aplicarlo.",
      "Mucho y sé aplicarlo ahora."
    ] },  {
    id: "b3_q2",
    type: "clave",
    text: "38. ¿Qué opciones tiene?",
    options: [
      "Ninguna opción clara.",
      "Muy pocas y poco viables.",
      "Algunas, pero no seguras.",
      "Varias útiles y viables.",
      "Muchas opciones claras y efectivas."
    ]  },  {
    id: "b3_q2_a1",
    type: "aleatoria",
    text: "39. ¿Qué cree que podría ayudarle en este momento?",
    options: [
      "No se me ocurre nada.",
      "Muy pocas opciones y poco viables.",
      "Algunas opciones con dudas.",
      "Varias opciones útiles.",
      "Opciones claras y efectivas."
    ] }, {
    id: "b3_q2_a2",
    type: "aleatoria",
    text: "40. ¿Qué personas o recursos podría contactar para apoyarse?",
    options: [
      "A nadie; no tengo red.",
      "Muy pocas personas; apoyo limitado.",
      "Algunas personas; apoyo irregular.",
      "Varias personas y recursos disponibles.",
      "Red sólida y confiable."
    ] }, {
   id: "b3_q2_a3",
    type: "aleatoria",
    text: "41. ¿Qué cambios pequeños podría hacer hoy para sentirse mejor?",
    options: [
      "Ninguno; no puedo cambiar nada.",
      "Muy pocos y poco efectivos.",
      "Algunos cambios moderados.",
      "Varios cambios útiles hoy mismo.",
      "Cambios claros y muy efectivos de inmediato."
    ] },  {
    id: "b3_q3",
    type: "clave",
    text: "42. ¿Qué ventajas y desventajas ve?",
    options: [
      "Solo veo desventajas; nada positivo.",
      "Más desventajas que ventajas.",
      "Ventajas y desventajas equilibradas.",
      "Más ventajas que desventajas.",
      "Principalmente ventajas claras y beneficiosas."
    ] },  {
    id: "b3_q3_a1",
    type: "aleatoria",
    text: "43. ¿Cuál de estas opciones le parece más viable ahora?",
    options: [
      "Ninguna opción viable.",
      "Muy pocas viables.",
      "Algunas medianamente viables.",
      "Varias bastante viables.",
      "Opciones muy viables y claras."
    ] }, {
    id: "b3_q3_a2",
    type: "aleatoria",
    text: "44. ¿Qué obstáculos podría enfrentar al intentar esa opción?",
    options: [
      "Obstáculos insuperables.",
      "Muchos obstáculos difíciles.",
      "Algunos obstáculos manejables.",
      "Obstáculos menores y controlables.",
      "Sin obstáculos significativos."
    ] }, {
    id: "b3_q3_a3",
    type: "aleatoria",
    text: "45. ¿Qué beneficios espera obtener si toma esa decisión?",
    options: [
      "Ningún beneficio; nada cambiará.",
      "Beneficios pequeños y limitados.",
      "Algunos beneficios moderados.",
      "Beneficios claros y útiles.",
      "Beneficios muy significativos y positivos."
    ] } ];
export default questions;