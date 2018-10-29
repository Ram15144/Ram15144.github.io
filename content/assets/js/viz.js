(function($) { // Begin jQuery
  $(function() { // DOM ready

    $(".aboutMeContent").hide();
    $(".rowAboutMe").hide();
    $(".homePageButton").hide();
    $(".visualization").hide();
    $(".svgGraphics").hide();
    $(".credits").hide();
    
    $('a.aboutMe').on('click', function() {
      $(".row").hide();
      $(".visualization").hide();
      $(".svgGraphics").hide();
      $(".credits").hide();
      $(".rowAboutMe").show();
      $(".homePageButton").show();
    });
    $('a.favViz').on('click', function() {
      $(".row").hide();
      $(".rowAboutMe").hide();
      $(".svgGraphics").hide();
      $(".credits").hide();
      $(".visualization").show();
      $(".homePageButton").show();
    });
    $('a.svgAnim').on('click', function() {
      $(".row").hide();
      $(".rowAboutMe").hide();
      $(".visualization").hide();
      $(".credits").hide();
      $(".svgGraphics").show();
      $(".homePageButton").show();
    });

    $('a.cred').on('click', function() {
      $(".row").hide();
      $(".rowAboutMe").hide();
      $(".visualization").hide();
      $(".credits").show();
      $(".svgGraphics").hide();
      $(".homePageButton").show();
    });

    $('.homePageButton').on('click',function(){
      $(".row").show();
      $(".rowAboutMe").hide();
      $(".visualization").hide();
      $(".credits").hide();
      $(".svgGraphics").hide();
      $(".homePageButton").hide();
    });

  }); // end DOM ready
})(jQuery); // end jQuery