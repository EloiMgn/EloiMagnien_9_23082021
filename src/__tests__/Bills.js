import { screen } from "@testing-library/dom"
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"
import Bills from '../containers/Bills.js'
import { ROUTES } from "../constants/routes"
import userEvent from "@testing-library/user-event"
import { localStorageMock } from "../__mocks__/localStorage.js"
import LoadingPage from "../views/LoadingPage.js"




describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const html = BillsUI({ data: bills})
      document.body.innerHTML = html
      const icon = screen.getByTestId("icon-window")
      const style = getComputedStyle(icon)
      //to-do write expect expression
      // get icon background color Style
      // compare w/ requestedStyle value
    })
    test("Then bills should be ordered from earliest to latest", () => {
      const html = BillsUI({ data: bills })
      document.body.innerHTML = html
      const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
      const antiChrono = (a, b) => ((a < b) ? 1 : -1)
      const datesSorted = [...dates].sort(antiChrono)
      expect(dates).toEqual(datesSorted)
    })
  })
  describe("Bills page is loading", () => {
    test("Then it should renders loading page", () => {
      const loading = 'loading'
      const html = BillsUI({ loading })
      document.body.innerHTML = html
      expect(screen.getByText('Loading...')).toBeTruthy()
    })
  })
  describe("An Error occured", () => {
    test("Then it should renders Error page", () => {
      const error = 'error'
      const html = BillsUI({ error })
      document.body.innerHTML = html
      expect(screen.getByText('Erreur')).toBeTruthy()
    })
  })
})


describe('Given I am on bills page', () => {
  describe('When I click on New Bill button', () => {
    test(('Then I should be sent to New bill page'), () => {

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

  describe('When I click on eye icon', () => {
    test(('Then it should renders modal'), () => {
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

      const iconEyes = screen.getAllByTestId("icon-eye")

     if (iconEyes) iconEyes.forEach(icon => {

      const handleClick = jest.fn((e) => bill.handleClickIconEye(icon))
        icon.addEventListener('click', handleClick(icon))
        userEvent.click(icon)
        expect(handleClick).toHaveBeenCalled()
      })
      expect(screen.getByText('Justificatif')).toBeTruthy()
    })
  })
})