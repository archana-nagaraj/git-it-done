// var getUserRepos = function(){
//     // describing asynchornous behaviour : fetch the response first and then console log the response. 
//     fetch("https://api.github.com/users/octocat/repos").then(function(response){
//         response.json().then(function(data){   // json method formats the response as JSON
//             console.log(data);
//         });
//     });
//     console.log("outside"); //this sentence is printed first before line 4. It does not wait for thr response to be ready to consolelog thus working asynchronously ( AJAX - Asynchronous JavaScript and XML)
// }



var getUserRepos = function(user){
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    // make a request to the url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data);
        });
    });
};

getUserRepos("microsoft");
getUserRepos("octocat");
getUserRepos("gmail");
getUserRepos("archana-nagaraj");
