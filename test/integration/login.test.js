describe('Login page', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080/admin#/login');
    await page.waitForSelector(".login-form");
  })

  it("Submit button is exist", async () => {
    const submitBtn = await page.$eval(".form__submit-btn", el =>(el ? true : false));
    expect(submitBtn).toBe(true);
  });

  it("Login input field is exist", async () => {
    const loginInput = await page.$eval("input[name=login]", el =>(el ? true : false));
    expect(loginInput).toBe(true);
  });
  it("Password input field is exist and has correct type", async () => {
    const passwordInput = await page.$eval("input[type=password]", el =>(el ? true : false));
    expect(passwordInput).toBe(true);
  });
  it("Submit button is disabled until all fields are filled", async () => {
    let btnIsDisabled = await page.$eval('.form__submit-btn[disabled]', button => button !== null );
    expect(btnIsDisabled).toBe(true);
    await page.type("input[name=login]", "lorem");
    await page.type("input[type=password]", "ipsum");
    await page.$eval('.form__submit-btn[disabled]', button => button !== null).catch(() => btnIsDisabled = false); 
    expect(btnIsDisabled).toBe(false);
  });
})