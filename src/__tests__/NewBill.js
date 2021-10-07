import { fireEvent, screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"


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
  
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
  
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
  
      const html = BillsUI({ data: bills })
      document.body.innerHTML = html
  
      const bill = new Bills({ document, onNavigate, localStorage })
      const handleClick = jest.fn(bill.handleClickNewBill)
      const btnNewBill = screen.getByTestId("btn-new-bill")
  
      btnNewBill.addEventListener('click', handleClick)
      userEvent.click(btnNewBill)
      
      expect(handleClick).toHaveBeenCalled()
      expect(screen.getByText('Envoyer une note de frais')).toBeTruthy()
    })
  })
})



