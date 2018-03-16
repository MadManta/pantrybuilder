

// Initialize Firebase
var config = {
apiKey: "AIzaSyDdKJdKWyBww3paQE--cB_cF8SPa-FJn3c",
authDomain: "kitchenkit-bf8b5.firebaseapp.com",
databaseURL: "https://kitchenkit-bf8b5.firebaseio.com",
projectId: "kitchenkit-bf8b5",
storageBucket: "kitchenkit-bf8b5.appspot.com",
messagingSenderId: "44047573836"
};
firebase.initializeApp(config);

var uiConfig = {
    signInSuccessUrl: "mainPage.html",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>'
  };

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);

  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      {
        // Google provider must be enabled in Firebase Console to support one-tap
        // sign-up.
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // Required to enable this provider in one-tap sign-up.
        authMethod: 'https://accounts.google.com',
        // Required to enable ID token credentials for this provider.
        // This can be obtained from the Credentials page of the Google APIs
        // console.
        clientId: 'xxxxxxxxxxxxxxxxx.apps.googleusercontent.com'
      },
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Required to enable one-tap sign-up credential helper.
    credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
  });
  // Auto sign-in for returning users is enabled by default except when prompt is
  // not 'none' in the Google provider custom parameters. To manually disable:
  ui.disableAutoSignIn();

  //Auth Check & User Log


   firebase.auth().onAuthStateChanged(function(user) {
     
     user = user;

     console.log('user', 'authStateChanged', user);
   });

  // User Signout
     $("#logout").click(function() {
       firebase.auth().signOut().then(function() {
     // Sign-out successful.
       window.location.replace("login.html");
       }).catch(function(error) {
     // An error happened.
       console.log('Logout Error');
       });
    });

    