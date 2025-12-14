const http = require('http');

const get = (path) => {
    return new Promise((resolve, reject) => {
        http.get(`http://localhost:5001${path}`, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve(data);
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
};

async function test() {
    console.log("Testing API...");
    try {
        const root = await get('/');
        console.log("Root:", root);

        const dashboard = await get('/api/reports/dashboard');
        console.log("Dashboard:", dashboard);

        const students = await get('/api/students');
        console.log("Students:", students.length);

        console.log("API Tests Passed!");
    } catch (err) {
        console.error("API Test Failed:", err);
    }
}

// Wait for server to start
setTimeout(test, 2000);
