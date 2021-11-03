import { fireEvent, screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import { localStorageMock } from "../__mocks__/localStorage.js"
import NewBill from "../containers/NewBill.js"
import { ROUTES } from "../constants/routes.js"
import firebase from "../__mocks__/firebase.js"


describe("Given I am on NewBill page", () => {
  describe("When I do not fill fields and I click on submit button", () => {
    test("Then it should renders NewBill Page ", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      const expenseName = screen.getByTestId("expense-name")
      expect(expenseName.value).toBe("")

      const expenseAmount = screen.getByTestId("amount")
      expect(expenseAmount.value).toBe("")

      const expenseVat = screen.getByTestId("vat")
      expect(expenseVat.value).toBe("")

      const expensePct = screen.getByTestId("pct")
      expect(expensePct.value).toBe("")

      const form = screen.getByTestId("form-new-bill")
      const handleSubmit = jest.fn(e => e.preventDefault())  

      form.addEventListener("submit", handleSubmit)
      fireEvent.submit(form) 

      expect(screen.getByText('Envoyer une note de frais')).toBeTruthy()
    })
  })
  describe('When I do fill fields in correct format and I click on submit button', () => {
    test(('Then it should create a new bill'), () => {

      // Set New Bill html 
      const html = NewBillUI()
      document.body.innerHTML = html

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))

    // localStorage should be populated with form data
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null)
      },
      writable: true
    })

    const onNavigate = (pathname) => {
      document.body.innerHTML = ROUTES({ pathname })
    }

    const firestore = null
      const newbill = new NewBill({
        document,
        onNavigate,
        firestore,
        localStorage: window.localStorage
      })

      // fill inputs fields with correct format 
      const expenseName = screen.getByTestId("expense-name")
      fireEvent.change(expenseName, { target: { value: "Test Expense" } })
      expect(expenseName.value).toBe("Test Expense")

      const expenseDate = screen.getByTestId("datepicker")
      fireEvent.change(expenseDate, { target: { value: "2021-10-11" } })
      expect(expenseDate.value).toBe("2021-10-11")

      const expenseAmount = screen.getByTestId("amount")
      fireEvent.change(expenseAmount, { target: { value: "550" } })
      expect(expenseAmount.value).toBe("550")

      const expenseVat = screen.getByTestId("vat")
      fireEvent.change(expenseVat, { target: { value: "20" } })
      expect(expenseVat.value).toBe("20")

      const expensePct = screen.getByTestId("pct")
      fireEvent.change(expensePct, { target: { value: "5" } })
      expect(expensePct.value).toBe("5")

      const expenseCommentary = screen.getByTestId("commentary")
      fireEvent.change(expenseCommentary, { target: { value: "Test Commentary" } })
      expect(expenseCommentary.value).toBe("Test Commentary")


      // fill input file with correct format
      const file = new File(['okokokok'], '20456790.jpg', { type: 'image/jpeg' })
      const expenseFile = screen.getByTestId("file")

      Object.defineProperty(expenseFile, 'files', {
        value: [file]
      })

      // set fileType to the correct format 
      newbill.fileType = "image/jpeg"

      const handleChangeFile = jest.fn(newbill.handleChangeFile)  
      
      expenseFile.addEventListener('change', handleChangeFile)
      fireEvent.change(expenseFile)
 
      expect(handleChangeFile).toHaveBeenCalled()
      expect(expenseFile.files[0].name).toBe("20456790.jpg")
  
      // Submit form
      const form = screen.getByTestId("form-new-bill")

      const handleSubmit = jest.fn(e => e.preventDefault())  

      form.addEventListener("submit", handleSubmit)
      fireEvent.submit(form)

      expect(handleSubmit).toHaveBeenCalled()
    })
    test("It should renders Bills page", () => {
      expect(screen.getAllByText('Mes notes de frais')).toBeTruthy()
    })

  })
  describe('When I do fill fields in correct format but I add an incorrect image format and I click on submit button', () => {
    test(('Then it should not renders Bills page'), () => {

      // set New Bill page
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))

      const html = NewBillUI()
      document.body.innerHTML = html

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
     
      const firestore = null
      const newbill = new NewBill({
        document,
        onNavigate,
        firestore,
        localStorage: window.localStorage
      })

      // fill input fields in correct format 
      const expenseName = screen.getByTestId("expense-name")
      fireEvent.change(expenseName, { target: { value: "Test Expense" } })
      expect(expenseName.value).toBe("Test Expense")

      const expenseDate = screen.getByTestId("datepicker")
      fireEvent.change(expenseDate, { target: { value: "2021-10-11" } })
      expect(expenseDate.value).toBe("2021-10-11")

      const expenseAmount = screen.getByTestId("amount")
      fireEvent.change(expenseAmount, { target: { value: "550" } })
      expect(expenseAmount.value).toBe("550")

      const expenseVat = screen.getByTestId("vat")
      fireEvent.change(expenseVat, { target: { value: "20" } })
      expect(expenseVat.value).toBe("20")

      const expensePct = screen.getByTestId("pct")
      fireEvent.change(expensePct, { target: { value: "5" } })
      expect(expensePct.value).toBe("5")

      const expenseCommentary = screen.getByTestId("commentary")
      fireEvent.change(expenseCommentary, { target: { value: "Test Commentary" } })
      expect(expenseCommentary.value).toBe("Test Commentary")

      // fill file input in incorrect format (image/gif)

      const file = new File(['okokokok'], 'nyan-cat-gif-1.gif', { type: 'image/gif' })
      const expenseFile = screen.getByTestId("file")

      Object.defineProperty(expenseFile, 'files', {
        value: [file]
      })

      // set fileType to the incorrect format 
      newbill.fileType = "image/gif"

      const handleChangeFile = jest.fn(newbill.handleChangeFile)  
      
      expenseFile.addEventListener('change', handleChangeFile)
      fireEvent.change(expenseFile)
 
      expect(handleChangeFile).toHaveBeenCalled()
      expect(expenseFile.files[0].name).toBe("nyan-cat-gif-1.gif")
  
      // Submit form
      const form = screen.getByTestId("form-new-bill")

      const handleSubmit = jest.fn(e => e.preventDefault())  

      form.addEventListener("submit", handleSubmit)
      fireEvent.submit(form)

      expect(handleSubmit).toHaveBeenCalled()
    })
    test("I should stay on New Bill page", () => {
      expect(screen.getAllByText('Envoyer une note de frais')).toBeTruthy()
    })
    test("Input File Border should be red", () => {
      const expenseFile = screen.getByTestId("file")
      expect(expenseFile.classList.contains("red-border")).toBeTruthy()
    })
    test("Error should be showed", () => {
      const errorText = screen.getByTestId("errorFormat")
      expect(errorText.classList.contains("redText")).toBeTruthy()
      expect(errorText.classList.contains("hidden")).toBeFalsy()
    })
  }) 
})


