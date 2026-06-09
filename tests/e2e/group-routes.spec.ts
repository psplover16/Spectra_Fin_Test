import { expect, test } from '@playwright/test';

const primaryRoutes = [
  { path: '/a-group', heading: 'A 組' },
  { path: '/b-group', heading: 'B 組' },
  { path: '/language', heading: '語言' }
] as const;

const legacyRedirects = [
  { path: '/computer-principles', target: '/a-group', heading: 'A 組' },
  { path: '/networking', target: '/a-group', heading: 'A 組' },
  { path: '/information-management', target: '/b-group', heading: 'B 組' },
  { path: '/programming', target: '/b-group', heading: 'B 組' }
] as const;

const completeHistoricalYears = ['107', '108', '109', '110', '111', '112', '113'] as const;

test.describe('group learning route smoke', () => {
  test('opens A group from the root route', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL(/\/a-group$/);
    await expect(page.getByRole('heading', { name: 'A 組' })).toBeVisible();
  });

  for (const route of primaryRoutes) {
    test(`opens ${route.path} without NotFound`, async ({ page }) => {
      await page.goto(route.path);

      await expect(page.getByRole('heading', { name: route.heading })).toBeVisible();
      await expect(page.getByTestId('not-found-view')).toHaveCount(0);
    });
  }

  for (const route of legacyRedirects) {
    test(`redirects legacy route ${route.path} to ${route.target}`, async ({ page }) => {
      await page.goto(route.path);

      await expect(page).toHaveURL(new RegExp(`${route.target}$`));
      await expect(page.getByRole('heading', { name: route.heading })).toBeVisible();
      await expect(page.getByTestId('not-found-view')).toHaveCount(0);
    });
  }

  test('opens the complete 114 A group year analysis route', async ({ page }) => {
    await page.goto('/a-group/114');

    await expect(page.getByRole('heading', { name: '114 年 A 組逐題解析' })).toBeVisible();
    await expect(page.getByTestId('not-found-view')).toHaveCount(0);
  });

  test('reloads the 114 A group analysis route in a 375px offline mobile viewport', async ({
    context,
    page
  }, testInfo) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/a-group/114');

    await expect(page.getByRole('heading', { name: '國營資訊職員考試講義' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '114 年 A 組逐題解析' })).toBeVisible();
    await expect(page.getByTestId('a-group-question-card')).toHaveCount(50);
    await expect(page.getByTestId('offline-readiness')).toContainText('離線閱讀已就緒', { timeout: 15000 });

    await context.setOffline(true);
    await page.reload({ waitUntil: 'domcontentloaded' });

    await expect(page.getByRole('heading', { name: '國營資訊職員考試講義' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '114 年 A 組逐題解析' })).toBeVisible();
    await expect(page.getByTestId('a-group-question-card')).toHaveCount(50);

    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('a-group-114-375px-offline-reload', {
      body: screenshot,
      contentType: 'image/png'
    });

    const fitsViewport = await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
    );
    expect(fitsViewport).toBe(true);

    await context.setOffline(false);
  });

  test('serves the cached app shell for A group navigation while offline', async ({ context, page }) => {
    await page.goto('/a-group');

    await expect(page.getByRole('heading', { name: '國營資訊職員考試講義' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'A 組' })).toBeVisible();
    await expect(page.getByTestId('offline-readiness')).toContainText('離線閱讀已就緒', { timeout: 15000 });

    await context.setOffline(true);
    const offlinePage = await context.newPage();
    await offlinePage.goto('/a-group', { waitUntil: 'domcontentloaded' });

    await expect(offlinePage.getByRole('heading', { name: '國營資訊職員考試講義' })).toBeVisible();
    await expect(offlinePage.getByRole('heading', { name: 'A 組' })).toBeVisible();
    await expect(offlinePage.getByTestId('not-found-view')).toHaveCount(0);

    await context.setOffline(false);
  });

  test('serves complete historical A group year routes while offline', async ({ context, page }) => {
    await page.goto('/a-group');

    await expect(page.getByRole('heading', { name: '國營資訊職員考試講義' })).toBeVisible();
    await expect(page.getByTestId('offline-readiness')).toContainText('離線閱讀已就緒', { timeout: 15000 });

    await context.setOffline(true);

    for (const year of ['107', '113'] as const) {
      const offlinePage = await context.newPage();
      await offlinePage.goto(`/a-group/${year}`, { waitUntil: 'domcontentloaded' });

      await expect(offlinePage.getByRole('heading', { name: `${year} 年 A 組逐題解析` })).toBeVisible();
      await expect(offlinePage.getByTestId('a-group-question-card')).toHaveCount(50);
      await offlinePage.close();
    }

    await context.setOffline(false);
  });

  for (const year of completeHistoricalYears) {
    test(`opens complete valid A group year ${year}`, async ({ page }) => {
      await page.goto(`/a-group/${year}`);

      await expect(page.getByRole('heading', { name: `${year} 年 A 組逐題解析` })).toBeVisible();
      await expect(page.getByText('等待版型確認後製作')).toHaveCount(0);
      await expect(page.getByTestId('a-group-question-card')).toHaveCount(50);
      await expect(page.getByText('已載入 50 題解析資料')).toBeVisible();
      await expect(page.getByTestId('not-found-view')).toHaveCount(0);
    });
  }

  for (const path of ['/a-group/115', '/a-group/999', '/a-group/abc'] as const) {
    test(`renders NotFound for invalid A group year ${path}`, async ({ page }) => {
      await page.goto(path);

      await expect(page.getByTestId('not-found-view')).toBeVisible();
    });
  }

  test('keeps primary group navigation within a 375px mobile viewport', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/b-group');

    await expect(page.getByRole('link', { name: 'A 組' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'B 組' })).toHaveAttribute('aria-current', 'page');
    await expect(page.getByRole('link', { name: '語言' })).toBeVisible();

    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('primary-nav-375px', {
      body: screenshot,
      contentType: 'image/png'
    });

    const fitsViewport = await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
    );
    expect(fitsViewport).toBe(true);
  });

  test('operates A group year controls in a 375px offline mobile viewport', async ({ context, page }, testInfo) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/a-group');
    const bookmarkControl = page.locator('[data-testid="a-group-bookmark-control"][data-year="114"]');
    const completionControl = page.locator('[data-testid="a-group-completion-control"][data-year="114"]');

    await expect(bookmarkControl).toBeVisible();
    await expect(completionControl).toBeVisible();
    await context.setOffline(true);

    await bookmarkControl.click();
    await expect(bookmarkControl).toHaveAttribute('data-bookmarked', 'true');

    await completionControl.check();
    await expect(completionControl).toBeChecked();
    await expect(bookmarkControl).toHaveAttribute('data-bookmarked', 'false');

    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('a-group-year-controls-375px-offline', {
      body: screenshot,
      contentType: 'image/png'
    });

    const fitsViewport = await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
    );
    expect(fitsViewport).toBe(true);

    await context.setOffline(false);
  });
});
