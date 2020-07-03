const tabTracker = new Set()
console.log('%cINIT EXTENSION', 'color: green;')

const settings = {
    detect: localStorage.detect === 'true'
}

let currentUrl = '';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (currentUrl !== tab.url && tab.status === 'complete') {
        ReqInfo();
    }
})

function ReqInfo() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        if (localStorage.detect === 'true') {
            var tablink = tabs[0].url
            var tabId = tabs[0].id
            if (localStorage[tabId]) {
                removeLocalStorageData(tabId)
            }
            var xhr = new XMLHttpRequest();
            const baseUrl = "http://103.56.157.242:5000/localPrediction/"
            var data = JSON.stringify({
                'url': tablink
            })
            xhr.onreadystatechange = function() {
                console.log('this.readyState', this.readyState)
                console.log('this.status', this.status)
                if (this.readyState == 4 && this.status == 200) {
                    var page = {
                        'id': tabId,
                        'result': this.responseText
                    }
                    var key = page.id
                    var value = JSON.stringify(page)
                    localStorage.setItem(key, value)
                }
            };
            xhr.open("POST", baseUrl, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(data);
        }
    })
}

chrome.tabs.onRemoved.addListener(function(tabid, removed) {
    removeLocalStorageData(tabid)
})

function removeLocalStorageData(tabid) {
    var key = tabid
    localStorage.removeItem(key)
}