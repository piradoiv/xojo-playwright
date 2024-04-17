import {expect, Locator, test} from "@playwright/test";

test.describe('TextFieldWithCounter control', () => {
    let textField: Locator;
    test.beforeEach(async ({page}) => {
        textField = page.getByTestId('textarea').locator('textarea');
        await page.goto('/');
    });

    test('counter label should match the amount of characters in the text field', async ({page}) => {
        const message = 'Hello, world';

        await textField.fill(message);
        await textField.blur();

        const counterLabel = page.getByTestId('counter');
        await expect(counterLabel).toHaveText(message.length.toString(10));
    });

    [
        {amount: 0, color: 'black'},
        {amount: 100, color: 'black'},
        {amount: 101, color: 'red'}
    ].forEach((testData) => {
        test(`counter label color should be ${testData.color} for ${testData.amount} amount of characters`, async ({page}) => {
            let message = '';
            for (let i = 1; i <= testData.amount; i++) {
                message = message + 'a';
            }

            await textField.fill(message);
            await textField.blur();

            const counterLabel = page.getByTestId('counter').locator('label');
            await expect(counterLabel).toHaveText(message.length.toString(10));

            const expectedColor = testData.color === 'black' ? 'rgb(51, 51, 51)' : 'rgb(190, 0, 19)';
            await expect(counterLabel).toHaveCSS('color', expectedColor);
        });
    });
});
