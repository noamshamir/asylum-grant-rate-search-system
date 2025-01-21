import React from "react";
import "./MobileFAQ.css";
import MobileQA from "../MobileQA/MobileQA.tsx";
import { Link } from "react-router-dom";

interface FAQProps {
    currentLanguage: string;
}

function MobileFAQ({ currentLanguage }: FAQProps) {
    // Each FAQ item has both an English (en) and Spanish (es) version
    const faqs = [
        {
            en: {
                question:
                    "How do I find my judge and city if I know my A number?",
                answer: (
                    <>
                        Step 1) Go to{" "}
                        <a
                            href='https://example.gov/lookupA'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            this website
                        </a>
                        . Step 2) Enter your A Number in the input field and
                        click enter. Step 3) You will see your case information,
                        including your judge and city. You can now search for
                        their grant rates on this website’s search bar.
                    </>
                ),
            },
            es: {
                question:
                    "¿Cómo encuentro a mi juez y ciudad si conozco mi número A?",
                answer: (
                    <>
                        Paso 1) Ve a{" "}
                        <a
                            href='https://example.gov/lookupA'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            este sitio web
                        </a>
                        . Paso 2) Ingresa tu número A en el campo y presiona
                        enter. Paso 3) Verás tu información de caso, incluyendo
                        tu juez y ciudad. Ahora puedes buscar sus tasas de
                        concesión en la barra de búsqueda de este sitio web.
                    </>
                ),
            },
        },
        {
            en: {
                question: "How do I find my A Number?",
                answer: (
                    <>
                        You can find your Alien Number (A Number) at the top of
                        most forms you get from a government official at court
                        or the border. For images and more details, visit{" "}
                        <a
                            href='https://example.gov/guide'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            this guide
                        </a>
                        .
                    </>
                ),
            },
            es: {
                question: "¿Cómo encuentro mi número A?",
                answer: (
                    <>
                        Puedes encontrar tu número de extranjero (número A) en
                        la parte superior de la mayoría de los formularios que
                        recibes de un funcionario gubernamental en la corte o en
                        la frontera. Para ver imágenes y más detalles, visita{" "}
                        <a
                            href='https://example.gov/guide'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            esta guía
                        </a>
                        .
                    </>
                ),
            },
        },
        {
            en: {
                question: "How do I find my grant rate?",
                answer: (
                    <>
                        Search for your asylum grant rate by entering your
                        judge’s name or your city into the search box on this
                        website.
                    </>
                ),
            },
            es: {
                question: "¿Cómo encuentro mi tasa de concesión?",
                answer: (
                    <>
                        Busca tu tasa de concesión de asilo ingresando el nombre
                        de tu juez o tu ciudad en la barra de búsqueda de este
                        sitio web.
                    </>
                ),
            },
        },

        {
            en: {
                question: "What do the percentages in the graphs mean?",
                answer: (
                    <>
                        The graphs and percentages show the percentage of cases
                        where relief (asylum or other) is granted. The higher
                        the number, the more cases are approved by that judge.
                    </>
                ),
            },
            es: {
                question: "¿Qué significan los porcentajes en los gráficos?",
                answer: (
                    <>
                        Los gráficos y porcentajes muestran el porcentaje de
                        casos en los que se otorga un alivio (asilo u otro).
                        Cuanto más alto sea el número, más casos son aprobados
                        por ese juez.
                    </>
                ),
            },
        },
        {
            en: {
                question: "Can I switch judges if mine is bad?",
                answer: (
                    <>
                        You generally can't change judges, but you may be able
                        to move to a new city and transfer your case, in which
                        case you would get a new judge. This is known as a
                        "Change of Venue" and it may be complex.
                    </>
                ),
            },
            es: {
                question: "¿Puedo cambiar de juez si el mío es malo?",
                answer: (
                    <>
                        Generalmente no puedes cambiar de juez, pero podrías
                        mudarte a una nueva ciudad y transferir tu caso, en cuyo
                        caso obtendrías un nuevo juez. Esto se conoce como un
                        "Cambio de Sede" y puede ser complejo.
                    </>
                ),
            },
        },
        {
            en: {
                question:
                    "Does the percentage tell me how likely I am to get asylum?",
                answer: (
                    <>
                        The percentage does not tell you your chances of success
                        in your case. Your chances of success depend on your
                        particular case. T he most important factor is finding a
                        trusted lawyer. For more information see :
                        <a
                            href='https://www.youtube.com/watch?v=Xh5hyRsX6K4
'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            this video
                        </a>
                    </>
                ),
            },
            es: {
                question:
                    "¿El porcentaje me dice qué tan probable es que obtenga asilo?",
                answer: (
                    <>
                        El porcentaje no indica tus probabilidades de éxito en
                        tu caso. Tus probabilidades de éxito dependen de tu caso
                        particular. El factor más importante es encontrar un
                        abogado de confianza. Para más información, consulta:
                        <a
                            href='https://www.youtube.com/watch?v=NVugGm-bFy8'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            este video
                        </a>
                    </>
                ),
            },
        },
        {
            en: {
                question: "What does ‘other relief’ mean?",
                answer: (
                    <>
                        ‘Other relief’ refers to cases where relief other than
                        asylum—such as withholding of removal, Convention
                        Against Torture (CAT), or discretionary humanitarian
                        relief—was granted.
                    </>
                ),
            },
            es: {
                question: "¿Qué significa ‘otro tipo de alivio’?",
                answer: (
                    <>
                        “Otro tipo de alivio” se refiere a casos en los que se
                        otorga un alivio diferente al asilo, como retención de
                        expulsión, la Convención contra la Tortura (CAT), o
                        alivio humanitario discrecional.
                    </>
                ),
            },
        },
    ];

    return (
        <div className='FAQ-page'>
            <div className='faq-header'>
                <h3>
                    {currentLanguage === "en"
                        ? "Frequently Asked Questions (FAQs)"
                        : "Preguntas Frecuentes (FAQs)"}
                </h3>
            </div>
            <div className='back-div'>
                <Link to='/'>
                    <span className='back-to-search'>
                        {currentLanguage === "en"
                            ? "Back to search"
                            : "Regresar a la búsqueda"}
                    </span>
                </Link>
            </div>

            <div className='FAQs'>
                {faqs.map((item, idx) => {
                    const faqContent =
                        currentLanguage === "en" ? item.en : item.es;

                    return (
                        <MobileQA
                            key={idx}
                            currentLanguage={currentLanguage}
                            question={faqContent.question}
                            answer={faqContent.answer}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default MobileFAQ;
