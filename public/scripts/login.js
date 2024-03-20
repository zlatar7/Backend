const selector = document.querySelector("#login");
selector.addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let resp = await fetch("/api/sessions/login", opts);
    resp = await resp.json()
    if (resp.statusCode === 200) {
      alert(resp.response);
      location.replace("/");
    }
  } catch (error) {
    alert(error.message);
  }
});
