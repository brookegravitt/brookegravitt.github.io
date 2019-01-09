$(document).ready(function() {liLoad();});
function liLoad(){
	if(location.port == 8091) return false; //don't get the script if running on port 8091
	$.getScript("https://platform.linkedin.com/in.js?async=true", function success() {
		IN.init({
			api_key : top.liAppId
		});
	});
}
function linkedinConnectLogin(){
	IN.API.Profile("me").result(function(response) {
		linkedinCreateAccount(response);
	});
}
function linkedinCreateAccount(response){
	var data = response.values[0];
	if (typeof(ConnectAjax) != "undefined"){
		var jsonObj = {type:"linkedin",id:data.id,firstName:data.firstName,lastName:data.lastName,email:""};
		ConnectAjax.loginViaSocialMedia(JSON.stringify(jsonObj), linkedinCreateAccountSuccess);
	}
}
function linkedinCreateAccountSuccess(response){
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
function linkedinStoreId(response){
	if(typeof(ConnectAjax) != "undefined"){
		if (IN.User.isAuthorized()){
			IN.API.Profile("me").result(function(response) {
				var data = response.values[0];
				var jsonObj = {type:"linkedin",id:data.id};
				ConnectAjax.storeSocialMediaID(JSON.stringify(jsonObj));
			});
		}else{
			IN.User.authorize(function(response){
				IN.API.Profile("me").result(function(response) {
					var data = response.values[0];
					var jsonObj = {type:"linkedin",id:data.id};
					ConnectAjax.storeSocialMediaID(JSON.stringify(jsonObj));
				});
			})
		}
	}
}
