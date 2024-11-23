import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

interface Person {
    id: number;
    name: string;
    age: number;
}

const myList: Person[] = [
    {
        id: 1,
        name: 'John Doe',
        age: 25
    },
    {
        id: 2,
        name: 'Jane Doe',
        age: 30
    }
];

app.get('/', (req: Request, res: Response) => {
    let htmlContent = '<h1>My List</h1><ul>';
    
    myList.forEach(item => {
        htmlContent += `<li>${item.name}, Age: ${item.age}</li>`;
    });

    htmlContent += '</ul>';

    // Send the HTML as the response
    res.send(htmlContent);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
