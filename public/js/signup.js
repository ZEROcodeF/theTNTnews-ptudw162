(function ($) {
    'use strict';
    $("#writerName").hide();

    $("input:radio[name='typeUserRadio']").change(function(){
        if ($("#memberSignup").is(":checked")) {
            $("#memberName").show();
            $("#writerName").hide();
        }
    
        if ($("#writerSignup").is(":checked")) {
            $("#memberName").hide();
            $("#writerName").show();
        }
    });
})(jQuery);