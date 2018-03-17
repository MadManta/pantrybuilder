

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

var database = firebase.database();

    // Initial Values
    var Food = [];
    
// Capture Button Click
    $("li").on("click", function(event) {
      event.preventDefault();
      
      Food = $("#pantry").html();
     console.log(Food);

      // Code for "Setting values in the database"
      database.ref().set({
        Food: Food,
        
      });

    });

    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("value", function(snapshot) {

      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      console.log(snapshot.val().Food);


      // Change the HTML to reflect
      $("#pantry").append(snapshot.val().Food);


      // Handle the errors
    // }, function(errorObject) {
    //   console.log("Errors handled: " + errorObject.code);
    });


















//
//
//
//
// login/authentication setion of firebase
//
//
//

var uiConfig = {
    signInSuccessUrl: "mainPage.html",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>'
  };

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);


  //Auth Check & User Log
    firebase.auth().onAuthStateChanged(function(user) {
     
     user == user;

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

    