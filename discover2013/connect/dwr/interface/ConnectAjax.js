if (typeof dwr == 'undefined' || dwr.engine == undefined) throw new Error('You must include DWR engine before including this file');

(function() {
if (dwr.engine._getObject("ConnectAjax") == undefined) {
var p;

p = {};
p._path = '/connect/dwr';




p.getNotifications = function(callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'getNotifications', arguments);
};






p.getComments = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'getComments', arguments);
};







p.addComment = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'addComment', arguments);
};




p.checkLogin = function(callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'checkLogin', arguments);
};





p.getSchedulingJSON = function(p0, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'getSchedulingJSON', arguments);
};






p.addRemoveInterestListItem = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'addRemoveInterestListItem', arguments);
};




p.getSessionInterestsAndTimes = function(callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'getSessionInterestsAndTimes', arguments);
};







p.addSessionToSchedule = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'addSessionToSchedule', arguments);
};





p.isUserNameAvailable = function(p0, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'isUserNameAvailable', arguments);
};





p.updateConnectRegValues = function(p0, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'updateConnectRegValues', arguments);
};





p.moveMessageToThrash = function(p0, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'moveMessageToThrash', arguments);
};





p.getUsersByStringMatch = function(p0, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'getUsersByStringMatch', arguments);
};





p.agreeToTermsAndConditions = function(p0, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'agreeToTermsAndConditions', arguments);
};







p.rateSession = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'rateSession', arguments);
};





p.addStaff = function(p0, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'addStaff', arguments);
};





p.removeStaff = function(p0, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'removeStaff', arguments);
};





p.removeDocument = function(p0, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'removeDocument', arguments);
};





p.updateExhibitorFileSortOrder = function(p0, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'updateExhibitorFileSortOrder', arguments);
};





p.removeLogo = function(p0, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'removeLogo', arguments);
};





p.getSessionFiles = function(p0, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'getSessionFiles', arguments);
};






p.changeAlertNotificationCount = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'changeAlertNotificationCount', arguments);
};





p.storeSocialMediaID = function(p0, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'storeSocialMediaID', arguments);
};





p.loginViaSocialMedia = function(p0, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'loginViaSocialMedia', arguments);
};




p.getRecentItems = function(callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'getRecentItems', arguments);
};




p.getUsernamePasswordValidationRules = function(callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'getUsernamePasswordValidationRules', arguments);
};






p.updateLeadOnLoggeduser = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'updateLeadOnLoggeduser', arguments);
};







p.getScheduledItems = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'getScheduledItems', arguments);
};






p.addSessionTimeToSchedule = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'addSessionTimeToSchedule', arguments);
};






p.removeSessionTimeFromSchedule = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'removeSessionTimeFromSchedule', arguments);
};





p.getEligibleTimeForPersonalCalendarItem = function(p0, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'getEligibleTimeForPersonalCalendarItem', arguments);
};






p.getEligibleTimeIntervalForPersonalCalendarItem = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'getEligibleTimeIntervalForPersonalCalendarItem', arguments);
};





p.removePersonalCalendarItem = function(p0, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'removePersonalCalendarItem', arguments);
};





p.companyAutoComplete = function(p0, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'companyAutoComplete', arguments);
};





p.updateExhibitorFileInfo = function(p0, callback) {
return dwr.engine._execute(p._path, 'ConnectAjax', 'updateExhibitorFileInfo', arguments);
};

dwr.engine._setObject("ConnectAjax", p);
}
})();

