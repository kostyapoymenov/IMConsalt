$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    nav: true,
    margin: 20
  });


  numberUp();
  scroll();
  burger();

  function numberUp(){
    var show = true;
    $(window).on("scroll load resize", function () {
      if (!show) return false;
      var h_scroll = $(window).scrollTop() + 400;
      var elem_top = $('.advant').offset().top;
      if(h_scroll >= elem_top){
        $('.advantage-block__num').each(function () {
          $(this).prop('Counter',0).animate({
           Counter: $(this).data('num')
           }, {
            duration: 1000,
            easing: 'linear',
            step: function (now) {
               $(this).text(Math.ceil(now));
            }
          });
          show = false;
       });    
      }
    });
  }

  function scroll(){
    var linkNav = document.querySelectorAll('[href^="#"]'),
        V = 0,
        d = 90; // высота header
    for (var i = 0; i < linkNav.length; i++) {
        linkNav[i].addEventListener('click', function(e) {
            e.preventDefault();
            var w = window.pageYOffset - d,
                hash = this.href.replace(/[^#]*(.*)/, '$1'),
                t = document.querySelector(hash).getBoundingClientRect().top,
                start = null;
            requestAnimationFrame(step);
            function step(time) {
                if (start === null) start = time;
                var progress = time - start,
                    r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
                window.scrollTo(0,r);
                if (r != w + t) {
                    requestAnimationFrame(step)
                } else {
                    location.hash = hash
                }
            }
        }, false);
    }
  }

  function burger(){
    const   burgerBtn = $('.burger'),
            burgerItem = $('.burger-nav__link'),
            burgerMenu = $('.burger-menu');

    burgerBtn.on('click', function(){
      burgerBtn.toggleClass('burger--active');
      burgerMenu.toggleClass('burger-menu--active');
      if(burgerBtn.hasClass('burger--active')){
        $('body').addClass('body-hidden');
      } else {
        $('body').removeClass('body-hidden');
      }
    });

    burgerMenu.on('click', function(event){
      var target = event.target;

      for(var i = 0; i < burgerItem.length; i++){
        if(target == burgerItem[i]){
          burgerBtn.removeClass('burger--active');
          burgerMenu.removeClass('burger-menu--active');
          $('body').removeClass('body-hidden');
          scroll(burgerItem[i]);
        }
      }
    });
  }

});