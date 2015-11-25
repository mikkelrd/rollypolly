import Firebase from 'firebase';
const fireRef = new Firebase('https://rollypolly.firebaseio.com');
console.log('stored fireAuthData:', fireRef.getAuth());

const login = () => {
fireRef.authWithOAuthPopup("google", function(error, authData) {
  if (error) {
    console.log("Login with Popup Failed!", error);
    if (error.code === "TRANSPORT_UNAVAILABLE") {
      fireRef.authWithOAuthRedirect("google", function(error) {
        if (error) {
          console.log("Login with Redirect Failed!", error);
        }
      });
    }
  } else {
    console.log("User athenticated successfully with payload:", fireRef.getAuth());
  }
}, {
  scope: 'email'
});
}

const logout = () => {
fireRef.unauth();
console.log("User unauthenticated successfully with fireAuthData value of:", fireRef.getAuth());
}

const authDataCallback = (authData) => {
  if (authData) {
    // console.log("User " + authData.uid + " is logged in with " + authData.provider);
    fireRef.child("users").child(authData.uid).set({
      provider: authData.provider,
      given_name: authData.google.cachedUserProfile.given_name,
      family_name: authData.google.cachedUserProfile.family_name,
      email: authData.google.email,
      photo: authData.google.profileImageURL
    });
  } else {
    // console.log("User is logged out");
  }
};

fireRef.onAuth(authDataCallback);

export default {
    getFireRef: () => fireRef,
    login: login,
    logout: logout,
    isLoggedIn: () => fireRef.getAuth()
}
