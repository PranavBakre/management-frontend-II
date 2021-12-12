export class LandingPage {
  login = (event) => {
    let params = new URLSearchParams();
    params.append("redirect_uri", process.env.REDIRECT_URI);
    params.append("prompt", "consent");
    params.append("access_type", "offline");
    params.append("response_type", "code");
    params.append(
      "scope",
      "email profile https://www.googleapis.com/auth/drive.file"
    );
    params.append("client_id", process.env.CLIENT_ID);
    window.location.href =
      "https://accounts.google.com/o/oauth2/v2/auth?" + params.toString();
  };
}
