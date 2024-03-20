fetch("/", { method: "GET" }).then( res => {
  const userRole = document.body.getAttribute('data-role'); 
  console.log(userRole)
  if (userRole == 0) {
    document.getElementById("formButton").style.display = "none";
    document.getElementById("loginButton").style.display = "none";
    document.getElementById("registerButton").style.display = "none";
  } else if (userRole == 1) {
    document.getElementById("registerButton").style.display = "none";
    document.getElementById("loginButton").style.display = "none";
    document.getElementById("ordersButton").style.display = "none";
  } else {    
    document.getElementById("formButton").style.display = "none";
    document.getElementById("ordersButton").style.display = "none";
    document.getElementById("signout").style.display = "none";
  }
})

document.querySelector("#signout").addEventListener("click", async () => {
  try {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    let resp = await fetch("/api/sessions/signout", opts);
    resp = await resp.json();

    if (resp.statusCode === 200) {
      alert(resp.response);
      localStorage.removeItem("token");
      location.replace("/");
    } else {
      alert(resp.message);
    }
  } catch (error) {
    console.log(error);
  }
});
