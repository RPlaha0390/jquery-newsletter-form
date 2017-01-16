/* global $ */
'use strict';

$(document).ready(function() {
  var 
  	requiredAttributes = {
    $favouriteMusic: 'contest1_name',
    $firstName: 'first_name',
    $country: 'country',
    $email: 'email',
    $birthDay: 'birth_day',
    $birthMonth: 'birth_month',
    $birthYear: 'birth_year',
    $privacyCheck: 'privacy_check'
  },
  $submit = $('.submit');

  // click function for validation
  $submit.on('click', function() {

  	var 
  		$email = $('input[name="email"]'),
  		$day = $('select[name="birth_day"]'), 
  		$month = $('select[name="birth_month"]'),
  		$year = $('select[name="birth_year"]');

    $.each(requiredAttributes, function(key, value) {
      var attributeName = $('[name="' + value + '"]');

      if (attributeName.val() === '') {
        $('[name="' + value + '"]')
          .addClass('error')
          .prev()
          .addClass('js-show');
      } else if (attributeName.val()) {
        $('[name="' + value + '"]')
          .removeClass('error')
          .prev()
          .removeClass('js-show');
      }
    });

    function getAge(dateString) {
      var 
      	today = new Date(),
      	birthDate = new Date(dateString),
      	yearAge = today.getFullYear() - birthDate.getFullYear(),
      	month = today.getMonth() - birthDate.getMonth();

      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
          yearAge--;
      }
      return yearAge;
    }

    if (getAge($year.val() + '/' + $month.val() + '/' + $day.val()) < 14) {
    	$year.addClass('error');
    	$month.addClass('error');
    	$day.addClass('error');
    	$('.age-error').addClass('js-show');
    } else {
    	$('.age-error').removeClass('js-show');
    }

    function ValidateEmail(email) {
      var expr = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return expr.test(email);
    };

    if ((!ValidateEmail($email.val())) && $email.val()) {
      $email.addClass('error');
      $('.email-error').addClass('js-show');
    }
    else {
    	$email.removeClass('error');
    	$('.email-error').removeClass('js-show');
    }

  });
});
