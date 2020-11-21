require("dotenv").config();

const express = require("express");
const app = express();
const { PORT: port } = process.env;

// 사용할 정적 디렉토리 지정
app.use(express.static("views"));

app.get("/", (req, res) => {
  const { KAKAO_KEY } = process.env;
  res.render("index", { apikey: KAKAO_KEY });
});

const rp = require("request-promise");
app.get("/auth/callback", async (req, res) => {
  const { code } = req.query;
  console.log(code);
  const options = {
    uri: "https://kauth.kakao.com/oauth/token",
    method: "POST",
    form: {
      grant_type: "authorization_code",
      client_id: "3888fb0f3d1eb5652a4f2ec494a1d3a7",
      redirect_uri: "http://localhost:8080/auth/callback",
      code: code,
    },
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  const cb = await rp(options);

  if (cb["access_token"]) {
    res.send(JSON.stringify(cb));
    // res.render("callback", { result: 0 });
  } else {
    res.send("fail");
    // res.render("callback", { result: 1 });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

const test = () => {
  console.log("!!!");
};
