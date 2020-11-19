Kakao.init("bc8b0e73cd18ca786bdfafacaa3dd53e");

// 카카오 로그인 버튼을 생성
Kakao.Auth.createLoginButton({
  container: "#kakao-login-btn",
  success: function (authObj) {
    alert(JSON.stringify(authObj));
    console.log(authObj);
  },
  fail: function (err) {
    alert(JSON.stringify(err));
    console.log(err);
  },
});

// 카카오 로그인 함수
const loginWithKakao = () => {
  try {
    return new Promise((resolve, reject) => {
      if (!Kakao) {
        reject("Kakao 인스턴스가 존재하지 않습니다.");
      }
      Kakao.Auth.login({
        success: function (authObj) {
          alert("로그인 되었습니다.");
        },
        fail: function (err) {
          alert("에러 입니다");
        },
      });
    });
  } catch (err) {
    console.error(err);
  }
};

const logoutWithKakao = () => {
  if (Kakao.Auth.getAccessToken()) {
    console.log(
      "카카오 인증 엑세스 토큰이 존재합니다",
      Kakao.Auth.getAccessToken()
    );

    Kakao.Auth.logout(() => {
      console.log(
        "로그아웃 되었습니다.",
        Kakao.Auth.getAccessToken(),
        Kakao.Auth.getAccessToken()
      );
    });
  } else {
    alert("로그인되어 있지 않습니다.");
  }
};

const kakaoLoginButton = document.getElementById("kakaoLoginButton");
const kakaoLogoutButton = document.getElementById("kakaoLogoutButton");

kakaoLoginButton.onclick = loginWithKakao;
kakaoLogoutButton.onclick = logoutWithKakao;
