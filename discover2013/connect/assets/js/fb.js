var fbAccessToken = null;
$(function (){fbLoad();});
function fbLoad(){
//	$("#buttonFriend").click(function (){fbGetFriends();});
//	$("#buttonLogout").click(function (){fbLogout();});
	window.fbAsyncInit = function() {
		FB.init({
			appId      : top.fbAppId,
			channelUrl : top.fbChannelUrl,
			status     : true, 
			cookie     : true,
			oauth      : true,
			xfbml      : true
		});
		FB.getLoginStatus(function(response) {
			fbLoginStatus(response)
		}, true);
		FB.Event.subscribe('edge.create', function(response) {
			fbStoreId()
		});
		$(".fb_button").click(null);
		$('.fbButtonLogin').each(function(){
			if(!$(this).data('hasClick'))
				$(this).click(function (){fbConnectLogin();}).data('hasClick', true);
		});
	};
	(function(d){
		var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
		js = d.createElement('script'); js.id = id; js.async = true;
		js.src = "https://connect.facebook.net/en_US/all.js";
		d.getElementsByTagName('head')[0].appendChild(js);
	}(document));
}
function fbConnectLogin(){
	FB.login(function(response) {
		if (response.authResponse) {
			fbLoginStatus(response);
			FB.api('/me', function(response) {
				fbCreateAccount(response);
			});
		} else {
			if(typeof(console) != "undefined"){console.log('User cancelled login or did not fully authorize.')}
		}
	}, {scope: 'email'});
}
//function fbLogout(){
//	FB.logout(function(response) {
//		fbLoginStatus(response);
//		$("#fbFriends").html("");
//	});
//}
function fbLoginStatus(response){
	if(response.status == "connected"){
		fbAccessToken = response.authResponse.accessToken;
//		$('.fbButtonLogin').fadeOut("slow",function (){
//			$("#buttonFriend,#buttonLogout").fadeIn();
//		});
//	} else {
//		$("#buttonFriend,#buttonLogout").fadeOut("slow",function (){
//			$('.fbButtonLogin').fadeIn();
//		});
	}
}
function fbCreateAccount(data){
	if (typeof(ConnectAjax) != "undefined"){
		var jsonObj = {type:"facebook",id:data.id,firstName:data.first_name,lastName:data.last_name,email:data.email};
		ConnectAjax.loginViaSocialMedia(JSON.stringify(jsonObj), fbCreateAccountSuccess);
	}
}
function fbCreateAccountSuccess(response){
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
function fbStoreId(){
	if(typeof(ConnectAjax) != "undefined"){
		FB.getLoginStatus(function(response) {
			if (response.status === "connected"){
				FB.api('/me', function(data) {
					var jsonObj = {type:"facebook",id:data.id};
					ConnectAjax.storeSocialMediaID(JSON.stringify(jsonObj));
				});
			}else{
				FB.login(function(response){
					if (response.authResponse){
						FB.api('/me', function(data) {
							var jsonObj = {type:"facebook",id:data.id};
							ConnectAjax.storeSocialMediaID(JSON.stringify(jsonObj));
						});
					}
				});
			}
		}, true);
	}
}
/*
function fbFriendReq(){
	var url = "https://graph.facebook.com/me/friends?access_token=" + fbAccessToken;
	var req = new XMLHttpRequest();
	req.open("get",url,true);
	req.send(null);
	req.onerror = function(){alert("Error");};
	return req;
}
function fbGetFriends(){
	$("#loading").html("Connected! Getting your friends …");
	var req = fbFriendReq();
	req.onload = fbFriendList;
}
function fbFriendList(evt){
	$("#loading").hide();
	var data = JSON.parse(evt.target.responseText).data;
	var listHtml = "";
	for(x in data){
		listHtml += '<div id="'+ data[x].id +'">'+ data[x].name +'</div>';
	}
	$("#fbFriends").html(listHtml);
}
*/
