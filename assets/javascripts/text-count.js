$(document).ready(function() {

    $('#content').on('input', function() {
        var valLength=$(this).val().replace(/\s/g,'').length;
        var len = $(this).val().length;
        $("#withSpaceNum").text(len);
        $("#withoutSpaceNum").text(valLength);
    });
});

  