// test d'intégration POST
describe("test POST method NewBill", () => {
  test("it should return array of bills when pass good param", async () => {
    const param = {
      "id": "qcCK3SzECmaZAGRrHjaC",
      "status": "refused",
      "pct": 20,
      "amount": 200,
      "email": "a@a",
      "name": "test2",
      "vat": "40",
      "fileName": "preview-facture-free-201801-pdf-1.jpg",
      "date": "2002-02-02",
      "commentAdmin": "pas la bonne facture",
      "commentary": "test2",
      "type": "Restaurants et bars",
      "fileUrl": "https://firebasestorage.googleapis.com/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=4df6ed2c-12c8-42a2-b013-346c1346f732"
    }
      const postSpy = jest.spyOn(firebase, "post")
      const bills = await firebase.post(param)
      expect(postSpy).toHaveBeenCalledTimes(1)
      expect(bills.data.length).toBe(1)
      expect(bills.data[0]).toEqual(param)
  })
  test("it should return null when pass wrong param", async () => {
    const param = [243, "string", [1, 2, 3]]
      const postSpy = jest.spyOn(firebase, "post")
      for (let i = 0; i < param.length; i++) {
        const el = param[i];
        const bills = await firebase.post(el)
        expect(bills.data).toBeNull()
      }
  })
})



