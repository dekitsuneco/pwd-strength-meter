// Caching DOM:
const passwordInput = document.querySelector('.pwd-meter__pwd');
const weaknessInfo = document.querySelector('.pwd-meter__verdict');
// Functions:
const checkLength = (pwd) => {
  const hasProperLength = pwd.length < 5;
  return hasProperLength ? 'is too short.' : '';
};

const checkDigitPresence = (pwd) => {
  const hasDigits = /\d/.test(pwd);

  return hasDigits ? '' : 'must contain digits.';
};

const checkLetterPresence = (pwd) => {
  const hasAlphabeticChar = /[a-zA-Z]/.test(pwd);

  return hasAlphabeticChar ? '' : 'must contain letters.';
};

const checkLowercaseLetterPresence = (pwd) => {
  const hasLowercaseChar = /[a-z]/.test(pwd);

  return hasLowercaseChar ? '' : 'must contain lowercase letters.';
};

const checkUppercaseLetterPresence = (pwd) => {
  const hasUppercaseChar = /[A-Z]/.test(pwd);

  return hasUppercaseChar ? '' : 'must contain uppercase letters.';
};

const checkSpecialCharPresence = (pwd) => {
  const hasSpecialChar = /[^a-zA-Z\d\s]/.test(pwd);

  return hasSpecialChar ? '' : 'must contain special characters.';
};

const checkDoubledWordsPresence = (pwd) => {
  const hasDoubledWords = /\b(\w+).?\1\b/.test(pwd);

  return !hasDoubledWords ? '' : 'must not contain doubled words.';
};
const checkConsecutiveCharPresence = (pwd) => {
  const hasConsecutiveChar = /(.)\1{1}/.test(pwd);

  return !hasConsecutiveChar ? '' : 'must not contain consecutive characters.';
};

// Logic:
const weaknessChecks = [
  checkLength,
  checkDigitPresence,
  checkLetterPresence,
  checkLowercaseLetterPresence,
  checkUppercaseLetterPresence,
  checkConsecutiveCharPresence,
  checkSpecialCharPresence,
  checkDoubledWordsPresence
];

passwordInput.addEventListener('input', () => {
  weaknessInfo.innerHTML = '';
  const password = passwordInput.value;

  if (password.length === 0) {
    document.documentElement.style.setProperty('--strength', 0);
  } else {
    const updateVerdictsDisplay = () => {
      verdicts.map((verdict) => {
        weaknessInfo.innerHTML += `<p>Your password ${verdict}</p>`;
      });
    };

    const updateMeterBar = () => {
      const meterColors = {
        low: 'rgb(242, 97, 97)',
        medium: 'rgb(148,97,242)',
        high: 'rgb(97, 242, 199)',
      };

      const setMeterColor = (color) => {
        document.documentElement.style.setProperty('--bgc', `${color}`);
      };

      document.documentElement.style.setProperty(
        '--strength',
        `${Math.round(strengthValue)}%`,
      );

      if (strengthValue > 0 && strengthValue < 45) {
        setMeterColor(meterColors.low);
      } else if (strengthValue > 45 && strengthValue < 75) {
        setMeterColor(meterColors.medium);
      } else {
        setMeterColor(meterColors.high);
      }
    };

    const checkResults = weaknessChecks.map((check) => check(password));
    const verdicts = checkResults.filter((result) => result !== '');
    const strengthValue = 100 - verdicts.length / (weaknessChecks.length / 100);

    updateVerdictsDisplay();
    updateMeterBar();
  }
});
