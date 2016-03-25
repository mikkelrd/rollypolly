import Firebase from 'firebase';
import FirebasePromisified from 'firebase-promisified';

FirebasePromisified(Firebase, Promise, Rx);

const fireRef = new Firebase('https://rollypolly.firebaseio.com');
console.log('stored fireAuthData:', fireRef.getAuth());

fireRef.onAuth((authData) => {
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
});

export default {

  getMainFireRef: () => fireRef ,
  getFireRef: (child, ref) => ref ? ref.child(child) : fireRef.child(child) ,

  getAuthData: () => fireRef.getAuth(),

  authLogin: () => {
    return new Promise((resolve, reject) => {
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
          reject(false);
        } else {
          console.log("User athenticated with payload:", fireRef.getAuth());
          resolve(true);
        }
      }, {
        scope: 'email'
      });
    });
  },

  authLogout: () => {
    fireRef.unauth();
    console.log("User unauthenticated successfully with fireAuthData value of:", fireRef.getAuth());
  },

  getAllPollsStream: () =>
    fireRef.child('polls').observe('child_added')
      .map(p => ({
        id: p.snapshot.key(),
        poll: p.snapshot.val()
      })),

  getPollStreamById: (id) => fireRef.child(`polls/${id}`).observe('value'),

  getChoicesStream: (pollRef) =>
    pollRef.child('choices').observe('child_added')
      .map(c => ({
        text: c.snapshot.key(),
        count: c.snapshot.val()
      })),

  addPoll: (newPoll) => { fireRef.child('polls').push(newPoll); },

  addChoice: (pollRef, newChoice) => {
    let obj = {};
    obj[newChoice] = 0;
    pollRef.child('choices').update(obj);
  },

  getCountStream: (choiceRef) => choiceRef.observe('value'),

  castVote: (choiceRef) => {
    choiceRef.transaction(currVal => ((currVal || 0) + 1));
  },

}
