var first_time_success  = true;
var first_time_failure  = true;
var showed_offline_alert = false;
var showed_online_alert = false;

function success()
{
  if (first_time_success == true)
  {
    first_time_success = false;
    showed_online_alert = true; // Need to falsely put true to avoid showing popup at startup
    return;
  }
  showed_offline_alert = false;
  chrome.browserAction.setIcon({ path: 'online-icon.png'})
  chrome.browserAction.setBadgeBackgroundColor({ color: [0, 255, 0, 255] });
  chrome.browserAction.setBadgeText({text: 'Up'});
  console.log("online");
  if (showed_online_alert == false)
  {
    alert("online");
    showed_online_alert = true;
  }
}

function failure()
{
  if (first_time_failure == true)
  {
    first_time_failure = false;
    return;
  }
  showed_online_alert = false;
  chrome.browserAction.setIcon({ path: 'offline-icon.png'})
  chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
  chrome.browserAction.setBadgeText({text: 'Down'});
  console.log("offline");
  if (showed_offline_alert == false)
  {
    alert("offline");
    showed_offline_alert = true;    
  }
}

function testNet()
{
  var i = new Image();
  i.onload = success;
  i.onerror = failure;

  i.src = 'http://gfx2.hotmail.com/mail/uxp/w4/m4/pr014/h/s7.png?d=' + escape(Date());
}
setInterval(testNet, 1000);
