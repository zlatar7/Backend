const selector = document.querySelector("#register");
selector.addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
      name: document.querySelector("#name").value,
    };
    document.querySelector("#lastName").value && (data.lastName = document.querySelector("#lastName").value);
    document.querySelector("#photo").value && (data.photo = document.querySelector("#photo").value);

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/sessions/register", opts);
    response = await response.json();
    if ( response.statusCode === 201) {
      alert(response.message)
      location.replace("login")
    } else{
      alert("ERROR: " + response.message);
    }
  } catch (error) {
    alert(error.message);
  }
});
