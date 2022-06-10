
  $(document).ready(function() {
    if(navigator.language){
        var lang = navigator.language;
    }
    else{
        var lang = navigator.browserLanguage;
    }

    if(lang.indexOf('zh') > -1){
        // document.location.href = 'index.html';
    }
    else{
        document.location.href = 'indexen.html';
    }
  });
  
  