import { months } from "./Dates.js";


export const monthToLong = (data) => {
  // if (data) {
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
  // }
}

export const sortDates = (data) => {
  // if (data) {
  const sortedData = data.sort(function(a,b) {
      return new Date(b.date) - new Date(a.date);
    });
    return sortedData
  // }
}

export const monthToShort = (data) => {
  // if (data) {
  data.forEach(bill => {
   const date = bill.date.split(' ')
   for (let i = 0; i < months.length; i++) {
     if (date[1] === months[i].longName) {
       date.splice(1, 1, date[1].replace(`${date[1]}`, `${months[i].shortName}`))
       const newDate = date.toString().replaceAll(',', ' ')
       bill.date = newDate
      } 
    }
  });
// }
}

export const createDate = (data) => {
  data.forEach (bill => {
    bill.date = new Date(bill.date)
  })
}

export const filterData = (data, filteredData) => {
  data.forEach(bill => {
    if (bill.fileName !== null) {
      const fileExt = bill.fileName.split('.')[1]
      const condition1 = bill.date.match(/^\d{1,2}\s\w{3}\.\s\d{2}$/gmi) !== null
      const condition2 = fileExt === "png" || fileExt === "jpeg" || fileExt === "jpg"
  
      if (condition1 && condition2) {
        filteredData.push(bill)
      }
    }
  })
  return filteredData
}

export const filterByFileFormat = bill => {
    if (bill.fileName !== null) {
      const fileExt = bill.fileName.split('.')[1]
      const condition2 = fileExt === "png" || fileExt === "jpeg" || fileExt === "jpg"
      if (condition2) {
        return true 
      }
    }
}

export const handleError = () => {
  const input = document.querySelector(`input[data-testid="file"]`)
  input.classList.remove('blue-border')
  input.classList.add('red-border')
  const errorText = document.querySelector(`p[data-testid="errorFormat"]`)
  errorText.classList.remove('hidden')
  errorText.classList.add('redText')
}

export const handleResult = () => {
  const input = document.querySelector(`input[data-testid="file"]`)
  input.classList.remove('red-border')
  input.classList.add('blue-border')
  const errorText = document.querySelector(`p[data-testid="errorFormat"]`)
  errorText.classList.add('hidden')
  errorText.classList.remove('redText')
  input.classList.remove('red-border')
  input.classList.add('blue-border')
}