/*Copyright (c) Facebook, Inc. and its affiliates.
All rights reserved.

This source code is licensed under the license found in the
LICENSE file in the root directory of this source tree.*/
window.fbAsyncInit = function() {
  window.FB.init({
    appId: "<app-id>",
    autoLogAppEvents: true,
    xfbml: true,
    version: "v10.0"
  });

  window.FB.getLoginStatus(function(response) {
    // Called after the JS SDK has been initialized.
    console.log("Inside window.FB.getLoginStatus");
    statusChangeCallback(response); // Returns the login status.
  });
};

function statusChangeCallback(response) {
  // Called with the results from FB.getLoginStatus().
  console.log("statusChangeCallback");
  console.log(response.status); // The current login status of the person.
  if (response.status === "connected") {
    // Logged into your webpage and Facebook.
    testAPI();
  } else {
    // Not logged into your webpage or we are unable to tell.
    document.getElementById("status").innerHTML =
      "Please log " + "into this webpage.";
  }
}

function checkLoginState() {
  // Called when a person is finished with the Login Button.
  window.FB.getLoginStatus(function(response) {
    // See the onlogin handler
    statusChangeCallback(response);
  });
}

function logout(){
  console.log('Called logout!');
  window.FB.logout(function() {
   document.getElementById("status").innerHTML =
      "Logged out successfully";
   document.getElementById("logoutbutton").style.display = "none";
});
}

function testAPI() {
  // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
  console.log("Welcome!  Fetching your information.... ");
  window.FB.api("/me", function(response) {
    console.log("Successful login for: " + response.name);
    document.getElementById("status").innerHTML =
      "Thanks for logging in, " + response.name + "!";
    document.getElementById("logoutbutton").style.display = "block";
  });

}

function loginUsingJSSDKLoginDialog() {
  console.log("Inside loginUsingJSSDKLoginDialog");
  window.FB.login(
    function(response) {
      if (response.status === "connected") {
        window.FB.api("/me", function(response) {
          console.log("Successful login for: " + response.name);
          var element = document.getElementById("status");
          document.getElementById("status").innerHTML =
            "Thanks for logging in, " + response.name + "!";
        });
      } else {
        document.getElementById("status").innerHTML = "You are not logged in!";
      }
    },
    {
      scope: "public_profile,email,user_messenger_contact",
      messenger_page_id: "<messenger-page-id>",
      reset_messenger_state: true
    }
  );
}
