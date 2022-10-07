const info = $("#info");
const infoBtn = $("#btn-info");

infoBtn.click(() => {
  info.append(
    `<strong>Curso:</strong>Sistemas de Informação<br>`
  );
  alert("Linha adicionada no campo de informações");
  infoBtn.remove();
});
