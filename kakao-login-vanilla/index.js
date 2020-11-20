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

// 카카오 로그인
const loginWithKakao = () => {
  try {
    return new Promise((resolve, reject) => {
      if (!Kakao) {
        reject("Kakao 인스턴스가 존재하지 않습니다.");
      }
      Kakao.Auth.login({
        success: function (authObj) {
          alert("로그인 되었습니다.");
          console.log(Kakao.Auth.getAccessToken());
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

// 카카오 로그아웃
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

// 카카오 연결 끊기
const unlinkWithKakao = () => {
  Kakao.API.request({
    url: "/v1/user/unlink",
    success: function (response) {
      console.log(response);
    },
    fail: function (error) {
      console.log(error);
    },
  });
};

// 로그인 사용자 정보
const userWithKakao = () => {
  if (Kakao.Auth.getAccessToken()) {
    Kakao.API.request({
      url: "/v1/api/talk/profile",
      success: function (response) {
        console.log(response);
        userName.innerHTML = `${response.nickName}<br> <img src="${response.profileImageURL}" width="100">`;
      },
      fail: function (error) {
        console.log(error);
        userName.innerHTML = "error";
      },
    });
  } else {
    userName.innerHTML = "로그인되어 있지 않습니다.";
  }
};

// DOM
const kakaoLoginButton = document.getElementById("kakaoLoginButton");
const kakaoLogoutButton = document.getElementById("kakaoLogoutButton");
const kakaoUnlinkButton = document.getElementById("kakaoUnlinkButton");
const userName = document.getElementById("userName");

kakaoLoginButton.onclick = loginWithKakao;
kakaoLogoutButton.onclick = logoutWithKakao;
kakaoUnlinkButton.onclick = unlinkWithKakao;
userWithKakao();
