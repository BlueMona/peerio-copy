/**
 * Peerio passphrase generator
 *
 */
(function () {

  window.Peerio = window.Peerio || {};
  Peerio.PhraseGenerator = {};

  // dictionary for the language required will be loaded here
  var loadedDictionary = null;

  // building dictionary files list
  var base = 'js/peerio/phrase/dict/';
  var dicts = {};
  Peerio.PhraseGenerator.languages = [{
    name: 'English',
    value: 'en'
  }, {
    name: 'Čeština',
    value: 'cs'
  }, {
    name: '汉语',
    value: 'zh-CN'
  },{
    name: 'Deutsch',
    value: 'de'
  }, {
    name: 'Español',
    value: 'es'
  }, {
    name: 'Francais',
    value: 'fr'
  }, {
    name: 'Italiano',
    value: 'it'
  }, {
    name: '日本語',
    value: 'ja'
  }, {
    name: 'Magyar',
    value: 'hu'
  }, {
    name: 'Norsk (Bokmål)',
    value: 'nb-NO'
  }, {
    name: 'Português (Brasileiro)',
    value: 'pt-BR'
  }, {
    name: 'Русский',
    value: 'ru'
  }, {
    name: 'Türkçe',
    value: 'tr'
  }];

  Peerio.PhraseGenerator.languages.forEach(function (l) {
    dicts[l.value] = base + l.value + '.txt';
  });

  /**
   * Generates passphrase and returns it in callback
   * @param {string} lang - 2-letter language code
   * @param {Number} wordsCount - number of words in passphrase
   * @param {Function} callback
   */
  Peerio.PhraseGenerator.getPassPhrase = function (lang, wordsCount, callback) {
    if (loadedDictionary && loadedDictionary.lang === lang) {
      // to be consistently async in both cases when dict is cached or not yet
      window.setTimeout(function () {
        callback(generate(wordsCount));
      }, 0);
    } else {
      buildDict(lang, function () {
        callback(generate(wordsCount));
      });
    }
  };
  /**
   * Frees some RAM by cleaning cached dictionary.
   * Call this when PhraseGenerator is no longer needed.
   * PhraseGenerator is still usable after this call.
   */
  Peerio.PhraseGenerator.cleanup = function () {
    loadedDictionary = null;
  };

  function generate(wordsCount) {
    if (!loadedDictionary) return null;

    var phrase = '';
    for (var i = 0; i < wordsCount; i++)
      phrase += getRandomWord() + ' ';

    return phrase.trim().toLowerCase();
  }

  // asynchronously builds dictionary cache for specified language
  // executes callback when dictionary is ready
  function buildDict(lang, callback) {
    loadedDictionary = null;
    loadDict(dicts[lang], function (raw) {
      if (!raw) {
        callback();
        return;
      }
      // normalizing words
      var words = raw.split('\n');
      for (var i = 0; i < words.length; i++) {
        // removing leading/trailing spaces and ensuring lower case
        words[i] = words[i].trim();
        // removing empty strings
        if (words[i] === '') {
          words.splice(i, 1);
          i--;
        }
      }
      loadedDictionary = {lang: lang, dict: words};
      callback();
    });
  }

  // loads dict by url and return plaintext result in callback
  function loadDict(url, callback) {
    var xhr = new XMLHttpRequest();

    if (xhr.overrideMimeType)
      xhr.overrideMimeType('text/plain');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 0)
          callback(xhr.responseText);
        else
          callback(null);

      }
    };

    xhr.open('GET', url);
    xhr.send('');
  }

  function getRandomWord() {
    return loadedDictionary.dict[secureRandom(loadedDictionary.dict.length)];
  }

  function secureRandom(count) {
    var rand = new Uint32Array(1);
    var skip = 0x7fffffff - 0x7fffffff % count;
    var result;

    if (((count - 1) & count) === 0) {
      window.crypto.getRandomValues(rand);
      return rand[0] & (count - 1);
    }
    do {
      window.crypto.getRandomValues(rand);
      result = rand[0] & 0x7fffffff;
    } while (result >= skip);
    return result % count;
  }

}());
