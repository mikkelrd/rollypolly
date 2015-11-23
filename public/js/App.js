import Poll from './Poll';
import Firebase from 'firebase';
const fireRef = new Firebase('https://rollypolly.firebaseio.com');
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
console.log('stored fireAuthData:', fireRef.getAuth());

let App = React.createClass({

  login () {
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
        console.log("User uthenticated successfully with payload:", fireRef.getAuth());
      }
    }, {
      scope: 'email'
    });
  },

  logout () {
    fireRef.unauth();
    console.log("User unauthenticated successfully with fireAuthData value of:", fireRef.getAuth());
  },

  render () {
    return (
      <div className="container">
        <a onClick={this.login}>LOGIN</a>
        <a onClick={this.logout}>LOGOUT</a>
        <h2 className=""> ROLLY POLLY <br/> roll your own poll </h2>
        <h3 className="">where to go for lunch</h3>
        <Poll />
      </div>
    )
  }

});

ReactDOM.render( <App />, document.getElementById('app') );
