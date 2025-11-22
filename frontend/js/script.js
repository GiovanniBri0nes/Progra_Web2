const totalTargets = 108;
const container = document.getElementById("targets-container");

for (let i = 0; i < totalTargets; i++) {
  const entity = document.createElement("a-entity");
  entity.setAttribute("mindar-image-target", `targetIndex: ${i}`);

   //ARG
  if (i >= 0 && i <= 5) {
    const modelAR = document.createElement("a-gltf-model");
    modelAR.setAttribute("src", "modelos/Argentina/argentina.glb");
    modelAR.setAttribute("position", "0 0.2 0");
    modelAR.setAttribute("scale", ".3 .3 .3");
    modelAR.setAttribute("rotation", "0 0 0");
     modelAR.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear");

    const textAR = document.createElement("a-text");
    textAR.setAttribute("font", "https://cdn.aframe.io/fonts/mozillavr.fnt");
    textAR.setAttribute("value", "Argentina ha sido campeon 3 veces de la Copa del Mundo (1978, 1986, 2022).");
    textAR.setAttribute("align", "center");
    textAR.setAttribute("scale", "0.2 0.2 0.2");
    textAR.setAttribute("position", "0 -0.4 0");

    entity.appendChild(modelAR);
    entity.appendChild(textAR);
    if (container) container.appendChild(entity);
  }
  //AUS
  else if (i>=6 && i<=11) {
    const modelAUS = document.createElement("a-gltf-model");
    modelAUS.setAttribute("src", "modelos/Australia/australia.glb");
    modelAUS.setAttribute("position", "0 0.2 0");
    modelAUS.setAttribute("scale", ".3 .3 .3");
    modelAUS.setAttribute("rotation", "0 0 0");
    modelAUS.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear");

    const textAUS = document.createElement("a-text");
    textAUS.setAttribute("font", "https://cdn.aframe.io/fonts/mozillavr.fnt");
    textAUS.setAttribute("value", "En 2006 Australia consiguio su primera victoria en un mundial contra Japon.");
    textAUS.setAttribute("align", "center");
    textAUS.setAttribute("scale", "0.2 0.2 0.2");
    textAUS.setAttribute("position", "0 -0.4 0");

    entity.appendChild(modelAUS);
    entity.appendChild(textAUS);
    if (container) container.appendChild(entity);
  }
  //BRA
  else if (i>=12 && i<=17) {
    const modelBRA = document.createElement("a-gltf-model");
    modelBRA.setAttribute("src", "modelos/Brasil/brasil.glb");
    modelBRA.setAttribute("position", "0 0.2 0");
    modelBRA.setAttribute("scale", ".3 .3 .3");
    modelBRA.setAttribute("rotation", "0 0 0");
    modelBRA.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear");

    const textBRA = document.createElement("a-text");
    textBRA.setAttribute("font", "https://cdn.aframe.io/fonts/mozillavr.fnt");
    textBRA.setAttribute("value", "Brasil ha ganado 5 Copas del Mundo (1958, 1962, 1970, 1994, 2002).");
    textBRA.setAttribute("align", "center");
    textBRA.setAttribute("scale", "0.2 0.2 0.2");
    textBRA.setAttribute("position", "0 -0.4 0");

    entity.appendChild(modelBRA);
    entity.appendChild(textBRA);
    if (container) container.appendChild(entity);
  }
  //CAN
  else if (i>=18 && i<=23) {
    const modelCAN = document.createElement("a-gltf-model");
    modelCAN.setAttribute("src", "modelos/Canada/canada.glb");
    modelCAN.setAttribute("position", "0 0.2 0");
    modelCAN.setAttribute("scale", ".3 .3 .3");
    modelCAN.setAttribute("rotation", "0 0 0");
    modelCAN.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear");

    const textCAN = document.createElement("a-text");
    textCAN.setAttribute("font", "https://cdn.aframe.io/fonts/mozillavr.fnt");
    textCAN.setAttribute("value", "Tras estar 36 años con ausencia en mundiales, Canadá volvio a participar en Qatar 2022.");
    textCAN.setAttribute("align", "center");
    textCAN.setAttribute("scale", "0.2 0.2 0.2");
    textCAN.setAttribute("position", "0 -0.4 0");

    entity.appendChild(modelCAN);
    entity.appendChild(textCAN);
    if (container) container.appendChild(entity);
  }
  //COL
  else if (i>=24 && i<=29) {
    const modelCOL = document.createElement("a-gltf-model");
    modelCOL.setAttribute("src", "modelos/Colombia/colombia.glb");
    modelCOL.setAttribute("position", "0 0.2 0");
    modelCOL.setAttribute("scale", ".3 .3 .3");
    modelCOL.setAttribute("rotation", "0 0 0");
    modelCOL.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear");

    const textCOL = document.createElement("a-text");
    textCOL.setAttribute("font", "https://cdn.aframe.io/fonts/mozillavr.fnt");
    textCOL.setAttribute("value", "James Rodríguez fue el maximo goleador de Colombia en 2014.");
    textCOL.setAttribute("align", "center");
    textCOL.setAttribute("scale", "0.2 0.2 0.2");
    textCOL.setAttribute("position", "0 -0.4 0");

    entity.appendChild(modelCOL);
    entity.appendChild(textCOL);
    if (container) container.appendChild(entity);
  }
  //COR
  else if (i>=30 && i<=35) {
    const modelCOR = document.createElement("a-gltf-model");
    modelCOR.setAttribute("src", "modelos/Corea del sur/coreadelsur.glb");
    modelCOR.setAttribute("position", "0 0.2 0");
    modelCOR.setAttribute("scale", ".3 .3 .3");
    modelCOR.setAttribute("rotation", "0 0 0"); 
    modelCOR.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear");

    const textCOR = document.createElement("a-text");
    textCOR.setAttribute("font", "https://cdn.aframe.io/fonts/mozillavr.fnt");
    textCOR.setAttribute("value", "Corea del Sur alcanzo las semifinales en el Mundial de 2002.");
    textCOR.setAttribute("align", "center");
    textCOR.setAttribute("scale", "0.2 0.2 0.2");
    textCOR.setAttribute("position", "0 -0.4 0");

    entity.appendChild(modelCOR);
    entity.appendChild(textCOR);
    if (container) container.appendChild(entity);
  }
  //ECU
  else if (i>=36 && i<=41) {
    const modelECU = document.createElement("a-gltf-model");
    modelECU.setAttribute("src", "modelos/Ecuador/ecuador_anim.glb");
    modelECU.setAttribute("position", "0 0.2 0");
    modelECU.setAttribute("scale", ".3 .3 .3");
    modelECU.setAttribute("rotation", "0 0 0");
    modelECU.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear");

    const textECU = document.createElement("a-text");
    textECU.setAttribute("font", "https://cdn.aframe.io/fonts/mozillavr.fnt");
    textECU.setAttribute("value", "La primera vez que Ecuador clasificó a un Mundial fue en Francia 1998.");
    textECU.setAttribute("align", "center");
    textECU.setAttribute("scale", "0.2 0.2 0.2");
    textECU.setAttribute("position", "0 -0.4 0");

    entity.appendChild(modelECU);
    entity.appendChild(textECU);
    if (container) container.appendChild(entity);
  }
  //USA
  else if (i>=42 && i<=47) {
    const modelUSA = document.createElement("a-gltf-model");
    modelUSA.setAttribute("src", "modelos/Estados unidos/eu.glb");
    modelUSA.setAttribute("position", "0 0.2 0");
    modelUSA.setAttribute("scale", ".3 .3 .3");
    modelUSA.setAttribute("rotation", "0 0 0");
    modelUSA.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear");

    const textUSA = document.createElement("a-text");
    textUSA.setAttribute("font", "https://cdn.aframe.io/fonts/mozillavr.fnt");
    textUSA.setAttribute("value", "Estados Unidos fue sede del Mundial en 1994.");
    textUSA.setAttribute("align", "center");
    textUSA.setAttribute("scale", "0.2 0.2 0.2");
    textUSA.setAttribute("position", "0 -0.4 0");

    entity.appendChild(modelUSA);
    entity.appendChild(textUSA);
    if (container) container.appendChild(entity);
  }
  //JPN
  else if (i>=48 && i<=53) {
    const modelJPN = document.createElement("a-gltf-model");  
    modelJPN.setAttribute("src", "modelos/Japon/japon.glb");
    modelJPN.setAttribute("position", "0 0.2 0");
    modelJPN.setAttribute("scale", ".3 .3 .3");
    modelJPN.setAttribute("rotation", "0 0 0");
    modelJPN.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear");

    const textJPN = document.createElement("a-text");
    textJPN.setAttribute("font", "https://cdn.aframe.io/fonts/mozillavr.fnt");
    textJPN.setAttribute("value", "Japón coorganizo el Mundial de 2002 junto a Corea del Sur.");
    textJPN.setAttribute("align", "center");
    textJPN.setAttribute("scale", "0.2 0.2 0.2");
    textJPN.setAttribute("position", "0 -0.4 0");

    entity.appendChild(modelJPN);
    entity.appendChild(textJPN);
    if (container) container.appendChild(entity);
  }
  //JRD
  else if (i>=54 && i<=59) {
    const modelJRD = document.createElement("a-gltf-model");
    modelJRD.setAttribute("src", "modelos/Jordania/jrd.glb");
    modelJRD.setAttribute("position", "0 0.2 0");
    modelJRD.setAttribute("scale", ".3 .3 .3");
    modelJRD.setAttribute("rotation", "0 0 0");
    modelJRD.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear");

    const textJRD = document.createElement("a-text");
    textJRD.setAttribute("font", "https://cdn.aframe.io/fonts/mozillavr.fnt");
    textJRD.setAttribute("value", "Jordania nunca ha clasificado a una Copa del Mundo.");
    textJRD.setAttribute("align", "center");
    textJRD.setAttribute("scale", "0.2 0.2 0.2");
    textJRD.setAttribute("position", "0 -0.4 0");

    entity.appendChild(modelJRD);
    entity.appendChild(textJRD);
    if (container) container.appendChild(entity);
  }
  //MAR
  else if (i>=60 && i<=65) {
    const modelMAR = document.createElement("a-gltf-model");
    modelMAR.setAttribute("src", "modelos/Marruecos/marr.glb");
    modelMAR.setAttribute("position", "0 0.2 0");
    modelMAR.setAttribute("scale", ".3 .3 .3");
    modelMAR.setAttribute("rotation", "0 0 0");
    modelMAR.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear");

    const textMAR = document.createElement("a-text");
    textMAR.setAttribute("font", "https://cdn.aframe.io/fonts/mozillavr.fnt");
    textMAR.setAttribute("value", "Marruecos fue el primer pais africano en llegar a semifinales en 1998.");
    textMAR.setAttribute("align", "center");
    textMAR.setAttribute("scale", "0.2 0.2 0.2");
    textMAR.setAttribute("position", "0 -0.4 0");

    entity.appendChild(modelMAR);
    entity.appendChild(textMAR);
    if (container) container.appendChild(entity);
  }
  //MEX
  else if (i>=66 && i<=71) {
    const modelMEX = document.createElement("a-gltf-model");
    modelMEX.setAttribute("src", "modelos/Mexico/mex.glb");
    modelMEX.setAttribute("position", "0 0.2 0");
    modelMEX.setAttribute("scale", ".3 .3 .3");
    modelMEX.setAttribute("rotation", "0 0 0");
    modelMEX.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear");

    const textMEX = document.createElement("a-text");
    textMEX.setAttribute("font", "https://cdn.aframe.io/fonts/mozillavr.fnt");
    textMEX.setAttribute("value", "Mexico ha sido sede de la Copa del Mundo en 1970, 1986 y 2026.");
    textMEX.setAttribute("align", "center");
    textMEX.setAttribute("scale", "0.2 0.2 0.2");
    textMEX.setAttribute("position", "0 -0.4 0");

    entity.appendChild(modelMEX);
    entity.appendChild(textMEX);
    if (container) container.appendChild(entity);
  }
  //NZL
  else if (i>=72 && i<=77) {
    const modelNZL = document.createElement("a-gltf-model");
    modelNZL.setAttribute("src", "modelos/Nueva zelanda/nzl.glb");
    modelNZL.setAttribute("position", "0 0.2 0");
    modelNZL.setAttribute("scale", ".3 .3 .3");
    modelNZL.setAttribute("rotation", "0 0 0");
    modelNZL.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear");

    const textNZL = document.createElement("a-text");
    textNZL.setAttribute("font", "https://cdn.aframe.io/fonts/mozillavr.fnt");
    textNZL.setAttribute("value", "En 2010 Nueva Zelanda se mantuvo invicta pero no paso de fase de grupos.");
    textNZL.setAttribute("align", "center");
    textNZL.setAttribute("scale", "0.2 0.2 0.2");
    textNZL.setAttribute("position", "0 -0.4 0");

    entity.appendChild(modelNZL);
    entity.appendChild(textNZL);
    if (container) container.appendChild(entity);
  }
  //PAR
  else if (i>=78 && i<=83) {
    const modelPAR = document.createElement("a-gltf-model");
    modelPAR.setAttribute("src", "modelos/Paraguay/prgy.glb");
    modelPAR.setAttribute("position", "0 0.2 0");
    modelPAR.setAttribute("scale", ".3 .3 .3");
    modelPAR.setAttribute("rotation", "0 0 0");
    modelPAR.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear");

    const textPAR = document.createElement("a-text");
    textPAR.setAttribute("font", "https://cdn.aframe.io/fonts/mozillavr.fnt");
    textPAR.setAttribute("value", "En 2010 Paraguay llego a los cuartos de final por primera vez.");
    textPAR.setAttribute("align", "center");
    textPAR.setAttribute("scale", "0.2 0.2 0.2");
    textPAR.setAttribute("position", "0 -0.4 0");

    entity.appendChild(modelPAR);
    entity.appendChild(textPAR);
    if (container) container.appendChild(entity);
  }
  //RII
  else if (i>=84 && i<=89) {
    const modelRII = document.createElement("a-gltf-model");
    modelRII.setAttribute("src", "modelos/RII/rii.glb");
    modelRII.setAttribute("position", "0 0.2 0");
    modelRII.setAttribute("scale", ".3 .3 .3");
    modelRII.setAttribute("rotation", "0 0 0");
    modelRII.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear");

    const textRII = document.createElement("a-text");
    textRII.setAttribute("font", "https://cdn.aframe.io/fonts/mozillavr.fnt");
    textRII.setAttribute("value", "Iran ha participado 7 veces en Copas del Mundo.");
    textRII.setAttribute("align", "center");
    textRII.setAttribute("scale", "0.2 0.2 0.2");
    textRII.setAttribute("position", "0 -0.4 0");

    entity.appendChild(modelRII);
    entity.appendChild(textRII);
    if (container) container.appendChild(entity);
  }
  //TUN
  else if (i>=90 && i<=95) {
    const modelTUN = document.createElement("a-gltf-model");
    modelTUN.setAttribute("src", "modelos/Túnez/tun.glb");
    modelTUN.setAttribute("position", "0 0.2 0");
    modelTUN.setAttribute("scale", ".3 .3 .3");
    modelTUN.setAttribute("rotation", "0 0 0");
    modelTUN.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear");

    const textTUN = document.createElement("a-text");
    textTUN.setAttribute("font", "https://cdn.aframe.io/fonts/mozillavr.fnt");
    textTUN.setAttribute("value", "Tunez fue la primera seleccion africana en ganar un partido en un Mundial (1978).");
    textTUN.setAttribute("align", "center");
    textTUN.setAttribute("scale", "0.2 0.2 0.2");
    textTUN.setAttribute("position", "0 -0.4 0");

    entity.appendChild(modelTUN);
    entity.appendChild(textTUN);
    if (container) container.appendChild(entity);
  }
  //URU
  else if (i>=96 && i<=101) {
    const modelURU = document.createElement("a-gltf-model");
    modelURU.setAttribute("src", "modelos/Uruguay/uru.glb");
    modelURU.setAttribute("position", "0 0.2 0");
    modelURU.setAttribute("scale", ".3 .3 .3");
    modelURU.setAttribute("rotation", "0 0 0");
    modelURU.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear");

    const textURU = document.createElement("a-text");
    textURU.setAttribute("font", "https://cdn.aframe.io/fonts/mozillavr.fnt");
    textURU.setAttribute("value", "Uruguay gano la primera Copa del Mundo en 1930.");
    textURU.setAttribute("align", "center");
    textURU.setAttribute("scale", "0.2 0.2 0.2");
    textURU.setAttribute("position", "0 -0.4 0");

    entity.appendChild(modelURU);
    entity.appendChild(textURU);
    if (container) container.appendChild(entity);
  }
  //UZB
  else if (i>=102 && i<=107) {
    const modelUZB = document.createElement("a-gltf-model");
    modelUZB.setAttribute("src", "modelos/Uzbekistan/uzb.glb");
    modelUZB.setAttribute("position", "0 0.2 0");
    modelUZB.setAttribute("scale", ".3 .3 .3");
    modelUZB.setAttribute("rotation", "0 0 0");
    modelUZB.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear");

    const textUZB = document.createElement("a-text");
    textUZB.setAttribute("font", "https://cdn.aframe.io/fonts/mozillavr.fnt");
    textUZB.setAttribute("value", "Uzbekistan nunca ha clasificado a una Copa del Mundo.");
    textUZB.setAttribute("align", "center");
    textUZB.setAttribute("scale", "0.2 0.2 0.2");
    textUZB.setAttribute("position", "0 -0.4 0");

    entity.appendChild(modelUZB);
    entity.appendChild(textUZB);
    if (container) container.appendChild(entity);
  }

}
