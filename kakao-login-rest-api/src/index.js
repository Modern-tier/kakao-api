require("dotenv").config();

const express = require("express");
const app = express();
const { PORT: port } = process.env;
const rp = require("request-promise");

// 사용할 정적 디렉토리 지정
app.use(express.static("views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/auth/callback", async (req, res) => {
  // 인가 코드
  const { code } = req.query;
  console.log(code);
  // 토큰 받기
  const options = {
    uri: "https://kauth.kakao.com/oauth/token",
    method: "POST",
    form: {
      grant_type: "authorization_code",
      client_id: process.env.REST_API_KEY,
      redirect_uri: "http://localhost:8080/auth/callback",
      code: code,
    },
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    // request-promise 의 옵션: string to json
    json: true,
  };

  const cb = await rp(options);

  if (cb["access_token"]) {
    res.send(cb);
  } else {
    res.send("login fail");
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
