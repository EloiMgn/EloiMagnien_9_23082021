import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then it should renders ", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      //to-do write assertion
    })
  })
})

// describe("Given that I am a user on login page", () => {
//   describe("When I do not fill fields and I click on employee button Login In", () => {
//     test("Then It should renders Login page", () => {
//       document.body.innerHTML = LoginUI()

//       const inputEmailUser = screen.getByTestId("employee-email-input")
//       expect(inputEmailUser.value).toBe("")
          
//       const inputPasswordUser = screen.getByTestId("employee-password-input")
//       expect(inputPasswordUser.value).toBe("")
  
//       const form = screen.getByTestId("form-employee")
//       const handleSubmit = jest.fn(e => e.preventDefault())  
  
//       form.addEventListener("submit", handleSubmit)
//       fireEvent.submit(form) 
//       expect(screen.getByTestId("form-employee")).toBeTruthy()
//     })
//   })