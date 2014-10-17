$(document).ready(function() {

  // Add ! every time click on 'Turn the music up'
  $('.hero-content h3').click(function() {
    subText = $(this).text();
    $(this).text(subText + "!");
  });

  // highlight 'Turn the music up' when hovering
  $('.hero-content h3').hover(function() {
      $(this).toggleClass('hover-highlight');
  });

  // animate the selling points when hovering
  var onHoverAction = function(event) {
    console.log('Hover action triggered.');
    $(this).animate({'margin-top': '10px'});
  };
  var offHoverAction = function(event) {
    console.log('Off-Hover action triggered.');
    $(this).animate({'margin-top': '0px'});
  };
  $('.selling-points .point').hover(onHoverAction, offHoverAction);

  // fade-out logo when click on it
  $('.logo').click(function() {
    $(this).fadeOut('slow');
  });

});