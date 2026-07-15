/**
 * @jest-environment jsdom
 *
 * Unit tests for js/main.js — the only JS module in the project, previously at
 * 0% coverage.
 */

const DOM = `
  <nav><h1>My Page</h1></nav>
  <main>
    <section id="view1" class="view1"><div>1</div></section>
    <section id="view2" class="view2 darkblue">
      <div class="black"><h2>My 2nd View</h2></div>
    </section>
    <section id="view3" class="view3">
      <form id="myForm">
        <label for="myTextInput">Text Input:</label>
        <input type="text" id="myTextInput" autocomplete="off" />
        <button type="submit">Submit</button>
      </form>
    </section>
  </main>
`;

// Load a fresh copy of the module against the current document.
function loadMain() {
  let mod;
  jest.isolateModules(() => {
    mod = require("./main.js");
  });
  return mod;
}

beforeEach(() => {
  document.body.innerHTML = DOM;
});

describe("top-level view initialization", () => {
  test("hides view1 and view2 and shows view3 as flex", () => {
    loadMain();

    expect(document.getElementById("view1").style.display).toBe("none");
    expect(document.getElementById("view2").style.display).toBe("none");
    expect(document.getElementById("view3").style.display).toBe("flex");
  });
});

describe("doSomething", () => {
  test("triggers a browser alert", () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    const { doSomething } = loadMain();

    doSomething();

    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledWith("doing something");
    alertSpy.mockRestore();
  });
});

describe("initApp", () => {
  test("attaches a submit handler that prevents default and logs", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const { initApp } = loadMain();

    initApp();

    const form = document.getElementById("myForm");
    const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
    form.dispatchEvent(submitEvent);

    expect(submitEvent.defaultPrevented).toBe(true);
    expect(logSpy).toHaveBeenCalledWith("submit event");
    logSpy.mockRestore();
  });

  test("does not log before the form is submitted", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const { initApp } = loadMain();

    initApp();

    expect(logSpy).not.toHaveBeenCalledWith("submit event");
    logSpy.mockRestore();
  });
});

describe("readystatechange wiring", () => {
  test("runs initApp (adding the submit handler) once the document is complete", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    loadMain();

    // Simulate the document finishing loading.
    Object.defineProperty(document, "readyState", {
      configurable: true,
      get: () => "complete",
    });
    document.dispatchEvent(new Event("readystatechange"));

    const form = document.getElementById("myForm");
    const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
    form.dispatchEvent(submitEvent);

    expect(submitEvent.defaultPrevented).toBe(true);
    expect(logSpy).toHaveBeenCalledWith("submit event");
    logSpy.mockRestore();
  });
});
