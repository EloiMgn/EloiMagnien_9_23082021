import { months } from "./Dates.js";


export const monthToLong = (data) => {
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

export const monthToShort = (data) => {
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
