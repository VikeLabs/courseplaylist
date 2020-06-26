const clientId = '809970311729-o14l2b7njlmt92fcnp1ai2k2u0c4mdkq.apps.googleusercontent.com'

const authButton = document.getElementById('authorize-button');
const signoutButton = document.getElementById('signout-button');
const discoveryDocs = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]
const scopes = "https://www.googleapis.com/auth/youtube.readonly";


const content = document.getElementById('content');
const channelForm = document.getElementById('channel-form');
const channelInput = document.getElementById('channel-input');
const videoContainer = document.getElementById('video-container');

const defaultChannel = 'PowerfulJRE';
//Load auth2 library

function handleClientLoad(){
    gapi.load('client:auth2', initClient);
}

// 
function initClient(){
    gapi.client.init({
        DISCOVERYDOCS: discoveryDocs,
        CLIENTID: clientId,
        scope: scopes
    }).then( () =>{
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignOutClick;
    }  );
}

function updateSignInStatus(isSignedIn){
    if(isSignedIn){
        authButton.style.display = 'none';
        signoutButton.style.display = 'block';
        content.style.display = 'block';
        videoContainer.style.display = 'block';
        getChannel(defaultChannel);
    }
    else{
        authButton.style.display = 'block';
        signoutButton.style.display = 'none';
        content.style.display = 'none';
        videoContainer.style.display = 'none';
    }
}

function handleAuthClick(){
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(){
    gapi.auth2.getAuthInstance().signOut();
}

function getChannel(channel){
    console.log(channel);
}