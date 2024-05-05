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
});
