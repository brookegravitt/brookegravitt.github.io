var config = {
	client_id: top.gpClientId,
	scope: ['https://www.googleapis.com/auth/plus.me','https://www.googleapis.com/auth/userinfo.email','https://www.googleapis.com/auth/userinfo.profile'],
	immediate: false
};
$(document).ready(function() {gpLoad();});
function gpLoad(){
	$.getScript("https://apis.google.com/js/client.js?async=true&onload=gpInit");
}
function gpInit(){
	gapi.client.setApiKey(top.gpAppId);
}
function gpConnectLogin(){
	window.setTimeout(function() {
		gapi.auth.authorize(config, googleplusCreateAccount);
	}, 1);
}
function googleplusCreateAccount(token){
	if (typeof(ConnectAjax) != "undefined" && token){
		gapi.client.load('oauth2', 'v1', function() {
			var request = gapi.client.oauth2.userinfo.get({});
			request.execute(function(data) {
				var jsonObj = {type:"googleplus",id:data.id,firstName:data.given_name,lastName:data.family_name,email:data.email};
				ConnectAjax.loginViaSocialMedia(JSON.stringify(jsonObj), googleplusCreateAccountSuccess);
			});
		});
	}
}
function googleplusCreateAccountSuccess(response){
	var data = JSON.parse(response).data;
	var url = baseHref;
	switch(data.status){
		case "dashboard": url += "/dashboard.ww"; break;
		case "create": url += "/createAccount.ww"; break;
		case "networkcontact":  url += "/exhibitorList.ww"; break;
		case "error": url += "/login.ww"; break;
		default: url += "/login.ww";
	}
	document.location.href = url;
}
function googleplusStoreId(response){
	if(typeof(ConnectAjax) != "undefined"){
		gapi.auth.authorize(config, function(response){
			gapi.client.load('oauth2', 'v1', function() {
				var request = gapi.client.oauth2.userinfo.get({});
				request.execute(function(data) {
					var jsonObj = {type:"googleplus",id:data.id};
					ConnectAjax.storeSocialMediaID(JSON.stringify(jsonObj));
				});
			});
		});
	}
}
