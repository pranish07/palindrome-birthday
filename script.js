function reverseStr(str) {
  var listOfChars = str.split("");
  var reverseListOfChars = listOfChars.reverse();

  var reversedStr = reverseListOfChars.join("");

  return reversedStr;
}

function isPalindromeDate(str) {
  var rev = reverseStr(str);

  return str === rev;
}

function convertDateToStr(date) {
  var dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();
  return dateStr;
}

function getAllDates(date) {
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeAllDateFormats(date) {
  var dateFormats = [
    "ddmmyyyy",
    "mmddyyyy",
    "yyyymmdd",
    "ddmmyy",
    "mmddyy",
    "yymmdd",
  ];

  var listOfPalindromes = getAllDates(date);

  var isPalindrome = false;

  for (var i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindromeDate(listOfPalindromes[i])) {
      isPalindrome = true;
      break;
    }
  }

  return [isPalindrome, dateFormats[i]];
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }

  if (year % 100 === 0) {
    return false;
  }

  if (year % 4 === 0) {
    return true;
  }

  return false;
}

function incrementDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = month + 1;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = month + 1;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month = month + 1;
    }
  }

  if (month > 12) {
    month = 1;
    year = year + 1;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  var countDays = 0;
  var nextDate = incrementDate(date);

  while (1) {
    countDays = countDays + 1;
    var isPal = checkPalindromeAllDateFormats(nextDate);

    if (isPal[0]) {
      break;
    }

    nextDate = incrementDate(nextDate);
  }

  return [countDays, nextDate, isPal[1]];
}

function decrementDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 3) {
    if (isLeapYear(year)) {
      if (day < 1) {
        day = 29;
        month = month - 1;
      }
    } else {
      if (day < 1) {
        day = 28;
        month = month - 1;
      }
    }
  }

  if (day < 1) {
    month = month - 1;
    if (month < 1) {
      year = year - 1;
      month = 12;
      day = daysInMonth[month - 1];
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPrevPalindromeDate(date) {
  var countDaysPrev = 0;
  var prevDate = decrementDate(date);

  while (1) {
    countDaysPrev = countDaysPrev + 1;
    var isPal = checkPalindromeAllDateFormats(prevDate);

    if (isPal[0]) {
      break;
    }

    prevDate = decrementDate(prevDate);
  }

  return [countDaysPrev, prevDate, isPal[1]];
}

function getNearestPalindrome(date) {
  const prev = getPrevPalindromeDate(date);
  const next = getNextPalindromeDate(date);

  if (prev[0] < next[0]) {
    return prev;
  } else {
    return next;
  }
}


const dateInput = document.querySelector("#dob-input");
const checkBtn = document.querySelector("#check-dob");
const showOutput = document.querySelector("#output");
const loading = document.querySelector("#loading");

function clickHandler() {
  showOutput.style.display = "block";
  const bday = dateInput.value;
  if (bday != "") {
    var dateItems = bday.split("-");
    var date = {
      day: Number(dateItems[2]),
      month: Number(dateItems[1]),
      year: Number(dateItems[0]),
    };

    var checkPal = checkPalindromeAllDateFormats(date);

    if (checkPal[0]) {
      showOutput.style.color = "#84CC16";
      showOutput.innerText =
        "Yayy!! Your birthday is a palindrome in the format: " +
        checkPal[1] +
        "🎉🎉🎉";
    } else {
      var [ctr, nearDate, frmt] = getNearestPalindrome(date);
      // console.log("nearest date", nearDate);
      // console.log("date in input",date);
      // console.log("date format", frmt);
      if (ctr == 1) {
        showOutput.style.color = "red";
        showOutput.innerText =
          "Sorry, your birthday is not a palindrome" +
          " 😭😭😭" +
          "\n" +
          ` But don't worry! Your nearest palindrome date is: ${nearDate.day}-${nearDate.month}-${nearDate.year}, if you rearrange in the format: ${frmt} and you just missed it by: ${ctr} day!`;
      } else {
        showOutput.style.color = "red";
        showOutput.innerText =
          "Sorry, your birthday is not a palindrome" +
          " 😭😭😭" +
          "\n" +
          ` But don't worry! Your nearest palindrome date is: ${nearDate.day}-${nearDate.month}-${nearDate.year}, if you rearrange in the format: ${frmt} and you just missed it by: ${ctr} days!`;
      }
    }
  } else {
    showOutput.style.color = "red";
    showOutput.innerText = "Date cannot be empty";
  }
}

checkBtn.addEventListener("click", () => {
  if (dateInput.value === "") {
    showOutput.style.color = "red";
    showOutput.innerText = "Date cannot be empty";
  } else {
    showOutput.style.display = "none";
    loading.style.display = "block";
    setTimeout(() => {
      loading.style.display = "none";
      clickHandler();
    }, 4700);
  }
});
