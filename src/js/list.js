import $ from 'jquery'

$('select').each(function () {
  const $this = $(this), 
    numberOfOptions = $(this).children('option').length;

  const $options = $('<ul />', {
    'class': 'pay-form__options-list list'
  }).insertAfter($this);

  for (let i = 0; i < numberOfOptions; i++) {
    $('<li />', {
      text: $this.children('option').eq(i).text(),
      rel: $this.children('option').eq(i).val()
    }).appendTo($options);
  }

  const $optionsItems = $options.children('li');

  $($this).mousedown(function (e) {
      e.stopPropagation()
      e.preventDefault()
      if ($($options).hasClass('visible')) {
        $($options).removeClass('visible')
      } else {
        $($options).addClass('visible')
      }
  })

  $optionsItems.mousedown(function (e) {
    const val = $(e.target).attr('rel')
    $($this).val(val)
    $($options).removeClass('visible')
  });

  $(document).mousedown(function (e) {
    if ($($options).hasClass('visible')) {
      $($options).removeClass('visible')
    }
  });
})