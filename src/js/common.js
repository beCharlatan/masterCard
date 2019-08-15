import $ from 'jquery'

// validation's functions
const required = val => !!val;
const regExValidator = regEx => str => {
  for (let i = 0, limit = str.length; i < limit; i++) {
    if (!regEx.test(str[i])) return false;
  }
  return true;
}
const graterThan = len => str => str.length >= len;
const numLen = len => str => str.length === len;

// form mask
const formCfg = [
  {
    id: "card-number-1",
    validators: [
      required,
      numLen(4)
    ]
  },
  {
    id: "card-number-2",
    validators: [
      required,
      numLen(4)
    ]
  },
  {
    id: "card-number-3",
    validators: [
      required,
      numLen(4)
    ]
  },
  {
    id: "card-number-4",
    validators: [
      required,
      numLen(4)
    ]
  },
  {
    id: "card-owner",
    validators: [
      required,
      regExValidator(/[A-Z| ]/),
      graterThan(4)
    ]
  },
  {
    id: "card-cvc",
    validators: [
      required,
      regExValidator(/[0-9]/),
      numLen(3)
    ]
  }
]

// validate function
const validate = (id, validators) => () => {
  let val = $(`#${id}`).val();
  console.log(val, 'val')

  for (let j = 0, limit = validators.length; j < limit; j++) {
    const fn = validators[j]
    console.log(fn, 'validator')
    const validatorResult = fn(val);
    console.log(validatorResult, 'result')
    if (!validatorResult) return false;
  }

  return true;
}

$(document).ready(function () {

  for (let i = 0, limit = formCfg.length; i < limit; i++) {
    const { id, validators } = formCfg[i];

    // remove error style with focus
    $(`#${id}`).focus(() => {
      $(`#${id}`).removeClass('pay-form__input--error')
    })

    // check if valid after blur
    $(`#${id}`).blur(() => {
      const result = validate(id, validators).call(null)
      console.log(result, 'RESULT')
      if (!result) {
        $(`#${id}`).addClass('pay-form__input--error')
      }
    })

    // if input valid, wait 1s and jump to next input
    $(`#${id}`).keyup(() => {
      const result = validate(id, validators).call(null)
      if (result) {
        // wait for 1s
        const timer = setTimeout(() => {
          const nextInput = $(`#${formCfg[i + 1]['id']}`)
          // if next input exist jump to it
          return nextInput && nextInput.focus()
        }, 1000)
        // if user keep on printing, clrear timer
        $(`#${id}`).keyup(() => clearInterval(timer))
      }
    })
  }
})
