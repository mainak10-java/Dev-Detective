const url = "https://api.github.com/users/";
const profileContainer= document.querySelector('.user-info-container');
const searchBar= document.querySelector('.search-bar-container');
const root=document.documentElement.style;
const loadingScreen= document.querySelector('.loading-container');
const get= (param) => document.getElementById(`${param}`);
const btnSubmit=get('submit');
const input= get('input');
const noResult= get('error-msg');
const modetext = get("mode-text");
const modeicon = get("mode-icon");

let darkMode=false;

noResult.style.display='none';
profileContainer.style.display='none';

btnSubmit.addEventListener('click', function (){
    if(input.value !== ""){
        getUserData(url + input.value);
    }   
});

input.addEventListener('input', function (){
    noResult.style.display='none';
})

input.addEventListener('keydown', function (e){
    if(e.key === "Enter"){
        if(input.value !== ""){
            getUserData(url + input.value);
        }
    }
},false);


async function getUserData(gitUrl){
    loadingScreen.classList.add("active");
    try{
       const response=await fetch(gitUrl);
       const data= await response.json();

       loadingScreen.classList.remove("active");
       updateProfile(data);
       
    }
    catch(err){
        throw new err;
    }
}

const avatar= get("avatar");
const userName=get("user-name");
const userId= get("user-id");
const date= get("date");
const bio= get("desc");
const repos=get("repos");
const followers=get("followers");
const following= get("following")
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const user_location=get("location");
const page=get("page");
const twitter=get("twitter");
const company=get("company");


function updateProfile(data){
    if(data.message !== "Not Found"){
        noResult.style.display="none";
        function checkNull(param1, param2) {
            if (param1 === "" || param1 === null) {
              param2.style.opacity = 0.5;
              param2.previousElementSibling.style.opacity = 0.5;
              return false;
            } else {
              return true;
            }
        }

        avatar.src=`${data.avatar_url}`;
        userName.innerText=data.name === null? data.login : data.name;
        userId.innerText = `@${data.login}`;
        userId.href = `${data.html_url}`;
        datesegments = data.created_at.split("T").shift().split("-");
        date.innerText =`Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
        bio.innerText=data.bio === null ?'This profile has no bio': `${data.bio}`;
        repos.innerText=`${data.public_repos}`;
        followers.innerText=`${data.followers}`;
        following.innerText=`${data.following}`;
        user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
        page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
        page.href = checkNull(data.blog, page) ? data.blog : "#";
        twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
        twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
        company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
        profileContainer.style.display='block';
        searchBar.classList.toggle("active");
    }
    else
    {
        noResult.style.display="block";
        profileContainer.style.display='none';
    }
}

const btnMode= get("btn-mode");

btnMode.addEventListener('click', function (){
    if(darkMode == false)
        darkModeProperties();
    else
        lightModeProperties();
});

const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
console.log(prefersDarkMode)

if(localStorage.getItem("dark-mode")){
    console.log('set to dark mode');
    darkModeProperties(); 
}
else{
    localStorage.setItem("dark-mode", prefersDarkMode);
    lightModeProperties();
    console.log('set to light mode')
}


  
function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modetext.innerText = "LIGHT";
    modeicon.src = "./assets/images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
    localStorage.setItem("dark-mode", true);
}

function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modetext.innerText = "DARK";
    modeicon.src = "./assets/images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;
    localStorage.setItem("dark-mode", false);
}