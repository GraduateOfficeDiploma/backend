import dayjs from "dayjs";
// First field in db should be days amount of studying (0 from start)
// Second field should in db should be flag continue_studying which is set by admin

//let registration_year = getYearFromBD(user_id);
let registration_year = 2023;
//let continue_studying = getContinueStudyingFromDB(user_id);
let continue_studying = true;
let current_date = dayjs();
let start_flag = current_date.year() === registration_year;
let start_date, end_date;
let days_studying = 0;

let study_flag = false;

if (continue_studying === true) {
if (current_date.isAfter(current_date.month(9).date(1))) {
	if (start_flag === true) {
    start_date = current_date.month(9).date(1);
  }
  else {
  	start_date = current_date.month(8).date(1);
  }
  
  end_date = current_date.year(current_date.year() + 1).month(5).date(30);
  study_flag = true;
  
} else if ((current_date.isBefore(current_date.month(5).date(30))) && (current_date.isBefore(current_date.month(9).date(1)))) {
	if (start_flag === true) {
    start_date = current_date.year(current_date.year() - 1).month(9).date(1);
  }
  else {
  	start_date = current_date.year(current_date.year() - 1).month(8).date(1);
  }
  
  end_date = current_date.month(5).date(30);
  study_flag = true;
}


if (study_flag === true){
	days_studying = current_date.diff(start_date, 'day');
  //days_studying = getDaysFromDB() + 1;
}

console.log(days_studying)
}
