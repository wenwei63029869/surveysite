$("document").ready(function(){
    $(".signup-form").hide();

    $("#signup-button").on('click', function() {
        $(".signin-form").hide();
        $(".signup-form").show();
    });
    $("#signin-button").on('click', function() {
        $(".signup-form").hide();
        $(".signin-form").show();
    });
});