const express = require('express');
const app = express();
const port = 3000;

/**
 * Function to return Roman equivalent of given number
 * @param {Object} req request object
 * @param {Object} res response object
 * @returns {String} Roman equivalent of given number
 */
app.get('/numtoroman/:num', (req, res) => {
	try {
		let { num } = req.params;
		num = parseInt(num);
		if (isNaN(num)) {
			const customError = new Error('Please enter valid Number');
			customError.code = 400;
			throw customError;
		} else if (num > 100) {
			const customError = new Error('Please enter Number less than 100');
			customError.code = 400;
			throw customError;
		}
		let romanNum = '';
		const romanLetters = ['C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
		const numbers = [100, 90, 50, 40, 10, 9, 5, 4, 1];

		for (const key in romanLetters) {
			while (num >= numbers[key]) {
				romanNum += romanLetters[key];
				// console.log(romanNum);
				num -= numbers[key];
				// console.log(num);
			}
		}

		res.status(200).send(romanNum);
	} catch (error) {
		console.error(error);
		res.status(error.code ? error.code : 500).send(error.message);
	}
});

app.listen(port, 'localhost', () => {
	console.log(`listening on port ${port}`);
});
