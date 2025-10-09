
const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
);

const sendEmail = async (bookTitle) => {
    try {
        const response = await mailjet
            .post('send', { version: 'v3.1' }).request({
                Messages: [
                    {
                        From: {
                            Email: "cecilia.magurno.11@gmail.com",
                            Name: "Cecilia Magurno"
                        },
                        To: [
                            {
                                Email: "CM173625@fi365.ort.edu.uy",
                                Name: "Cecilia Magurno"
                            }
                        ],
                        Subject: "Nuevo libro registrado",
                        TextPart: `Has registrado el libro: ${bookTitle}. ¡Enhorabuena!`,
                        HTMLPart: `Has registrado el libro: <b>${bookTitle}</b>. ¡Enhorabuena!`
                    }
                ]
            })
        return response
    } catch (error) {
        throw new Error('Error sending email');
    }
}

module.exports = sendEmail;