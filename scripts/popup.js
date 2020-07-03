domReady(() => {
    bindCheckboxes()
})

var queryInfo = {
    active: true,
    currentWindow: true
};

function domReady(callback) {
    if (document.readyState === 'complete') {
        callback()
    } else {
        window.addEventListener('load', callback, false);
    }
}


function bindCheckboxes() {
    for (const $setting of document.querySelectorAll('.setting')) {
        const $input = $setting.querySelector('input')
        $input.checked = localStorage[$input.name] === 'true'
        $setting.addEventListener('change', (event) => {
            localStorage[$input.name] = $input.checked;
        }, false)
    }
}

// chrome.tabs.getSelected(null, function(tab) {
//     var tablink = tab.url;
//     var tabid
//     $("#url-check").attr("href", tablink);

//     $("#url-check").text(tablink.toString().length > 50 ? tablink.substring(0, 50) + '.....' : tablink);
// });

chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0]
    var tabId = tabs[0].id
    var url = tab.url
    $("#url-check").attr("href", url);
    $("#url-check").text(url.toString().length > 50 ? url.substring(0, 50) + '.....' : url);
    if (localStorage[tabId]) {
        $(".loader").css("display", "none");
        $(".loading").css("display", "none");
        var pageResult = localStorage.getItem(tabId)
        pageResult = JSON.parse(pageResult)
        // alert(pageResult.result)
        if (pageResult.result === 'Cannot predict this site') $("#result").text(pageResult.result)
        if (pageResult.result === 'Safe') $("#result-safe").text(pageResult.result)
        if (pageResult.result === 'Malicious') $("#result-nsafe").text(pageResult.result)
    }
})