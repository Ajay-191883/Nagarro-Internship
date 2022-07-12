$(document).ready(function ($) {
  $("#input").change(function () {
    var input = $(this).val();
    $("ul").append(
      "<li>" +
        input +
        '<i class="fa fa-check" aria-hidden="true"></i> <i class="fas fa-trash "></i> </li>'
    );
    $("ul").children("p").hide();
    $(this).val("");
  });
  $("ul").on("click", ".fa-trash", function () {
    $(this).parent("li").fadeOut(200);
  });
  $("ul").on("click", ".fa-check", function () {
    $(this).parent("li").css("text-decoration", "line-through");
    $(this).fadeOut(200);
  });
});
