const info = $("#info");
const infoBtn = $("#btn-info");
const createBtn = $("#btn-create");
const updateBtn = $("#btn-update");
const deleteBtn = $("#btn-delete");

// Form fields
const name = $("#name");
const email = $("#email");
const address = $("#address");
const phone = $("#phone");

infoBtn.click(async () => {
  // envie uma solicitação GET para localhost:3000/info
  const response = await fetch("/info");
  const data = await response.json();
  const element = data[0];
  // show data in the info div
  info.html(`
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Usuário: ${element.name}</h5>
          <p class="card-text"><strong>Endereço:</strong> ${element.address}</p>
          <p class="card-text"><strong>Telefone:</strong> ${element.phone}</p>
          <p class="card-text"><strong>Email:</strong><a href="mailto: ${element.mail}"> ${element.email}</a></p>
        </div>
      </div>
    `);

  alert("Linhas adicionadas ao campo de informações!");
  infoBtn.remove();
});

createBtn.click(async () => {
  // envie uma solicitação POST para localhost:3000/info
  await fetch("/info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.val(),
      email: email.val(),
      address: address.val(),
      phone: phone.val(),
    }),
  });
  alert("Informações adicionadas!");
});

updateBtn.click(async () => {
  console.log(name.val());
  // send a PATCH request to localhost:3000/info/1
  await fetch("/info/1", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.val(),
      email: email.val(),
      address: address.val(),
      phone: phone.val(),
    }),
  });
  alert("Informações atualizadas!");
});

deleteBtn.click(async () => {
  // send a DELETE request to localhost:3000/info/1
  await fetch("/info/1", {
    method: "DELETE",
  });
  alert("Informações deletadas!");
});
