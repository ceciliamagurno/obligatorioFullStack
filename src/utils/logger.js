const fs = require('fs');
const path = require('path');
const logRequest = (req) => {
    const now = new Date();
    const [date] = now.toISOString().split('T');
    const logLine = `[${now.toISOString()}] [METHOD]: ${req.method} ${req.path}\n`;

    if (process.env.NODE_ENV === 'production') {
        // En Vercel o producción solo hacemos console.log
        console.log(logLine);
    } else {
        // En local escribimos archivos
        const logsDir = path.join(__dirname, '../logs');
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }
        const logFile = path.join(logsDir, `${date}.log`);
        try {
            fs.appendFileSync(logFile, logLine);
        } catch (error) {
            console.error('Error al escribir en el log:', error);
        }
    }
}

module.exports = { logRequest };