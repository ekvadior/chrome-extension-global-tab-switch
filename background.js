function highlightTab(index) {
  chrome.tabs.highlight({'tabs': index}, function() {});
}

function toggleTabMute(tab) {

  chrome.tabs.update(tab.id, {
    muted: !tab.mutedInfo.muted
  }, function() {})
}

function toggleYoutubePlayPause(tab) {
  chrome.tabs.executeScript(tab.id, {
    code: 'document.querySelector(".ytp-play-button").click()'
  });
}

chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.query({}, function (all) {
    chrome.tabs.query({active: true}, function (tabs) {
      if (tabs.length) {
        index = tabs[0].index;

        if (command === 'next-tab') {
          highlightTab((index + 1) % all.length);
        } else if (command === 'prev-tab') {
          highlightTab((all.length + index - 1) % all.length);
        } else if (command === 'mute-tab') {
          toggleTabMute(tabs[0]);
        } else if (command === 'play-pause') {
          toggleYoutubePlayPause(tabs[0]);
        }
      }
    });
  });
});
