//טעינה של כל הערים לתוך הרשימה
fetch('./js/israel-cities.json').then(res =>
        res.json() //json אני אומר לפקודה שהקובץ מסוג 
    ).then((data) => { //כל הפריטים בתוך הקובץ
        let options = ``
        data.forEach(item => {
            options += `<option>${item.engName}</option>`
        })
        document.querySelector(`#cities`).innerHTML = options
    })
    .catch((error) => { //לא הצלחתי למצוא ונתקלתי בשגיאה
        console.log('error', error)
    })

    