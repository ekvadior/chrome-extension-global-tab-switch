function highlightTab(index) {
  chrome.tabs.highlight({'tabs': index}, function() {});
}

chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.query({}, function (all) {
    chrome.tabs.query({active: true}, function (tabs) {
      if (tabs.length) {
        index = tabs[0].index;

        if (command === 'next-tab') {
          highlightTab((index + 1) % all.length);
        } else if(command === 'prev-tab') {
          highlightTab((all.length + index - 1) % all.length);
        }
      }
    });
  });
});
