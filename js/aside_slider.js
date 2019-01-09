$("header").on("headerLoaded", function () {
  
  $('#b1').hide();

  function closeSidebar() {
    $('#main').removeClass('is-open');

    $('#b2').animate({
      width: '0px'
    }, { duration: 200, queue: true });
    $('#b1').animate({
      width: '100%'
    }, { duration: 200, queue: true });



    setTimeout(function () {
      $('#sidebar2').addClass('is-close');
      $('#b2').hide('slow');
      $('#b1').show('slow');
    }, 250);
    setTimeout(function () {
      $('#main').addClass('is-close');
    }, 1000);
  }

  function openSidebar() {
    $('#clients').css('pointer-events', 'none');
    $('#main').removeClass('is-close');
    $('#b1').animate({
      width: '0px'
    }, { duration: 200, queue: true });
    $('#b2').animate({
      width: '100%'
    }, { duration: 200, queue: true });

    setTimeout(function () {
      $('#b2').show('slow');
      $('#b1').hide('slow');
    }, 250);

    setTimeout(function () {
      $('#clients').css('pointer-events', 'auto');
    }, 1000);
    $('#sidebar').removeClass('is-close');

    setTimeout(function () {
      $('.sidebar input').css('pointer-events', '');
      $('#main').addClass('is-open');
    }, 1000);

  }

  var x = $('#clients').length;
  //console.log(x + "vsev");
  $('#clients').click(function () {
    if ($("#main").hasClass("is-open")) {
      $('#clients_text').text("Klienti")
      closeSidebar();

    }
    else {
      $('#clients_text').text("Voľní klienti")
      openSidebar();
    }
  });


});
