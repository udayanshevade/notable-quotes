'use strict';

/*
 * App Controller
 */

var appCtrl = {

  quotesAPI: {
    url: 'https://got-quotes.herokuapp.com/quotes'
  },

  currentQuote: {},

  init: function() {
    appView.init();
    this.initListeners();
    this.getQuote();
  },

  initListeners: function() {
    var _this = this;
    appView.refreshButton.addEventListener('click', function() {
      _this.getQuote();
    });
  },

  getQuote: function() {
    var _this = this;
    appView.quoteContainer.style.opacity = 0;
    appView.animateSpin();
    $.ajax({
      headers: {
        "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat='
    }).done(function(response) {
      var data = JSON.parse(response);
      _this.parseQuote(data);
    }).fail(function(err) {
      _this.parseQuote({
        quote: 'A quote could not be found.',
        author: '',
        category: ''
      });
    });
  },

  parseQuote: function(data) {
    console.log(data);
    this.currentQuote.quote = data.quote;
    this.currentQuote.author = data.author;
    this.currentQuote.category = data.category;

    appView.displayQuote();
  },

};


/*
 * App View
 */
var appView = {

  init: function() {
    this.queryElements();
  },

  queryElements: function() {
    this.quoteContainer = document.getElementById('quote-info');
    this.quoteEl = document.getElementById('quote');
    this.quoteAuthorEl = document.getElementById('author');
    this.categoryEl = document.getElementById('category');
    this.refreshButton = document.getElementById('refresh');
    this.refreshIcon = document.getElementById('refresh-icon');
    this.tweetButton = document.getElementById('tweet');
    this.tweetLink = document.getElementById('tweet-link');
  },

  displayQuote: function() {
    this.quoteEl.innerHTML = appCtrl.currentQuote.quote;
    this.quoteAuthorEl.innerHTML = appCtrl.currentQuote.author;
    this.categoryEl.innerHTML = appCtrl.currentQuote.category;

    var quoteText = appCtrl.currentQuote.quote.split(' ').join('+');

    this.fadeIn(this.quoteContainer);
    this.stopSpin();

    this.tweetLink.setAttribute('href',
      'https://twitter.com/intent/tweet?text="' +
        quoteText + '&hashtags=' + appCtrl.currentQuote.category);
  },

  fadeIn: function(el) {
    el.style.opacity = 0;

    var last = +new Date();
    var tick = function() {
      el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
      last = +new Date();

      if (+el.style.opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
      }
    };

    tick();
  },

  animateSpin: function() {
    if (this.refreshIcon.classList) {
      this.refreshIcon.classList.add('spinning');
    } else {
      this.refreshIcon.className += 'spinning';
    }
  },

  stopSpin: function() {
    if (this.refreshIcon.classList) {
      this.refreshIcon.classList.remove('spinning');
    } else {
      this.refreshIcon.className = this.refreshIcon.className.replace(new RegExp('(^|\\b)' + 'spinning'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

};

appCtrl.init();