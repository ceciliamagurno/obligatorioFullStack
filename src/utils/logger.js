const fs = require('fs');
const path = require('path');
const logRequest = (req) => {
    const now = new Date();
    const[date] = now.toISOString().split('T');
    const logsDir = path.join(__dirname, '../logs');
    const logFile = path.join(logsDir, `${date}.log`) ;
    const logMessage = `[Path] ${req.path}\n`;
    const logLine = `[${now.toISOString()}] [METHOD]: ${req.method} ${req.path}\n`;

    fs.appendFileSync(logFile, logLine , (error) => {
        if (error) {
            console.error('Error al escribir en el log:', error);
        }   
    });
}

module.exports = { logRequest };