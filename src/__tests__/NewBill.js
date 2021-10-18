import { fireEvent, screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import { localStorageMock } from "../__mocks__/localStorage.js"
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"
import Bills from '../containers/Bills.js'
import userEvent from "@testing-library/user-event"

import NewBill from "../containers/NewBill.js"
import { ROUTES } from "../constants/routes.js"


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
      const html = NewBillUI()
      document.body.innerHTML = html

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

      const file = new File(['okokokok'], '20456790.jpg', { type: 'image/jpeg' })
      const expenseFile = screen.getByTestId("file")

      Object.defineProperty(expenseFile, 'files', {
        value: [file]
      })

      fireEvent.change(expenseFile)

      expect(expenseFile.files[0].name).toBe("20456790.jpg")
  
      const form = screen.getByTestId("form-new-bill")

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
  
      const newBill = new NewBill({ document, onNavigate, localStorage })

      const handleSubmit = jest.fn(newBill.handleSubmit)  

      form.addEventListener("submit", handleSubmit)
      fireEvent.submit(form)
      expect(handleSubmit).toHaveBeenCalled()
    })
    test("It should renders Bills page", () => {
      expect(screen.getAllByText('Mes notes de frais')).toBeTruthy()
    })
  })
})
