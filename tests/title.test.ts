import { test, expect } from "@playwright/test";

test("match title", async ({ page }) => {
  const baseURL = process.env.BASE_URL || "http://localhost:5173";
  await page.goto(baseURL);

  const expectedTitle =
    baseURL === "http://localhost:5173"
      ? "Lib-Mgmt-Sys - Development"
      : /Library Management System/;
  await expect(page).toHaveTitle(expectedTitle);
});
