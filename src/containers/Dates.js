export const months = [
  {
    num: '01',
    shortName: 'Jan.',
    longName: 'January'
  },
  {
    num: '02',
    shortName: 'Fev.',
    longName: 'February'
  },
  {
    num: '03',
    shortName: 'Mar.',
    longName: 'March'
  },
  {
    num: '04',
    shortName: 'Avr.',
    longName: 'April'
  },
  {
    num: '05',
    shortName: 'Mai.',
    longName: 'May'
  },
  {
    num: '06',
    shortName: 'Jui.',
    longName: 'June'
  },
  {
    num: '07',
    shortName: 'Jui.',
    longName: 'July'
  },
  {
    num: '08',
    shortName: 'Aou.',
    longName: 'August'
  },
  {
    num: '09',
    shortName: 'Sep.',
    longName: 'September'
  },
  {
    num: '10',
    shortName: 'Oct.',
    longName: 'October'
  },
  {
    num: '11',
    shortName: 'Nov.',
    longName: 'November'
  },
  {
    num: '12',
    shortName: 'Dec.',
    longName: 'December'
  },
]

export const updateMonth = (data) => {
  data.forEach(bill => {
   const date = bill.date.split(' ')
   for (let i = 0; i < months.length; i++) {
     if (date[1] === months[i].shortName) {
       date.splice(1, 1, date[1].replace(`${date[1]}`, `${months[i].longName}`))
       const newDate = date.toString().replaceAll(',', ' ')
       bill.date = newDate
      } 
    }
  });
}

export const createDate = (data) => {
  data.forEach (bill => {
    bill.date = new Date(bill.date)
  })
}

export const sortDates = (data) => {
  const sortedData = data.sort(function(a,b) {
      return new Date(b.date) - new Date(a.date);
    });
    return sortedData
}