document.addEventListener('DOMContentLoaded', function() {
  /*====================================
  =            Inline popup            =
  ====================================*/

  // $('.js-trigger-inline-popup').magnificPopup({
  //   mainClass: 'popup-fade',
  //   removalDelay: 300
  // });

  /*=====  End of Inline popup  ======*/

  $('.js-tabs').tabslet();

  $('.js-gallery-tabs').tabslet();
  $('.js-gallery-tabs').on('_after', function(x, y) {
    $('.gallery-slider').slick('refresh');
  });

  var gallerySliderOptions = {
    accessibility: false,
    dots: true,
    infinite: false,
    slidesToShow: 3,
    // slidesToScroll: 1,
    responsive: [{
      breakpoint: 767,
      settings: {
        centerMode: true,
      }}, {
        breakpoint: 567,
      settings: {
        slidesToShow: 1,
        arrows: false
      }
    }]
  }

  $('.gallery-slider').slick(gallerySliderOptions);

  $('.gallery [data-fancybox]').fancybox({
    loop: false,
    afterMove: function(instance, slide) {
      // console.log(instance)
      // console.log(slide)
      // console.log($('.gallery-slider:visible'))
      $('.gallery-slider:visible').slick('slickGoTo', instance.currIndex - 1)
    }
  });

});
