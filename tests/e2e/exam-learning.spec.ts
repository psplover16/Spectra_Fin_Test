import { expect, test } from '@playwright/test';

const routes = [
  { path: '/computer-principles', heading: '計算機原理', slug: 'computer-principles' },
  { path: '/networking', heading: '網路概論', slug: 'networking' },
  { path: '/information-management', heading: '資訊管理', slug: 'information-management' },
  { path: '/programming', heading: '程式設計', slug: 'programming' },
  { path: '/language', heading: '語言', slug: 'language' }
] as const;

test.describe('exam learning pages on mobile', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true
  });

  for (const route of routes) {
    test(`renders ${route.heading} without mobile overflow`, async ({ page }) => {
      await page.goto(route.path);

      await expect(page.getByRole('heading', { name: route.heading, exact: true })).toBeVisible();
      await expect(page.getByText('尚未匯入正式講義')).toHaveCount(0);
      await expect(page.getByTestId('subject-accent')).toHaveAttribute('data-subject', route.slug);
      await expect(page.getByRole('heading', { name: '科目總覽' })).toBeVisible();
      await expect(page.getByRole('heading', { name: '高頻考點' })).toBeVisible();
      await expect(page.getByRole('heading', { name: '年度來源索引' })).toBeVisible();
      await expect(page.getByRole('heading', { name: '主題式講義' })).toBeVisible();
      await expect(page.getByRole('heading', { name: '複習清單' })).toBeVisible();
      await expect(page.getByRole('heading', { name: '易錯觀念' })).toBeVisible();
      await expect(page.getByRole('heading', { name: '題目對照' })).toBeVisible();

      const fitsViewport = await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
      );
      expect(fitsViewport).toBe(true);
    });
  }

  test('exposes all five subject routes from the learning entry screen', async ({ page }) => {
    await page.goto('/');

    for (const route of routes) {
      await expect(page.getByRole('link', { name: new RegExp(route.heading) })).toHaveAttribute(
        'href',
        route.path
      );
    }
  });

  test('keeps subject-specific distinction across professional and common routes', async ({ page }) => {
    await page.goto('/computer-principles');
    await expect(page.getByTestId('subject-accent')).toHaveAttribute('data-category', 'professional');
    await expect(page.getByText('專業科目', { exact: true })).toBeVisible();

    await page.goto('/language');
    await expect(page.getByTestId('subject-accent')).toHaveAttribute('data-category', 'common');
    await expect(page.getByText('共同科目', { exact: true })).toBeVisible();
  });

  test('recovers unknown routes with a visible action back to the learning entry', async ({ page }) => {
    await page.goto('/not-in-route-set');

    await expect(page.getByRole('heading', { name: '找不到頁面' })).toBeVisible();
    await expect(page.getByRole('link', { name: '回到學習入口' })).toHaveAttribute('href', '/');
  });
});

test.describe('offline app shell fallback', () => {
  for (const route of routes) {
    test(`renders ${route.heading} after the app has been loaded and the browser is offline`, async ({
      context,
      page
    }) => {
      await page.goto('/');
      await expect(page.getByTestId('offline-readiness')).toContainText('離線閱讀已就緒');

      await page.goto(route.path);
      await expect(page.getByRole('heading', { name: route.heading, exact: true })).toBeVisible();

      await context.setOffline(true);
      await page.goto(route.path);
      await expect(page.getByRole('heading', { name: route.heading, exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: '主題式講義' })).toBeVisible();
      await expect(page.getByText('尚未匯入正式講義')).toHaveCount(0);
      await context.setOffline(false);
    });
  }
});
