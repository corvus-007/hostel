document.addEventListener('DOMContentLoaded', function() {

  /*================================
  =            Main nav            =
  ================================*/

  var navbar = document.querySelector('.navbar');
  var mainNav = document.querySelector('.main-nav');
  var toggleMenu = document.querySelector('.main-nav__toggle');
  var windowPos = 0;
  var windowHeight = document.documentElement.clientHeight;
  var docHeight = $(document).height();
  var aArray = $(mainNav).find('a[href^="#"]').map(function(index, elem) {
    // return $(this).attr('href');
    if (this.hash) {
      return this.hash;
    }
  });
  var aArrayLenght = aArray.length;
  var theID = '';
  var divPos = 0;
  var divHeight = 0;

  mainNav.classList.remove('main-nav--no-js');

  if (toggleMenu) {
    toggleMenu.addEventListener('click', function(event) {
      event.preventDefault();
      mainNav.classList.toggle('main-nav--closed');
      toggleMenu.classList.toggle('is-active');
    });
  }

  $(navbar).sticky({
    zIndex: 20
  });

  $(mainNav).on('click', 'a[href^="#"]', function(event) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top
      }, 500);
    }
  });

  $(window).scroll(function() {
    windowPos = pageYOffset + 1;
    for (var i = 0; i < aArrayLenght; i++) {
      theID = aArray[i];
      divPos = $(theID).offset().top;
      divHeight = $(theID).height();
      if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
        $("a[href='" + theID + "']").closest('li').addClass("is-active");
      } else {
        $("a[href='" + theID + "']").closest('li').removeClass("is-active");
      }
    }
  });

  /*=====  End of Main nav  ======*/


  $('.js-tabs').tabslet();

  $('.js-gallery-tabs').tabslet();
  $('.js-gallery-tabs').on('_after', function() {
    $('.gallery-slider:visible').slick('refresh');
  });

  var partnersSlider = document.querySelector('.partners-slider');

  if (partnersSlider) {
    $(partnersSlider).slick({
      autoplay: true,
      accessibility: false,
      slidesToShow: 5,
      variableWidth: true,
      // centerMode: true,
      responsive: [{
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
        }
      }, {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
          // arrows: false,
          variableWidth: false,
        }
      }]
    });
  }

  $('.gallery-slider').slick({
    accessibility: false,
    dots: true,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1290,
      settings: {
        slidesToShow: 3,
        // slidesToScroll: 3,
      }
    }, {
      breakpoint: 567,
      settings: {
        slidesToShow: 1,
        // slidesToScroll: 1,
        arrows: false
      }
    }]
  });

  $('.gallery [data-fancybox]').fancybox({
    loop: false,
    afterMove: function(instance, slide) {
      $('.gallery-slider:visible').slick('slickGoTo', instance.currIndex - 1);
    }
  });

  $('.reviews-slider').slick({
    accessibility: false,
    dots: true,
    infinite: false,
    responsive: [{
      breakpoint: 567,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      }

    }]
  });


  /*=================================
  =            Accordion            =
  =================================*/

  var $accordion = $('.js-accordion');

  if ($accordion.length) {
    $accordion.find('dd').hide();
    $accordion.on('click', 'dt', function(event) {
      event.preventDefault();

      $accordion
        .find('dt')
        .not($(this))
        .removeClass('is-opened')
        .next('dd')
        .slideUp();

      if (!$(this).hasClass('is-opened')) {
        $(this).addClass('is-opened');
        $(this).next('dd').stop().slideDown();
      } else {
        $(this).removeClass('is-opened');
        $(this).next('dd').stop().slideUp();
      }


      // $accordion.find('dd').not('.is-opened + dd');
    });
  }

  /*=====  End of Accordion  ======*/


  /*==================================
  =            Input mask            =
  ==================================*/

  $('input[type="tel"]').mask("+7 (999) 999-99-99", {});

  /*=====  End of Input mask  ======*/

});

var width = 0;
var mapCenter = null;

$(window).ready(function() {
  resizeContactsMap();
  ymaps.ready(init);
});

function resizeContactsMap() {
  width = document.documentElement.clientWidth;

  if (width > 1020) {
    mapCenter = [55.762811821494296, 37.628705698486314];
  } else {
    mapCenter = [55.763842, 37.614545];
  }
}

var myMap,
  point = [55.763842, 37.614545];

function init() {
  var pointA = [55.765688, 37.608129],
    pointB = [55.763842, 37.614545],
    pointC = [55.756896, 37.615373],
    pointD = [55.761507, 37.624516],
    pointE = [55.767939, 37.621884];
  multARoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: [
      pointA,
      pointB
    ],
    params: {
      routingMode: 'pedestrian'
    }
  }, {});
  multCRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: [
      pointC,
      pointB
    ],
    params: {
      routingMode: 'pedestrian'
    }
  }, {});
  multDRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: [
      pointD,
      pointB
    ],
    params: {
      routingMode: 'pedestrian'
    }
  }, {});
  multERoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: [
      pointE,
      pointB
    ],
    params: {
      routingMode: 'pedestrian'
    }
  }, {});
  myMap = new ymaps.Map("contacts-map", {
    center: mapCenter,
    zoom: 15,
    controls: ["zoomControl", "fullscreenControl"]
  });

  // myMap.behaviors.disable('drag');

  myMap.geoObjects.add(multARoute);
  myMap.geoObjects.add(multCRoute);
  myMap.geoObjects.add(multDRoute);
  myMap.geoObjects.add(multERoute);
  myMap.behaviors.disable('scrollZoom');
};
