function ready (fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function debounce () {
    var timeoutId;

    return {
        on: function (fn, milliseconds) {
            milliseconds = milliseconds|| 500;
    
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
    
            timeoutId = setTimeout(fn, milliseconds);
        }
    };
}