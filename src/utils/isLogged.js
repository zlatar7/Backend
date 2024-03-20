import Jwt from "jsonwebtoken";

function logged(token) {
  if (token) {
    const data = Jwt.verify(token, process.env.SECRET_KEY);
    return data;
  } else if(token){
    return {role: 0}
  } else{
    return {role: 3}
  }
}

export default logged
