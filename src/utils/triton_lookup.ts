import path from "path";
import { platform } from "process";
import { Builder, By, until } from "selenium-webdriver";
import { Options, ServiceBuilder } from "selenium-webdriver/chrome";

var SERVICE_BUILDER: ServiceBuilder

export function initializeDriver(): boolean {
    var driver_name;
    switch (platform) {
        case "linux":
        case "freebsd":
        case "sunos":
        case "openbsd":
        case "netbsd":
            driver_name = "chromedriver";
            break;

        case "win32":
            driver_name = "chromedriver.exe";
            break;

        default:
            console.log("This OS is not supported yet");
            return false;
    }
    const driver_path = path.join(__dirname, 'resources', driver_name)
    SERVICE_BUILDER = new ServiceBuilder(driver_path);
    return true;
}

export async function verifyStudent(
    ctcId: string,
    dob: string
): Promise<boolean> {

    if(SERVICE_BUILDER == null){
        initializeDriver()
        console.log('Initialized driver') // Testing purposes
    }

    const options = new Options().addArguments(
        "--no-sandbox",
        "--headless",
        "--disable-gpu",
        "--disable-crash-reporter",
        "--disable-extensions",
        "--disable-in-process-stack-traces",
        "--disable-logging",
        "--disable-dev-shm-usage",
        "--log-level=3",
        "--output=/dev/null"
    );

    const driver = new Builder()
        .forBrowser("chrome")
        .setChromeService(SERVICE_BUILDER)
        .setChromeOptions(options)
        .build();

    try {
        await driver.get("https://app.edcc.edu/TritonIDLookup/getID.cfm");

        // Complete Form and Submit
        await driver.wait(until.elementLocated(By.id("txtID"))).sendKeys(ctcId);
        await driver
            .wait(until.elementLocated(By.id("txtBDate")))
            .sendKeys(dob);
        await driver.wait(until.elementLocated(By.id("btnSubmit"))).click();

        // Check if html contains error message
        const html = await driver.getPageSource();
        const errorMsg = "Triton Access account not found";
        if (html.includes(errorMsg)) return false;
    } catch (ignore) {
    } finally {
        driver.quit();
    }
    return true;
}
