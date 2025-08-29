const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const full_name = 'shaik kothapalli farooq azeem';
const dob = '16062004';
const user_id = `${full_name.toLowerCase().replace(/\s+/g, '_')}_${dob}`;
const email = 'shaik.kothapalli2022@vitstudent.ac.in';
const roll_number = '22BCE2655';

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Invalid input: 'data' should be an array"
            });
        }

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;

        data.forEach(item => {
            if (!isNaN(item) && item !== '') {
                const num = parseInt(item);
                if (num % 2 === 0) {
                    even_numbers.push(item.toString());
                } else {
                    odd_numbers.push(item.toString());
                }
                sum += num;
            } else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
            } else {
                special_characters.push(item);
            }
        });

        let concat_string = '';
        if (alphabets.length > 0) {
            const allLetters = alphabets.join('').split('').reverse();
            concat_string = allLetters.map((char, index) => {
                return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
            }).join('');
        }

        const response = {
            is_success: true,
            user_id: user_id,
            email: email,
            roll_number: roll_number,
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: sum.toString(),
            concat_string: concat_string
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            is_success: false,
            message: "Internal server error"
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
