$(function () {
  const amenities = {};
  $('.amenities .popover input').on('change', function () {
    $amenity = $(this);
    $checke = $amenity.prop('data-id');
    $id = $amenity.attr('data-id');
    $name = $amenity.attr('data-name');
    if ($amenity.is(':checked')) {
      amenities[$id] = $name;
    } else {
      delete amenities[$id];
    }
    let str = '';
    const names = Object.values(amenities);
    for (let i = 0; i < names.length; i++) {
      if (i !== 0 && i !== names.length) {
        str += ', ';
      }
      str += names[i];
    }
    const maxLength = 50;
    if (str.length > maxLength) {
      str = str.substring(0, maxLength) + '...';
    }
    $('.amenities h4').html(str);
  });

  $.ajax({
    method: 'GET',
    url: 'http://localhost:5001/api/v1/status/',
    success: function (status) {
      $api = $('#api_status');
      $api.addClass('available');
    },
    error: function () {
      $api = $('#api_status');
      $api.removeClass('available');
    }
  });

  $.ajax({
    type: "POST",
    url: "http://localhost:5001/api/v1/places_search/",
    data: JSON.stringify({}),
    contentType: "application/json",
    success: function (places) {
      $section = $('.places');
      for (let place of places) {
        $section.append('<article></article>');
        $article = $('article').last();
        $article.append('<div class="title_box">');
        $titleBox = $('.title_box').last();
        $titleBox.append(`<h2>${place.name}</h2>`);
        $titleBox.append(`<div class="price_by_night">$${place.price_by_night}</div>`);
        $article.append('<div class="information"></div>');
        $information = $article.find('.information');
        if (place.max_guest === 1) {
          $information.append(`<div class="max_guest">${place.max_guest} Guest</div>`);
        } else {
          $information.append(`<div class="max_guest">${place.max_guest} Guests</div>`);
        }
        if (place.number_rooms === 1){
          $information.append(`<div class="number_rooms">${place.number_rooms} Bedroom</div>`);
        } else {
          $information.append(`<div class="number_rooms">${place.number_rooms} Bedrooms</div>`);
        }
        if (place.number_bathrooms === 1){
          $information.append(`<div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>`);
        } else {
          $information.append(`<div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>`);
        }
        $article.append(`<div class="description">${place.description}</div>`);
      }
    }
  });
});
