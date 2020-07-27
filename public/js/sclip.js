// $(document).ready(function () {
//     const button = $('i.icon.ic-go-down');
//     $(button).on('click', function(e) {
//         e.preventDefault()
//         alert('oke')
//     });
// })

$(document).ready(function() {
    $(".sclip-input").focus(function() {
        $(this).parent().find(".label-txt").addClass('label-active');
    });

    $(".sclip-input").focusout(function() {
        if ($(this).val() == '' || $(this).val() == null) {
            $(this).parent().find(".label-txt").removeClass('label-active');
        };
    });
});