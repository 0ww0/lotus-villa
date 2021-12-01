(function() {
    /*-----------------------------------------------------------------------------
        Get In Touch Page
    -----------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------
        Form Section
    -----------------------------------------------------------------------------*/

    /*-------------------------------------------------------------------------
       Form Numonly
       .numonly     //delete, backspace, tab, escape, enter
       .numonly_withdecimal      //delete, backspace, tab, escape, enter, -
    --------------------------------------------------------------------------*/

    $(".invalid").validate({
        rules: {
            "first-name": "required",
            "last-name": "required",
            "email": "required",
            "phone": "required",
            "subject": "required"
        },
        errorPlacement: function (error, element) {
            error.addClass("help-block");


            // if (element.hasClass('multiselect')) {
            //     error.insertAfter(element.parent());
            // } else {
            //     error.insertAfter(element);
            // }
        },
        highlight: function(element, errorClass, validClass) {
            $(element).parents(".show-error-wrapper").addClass("has-error").removeClass("has-success");
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parents(".show-error-wrapper").addClass("has-success").removeClass("has-error");
        }
    });



})();
