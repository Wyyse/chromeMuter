document.addEventListener('DOMContentLoaded', function() {
  // Fetch all tabs
  chrome.tabs.query({}, function(tabs) {
    let tabList = document.getElementById('tab-list');
    tabList.innerHTML = ''; // Clear the list

    tabs.forEach(tab => {
      // Create a container for each tab
      let tabDiv = document.createElement('div');
      tabDiv.className = 'tab';
      tabDiv.textContent = tab.title;

      // Create a button to mute the tab
      let muteButton = document.createElement('button');
      muteButton.textContent = 'Mute';
      muteButton.disabled = tab.mutedInfo.muted;  // Disable if already muted

      // Create a button to unmute the tab
      let unmuteButton = document.createElement('button');
      unmuteButton.textContent = 'Unmute';
      unmuteButton.disabled = !tab.mutedInfo.muted;  // Disable if not muted

      // Mute button event listener
      muteButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({
          action: 'toggleMute',
          tabId: tab.id,
          muted: true  // Mute the tab
        }, function(response) {
          if (response.status === 'success') {
            muteButton.disabled = true;
            unmuteButton.disabled = false;
          }
        });
      });

      // Unmute button event listener
      unmuteButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({
          action: 'toggleMute',
          tabId: tab.id,
          muted: false  // Unmute the tab
        }, function(response) {
          if (response.status === 'success') {
            muteButton.disabled = false;
            unmuteButton.disabled = true;
          }
        });
      });

      // Append the buttons to the tab div
      tabDiv.appendChild(muteButton);
      tabDiv.appendChild(unmuteButton);
      tabList.appendChild(tabDiv);
    });
  });

  // Add the pop-out window functionality
  document.getElementById('popout-btn').addEventListener('click', function() {
    chrome.windows.create({
      url: chrome.runtime.getURL('popup.html'),
      type: 'popup',
      width: 300,
      height: 500
    });
  });
});
