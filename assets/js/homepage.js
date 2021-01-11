// var getUserRepos = function(){
//     // describing asynchornous behaviour : fetch the response first and then console log the response. 
//     fetch("https://api.github.com/users/octocat/repos").then(function(response){
//         response.json().then(function(data){   // json method formats the response as JSON
//             console.log(data);
//         });
//     });
//     console.log("outside"); //this sentence is printed first before line 4. It does not wait for thr response to be ready to consolelog thus working asynchronously ( AJAX - Asynchronous JavaScript and XML)
// }
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function(user){
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          displayRepos(data, user);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to GitHub");
    });
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value form input element
    var username = nameInputEl.value.trim();   // trim() is good to use because we don't want any unnecessary spaces along with the text as username
    if (username){
        getUserRepos(username);
        nameInputEl.value = " "; // clear the input text
    }else{
        alert("Error:" + response.statusText);
    }
    //console.log(event);
};
userFormEl.addEventListener("submit", formSubmitHandler);

// function to display repos
var displayRepos = function(repos, searchTerm) {
    
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
  }
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a container for displayng each repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append title to the conatiner
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0){
        statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    }else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
      }

    // append to container
    repoEl.appendChild(statusEl);

     // append container to the dom
    repoContainerEl.appendChild(repoEl);
}};
